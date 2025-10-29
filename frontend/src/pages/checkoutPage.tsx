import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Checkout() {
  const { state } = useLocation(); 
  const { experience, date, time, quantity, total } = state || {};

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [promo, setPromo] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(false);
  const [agree, setAgree] = useState(false);
  const [discount, setDiscount] = useState(0);

  const handleApplyPromo = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/promo/validate", {
        code: promo,
      });
      if (res.data.valid) {
        setDiscount(res.data.discountAmount);
        setAppliedPromo(true);
        alert("Promo applied successfully!");
      } else {
        alert("Invalid promo code");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePay = () => {
    if (!name || !email || !agree) return alert("Please fill all required fields");
    alert(`Booking confirmed for ${experience.title}!`);
  };

  const finalTotal = total - discount;

  return (
    <div className="flex flex-col lg:flex-row justify-between p-10 gap-10">
      {/* Left form */}
      <div className="flex-1 border rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Checkout</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-md px-3 py-2 w-full"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-md px-3 py-2 w-full"
          />
        </div>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Promo code"
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
            className="border rounded-md px-3 py-2 flex-grow"
          />
          <button
            onClick={handleApplyPromo}
            className="bg-black text-white px-4 py-2 rounded-md"
          >
            Apply
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <span>I agree to the terms and safety policy</span>
        </div>
      </div>

      {/* Right summary */}
      <div className="lg:w-[320px] bg-gray-50 p-6 rounded-xl shadow-sm h-fit">
        <h3 className="text-lg font-semibold mb-3">Summary</h3>
        <div className="text-sm mb-2 flex justify-between">
          <span>Experience</span>
          <span>{experience?.title}</span>
        </div>
        <div className="text-sm mb-2 flex justify-between">
          <span>Date</span>
          <span>{date}</span>
        </div>
        <div className="text-sm mb-2 flex justify-between">
          <span>Time</span>
          <span>{time}</span>
        </div>
        <div className="text-sm mb-2 flex justify-between">
          <span>Qty</span>
          <span>{quantity}</span>
        </div>
        <div className="text-sm mb-2 flex justify-between">
          <span>Subtotal</span>
          <span>₹{total - 59}</span>
        </div>
        <div className="text-sm mb-2 flex justify-between">
          <span>Taxes</span>
          <span>₹59</span>
        </div>
        {appliedPromo && (
          <div className="text-sm mb-2 flex justify-between text-green-600">
            <span>Promo Applied</span>
            <span>-₹{discount}</span>
          </div>
        )}

        <div className="border-t border-gray-200 my-3"></div>
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>₹{finalTotal}</span>
        </div>

        <button
          onClick={handlePay}
          className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 py-2 rounded-md font-medium"
        >
          Pay and Confirm
        </button>
      </div>
    </div>
  );
}
