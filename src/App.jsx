import Navbar from "./components/headerNavbar/navbar";
import AppRoutes from "./routes/routes";
function App() {
  return (
    <div className="w-full h-full bg-blue text-red relative">
      <Navbar/>
      <AppRoutes/>
    </div>
  );
}

export default App;
