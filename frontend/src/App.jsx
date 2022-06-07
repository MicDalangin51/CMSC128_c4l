import { StudentDirectory } from "/src/pages";
import { Changelog } from "/src/pages";
import { Settings } from "/src/pages";
import { StudentRecord } from "/src/pages";
import { Login } from "/src/pages";
import { Register } from "/src/pages";
import { ProtectedRoute } from "/src/components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/logout"
            element={<ProtectedRoute component={Login} />}
          />
          <Route
            path="/"
            element={<ProtectedRoute component={StudentDirectory} />}
          />
          <Route
            path="/change-log"
            element={<ProtectedRoute component={Changelog} />}
          />
          <Route
            path="/settings"
            element={<ProtectedRoute component={Settings} />}
          />
          <Route
            path="/student/:studentNumber"
            element={<ProtectedRoute component={StudentRecord} />}
          />
          <Route
            path="/add-account"
            element={<ProtectedRoute component={Register} />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
