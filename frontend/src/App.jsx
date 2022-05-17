import { StudentDirectory } from "/src/pages";
import { Changelog } from "/src/pages";
import { Settings } from "/src/pages";
import { StudentRecord } from "/src/pages";
import { Login } from "/src/pages";
import { Register } from "/src/pages";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <div className="content">
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/logout" element={<Login />}></Route>
            <Route path="/" element={<StudentDirectory />}></Route>
            <Route path="/change-log" element={<Changelog />}></Route>
            <Route path="/settings" element={<Settings />}></Route>
            <Route path="/student-record" element={<StudentRecord />}></Route>
            <Route path="/add-account" element={<Register />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
