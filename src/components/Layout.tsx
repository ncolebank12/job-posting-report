import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
    return (
        <div>
            <Header title="Job Posting Report" />
            <Outlet />
        </div>
    );
}

export default Layout;