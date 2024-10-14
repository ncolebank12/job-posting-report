import { Timestamp } from "firebase/firestore"

export enum JobSite {
    LinkedIn = "LinkedIn",
    Indeed = "Indeed",
    Glassdoor = "Glassdoor"
}

export type JobPostData = {
    comments: Comment[],
    fakeListingCount: number,
    shadyCompanyCount: number,
    jobSite: string
}

export type Comment = {
    body: string,
    timestamp: Timestamp
}

export enum MessageTypes {
    SubmitPost = "submit-post",
    CheckPriorSubmission = "check-prior-submission",
    CheckValidUrl = "check-valid-url",
    GetPostData = "get-post-data"
}