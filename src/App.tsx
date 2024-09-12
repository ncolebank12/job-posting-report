import ReportForm from './components/ReportForm';
import Home from './components/Home';
import Comments from "./components/Comments";
import {
    MemoryRouter,
    Routes,
    Route,
} from "react-router-dom";

function App() {
    return (
        <MemoryRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/comments" element={<Comments />} />
                <Route path="/report" element={<ReportForm />} />
            </Routes>
        </MemoryRouter>
    );
}

export default App
