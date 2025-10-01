"use client";

import { useState } from "react";
import Image from "next/image";

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    link: "",
    github: "",
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loginForm.username === "younesbenali" && loginForm.password === "younsbenali1234") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials!");
      setLoginForm({ username: "", password: "" });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPEG, PNG, GIF, etc.)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'projects_upload'); // Create this in Cloudinary
      
      const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.secure_url) {
        setForm({ ...form, image: result.secure_url });
        alert('Image uploaded successfully to Cloudinary!');
      } else {
        throw new Error(result.error?.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert(`Error uploading image: ${error instanceof Error ? error.message : 'Please try again'}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.image) {
      alert("Please upload an image first!");
      return;
    }

    if (!form.title || !form.description) {
      alert("Please fill in title and description!");
      return;
    }

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("Project added successfully!");
        setForm({ title: "", description: "", image: "", link: "", github: "" });
      } else {
        const error = await res.json();
        throw new Error(error.error || "Error adding project");
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Failed to add project'}`);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginForm({ username: "", password: "" });
  };

  if (!isAuthenticated) {
    return (
      <section className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="bg-slate-900 p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
        >
          <h1 className="text-3xl font-bold text-center">Admin Login</h1>
          
          <div className="space-y-4">
            <input 
              name="username" 
              value={loginForm.username} 
              onChange={handleLoginChange} 
              placeholder="Username"
              className="w-full p-3 rounded bg-slate-800 text-white border border-slate-700 focus:border-cyan-500 focus:outline-none"
              required 
            />
            
            <input 
              type="password"
              name="password" 
              value={loginForm.password} 
              onChange={handleLoginChange} 
              placeholder="Password"
              className="w-full p-3 rounded bg-slate-800 text-white border border-slate-700 focus:border-cyan-500 focus:outline-none"
              required 
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-3 bg-cyan-500 rounded-xl text-lg font-semibold hover:bg-cyan-600 transition-colors"
          >
            Login
          </button>
        </form>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-950 text-white py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 p-8 rounded-2xl shadow-lg space-y-6"
        >
          <h2 className="text-2xl font-bold text-center mb-6">Add New Project</h2>
          
          <div>
            <label className="block text-sm font-medium mb-2">Project Image</label>
            <div className="space-y-4">
              <input 
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-3 rounded bg-slate-800 text-white border border-slate-700 focus:border-cyan-500 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-cyan-500 file:text-white hover:file:bg-cyan-600"
                disabled={isUploading}
              />
              {isUploading && (
                <div className="text-cyan-400 text-center">Uploading image to Cloudinary...</div>
              )}
              {form.image && !isUploading && (
                <div className="text-green-400 text-center">✓ Image uploaded successfully!</div>
              )}
            </div>
          </div>

          <input 
            name="title" 
            value={form.title} 
            onChange={handleChange} 
            placeholder="Project Title"
            className="w-full p-3 rounded bg-slate-800 text-white border border-slate-700 focus:border-cyan-500 focus:outline-none" 
            required 
          />
          
          <textarea 
            name="description" 
            value={form.description} 
            onChange={handleChange} 
            placeholder="Project Description"
            className="w-full p-3 rounded bg-slate-800 text-white border border-slate-700 focus:border-cyan-500 focus:outline-none h-24"
            required 
          />

          <input 
            name="link" 
            value={form.link} 
            onChange={handleChange} 
            placeholder="Live Demo Link"
            className="w-full p-3 rounded bg-slate-800 text-white border border-slate-700 focus:border-cyan-500 focus:outline-none" 
          />

          <input 
            name="github" 
            value={form.github} 
            onChange={handleChange} 
            placeholder="GitHub Repository Link"
            className="w-full p-3 rounded bg-slate-800 text-white border border-slate-700 focus:border-cyan-500 focus:outline-none" 
          />

          <button 
            type="submit" 
            disabled={isUploading || !form.image}
            className="w-full py-3 bg-cyan-500 rounded-xl text-lg font-semibold hover:bg-cyan-600 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
          >
            {isUploading ? "Uploading..." : "Add Project"}
          </button>
        </form>

        {form.image && (
          <div className="mt-8 bg-slate-900 p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-4">Image Preview</h3>
            <div className="relative h-64 w-full rounded-lg overflow-hidden">
              <Image
                src={form.image} 
                alt="Preview" 
                className="object-cover w-full h-full"
              />
            </div>
            <p className="text-sm text-slate-400 mt-2 break-all">
              Image URL: {form.image}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}