import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { JobSite } from "../types";
import { db } from "../firebase";

export async function getJobId(): Promise<string | undefined> {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    const activeUrl = tab.url;
    const jobSite = await getJobSite();
    if (!activeUrl) return undefined;
    if (jobSite == JobSite.LinkedIn) {
        const postId = activeUrl.match(/currentJobId=([a-zA-Z0-9]*)&/);
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

export async function getJobSite(): Promise<JobSite | undefined> {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    const activeUrl = tab.url;
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
    let id = undefined;
    chrome.identity.getProfileUserInfo((userInfo) => {
        if (userInfo && !chrome.runtime.lastError) {
            id = userInfo.id;
        }
    });
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
    let id = undefined;
    chrome.identity.getProfileUserInfo((userInfo) => {
        if (userInfo && !chrome.runtime.lastError) {
            id = userInfo.id;
        }
    });
    if (id === undefined) {
        return false;
    }
    const docRef = doc(db, "UserSubmissions", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        updateDoc(docRef, { postIds: arrayUnion(postId)});
    } else {
        const newUser = {
            postIds: [postId]
        }
        await setDoc(docRef, newUser);
    }
    return true;
}
