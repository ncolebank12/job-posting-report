import Home from './components/Home';
import Comments from "./components/Comments";
import ReportForm from "./components/ReportForm";
import Layout from "./components/Layout";
import {
    MemoryRouter,
    Routes,
    Route,
} from "react-router-dom";

function App() {
    return (
        <MemoryRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="comments" element={<Comments />} />
                    <Route path="report" element={<ReportForm />} />
                </Route>
            </Routes>
        </MemoryRouter>
    );
}

export default App
