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
    CheckPriorSubmission = "check-prior-submission",
    CheckValidUrl = "check-valid-url",
    GetPostData = "get-post-data"
}