import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import JobListing from "./pages/JobListing";
import JobDetails from "./pages/JobDetails";
import EmployerDashboard from "./pages/EmployerDashboard";
import CreateJob from "./pages/CreateJob";
import EditJob from "./pages/EditJob";
import Applications from "./pages/Applications";
import MyApplications from "./pages/MyApplications";






import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";
import Navbar from "./components/Navbar";


function App() {
  return (
    <BrowserRouter>
          <Navbar />

      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<JobListing />} />
        <Route path="/jobs/:id" element={<JobDetails />} />



        {/* Job Seeker Dashboard */}
        {/* <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <RoleRoute role="jobseeker">
                <Dashboard />
              </RoleRoute>
            </ProtectedRoute>
          }
        /> */}
        
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <RoleRoute role="jobseeker">
        <MyApplications />
      </RoleRoute>
    </ProtectedRoute>
  }
/>

        {/* Employer Dashboard */}
        <Route
          path="/employer/dashboard"
          element={
            <ProtectedRoute>
              <RoleRoute role="employer">
                <EmployerDashboard />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
  path="/employer/create-job"
  element={
    <ProtectedRoute>
      <RoleRoute role="employer">
        <CreateJob />
      </RoleRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/employer/edit-job/:id"
  element={
    <ProtectedRoute>
      <RoleRoute role="employer">
        <EditJob />
      </RoleRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/employer/applications/:jobId"
  element={
    <ProtectedRoute>
      <RoleRoute role="employer">
        <Applications />
      </RoleRoute>
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
