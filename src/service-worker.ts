import { doc, updateDoc, increment, arrayUnion, setDoc } from "firebase/firestore";
import { db } from "./firebase";

chrome.runtime.onMessage.addListener(({ type, isFakeListing, notes }) => {
    if (type === "submit-post") {
        const submit = async () => {

            const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true});
            const activeUrl = tab.url;
            
            if (activeUrl?.includes('linkedin')) {
                const postId = activeUrl.match(/currentJobId=(.*?)&/);
                if (postId) {   
                    const docRef = doc(db, "LinkedInPostings", postId[0]);
                    if (docRef) {
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
                            fakeListingCount: 1,
                            shadyCompanyCount: 1,
                            comments: [] as string[]
                        }
                        if (notes.length > 0) {
                            newListing.comments.push(notes);
                        }
                        const docRef = doc(db, "LinkedInPostings", postId[0]);
                        
                        await setDoc(docRef, newListing);
                    } 
                }
            }
        }
        submit();
    }
})