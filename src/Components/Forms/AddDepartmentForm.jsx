import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddDepartmentForm = () => {
  const navigate = useNavigate();
  const [department, setDepartment] = useState("");

  const apiCreateDepartment = async () => {
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:5000/v1/api/createdepartment",
        data: {
          departmentName: department,
        },
        withCredentials: true,
      });

      return response;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    toast
      .promise(
        apiCreateDepartment(),
        {
          loading: "creating department",
          success: "Department created.",
          error: (error) => {
            toast.error(`Error creating department: ${error}`);
          },
        },
        {
          style: {
            minWidth: "250px",
            backgroundColor: "black",
            color: "white",
          },
          success: {
            duration: 5000,
            icon: "🚀",
          },
        }
      )
      .then(() => {
        setTimeout(() => {
          navigate("/department");
        }, 1000);
      });
  };
  return (
    <div>
      <form className="w-full md:w-1/3   xl:w-2/3 lg:w-1/4 mt-12 mx-auto">
        <div className="flex flex-wrap mx-3 mb-6 justify-center items-center ">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Department Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder=""
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="flex justify-center  mt-5">
          <input
            type="submit"
            className="rounded-none bg-blue-600 text-white p-3 cursor-pointer"
            onClick={(e) => {
              handleSubmit(e);
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default AddDepartmentForm;
