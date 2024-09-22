import Home from './components/Home';
import Comments from "./components/Comments";
import ReportForm from "./components/ReportForm";
import Layout from "./components/Layout";
import {
    MemoryRouter,
    Routes,
    Route,
} from "react-router-dom";
import { useState, useEffect } from 'react';

function App() {
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        const messageListener = (message: { type: string, disabled: boolean }) => {
            if (message.type === 'submit-status') {
                setDisabled(message.disabled);
            }
        }

        chrome.runtime.onMessage.addListener(messageListener);

        return () => {
            chrome.runtime.onMessage.removeListener(messageListener);
        }
    }, []);
    return (
        <MemoryRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="comments" element={<Comments />} />
                    <Route path="report" element={<ReportForm disabled={disabled}/>} />
                </Route>
            </Routes>
        </MemoryRouter>
    );
}

export default App
