import { doc, updateDoc, increment, arrayUnion, setDoc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebase";
import { addUserSubmission, getActiveUrl, getJobId, getJobSite, getPostData, hasPriorSubmission, updateBadgeText, } from "./utils/jobPostUtils";
import { Comment, JobPostData, JobSite, MessageTypes } from "./types";

chrome.runtime.onMessage.addListener(({ type, isFakeListing, notes }, _sender, sendResponse) => {
    console.log(type);
    if (type === MessageTypes.SubmitPost) {
        const submit = async () => {
            const activeUrl = await getActiveUrl();
            const jobSite = await getJobSite(activeUrl);
            const jobId = await getJobId();
            if (jobId && jobSite !== undefined) {
                const docRef = doc(db, "JobPostings", jobId);
                const docSnap = await getDoc(docRef)

                if (docSnap.exists()) {
                    if (isFakeListing) {
                        await updateDoc(docRef, { fakeListingCount: increment(1) });
                    } else {
                        await updateDoc(docRef, { shadyCompanyCount: increment(1) });
                    }

                    if (notes.length > 0) {
                        const newComment: Comment = {
                            body: notes,
                            timestamp: new Timestamp(Date.now() / 1000, 0)
                        }
                        await updateDoc(docRef, { comments: arrayUnion(newComment) });
                    }
                } else { //initialize new listing
                    const newListing = {
                        fakeListingCount: isFakeListing ? 1 : 0,
                        shadyCompanyCount: isFakeListing ? 0 : 1,
                        comments: [],
                        jobSite: JobSite[jobSite],
                    } as JobPostData
                    if (notes && notes.length > 0) {
                        const newComment: Comment = {
                            body: notes,
                            timestamp: new Timestamp(Date.now() / 1000, 0)
                        }
                        newListing.comments.push(newComment);
                    }
                    const docRef = doc(db, "JobPostings", jobId);
                    console.log(docRef);

                    await setDoc(docRef, newListing);
                }
                await addUserSubmission(jobId);
                updateBadgeText();
            }
        }
        submit();
    } else if (type == MessageTypes.CheckValidUrl) {
        const checkValidity = async () => {
            const jobId = await getJobId();
            sendResponse({ isValid: jobId !== undefined });

        }
        checkValidity();
        return true;
    } else if (type == MessageTypes.GetPostData) {
        const getData = async () => {
            const postId = await getJobId();
            let data = undefined;
            if (postId) {
                data = await getPostData(postId);
            }
            sendResponse({ postData: data });
        }
        getData();
        return true;
    } else if (type == MessageTypes.CheckPriorSubmission) {
        const checkPrior = async () => {
            let hasPrior = false;
            const jobId = await getJobId();
            if (jobId !== undefined) {
                hasPrior = await hasPriorSubmission(jobId);
            }
            sendResponse({ hasPriorSubmission: hasPrior });
        }
        checkPrior();
        return true;
    }
});

chrome.tabs.onUpdated.addListener(() => {
    updateBadgeText();
});

chrome.tabs.onActivated.addListener(() => {
    updateBadgeText();
})

