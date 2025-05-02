import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import College from "./pages/College";
import Events from "./pages/Events";
import Register from "./pages/Register";
import About from "./pages/About";

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
          <Route exact path="/college" element={<College />} />
          <Route exact path="/event/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
