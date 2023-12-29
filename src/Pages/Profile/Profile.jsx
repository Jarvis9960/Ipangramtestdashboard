import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
// import WelcomeBanner from "../../partials/dashboard/WelcomeBanner";
import { useState } from "react";
import Profiledetails from "../../Components/Profile/ProfileDetails";

const Profile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 bg-white overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Profiledetails />
      </div>
    </div>
  );
};

export default Profile;
