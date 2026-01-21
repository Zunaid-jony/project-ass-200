import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { auth } from "../firebase/auth";


const PrivateRoute = () => {
  const location = useLocation();
  const [checking, setChecking] = React.useState(true);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setChecking(false);
    });
    return () => unsub();
  }, []);

  if (checking) return <div style={{ padding: 20 }}>Loading...</div>;

  // login না থাকলে login এ পাঠাবে, এবং পরে আগের path মনে রাখবে
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location.pathname }} />
  );
};

export default PrivateRoute;
