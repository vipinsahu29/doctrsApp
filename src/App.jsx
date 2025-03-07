import Navbar from "./components/headerNavbar/navbar";
import AppointmentsList from "./pages/appointments/appointmentsList";

import AppRoutes from "./routes/routes";
function App() {
  return (
    <div className="w-full h-full bg-blue text-red">
      <Navbar/>
      <AppRoutes/>
    </div>
  );
}

export default App;
