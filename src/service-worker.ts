import { doc, updateDoc, increment, arrayUnion, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { addUserSubmission, checkCanSubmit, getActiveUrl, getJobId, getJobSite, } from "./utils/jobPostUtils";
import { JobSite } from "./types";

chrome.runtime.onMessage.addListener(({ type, isFakeListing, notes }, _sender, sendResponse) => {
    if (type === "submit-post") {
        const submit = async () => {
            const activeUrl = await getActiveUrl();
            const jobSite = await getJobSite(activeUrl);
            const jobId = await getJobId();
            if (jobId && jobSite !== undefined) {
                const docRef = doc(db, "JobPostings", jobId);
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    if (isFakeListing) {
                        await updateDoc(docRef, { fakeListingCount: increment(1)});
                    } else {
                        await updateDoc(docRef, { shadyCompanyCount: increment(1)});
                    }
                    
                    if (notes.length > 0) {
                        await updateDoc(docRef, { comments: arrayUnion(notes)});
                    }
                } else { //initialize new listing
                    const newListing = {
                        fakeListingCount: isFakeListing ? 1 : 0,
                        shadyCompanyCount: isFakeListing ? 0 : 1,
                        comments: [] as string[],
                        jobSite: JobSite[jobSite]
                    }
                    if (notes && notes.length > 0) {
                        newListing.comments.push(notes);
                    }
                    const docRef = doc(db, "JobPostings", jobId);
                    console.log(docRef);
                    
                    await setDoc(docRef, newListing);
                }
                await addUserSubmission(jobId);
            }
        }
        submit();
    } 
    else if (type == "check-valid-site") {
        // checkValidSite().then((isValid) => {
        //     sendResponse({ isValid: isValid });
        // });
        console.log('message received')
        const doSomething = async () => {
            const isValid = await checkCanSubmit();
            sendResponse({ isValid: isValid });

        }
        doSomething();
        return true;
    }
});

chrome.tabs.onUpdated.addListener((_tabId, changeInfo, _tab) => {
    const url = changeInfo.url;
    if (url) {
        chrome.action.setBadgeText({text: "10+"}); 
        // checkValidSite();
    }
});

chrome.tabs.onActivated.addListener(() => {
    // checkValidSite();
})

