import { Routes, Route, Navigate } from "react-router-dom";
import routesConfig from "./routesConfig.json"; // Import the JSON config
import { lazy, Suspense, useEffect } from "react";
import LoginRegister from "../pages/LoginRegister/LoginRegister";
import Navbar from "../components/headerNavbar/Navbar"; // Corrected path
import useAuthStore from "../store/authStore";
import { supabase } from "../supabaseClient";
const loadComponent = (componentName) => {
  const Components = {
    BookAppointment: lazy(() =>
      import("../pages/appointments/bookAppointment")
    ),
    EditAppointment: lazy(() =>
      import("../pages/appointments/EditAppointment")
    ),
    AppointmentsList: lazy(() =>
      import("../pages/appointments/AppointmentsList")
    ),
    AddDoctor: lazy(() => import("../pages/doctors/addDoctor")),
    DoctrsList: lazy(() => import("../pages/doctors/DoctrsList")),
    AddStaff: lazy(() => import("../pages/staff/AddStaff")),
    StaffList: lazy(() => import("../pages/staff/staffList")),
    CheckIn: lazy(() => import("../pages/checkin/CheckIn")),
    PatientList: lazy(() => import("../pages/patients/PatientsList")),
    AddPatients: lazy(() => import("../pages/patients/AddPatients")),
    Dashboard: lazy(() => import("../pages/doctrsDashboard/Dashboard")),
    Expences: lazy(() => import("../pages/salaryExpences/Expences")),
    Salary: lazy(() => import("../pages/salaryExpences/Salary")),
    LoginRegister: lazy(() => import("../pages/LoginRegister/LoginRegister")),
    Registration: lazy(() => import("../pages/registration/Registration") )
  };
  return Components[componentName] || (() => <h2>Component Not Found</h2>);
};

const PrivateRoute = ({ children }) => {
  const { user, fetchSession, session } = useAuthStore();
  const setUserSession = useAuthStore((state) => state.setSession);
  useEffect(() => {
    fetchSession(); // Load session on mount
    const { data: listener } = supabase.auth.onAuthStateChange(
      (session) => {
        if (session) {
          setUserSession(session);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);
  if (!user && !session?.access_token) {
    return <Navigate to="/loginRegister" replace />;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default function AppRoutes() {
  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Routes>
        <Route path="/loginRegister" element={<LoginRegister />} />
        {routesConfig.map(({ path, component }) => {
          const Component = loadComponent(component); // Lazy component function
          return (
            <Route
              key={path}
              path={path}
              element={
                <PrivateRoute>
                  <Component />
                </PrivateRoute>
              }
            />
          );
        })}
        <Route path="*" element={<Navigate to="/loginRegister" replace />} />
      </Routes>
    </Suspense>
  );
}
