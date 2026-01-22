import { PrimeReactProvider } from "primereact/api";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import { DashboardHome } from "./pages/DashboardHome";
import { Home } from "./pages/Home";
import ProductEntry from "./pages/ProductEntry";
import TeamEntryPage from "./pages/TeamEntryPage";
import PrivateRoute from "./routes/PrivateRoute";
import Login from "./pages/Login";
import ProfilePage from "./pages/ProfilePage";
import { Category } from "./pages/Category";
import BlogCaegory from "./pages/BlogCaegory";
import BlogEntryPage from "./pages/BlogEntry";
import Services from "./pages/Services";

function App() {
  return (
    <PrimeReactProvider value={{ ripple: true }}>
      <div className="font-sans">
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />

          {/* Private */}
          <Route element={<PrivateRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/services" element={<Services />} />
         
              <Route path="/projects" element={<ProductEntry />} />
              <Route path="/team" element={<TeamEntryPage />} />
             
              <Route path="/profile" element={<ProfilePage />} />
              
             
            </Route>
          </Route>

          {/* fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </PrimeReactProvider>
  );
}

export default App;
