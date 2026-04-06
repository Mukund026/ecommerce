import { useState, useEffect, React } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  // Close any open navbar location modal on mount
  useEffect(() => {
    const navbarModal = document.querySelector('.sticky div[class*="fixed"][class*="z-"]');
    if (navbarModal) {
      navbarModal.style.display = 'none';
    }
    window.showLocationModal = false;
  }, []);

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const { data } = await API.post("/auth/register",{
        name,
        email,
        password
      });

      toast.success("Registration successful");

      navigate("/login");

    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (

    <div className="flex justify-center items-center h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-96 space-y-4"
      >

        <h2 className="text-2xl font-bold text-center">
          Register
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full rounded"
          onChange={(e)=>setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full rounded"
          onChange={(e)=>setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full rounded"
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        <button
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
        >
          Register
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>

      </form>

    </div>
  );
};

export default Register;