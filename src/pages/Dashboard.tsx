import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout, googleLoginAsync } from "../Redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { fetchUserFromToken } from "../Redux/features/userSlice";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const NAV_ITEMS = [
  { path: "/login", label: "Login" },
  { path: "/signup", label: "Signup" },
  { path: "/priceselection", label: "Price Selection" },
  { path: "/paymentmethod", label: "Payment Method" },
  { path: "/paymentdetail", label: "Payment Detail" },
  { path: "/cat-assistant", label: "Chatroom" },
  { path: "/cat-profile", label: "Profile" },
  { path: "/progress", label: "Go to Progress" },
] as const;

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { email, first_name, picture, isAuthenticated } = useAppSelector(
    (state) => state.user
  );

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && !isAuthenticated) {
      fetchUserFromToken(token)
        .then((user) => {
          if (user) {
            dispatch(googleLoginAsync(token));
          } else {
            dispatch(logout());
            navigate("/login");
          }
        })
        .catch(() => {
          dispatch(logout());
          navigate("/login");
        });
    }
  }, [dispatch, isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Layout>
      <nav className="w-full min-h-[700px] flex flex-col items-center justify-center gap-4">
        {isAuthenticated ? (
          <div className="flex flex-col items-center mb-6">
            <img src={picture} alt="User Avatar" className="w-20 h-20 rounded-full" />
            <h2 className="text-xl mt-2">{first_name}</h2>
            <p className="text-gray-600">{email}</p>
          </div>
        ) : (
          <p>Loading user...</p>
        )}

        {NAV_ITEMS.map(({ path, label }) => (
          <Link key={path} to={path} className="text-xl hover:text-primary transition-colors">
            {label}
          </Link>
        ))}

        <button onClick={handleLogout} className="text-xl hover:text-red-500 transition-colors cursor-pointer">
          Logout
        </button>
      </nav>
    </Layout>
  );
};

export default Dashboard;
