import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { googleLoginAsync } from "../../Redux/features/userSlice"; 
import { useEffect } from "react";
import GoogleIcon from "/assets/svg/google2.svg";
import { FaApple } from "react-icons/fa";

const OauthOptions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user); 

  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (response) => {
      console.log("Google OAuth Response:", response); // Debugging

      try {
        const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code: response.code,
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
            redirect_uri: "postmessage",
            grant_type: "authorization_code",
          }),
        });

        const tokenData = await tokenRes.json();
        const idToken = tokenData.id_token;
        await dispatch(googleLoginAsync(idToken));
      } catch (error) {
        console.error("Google login failed:", error);
      }
    },
    onError: () => {
      console.error("Google login failed");
    },
  });


  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard"); 
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="w-full flex items-center gap-4 py-10">
      <div className="flex-1 border-t border-gray-300"></div>
      <button
        onClick={() => login()}
        className="w-12 h-12 flex items-center justify-center rounded-2xl
                  bg-white border-2 border-gray-400 hover:bg-gray-50 active:bg-gray-100
                  disabled:opacity-70 disabled:cursor-not-allowed
                  transition-colors duration-200"
      >
        <img src={GoogleIcon} alt="Google" />
      </button>
      <button className="w-12 h-12 flex items-center justify-center rounded-2xl
                  bg-white border-2 border-gray-400 hover:bg-gray-50 active:bg-gray-100
                  disabled:opacity-70 disabled:cursor-not-allowed
                  transition-colors duration-200"
      >
        <FaApple className="text-lg text-black" />
      </button>
      <div className="flex-1 border-t border-gray-300"></div>
    </div>
  );
};

export default OauthOptions;
