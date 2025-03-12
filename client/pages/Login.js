import { useState } from "react";
import { useRouter } from "next/router";  
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); 

    fetch('http://127.0.0.1:8000/login/login_user/', {  
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(response => response.ok ? response.json() : Promise.reject("Failed to login"))
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          login(data.user, data.access, data.refresh); 
          router.push(data.user.is_admin ? '/admin' : '/');
        }
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  };
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-black">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required 
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-blue-500" />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-black">Password</label>
          <input type="password" name="password"
           value={formData.password} onChange={handleChange} required 
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-blue-500" />
        </div>

        {error && <p className="text-red-600 text-xs mb-4">{error}</p>}

        <button type="submit" className="w-full bg-orange-950 text-white py-2 rounded-md" disabled={loading}>
          {loading ? "Logging In..." : "Log In"}
        </button>
        <p>Don't have an account? <Link href="/Signup" className="underline text-orange-500">Create one</Link></p>
      </form>
    </div>
  );
};

export default Login;
