import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { JobSite } from "../types";
import { db } from "../firebase";

export async function getJobId(): Promise<string | undefined> {
    const tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    if (tabs.length == 0) {
        return undefined;
    }
    const activeUrl = tabs[0].url;
    const jobSite = await getJobSite(activeUrl);
    if (!activeUrl) return undefined;
    if (jobSite == JobSite.LinkedIn) {
        const postId = activeUrl.match(/currentJobId=([a-zA-Z0-9]*)/);
        if (postId) {
            return "linkedIn-" + postId[1];
        }
    } else if (jobSite == JobSite.Indeed) {
        const postId = activeUrl.match(/vjk=([a-zA-Z0-9]*)/)
        if (postId) {
            return "indeed-" + postId[1]
        }
    } else if (jobSite == JobSite.Glassdoor) {
        const postId = activeUrl.match(/jobListingId=([a-zA-Z0-9]*)/)
        if (postId) {
            return "glassdoor-" + postId[1]
        }
    }
    return undefined;
}

export async function getActiveUrl(): Promise<string | undefined> {
    const tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    const activeUrl = tabs[0].url;
    return activeUrl;
}

export async function getJobSite(activeUrl: string | undefined): Promise<JobSite | undefined> {
    if (activeUrl) {
        if (activeUrl.includes("linkedin")) {
            return JobSite.LinkedIn;
        } else if (activeUrl.includes("indeed")) {
            return JobSite.Indeed;
        } else if (activeUrl.includes("glassdoor")) {
            return JobSite.Glassdoor;
        } else {
            return undefined;
        }
    } else {
        return undefined;
    }
}

export async function hasPriorSubmission(postId: string): Promise<boolean> {
    const { id } = await getUserInfo();
    if (id === undefined) {
        return false;
    }
    const docRef = doc(db, "UserSubmissions", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const ids = docSnap.get("postIds") as string[];
        if (ids.includes(postId)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

export async function addUserSubmission(postId: string): Promise<boolean> {
    getUserInfo().then((userInfo) => {
        if (userInfo && !chrome.runtime.lastError) {
            const id = userInfo.id;
            if (id === undefined) {
                return false;
            }
            const docRef = doc(db, "UserSubmissions", id);
            getDoc(docRef).then((docSnap) => {
                if (docSnap.exists()) {
                    updateDoc(docRef, { postIds: arrayUnion(postId)});
                } else {
                    const newUser = {
                        postIds: [postId]
                    }
                    setDoc(docRef, newUser);
                }

            })
        }
    })
    return true;
}

function getUserInfo() {
    return new Promise<chrome.identity.UserInfo>((resolve, _reject) => {
        chrome.identity.getProfileUserInfo((userInfo) => {
            resolve(userInfo);
        });
    })
}

export async function checkValidSite() {
    const jobId = await getJobId();
    console.log(jobId);
    return jobId === undefined ? false : !(await hasPriorSubmission(jobId));
}
