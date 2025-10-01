"use client";

import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const form = event.currentTarget; // this is guaranteed to be the form
  const formData = new FormData(form);

  formData.append("access_key", "687e261e-e2a9-4b04-a90b-e5e31e296a9f");

  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    });

    const result = await response.json();
    if (result.success) {
      console.log("Message sent:", result);
      if (form) form.reset(); // reset the form safely
      alert("Message sent successfully!");
    } else {
      console.error("Form submission failed:", result);
      alert("Failed to send message. Try again later.");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Error sending message. Check console for details.");
  }
}


  return (
    <section id="contact" className="py-20 bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <h2 className="text-5xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Contact Me
          </span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Side - Info */}
          <div className="flex flex-col justify-center space-y-8">
            <h3 className="text-3xl font-semibold text-cyan-400">
              Let’s work together!
            </h3>
            <p className="text-gray-300 leading-relaxed">
              I’m always open to new projects, collaborations, or just a friendly chat. 
              Fill out the form, and I’ll get back to you as soon as possible.
            </p>

            <div className="space-y-4">
              <p className="flex items-center gap-3 text-gray-300">
                <Mail className="text-cyan-400" /> younes@example.com
              </p>
              <p className="flex items-center gap-3 text-gray-300">
                <Phone className="text-cyan-400" /> +213 555 123 456
              </p>
              <p className="flex items-center gap-3 text-gray-300">
                <MapPin className="text-cyan-400" /> Oran, Algeria
              </p>
            </div>
          </div>

          {/* Right Side - Form */}
          <form 
            onSubmit={handleSubmit} 
            className="bg-slate-900 p-8 rounded-2xl shadow-lg space-y-6"
          >
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                placeholder="Write your message..."
                className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Send Message <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
