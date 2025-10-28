import { useEffect, useState } from "react";
import axios from "axios";
import MainLogo from "../icons/mainLogo";
import { useNavigate } from "react-router-dom";

interface Experience {
  _id: string;
  title: string;
  location: string;
  description: string;
  price: number;
  image: string;
}


export default function Home() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/experiences");
        setExperiences(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error("Error fetching experiences:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  // Handle search filter
  useEffect(() => {
    const q = search.toLowerCase();
    const results = experiences.filter(
      (exp) =>
        exp.title.toLowerCase().includes(q) ||
        exp.location.toLowerCase().includes(q)
    );
    setFiltered(results);
  }, [search, experiences]);

  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        Loading experiences...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <MainLogo/>
          <h1 className="text-xl font-semibold">BookIt</h1>
        </div>
        <div className="flex items-center border rounded-md overflow-hidden">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search experiences"
            className="px-4 py-2 w-72 focus:outline-none"
          />
          <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-4 py-2 font-medium hover:opacity-90">
            Search
          </button>
        </div>
      </header>

      {/* Grid */}
  <main className="px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {filtered.length === 0 ? (
    <div className="col-span-full text-center text-gray-500">
      No experiences found.
    </div>
  ) : (
    filtered.map((exp) => (
      <div
        key={exp._id}
        className="bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-200 overflow-hidden flex flex-col"
      >
        <img
          src={exp.image}
          alt={exp.title}
          className="w-full h-44 object-cover"
        />
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start gap-2 mb-2">
            <h2 className="text-base font-semibold line-clamp-1">{exp.title}</h2>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700 whitespace-nowrap flex-shrink-0">
              {exp.location}
            </span>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-auto line-clamp-2">
            {exp.description}
          </p>
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
            <p className="font-semibold text-base">
              From ₹{exp.price}
            </p>
            <button
            onClick={() => navigate(`/experiences/${exp._id}`)}
            className="bg-yellow-400 hover:bg-yellow-500 text-sm font-medium px-4 py-2 rounded whitespace-nowrap">
              View Details
            </button>
          </div>
        </div>
      </div>
    ))
  )}
</main>
    </div>
  );
}
