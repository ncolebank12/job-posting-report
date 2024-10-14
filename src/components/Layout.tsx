import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
    return (
        <div style={{ width: "100vw", maxHeight: "200px" }}>
            <Header title="Job Posting Report" />
            <Outlet />
        </div>
    );
}

export default Layout;