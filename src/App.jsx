import Navbar from "./components/headerNavbar/navbar";
import AppRoutes from "./routes/routes";
function App() {
  return (
    <div className="w-full h-full bg-blue text-red">
      <Navbar/>
      <AppRoutes/>
      <h1>Hello</h1>
    </div>
  );
}

export default App;
