export enum JobSite {
    LinkedIn = "LinkedIn",
    Indeed = "Indeed",
    Glassdoor = "Glassdoor"
}

export type JobPostData = {
    comments: string[],
    fakeListingCount: number,
    shadyCompanyCount: number,
    jobSite: string
}

export enum MessageTypes {
    SubmitPost = "submit-post",
    CheckCanSubmit = "check-can-submit",
    GetPostData = "get-post-data"
}