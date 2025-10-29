import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import MainLogo from "../icons/mainLogo";


export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { experience, date, slot, quantity, total, subtotal, taxes } = state || {};

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [promo, setPromo] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(false);
  const [agree, setAgree] = useState(false);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    // Redirect if no booking data
    if (!experience || !date || !slot) {
      navigate('/');
    }
  }, [experience, date, slot, navigate]);

  if (!experience) return null;

  const handleApplyPromo = async () => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/promo/validate`, {
      code: promo,
    });

    if (res.data.valid) {
      let discountValue = 0;

      if (res.data.type === "percent") {
        discountValue = (total * res.data.value) / 100;
      } else if (res.data.type === "flat") {
        discountValue = res.data.value;
      }

      setDiscount(discountValue);
      setAppliedPromo(true);
      alert("Promo applied successfully!");
    } else {
      alert("Invalid promo code");
    }
  } catch (err) {
    console.error(err);
    alert("Invalid promo code");
  }
};


  const handlePay = async () => {
  if (!name || !email || !agree) {
    alert("Please fill all required fields");
    return;
  }

  try {
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/bookings`, {
      experienceId: experience._id,
      slotId: slot._id,
      userEmail: email,
      userName: name,
      promoCode: appliedPromo ? promo : null,
    });

    if (res.status === 201) {
      navigate("/success", { state: { refId: res.data.refId } });
    }
  } catch (err) {
    console.error(err);
    alert("Error processing booking. Please try again.");
  }
};


  const finalTotal = total - discount;

  return (
    <div>
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <MainLogo/>
            <h1 className="text-xl font-semibold">BookIt</h1>
          </div>

          <div className="flex items-center border rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search experiences..."
              className="px-4 py-2 w-72 focus:outline-none"
            />
            <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-4 py-2 font-medium hover:opacity-90">
              Search
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Details
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left form - Takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-gray-200 border rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-6">Checkout</h2>

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      value={promo}
                      onChange={(e) => setPromo(e.target.value)}
                      disabled={appliedPromo}
                      className="border rounded-lg px-4 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:bg-gray-100"
                    />
                    <button
                      onClick={handleApplyPromo}
                      disabled={appliedPromo}
                      className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                    >
                      {appliedPromo ? "Applied" : "Apply"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2 p-4 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mt-1"
                />
                <span className="text-sm text-gray-700">
                  I agree to the <span className="text-blue-600 cursor-pointer">terms and conditions</span> and <span className="text-blue-600 cursor-pointer">safety policy</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right summary - Takes 1 column */}
          <div className="lg:col-span-1">
            <div className="bg-[#EFEFEF] border rounded-xl p-6 shadow-sm sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
              
              <div className="space-y-3 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-medium text-right">{experience.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium">{experience.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-medium">{new Date(date).toDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time</span>
                  <span className="font-medium">{slot.startTime} – {slot.endTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">People</span>
                  <span className="font-medium">{quantity}</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Taxes & Fees</span>
                    <span>₹{taxes}</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-green-600 font-medium">
                      <span>Promo Discount</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t pt-4 mb-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg">Total</span>
                  <span className="font-bold text-2xl">₹{finalTotal}</span>
                </div>
              </div>

              <button
                onClick={handlePay}
                disabled={!name || !email || !agree}
                className="w-full bg-yellow-400 hover:bg-yellow-500 py-3 rounded-lg font-semibold transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Pay & Confirm
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                Secure payment processing
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}