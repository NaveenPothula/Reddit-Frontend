import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../Store/auth";
import Header from "../Components/Header";
import axios from "axios";

const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true); // Add a loading state
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/verify", {
          withCredentials: true,
        });
        console.log(response);
        if (response.data.status === "success") {
          dispatch(setUser(response.data.user));
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false); // Mark loading as false once API call completes
      }
    };
    fetchUser();
  }, [dispatch]);

  // Show loading UI while checking authentication
  if (loading) return <div>Loading...</div>;

  // If authenticated, render the Outlet, otherwise redirect to login
  return isAuthenticated ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
