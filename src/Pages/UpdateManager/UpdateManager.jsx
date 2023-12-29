import { useEffect, useState } from "react";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import ManagerUpdateForm from "../../Components/UpdateForm/ManagerUpdateForm";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const UpdateManager = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const [managerData, setManagerData] = useState("");

  const { id } = useParams();

  const singleFetch = async (id) => {
    try {
      const response = await axios({
        method: "GET",
        url: `http://localhost:5000/v1/api/getsinglemanager?managerId=${id}`,
        withCredentials: true,
      });

      if (response) {
        setManagerData(response.data.Manager);
      }
    } catch (error) {
      toast.error("Failed to fetch single data: " + error?.response?.data?.message);
    }
  };


  useEffect(() => {
    singleFetch(id);
  }, []);

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
            Add Manager
          </h1>
          <ManagerUpdateForm managerData={managerData} />
        </div>
      </div>
    </div>
  );
};

export default UpdateManager;
