import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Applications from "./Applications.jsx";
import ApplicationForm from "./ApplicationForm.jsx";
import Certificates from "./Certificates.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Internship Applications */}
        <Route
          path="/applications"
          element={<Applications />}
        />

        {/* New Application Form */}
        <Route
          path="/applications/new"
          element={<ApplicationForm />}
        />

        {/* Certificates */}
        <Route
          path="/certificates"
          element={<Certificates />}
        />

        {/* Default page */}
        <Route
          path="/"
          element={<Navigate to="/applications" replace />}
        />

        {/* Invalid URL */}
        <Route
          path="*"
          element={<Navigate to="/applications" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;