
export async function reportFraudulent(isFakeListing: boolean, notes: string) {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true});
    const activeUrl = tab.url;
    if (activeUrl?.includes('linkedin')) {
        const postId = activeUrl.match(/currentJobId=(.*?)&/);
        
    }
}