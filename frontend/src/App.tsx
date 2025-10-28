import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/mainPage";
import ExperienceDetails from "./pages/viewDetails"; // create this page

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route path="/" element={<Home />} />
        <Route path="/experiences/:id" element={<ExperienceDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
