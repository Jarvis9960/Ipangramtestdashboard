import { useEffect, useState } from "react";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import AddDepartmentForm from "../../Components/Forms/AddDepartmentForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDepartment = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigate = useNavigate();

  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      url: "http://localhost:5000/api/auth/check",
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.user.Role === "Employee") {
          navigate("/");
        }
      })
      .catch(() => {
        navigate("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (Loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 bg-white overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="">
          <h1 className="text-3xl m-5 w-full md:w-1/3   xl:w-2/3 lg:w-1/4 flex justify-center mx-auto">
            Add Department
          </h1>
          <AddDepartmentForm />
        </div>
      </div>
    </div>
  );
};

export default AddDepartment;
