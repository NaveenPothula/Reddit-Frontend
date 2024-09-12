import { Outlet, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { setUser } from "../Store/auth";

const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log(isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/verify", {
          withCredentials: true,
        });
        if (response.data.status == "success") {
          dispatch(setUser(response.data.user));
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchUser();
  }, []);

  return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} replace />;
};

export default ProtectedRoute;
