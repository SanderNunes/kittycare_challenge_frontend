import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import ReactPixel from 'react-facebook-pixel';
import { useAppDispatch, useAppSelector } from "./Redux/hooks";
import { fetchUserFromToken, googleLoginAsync } from "./Redux/features/userSlice";
import { isAuthenticated } from "./utils/auth";
import { GoogleOAuthProvider } from '@react-oauth/google';

// Import Pages
import Dashboard from "./pages/Dashboard.tsx";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Progress from "./pages/Progress.tsx";
import Chatroom from "./pages/Chatroom";
import PriceSelection from "./pages/PriceSelection.tsx";
import Profile from "./pages/Profile.tsx";
import EmailSentSuccess from "./pages/EmailSentSuccess.tsx";
import SignUpConfirm from "./pages/SignUpConfirm.tsx";
import PageHead from './components/PageHead';
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import LoadingOverlay from './components/LoadingOverlay/LoadingOverlay';

// Routes
const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  SENT_MAIL: '/sent-mail',
  CONFIRM_SIGNUP: '/confirm-signup',
  DASHBOARD: '/dashboard',
  PRICE_SELECTION: '/priceselection',
  PROGRESS: '/progress',
  CAT_ASSISTANT: '/cat-assistant',
  CAT_PROFILE: '/cat-profile',
  NOT_FOUND: '/*',
};

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const ProtectedRouteWrapper: React.FC<{ children: React.ReactNode; }> = ({ children }) => (
  <ProtectedRoute>{children}</ProtectedRoute>
);

const AppContent = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const location = useLocation();
  const isUserAuthenticated = useAppSelector((state) => state.user.isAuthenticated);


useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    fetchUserFromToken(token).then((user) => {
      if (user) {
        dispatch(googleLoginAsync(token)); 
      } else {
        console.warn("User not found, logging out.");
        //dispatch(logout());
      }
    });
  }
}, [dispatch]);


  const routes = [
    { path: ROUTES.HOME, element: isUserAuthenticated ? <Navigate to={ROUTES.DASHBOARD} /> : <Navigate to={ROUTES.LOGIN} /> },
    { path: ROUTES.LOGIN, element: isUserAuthenticated ? <Navigate to={ROUTES.DASHBOARD} /> : <Login /> },
    { path: ROUTES.SIGNUP, element: isUserAuthenticated ? <Navigate to={ROUTES.DASHBOARD} /> : <Signup /> },
    { path: ROUTES.SENT_MAIL, element: <EmailSentSuccess /> },
    { path: ROUTES.CONFIRM_SIGNUP, element: <SignUpConfirm /> },
    { path: ROUTES.PROGRESS, element: <Progress /> },
    { path: ROUTES.DASHBOARD, element: <ProtectedRouteWrapper><Dashboard /></ProtectedRouteWrapper> },
    { path: ROUTES.PRICE_SELECTION, element: <ProtectedRouteWrapper><PriceSelection /></ProtectedRouteWrapper> },
    { path: ROUTES.CAT_ASSISTANT, element: <ProtectedRouteWrapper><Chatroom /></ProtectedRouteWrapper> },
    { path: ROUTES.CAT_PROFILE, element: <ProtectedRouteWrapper><Profile /></ProtectedRouteWrapper> },
    { path: ROUTES.NOT_FOUND, element: <ProtectedRouteWrapper><div>Not found</div></ProtectedRouteWrapper> },
  ];

  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
};

const App = () => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <HelmetProvider>
        <PageHead />
        <LoadingOverlay />
        <Router>
          <AppContent />
        </Router>

        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P9FML3PS"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
      </HelmetProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
