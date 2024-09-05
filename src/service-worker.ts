import { doc, updateDoc, increment, arrayUnion, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { getJobId, getJobSite } from "./utils/jobPostUtils";
import { JobSite } from "./types";

chrome.runtime.onMessage.addListener(({ type, isFakeListing, notes }) => {
    if (type === "submit-post") {
        const submit = async () => {
            const jobSite = await getJobSite();
            const jobId = await getJobId();
            if (jobId && jobSite !== undefined) {
                console.log("h")
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
        }
    }
    submit();
    }
});
