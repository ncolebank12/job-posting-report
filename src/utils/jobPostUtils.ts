import { JobSite } from "../types";

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