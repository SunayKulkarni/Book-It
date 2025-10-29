import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/mainPage";
import ExperienceDetails from "./pages/viewDetails"; 
import Checkout from "./pages/checkoutPage";
import Success from "./pages/success";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route path="/" element={<Home />} />
        <Route path="/experiences/:id" element={<ExperienceDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}
