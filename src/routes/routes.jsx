import { Routes, Route, Navigate } from "react-router-dom";
import routesConfig from "./routesConfig.json"; // Import the JSON config
import { lazy,Suspense,createElement } from "react";

const userRole = "user"; // Example: Change this dynamically based on authentication
const loadComponent = (componentName) => {
  const Components = {
    BookAppointment: lazy(() => import("../pages/appointments/bookAppointment")),
    EditAppointment: lazy(() => import("../pages/appointments/EditAppointment")),
    AppointmentsList: lazy(() => import("../pages/appointments/AppointmentsList")),
    AddDoctor: lazy(()=> import("../pages/doctors/addDoctor")),
    DoctrsList: lazy(()=>import("../pages/doctors/DoctrsList")),
    AddStaff : lazy(()=> import("../pages/staff/addStaff")),
    StaffList : lazy(()=> import("../pages/staff/staffList")),
  };
  return Components[componentName] || (() => <h2>Component Not Found</h2>);
};

export default function AppRoutes() {
  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Routes>
        {routesConfig.map(({ path, component, role }) =>
          role === "all" || role === userRole ? (
            <Route key={path} path={path} element={createElement(loadComponent(component))} />
          ) : null
        )}
        {/* Redirect unauthorized users */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
}
