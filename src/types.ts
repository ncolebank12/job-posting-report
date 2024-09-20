export enum JobSite {
    LinkedIn,
    Indeed,
    Glassdoor
}

export type JobPostData = {
    comments: string[],
    fakeListingCount: number,
    shadyCompanyCount: number,
    company: string
}