import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { JobPostData, JobSite } from "../types";
import { db } from "../firebase";

/**
 * Gets a unique id from the active tab's url
 * @return {Promise<string | undefined>} 
 * Job Id in the format {site}-{id}, undefined if site is not a valid job
 */
export async function getJobId(): Promise<string | undefined> {
    const tabs = await chrome.tabs.query({ active: true, 
    lastFocusedWindow: true });
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

/**
 * Gets the url of the active tab.
 * @return {Promise<string | undefined>} url of the active tab, undefined if
 * no url
 */
export async function getActiveUrl(): Promise<string | undefined> {
    const tabs = await chrome.tabs.query({ active: true,
    lastFocusedWindow: true });
    const activeUrl = tabs[0].url;
    return activeUrl;
}

/**
 * Gets the job website of the given url
 * @param activeUrl url of the tab to get the job site for
 * @return {Promise<JobSite | undefined>} the job website (LinkedIn, 
 * Indeed, etc.) of the given url
 */
export async function getJobSite(activeUrl: string | undefined): 
Promise<JobSite | undefined> {
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

/**
 * Checks whether user has already submitted a report on job listing
 * @param {string} postId the job posting Id to check prior submission for 
 * @return {boolean} true if has a prior submission, false if not
 */
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

/**
 * Records submission for current user for given job posting id
 * @param {string} postId job posting id to record user submission for
 * @return {Promise<boolean>} true if succesfully adds submission, 
 * false if fails
 */
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

export async function getPostData(postId: string): 
Promise<JobPostData | undefined> {
    const docRef = doc(db, "JobPostings", postId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data() as JobPostData;
    } else {
        return undefined;
    }
}
/**
 * gets identity info for loggged in user on chrome
 * @return {Promise<chrome.identity.UserInfo>} a promise containing current
 * chrome user's info (id and email)
 */
function getUserInfo(): Promise<chrome.identity.UserInfo> {
    return new Promise<chrome.identity.UserInfo>((resolve, _reject) => {
        chrome.identity.getProfileUserInfo((userInfo) => {
            resolve(userInfo);
        });
    })
}

/**
 * checks whether the current user can submit on the current site.
 * Looks at if the job site is valid and if the user has already made a
 * submission for the listing
 * @return {Promise<boolean>} true if user can make a submission, false if not
 */
export async function checkCanSubmit(): Promise<boolean> {
    const jobId = await getJobId();
    console.log(jobId);
    return jobId === undefined ? false : !(await hasPriorSubmission(jobId));
}

export async function updateBadgeText() {
    const jobId = await getJobId();
    if (jobId) {
        const postData = await getPostData(jobId);
        if (postData) {
            const notificationCount = postData.fakeListingCount 
            + postData.shadyCompanyCount;
            if (notificationCount > 0) {
                chrome.action.setBadgeText({ text: 
                    notificationCount.toString() });
                return;
            }
        }
    }
    chrome.action.setBadgeText({ text: '' });
}
