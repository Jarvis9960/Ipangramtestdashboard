import "./App.css";
import Login from "./Pages/Login/Login.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./css/style.css";
import AddEmployee from "./Pages/AddEmployee/AddEmployee.jsx";
import Profile from "./Pages/Profile/Profile.jsx";
import AllEmployees from "./Pages/AllEmployees/AllEmployees.jsx";
import AddDepartment from "./Pages/AddDepartment/AddDepartment.jsx";
import Department from "./Pages/Department/Department.jsx";
import AddManager from "./Pages/AddManager/AddManager.jsx";
import AllManager from "./Pages/AllManager/AllManager.jsx";
import DepartmentUpdate from "./Pages/DepartmentUpdate/DepartmentUpdate.jsx";
import UpdateManager from "./Pages/UpdateManager/UpdateManager.jsx";
import EmployeeUpdate from "./Pages/EmployeeUpdate/EmployeeUpdate.jsx";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/", element: <Profile /> },
  { path: "/addemployee", element: <AddEmployee /> },
  { path: "/allemployees", element: <AllEmployees /> },
  { path: "/adddepartment", element: <AddDepartment /> },
  { path: "/department", element: <Department /> },
  { path: "/addmanager", element: <AddManager /> },
  { path: "/allmanager", element: <AllManager /> },
  { path: "/udpatedepartment/:id", element: <DepartmentUpdate /> },
  { path: "/updatemanager/:id", element: <UpdateManager /> },
  { path: "/udpateemployee/:id", element: <EmployeeUpdate /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
