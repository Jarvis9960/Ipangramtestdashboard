/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EmployeeUpdateForm = ({ employeeData }) => {
  const navigate = useNavigate();
 
  const [firstName, setFirstName] = useState();
  const [middleName, setMiddleName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [mobileNumber, setMobileNumber] = useState();
  const [gender, setGender] = useState();
  const [location, setLocation] = useState();
  const [departmentData, setDepartmentData] = useState();
  const [departmentId, setDepartmentId] = useState();

  useEffect(() => {
    if (employeeData) {
      setFirstName(employeeData.FirstName);
      setMiddleName(employeeData.MiddleName);
      setLastName(employeeData.LastName);
      setEmail(employeeData.Email);
      setMobileNumber(employeeData.MobileNumber);
      setGender(employeeData.Gender);
      setLocation(employeeData.Location);
      setDepartmentId(employeeData.Department?._id);
    }
  }, [employeeData]);



  const apiUpdateEmployee = async () => {
    try {
      const response = await axios({
        method: "PUT",
        url: "http://localhost:5000/v1/api/updateemployee",
        data: {
          employeeId: employeeData._id,
          departmentId: departmentId,
          firstName: firstName,
          middleName: middleName,
          lastName: lastName,
          email: email,
          mobileNumber: mobileNumber,
          gender: gender,
          location: location,
        },
        withCredentials: true,
      });

      return response;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    toast
      .promise(
        apiUpdateEmployee(),
        {
          loading: "udpating employee",
          success: "employee udpated.",
          error: (error) => {
            toast.error(`Error updating employee: ${error}`);
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
          navigate("/allemployees");
        }, 1000);
      });
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:5000/v1/api/getdepartmentdropdowndata`,
      withCredentials: true,
    })
      .then((res) => {
        setDepartmentData(res.data.departments);
      })
      .catch((err) => {
        toast.error("Failed to fetch department: " + err?.response?.data?.message);
      });
  }, []);

  return (
    <div>
      <form className="w-full md:w-1/3   xl:w-2/3 lg:w-1/4 mt-12 mx-auto">
        <Toaster />
        <div className="flex flex-wrap mx-3 mb-6 justify-center items-center ">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              First Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder=""
              defaultValue={employeeData.FirstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Middle Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder=""
              defaultValue={employeeData?.MiddleName}
              onChange={(e) => {
                setMiddleName(e.target.value);
              }}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Last Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder=""
              defaultValue={employeeData.LastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex flex-wrap mx-3 mb-6 justify-center items-center">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Email
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="email"
              placeholder=""
              defaultValue={employeeData.Email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Mobile Number
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="number"
              placeholder=""
              defaultValue={employeeData.MobileNumber}
              onChange={(e) => {
                setMobileNumber(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex flex-wrap mx-3 mb-6 justify-center items-center">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              Gender
            </label>
            <div className="relative">
              <select
                name=""
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                id="grid-state"
                value={employeeData.Gender}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                <option value="Select Gender">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap mx-3 mb-6 justify-center items-center">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              Deparment
            </label>
            <div className="relative">
              <select
                name=""
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline overflow-auto"
                id="grid-state"
                value={employeeData.Department?._id}
                onChange={(e) => {
                  setDepartmentId(e.target.value);
                }}
              >
                <option value="Select Gender">Select Department</option>
                {departmentData &&
                  departmentData.map((curr) => (
                    <option key={curr._id} value={curr._id}>
                      {curr.DepartmentName}
                    </option>
                  ))}
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-city"
            >
              Location
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="text"
              placeholder=""
              defaultValue={employeeData.Location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex justify-center  mt-5">
          <input
            type="submit"
            className="rounded-none bg-blue-600 text-white p-3 mb-5 cursor-pointer"
            onClick={(e) => {
              handleSubmit(e);
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default EmployeeUpdateForm;
