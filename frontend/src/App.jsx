import { StudentDirectory } from "/src/pages";
import { Changelog } from "/src/pages";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';

const App = () => {
  return (
    <>
    <Router>
    <div className="content">
          <Routes>
            <Route path="/" element={<StudentDirectory/>}></Route>
            <Route path="/change-log" element={<Changelog/>}></Route>
          </Routes>
    </div>

    </Router>
    </>
  );
};

export default App;
