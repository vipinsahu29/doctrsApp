import Navbar from "./components/headerNavbar/navbar";
import AppointmentsList from "./pages/appointments/appointmentsList";

function App() {
  return (
    <div className="w-full h-full bg-blue text-red">
      <Navbar/>
      <AppointmentsList/>
          </div>
  );
}

export default App;
