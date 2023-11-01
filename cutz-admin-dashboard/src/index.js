import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import CreateEvent from "views/events/CreateEvent";
import Notification from "views/Notification";
import Description from "views/Description";
import Loginpage from "views/Loginpage";
import EditProfile from "views/EditProfile";
import { Provider } from "react-redux";
import configureStore from "./redux/store";
import ForgotPasswordPage from "views/ForgotPassword";
import VerifyCodePage from "views/VerifyCode";
import ResetPasswordPage from "views/ResetPassword";

const store = configureStore();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/auth/*" element={<AuthLayout />} />
        <Route path="/createvent/*" element={<CreateEvent />} />
        <Route path="/notification/*" element={<Notification />} />
        <Route path="/desription/*" element={<Description />} />
        <Route path="/user-profile/*" element={<EditProfile />} />
        <Route path="*" element={<Navigate to="/admin/index" replace />} />
        <Route
          path="/Events/createvent"
          element={<Navigate to="/admin/Events/createvent" replace />}
        />
        <Route
          path="/Events/notification"
          element={<Navigate to="/admin/Events/notification" replace />}
        />
        <Route
          path="/Events/desription"
          element={<Navigate to="/admin/Events/desription" replace />}
        />
        <Route path="/" element={<Loginpage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-code/:email" element={<VerifyCodePage />} />
        <Route path="/reset-password/:email" element={<ResetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
