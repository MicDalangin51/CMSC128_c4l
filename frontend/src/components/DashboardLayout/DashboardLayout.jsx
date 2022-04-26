import "./DashboardLayout.css";
import Navbar from "../Navbar";

const DashboardLayout = ({children}) => {
    return (<>
    <Navbar />
    <div className="content">{children}</div>
    </>
    );
}

export default DashboardLayout;