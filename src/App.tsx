import { Routes, Route } from "react-router-dom";

import Dashboard from "./Dashboard";
import Login from "./Login";
import Signup from "./Signup";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;