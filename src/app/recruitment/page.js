"use client";

import { useState } from "react";
import Image from "next/image";

export default function NSSRecruitmentForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    year: "",
    branch: "",
    section: "",
    rollNumber: "",
    email: "",
    whyJoinNSS: "",
    otherClubs: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const branches = [
    "CSE",
    "CSM",
    "CSE-IoT (CET)",
    "Civil",
    "AIDS",
    "ECE",
    "EVL",
    "Mechanical",
    "Chemical",
    "EEE",
    "Biotech",
    "MBA",
    "MCA",
    "MTECH",
    "IT"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Replace this URL with your Google Apps Script Web App URL
      const scriptURL = 'https://script.google.com/macros/s/AKfycbylMnhKAGIorAUJ3ymA_y-qRi7chA9QBa1a9ZZQuopoersDdsqvk7iI6tTdHA1hBlrQ/exec';
      
      const response = await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      setSubmitStatus('success');
      setFormData({
        name: "",
        phone: "",
        year: "",
        branch: "",
        section: "",
        rollNumber: "",
        email: "",
        whyJoinNSS: "",
        otherClubs: ""
      });
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a1f] via-[#1a1a3f] to-[#0a0a1f] text-white p-5 md:p-10">
      {/* Success/Error Popup Modal */}
      {submitStatus && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-gradient-to-br from-[#1a1a3f] to-[#0a0a1f] border-2 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-scaleIn"
               style={{
                 borderColor: submitStatus === 'success' ? '#22c55e' : '#ef4444',
                 boxShadow: submitStatus === 'success' 
                   ? '0 20px 60px rgba(34, 197, 94, 0.4)' 
                   : '0 20px 60px rgba(239, 68, 68, 0.4)'
               }}>
            <div className="text-center">
              {submitStatus === 'success' ? (
                <>
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-green-400 mb-3">Success!</h3>
                  <p className="text-gray-300 text-lg mb-6">
                    Your application has been submitted successfully. We'll get back to you soon!
                  </p>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-red-400 mb-3">Error!</h3>
                  <p className="text-gray-300 text-lg mb-6">
                    Something went wrong. Please try again or contact support.
                  </p>
                </>
              )}
              <button
                onClick={() => setSubmitStatus(null)}
                className="w-full py-3 px-6 rounded-xl font-semibold text-white transition-all"
                style={{
                  background: submitStatus === 'success' 
                    ? 'linear-gradient(135deg, #22c55e, #16a34a)' 
                    : 'linear-gradient(135deg, #ef4444, #dc2626)',
                  boxShadow: submitStatus === 'success'
                    ? '0 4px 14px rgba(34, 197, 94, 0.4)'
                    : '0 4px 14px rgba(239, 68, 68, 0.4)'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.9);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>

      <div className="max-w-4xl mx-auto">
        {/* Banner Image */}
        <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-10 shadow-2xl shadow-red-500/30">
          <Image
            src="/recruitment-banner.jpg"
            alt="CBIT NSS Recruitments 2025-26"
            fill
            className="object-cover"
            priority
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.style.background = 'linear-gradient(135deg, #F22232, #2E348C)';
              e.target.parentElement.style.display = 'flex';
              e.target.parentElement.style.alignItems = 'center';
              e.target.parentElement.style.justifyContent = 'center';
              const text = document.createElement('div');
              text.innerHTML = '<div style="text-align: center; padding: 20px;"><div style="font-size: 2.5rem; font-weight: 800; margin-bottom: 10px; color: white;">CBIT NSS</div><div style="font-size: 1.5rem; font-weight: 700; color: white;">RECRUITMENTS 2025-26</div></div>';
              e.target.parentElement.appendChild(text);
            }}
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent">
          CBIT NSS RECRUITMENTS 2025-26
        </h1>

        {/* Description */}
        <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl mb-10 border-2 border-red-500/30">
          <p className="text-gray-300 leading-relaxed text-base md:text-lg">
            <strong className="text-red-500 text-xl block mb-4">Hello CBITIANS!!</strong>
            Education makes one intellect. Service brings the humanity within us. Ever felt what it's like to combine Education with service?
            <br /><br />
            Then come join CBIT NSS where we enhance the value of education by providing service! Here is your chance to contribute to the noble causes thereby making this world a much better place to live in!
            <br /><br />
            <strong className="text-white">Interested to be a part of NSS?</strong>
            <br />
            Do fill the following form by <strong className="text-red-500">21st December</strong>.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/5 backdrop-blur-md p-8 md:p-10 rounded-2xl border-2 border-white/10">
          {/* Name */}
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-3">
              Name<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-4 text-base border-2 border-white/20 rounded-xl bg-white/5 text-white placeholder-white/40 focus:outline-none focus:border-red-500 focus:bg-white/10 transition-all"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-3">
              Email<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 text-base border-2 border-white/20 rounded-xl bg-white/5 text-white placeholder-white/40 focus:outline-none focus:border-red-500 focus:bg-white/10 transition-all"
              placeholder="Enter your email address"
              required
            />
          </div>

          {/* Year */}
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-3">
              Year<span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex flex-col md:flex-row gap-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="year"
                  value="1st Year"
                  checked={formData.year === "1st Year"}
                  onChange={handleChange}
                  className="w-5 h-5 accent-red-500 cursor-pointer"
                  required
                />
                <span className="text-gray-300">1st Year</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="year"
                  value="2nd Year"
                  checked={formData.year === "2nd Year"}
                  onChange={handleChange}
                  className="w-5 h-5 accent-red-500 cursor-pointer"
                  required
                />
                <span className="text-gray-300">2nd Year</span>
              </label>
            </div>
          </div>

          {/* Branch */}
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-3">
              Branch<span className="text-red-500 ml-1">*</span>
            </label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full p-4 text-base border-2 border-white/20 rounded-xl bg-white/5 text-white focus:outline-none focus:border-red-500 focus:bg-white/10 transition-all cursor-pointer"
              required
            >
              <option value="" className="bg-[#1a1a3f] text-white">Select your branch</option>
              {branches.map((branch, index) => (
                <option key={index} value={branch} className="bg-[#1a1a3f] text-white">
                  {branch}
                </option>
              ))}
            </select>
          </div>

          {/* Section */}
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-3">
              Section<span className="text-red-500 ml-1">*</span>
            </label>
            <select
              name="section"
              value={formData.section}
              onChange={handleChange}
              className="w-full p-4 text-base border-2 border-white/20 rounded-xl bg-white/5 text-white focus:outline-none focus:border-red-500 focus:bg-white/10 transition-all cursor-pointer"
              required
            >
              <option value="" className="bg-[#1a1a3f] text-white">Select your section</option>
              {[1, 2, 3, 4, 5].map((section) => (
                <option key={section} value={section.toString()} className="bg-[#1a1a3f] text-white">
                  Section {section}
                </option>
              ))}
            </select>
          </div>

          {/* Roll Number */}
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-3">
              Roll Number<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              className="w-full p-4 text-base border-2 border-white/20 rounded-xl bg-white/5 text-white placeholder-white/40 focus:outline-none focus:border-red-500 focus:bg-white/10 transition-all"
              placeholder="eg: 1601-2X-XXX-XXX"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-3">
              Phone Number<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-4 text-base border-2 border-white/20 rounded-xl bg-white/5 text-white placeholder-white/40 focus:outline-none focus:border-red-500 focus:bg-white/10 transition-all"
              placeholder="Enter your phone number"
              pattern="[0-9]{10}"
              required
            />
          </div>

          {/* Why Join NSS */}
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-3">
              Why do you want to be part of CBIT NSS?<span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              name="whyJoinNSS"
              value={formData.whyJoinNSS}
              onChange={handleChange}
              className="w-full p-4 text-base border-2 border-white/20 rounded-xl bg-white/5 text-white placeholder-white/40 focus:outline-none focus:border-red-500 focus:bg-white/10 transition-all min-h-32 resize-y font-sans"
              placeholder="Tell us why you want to join CBIT NSS..."
              required
            />
          </div>

          {/* Other Clubs */}
          <div className="mb-8">
            <label className="block text-lg font-semibold mb-3">
              Are you part of any other clubs? If yes, mention them.<span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              name="otherClubs"
              value={formData.otherClubs}
              onChange={handleChange}
              className="w-full p-4 text-base border-2 border-white/20 rounded-xl bg-white/5 text-white placeholder-white/40 focus:outline-none focus:border-red-500 focus:bg-white/10 transition-all min-h-32 resize-y font-sans"
              placeholder="List any clubs you're part of, or write 'None'"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full p-5 text-xl font-bold bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl cursor-pointer transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/50 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      </div>
    </div>
  );
}