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
import { MessageTypes } from "./types";

function App() {
    const [isValidSite, setIsValidSite] = useState(false);

    useEffect(() => {
        chrome.runtime.sendMessage({ type: MessageTypes.CheckCanSubmit}, (response) => {
            console.log(response);
            setIsValidSite(response && response.isValid);
        });
        // const messageListener = (message: { type: string, disabled: boolean }) => {
        //     if (message.type === "submit-status") {
        //         setDisabled(message.disabled);
        //     }
        // }

        // chrome.runtime.onMessage.addListener(messageListener);

        // return () => {
        //     console.log('unmounted');
        //     chrome.runtime.onMessage.removeListener(messageListener);
        // }
    }, []);
    return (
        <MemoryRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="comments" element={<Comments />} />
                    <Route path="report" element={<ReportForm disabled={!isValidSite}/>} />
                </Route>
            </Routes>
        </MemoryRouter>
    );
}

export default App
