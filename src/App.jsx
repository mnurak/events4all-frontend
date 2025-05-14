import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Events from "./pages/Events";
import Register from "./pages/Register";
import About from "./pages/About";
import Registered from "./pages/Registered";
import StudentCorrection from "./pages/edit/StudentCorrection";
import CollegeCorrection from "./pages/edit/CollegeCorrection";
import GetEventRegistration from "./pages/getRegistered/GetEventRegistration";

function App() {
  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/auth" element={<Auth />} />
          <Route exact path="/events" element={<Events />} />
          <Route exact path="/registered" element={<Registered />} />
          <Route exact path="/registered/student" element={<GetEventRegistration />} />
          <Route exact path="/event/register" element={<Register />} />
          <Route exact path="/correction/student" element={<StudentCorrection />} />
          <Route exact path="/correction/college" element={<CollegeCorrection />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
