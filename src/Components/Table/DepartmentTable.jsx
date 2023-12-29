import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillEye } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import ReactPaginate from "react-paginate";

import "./DepartmentTableCSS/DepartmentTable.css";
import { useNavigate } from "react-router-dom";
import { MdFolderDelete } from "react-icons/md";

const DepartmentTable = () => {
  const navigate = useNavigate();
  const [departmentData, setDepartmentData] = useState([]);
  const [sort, setSort] = useState("asending");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [view, setView] = useState(false);
  const [popupData, setPopupData] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:5000/v1/api/getdepartment?sort=${sort}&page=${page}`,
      withCredentials: true,
    })
      .then((res) => {
        setDepartmentData(res.data.savedDepartment);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        toast.error("Failed to fetch: " + err);
      });
  }, [page, sort, loading]);

  const handlePageClick = (data) => {
    setPage(data.selected + 1);
  };

  const singleFetch = async (id) => {
    try {
      const response = await axios({
        method: "GET",
        url: `http://localhost:5000/v1/api/getsingledepartment?departmentId=${id}`,
        withCredentials: true,
      });

      if (response) {
        setPopupData(response.data.department);
        popupData ? setView(true) : setView(false);
      }
    } catch (error) {
      toast.error("Failed to fetch single data: " + error);
    }
  };

  const apiDelete = async (id) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `http://localhost:5000/v1/api/deletedepartment?departmentId=${id}`,
        withCredentials: true,
      });

      return response;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    setLoading(true);

    toast
      .promise(
        apiDelete(id),
        {
          loading: "Deleting",
          success: "Manager deleted",
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
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="flex justify-end my-5">
        <div className=" w-25 md:w-1/4 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-state"
          >
            Sort
          </label>
          <div className="relative">
            <select
              name=""
              className="block appearance-none w-25 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              id="grid-state"
              onChange={(e) => {
                setSort(e.target.value);
              }}
            >
              <option value="asending">Asending</option>
              <option value="decending">Decending</option>
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

      <table className="table-fixed w-full h-32 overflow-y-auto bg-white">
        <thead>
          <tr>
            <th className="w-1/6 px-4 py-2">#</th>
            <th className="w-1/4 px-4 py-2">Department Name</th>
          </tr>
        </thead>
        <tbody>
          {/* {departmentData} */}

          {departmentData &&
            departmentData.map((curr, index) => (
              <tr key={curr._id}>
                <td className="border px-1 py-2 text-center">{index + 1}</td>
                <td className="border px-1 py-2 text-center sm:overflow-hidden xs:overflow-hidden xxs:overflow-hidden">
                  {curr.DepartmentName}{" "}
                  {/* Replace with the actual property name */}
                </td>
                <td className="border px-1 py-2 text-center sm:overflow-hidden xs:overflow-hidden xxs:overflow-hidden">
                  <button
                    className="bg-blue-500 mx-2 p-2 text-white"
                    onClick={() => {
                      singleFetch(curr._id);
                      setView(true);
                    }}
                  >
                    <AiFillEye />
                  </button>
                  <button
                    className="bg-green-500 p-2 text-white"
                    onClick={() => {
                      navigate(`/udpatedepartment/${curr._id}`);
                    }}
                  >
                    <FaUserEdit />
                  </button>
                  <button
                    className="bg-gray-500 mx-2 p-2 text-white"
                    onClick={(e) => {
                      handleDelete(e, curr._id);
                    }}
                  >
                    <MdFolderDelete />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-5">
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          activeClassName="active"
          previousLabel="Previous"
          nextLabel="Next"
          breakLabel="..."
          breakClassName="break-me"
          pageClassName="pagination-item"
          previousClassName="pagination-item"
          nextClassName="pagination-item"
          disabledClassName="pagination-disabled"
        />
      </div>

      {view ? (
        <>
          <div className="bg-gradient-to-br from-violet-600 via-violet-400 to-gray-600 h-11/12 w-11/12 z-20 absolute top-48 left-10 rounded-2xl">
            <div className="pt-8 pl-10 h-fit w-full text-white">
              <div className="backdrop-blur-md grid gap-24 grid-cols-2">
                <div className="grid gap-4 grid-cols-2">
                  <div>
                    <h3 className="font-bold text-2xl uppercase">
                      Department Name:
                    </h3>
                    <h3 className="font-bold text-2xl uppercase">
                      {popupData.DepartmentName}
                    </h3>
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl uppercase">
                      Total Employee:
                    </h3>
                    <h3 className="font-bold text-2xl uppercase">
                      {popupData.totalEmployee}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="backdrop-blur-md extra-information-div mt-16 pb-4 grid grid-rows-2 grid-cols-2">
                <div>
                  <button className="rounded-full bg-cyan-300 p-3 text-white font-semibold">
                    Update Profile
                  </button>

                  <button
                    onClick={() => {
                      setView(false);
                    }}
                    className="rounded-full bg-cyan-300 p-3 mx-2 text-white font-semibold"
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default DepartmentTable;
