// import React from "react";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Profiledetails = () => {
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:5000/v1/api/getprofile",
      withCredentials: true,
    })
      .then((res) => {
        setUserProfile(res.data.profile);
      })
      .catch((err) => {
        toast.error("Failed to fetch: " + err?.response?.data?.message);
      });
  }, []);

  return (
    <>
      <div className="grid grid-rows-2 pt-8 pl-10 h-full sm:h-full xs:h-full bg-gradient-to-br from-cyan-300 via-cyan-200 to-gray-200">
        <div className="backdrop-blur-md grid gap-24 grid-cols-2">
          <div className="grid gap-4 grid-cols-2  justify-between">
            <div>
              <h3 className="font-bold text-2xl uppercase  sm:text-base xs:text-sm">
                Name: {userProfile.FirstName} {userProfile.LastName}
              </h3>
              <p className="font-bold uppercase sm:text-base xs:text-sm">
                Role: {userProfile.Role}
              </p>
            </div>
          </div>
          <div className=" pl-3 h-28 sm:text-base xs:text-sm">
            <p className="font-semibold">Email: {userProfile.Email}</p>
          </div>
        </div>
        <div className="backdrop-blur-md extra-information-div   grid grid-rows-2 grid-cols-2">
          <p className="font-semibold">Location: {userProfile.Location} </p>
          <p className="font-semibold">Gender: {userProfile.Gender} </p>
          <p className="font-semibold">
            Mobile Number: {userProfile.MobileNumber}{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default Profiledetails;
