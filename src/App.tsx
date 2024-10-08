import Home from "./components/Home";
import Comments from "./components/Comments";
import ReportForm from "./components/ReportForm";
import Layout from "./components/Layout";
import {
    MemoryRouter,
    Routes,
    Route,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { JobPostData, MessageTypes } from "./types";

function App() {
    const [isValidSite, setIsValidSite] = useState(false);
    const [postData, setPostData] = useState<JobPostData>();
    useEffect(() => {
        chrome.runtime.sendMessage({ type: MessageTypes.CheckValidUrl}, 
            (response) => {
            console.log(response);
            setIsValidSite(response && response.isValid);
        });

        chrome.runtime.sendMessage({ type: MessageTypes.GetPostData}, 
            (response) => {
                if (response) {
                    setPostData(response.postData);
                }
        })

    }, []);
    return (
        <MemoryRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home postData={postData}/>} />
                    <Route path="comments" element={<Comments postData={postData}/>} />
                    <Route path="report" element={<ReportForm disabled={!isValidSite}/>} />
                </Route>
            </Routes>
        </MemoryRouter>
    );
}

export default App
