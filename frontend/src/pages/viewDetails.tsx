import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ExperienceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);

  

  useEffect(() => {
    axios.get(`http://localhost:5000/api/experiences/${id}`).then((res) => {
      setExperience(res.data);
    });
  }, [id]);

  if (!experience) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-gray-400">Loading...</div>
    </div>
  );

  const handleConfirm = () => {
    if (!selectedDate || !selectedSlot)
      return alert("Please select a date and time slot");
    alert(`Booking confirmed for ${experience.title}!`);
  };

  const subtotal = experience.price * quantity;
  const taxes = 59;
  const total = subtotal + taxes;

  // Get unique dates
  const uniqueDates = [...new Set(experience.slots.map((slot: any) => 
    new Date(slot.date).toDateString()
  ))];

  // Get time slots for selected date
  const availableTimeSlots = selectedDate
    ? experience.slots.filter((slot: any) => 
        new Date(slot.date).toDateString() === selectedDate
      )
    : [];

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">
      {/* Header with back button */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-3 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Experiences
        </button>
        <h1 className="text-2xl font-bold text-gray-900">{experience.title}</h1>
        <p className="text-sm text-gray-500 mt-1 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {experience.location}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image */}
          <img
            src={experience.image}
            alt={experience.title}
            className="w-full h-64 object-cover rounded-xl shadow-sm"
          />

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            {experience.description}
          </p>

          {/* Date Selection */}
          <div className="bg-white rounded-lg border p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Select Date</h3>
            <div className="flex gap-2 flex-wrap">
              {(uniqueDates as string[]).map((date: string, i: number) => (
                <button  
                    key={i}
                    onClick={() => {
                    setSelectedDate(date);
                    setSelectedSlot(null);
                    }}
                    className={`px-4 py-2 rounded-lg border font-medium text-sm transition-all ${
                    selectedDate === date
                        ? "bg-yellow-400 border-yellow-500"
                        : "border-gray-300 hover:border-yellow-400"
                    }`}
                >
                    {new Date(date).toDateString().slice(4, 10)}
                </button>
                ))}
            </div>
          </div>

          {/* Time Selection */}
          {selectedDate && (
            <div className="bg-white rounded-lg border p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Select Time Slot</h3>
              <div className="flex gap-2 flex-wrap">
                {availableTimeSlots.map((slot: any, i: number) => {
                  const isFull = slot.booked >= slot.capacity;
                  const spotsLeft = slot.capacity - slot.booked;
                  const isSelected = selectedSlot === slot;
                  
                  return (
                    <button
                      key={i}
                      onClick={() => !isFull && setSelectedSlot(slot)}
                      disabled={isFull}
                      className={`px-4 py-2 rounded-lg border font-medium text-sm transition-all ${
                        isSelected
                          ? "bg-yellow-400 border-yellow-500"
                          : isFull
                          ? "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
                          : "border-gray-300 hover:border-yellow-400"
                      }`}
                    >
                      <div>{slot.startTime} – {slot.endTime}</div>
                      {!isFull && (
                        <div className="text-xs text-gray-500 mt-0.5">
                          {spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} left
                        </div>
                      )}
                      {isFull && (
                        <div className="text-xs mt-0.5">Fully Booked</div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* About */}
          <div className="bg-gray-50 rounded-lg border p-4">
            <h3 className="font-semibold text-gray-900 mb-2">What's Included</h3>
            <p className="text-gray-600 text-sm">
              {experience.about || "Scenic routes, trained guides, and safety briefing."}
            </p>
          </div>
        </div>

        {/* Booking Card */}
        <div className="lg:col-span-1">
          <div className="bg-[#EFEFEF] rounded-xl border shadow-sm p-5 sticky top-6">
            {/* Price */}
            <div className="mb-4 pb-4 border-b">
              <div className="text-xs text-gray-500 mb-1">Starting from</div>
              <div className="text-2xl font-bold">
                ₹{experience.price}
                <span className="text-sm font-normal text-gray-500">/person</span>
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of People
              </label>
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2 border">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center rounded bg-white border hover:bg-gray-100 transition-colors"
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className="font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center rounded bg-white border hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Selected Slot Info */}
            {selectedDate && selectedSlot && (
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
                <div className="font-medium text-gray-900 mb-1">Selected Slot</div>
                <div className="text-gray-600">
                  {new Date(selectedDate).toDateString()}
                </div>
                <div className="text-gray-600">
                  {selectedSlot.startTime} – {selectedSlot.endTime}
                </div>
              </div>
            )}

            {/* Price Breakdown */}
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Taxes & Fees</span>
                <span>₹{taxes}</span>
              </div>
            </div>

            {/* Total */}
            <div className="pt-4 border-t mb-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold">₹{total}</span>
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirm}
              className="w-full bg-yellow-400 hover:bg-yellow-500 py-3 rounded-lg font-semibold transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={!selectedDate || !selectedSlot}
            >
              Confirm Booking
            </button>

            <p className="text-xs text-gray-500 text-center mt-3">
              You won't be charged yet
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}