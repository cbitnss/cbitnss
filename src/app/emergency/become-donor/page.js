// "use client";
// import { useState } from "react";

// export default function BecomeDonor() {
//   const [form, setForm] = useState({
//     "Donor Name": "",
//     "Blood Group": "",
//     "Contact Number": "",
//     "Email Address": "",
//     "Gender": "",
//     "Age": "",
//     "Date of Last Donation": "",
//     "Availability Status": "",
//     "Medical Conditions": "",
//     "Never Donated": false,
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate minimum age
//     if (!form.Age || parseInt(form.Age) < 18) {
//       alert("You must be at least 18 years old to donate blood.");
//       return;
//     }

//     if (!form.Gender) {
//       alert("Please select your gender.");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const formData = new FormData();

//       Object.keys(form).forEach((key) => {
//         let value = form[key];

//         // If never donated, override last donation date
//         if (key === "Date of Last Donation" && form["Never Donated"]) {
//           value = "Never Donated";
//         }

//         formData.append(key, value);
//       });

//       await fetch(
//         "https://script.google.com/macros/s/AKfycbx7i6OCBliYZrGjAtmAr-kylbmWAdghv7bQx7wLPHd6EM6-pVhnLTF7hjZOJMWzms8l0Q/exec",
//         {
//           method: "POST",
//           body: formData,
//           mode: "no-cors",
//         }
//       );

//       alert("Thank you for registering as a donor!");
//       setForm({
//         "Donor Name": "",
//         "Blood Group": "",
//         "Contact Number": "",
//         "Email Address": "",
//         "Date of Last Donation": "",
//         "Availability Status": "",
//         "Medical Conditions": "",
//         "Gender": "",
//         "Age": "",
//         "Never Donated": false,
//       });
//     } catch (error) {
//       console.error("Error sending data:", error);
//       alert("Error sending data: " + error.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10"
//     >
//       <h2 className="text-2xl font-bold mb-6 text-blue-700">Become a Donor</h2>

//       <input
//         name="Donor Name"
//         placeholder="Full Name"
//         value={form["Donor Name"]}
//         onChange={handleChange}
//         required
//         className="w-full mb-4 p-2 border rounded text-black"
//       />

//       <select
//         name="Blood Group"
//         value={form["Blood Group"]}
//         onChange={handleChange}
//         required
//         className="w-full mb-4 p-2 border rounded text-black"
//       >
//         <option value="" disabled>
//           Select Blood Group
//         </option>
//         {bloodGroups.map((group) => (
//           <option key={group} value={group}>
//             {group}
//           </option>
//         ))}
//       </select>

//       <input
//         name="Contact Number"
//         placeholder="Contact Number"
//         value={form["Contact Number"]}
//         onChange={handleChange}
//         required
//         className="w-full mb-4 p-2 border rounded text-black"
//       />

//       <input
//         name="Email Address"
//         placeholder="Email Address"
//         type="email"
//         value={form["Email Address"]}
//         onChange={handleChange}
//         required
//         className="w-full mb-4 p-2 border rounded text-black"
//       />

//       {/* Gender */}
//       <select
//         name="Gender"
//         value={form.Gender}
//         onChange={handleChange}
//         required
//         className="w-full mb-4 p-2 border rounded text-black"
//       >
//         <option value="" disabled>
//           Select Gender
//         </option>
//         <option value="Male">Male</option>
//         <option value="Female">Female</option>
//         <option value="Other">Other</option>
//       </select>

//       {/* Age */}
//       <input
//         name="Age"
//         placeholder="Age"
//         type="number"
//         value={form.Age}
//         onChange={handleChange}
//         required
//         className="w-full mb-4 p-2 border rounded text-black"
//       />

//       {/* Date of Last Donation */}
//       <label className="block mb-1 text-gray-700 font-medium">
//         Date of Last Donation
//       </label>
//       <input
//         type="date"
//         name="Date of Last Donation"
//         value={form["Date of Last Donation"]}
//         onChange={handleChange}
//         disabled={form["Never Donated"]}
//         className="w-full mb-4 p-2 border rounded text-black"
//       />

//       {/* Checkbox for Never Donated */}
//       <label className="flex items-center mb-4 text-gray-700">
//         <input
//           type="checkbox"
//           name="Never Donated"
//           checked={form["Never Donated"]}
//           onChange={handleChange}
//           className="mr-2"
//         />
//         I have never donated blood
//       </label>

//       <input
//         name="Availability Status"
//         placeholder="Availability Status (e.g., Available, Not Available)"
//         value={form["Availability Status"]}
//         onChange={handleChange}
//         required
//         className="w-full mb-4 p-2 border rounded text-black"
//       />

//       <textarea
//         name="Medical Conditions"
//         placeholder="Medical Conditions (if any)"
//         value={form["Medical Conditions"]}
//         onChange={handleChange}
//         rows="3"
//         className="w-full mb-6 p-2 border rounded text-black"
//       />

//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition disabled:bg-blue-400"
//       >
//         {isSubmitting ? "Submitting..." : "Submit"}
//       </button>
//     </form>
//   );
// }
"use client";

import { useState } from "react";
import Link from "next/link";

export default function BecomeDonorPage() {
  const [donorForm, setDonorForm] = useState({
    "Donor Name": "",
    "Blood Group": "",
    "Contact Number": "",
    "Email Address": "",
    "Gender": "",
    "Age": "",
    "Height": "",
    "Weight": "",
    "Date of Last Donation": "",
    "Availability Status": "",
    "Medical Conditions": "",
    "Never Donated": false,
    "Forgot When Donated": false,
  });
  const [isDonorSubmitting, setIsDonorSubmitting] = useState(false);

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const calculateBMI = (weight, height) => {
    if (!weight || !height) return null;
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
  };

  const handleDonorChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDonorForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDonorSubmit = async (e) => {
    e.preventDefault();

    if (!donorForm.Age || parseInt(donorForm.Age) < 18) {
      alert("You must be at least 18 years old to donate blood.");
      return;
    }

    if (parseInt(donorForm.Age) > 65) {
      alert("Donors must be 65 years old or younger to donate blood.");
      return;
    }

    if (!donorForm.Gender) {
      alert("Please select your gender.");
      return;
    }

    const bmi = calculateBMI(parseFloat(donorForm.Weight), parseFloat(donorForm.Height));
    
    if (!bmi) {
      alert("Please enter valid height and weight.");
      return;
    }

    if (bmi < 18.5) {
      alert(`Your BMI is ${bmi}, which is below the minimum requirement of 18.5 for blood donation. Please maintain a healthy weight before donating.`);
      return;
    }

    if (bmi > 25) {
      alert(`Your BMI is ${bmi}, which is above the maximum recommended value of 25 for safe blood donation. Please consult with a healthcare professional.`);
      return;
    }

    if (parseFloat(donorForm.Weight) < 45) {
      alert("You must weigh at least 45 kg to donate blood.");
      return;
    }

    setIsDonorSubmitting(true);

    try {
      const formData = new FormData();

      Object.keys(donorForm).forEach((key) => {
        let value = donorForm[key];
        if (key === "Date of Last Donation" && donorForm["Never Donated"]) {
          value = "Never Donated";
        }
        if (key === "Date of Last Donation" && donorForm["Forgot When Donated"]) {
          value = "Forgot When Donated";
        }
        formData.append(key, value);
      });

      formData.append("BMI", bmi);

      await fetch(
        "https://script.google.com/macros/s/AKfycbx7i6OCBliYZrGjAtmAr-kylbmWAdghv7bQx7wLPHd6EM6-pVhnLTF7hjZOJMWzms8l0Q/exec",
        {
          method: "POST",
          body: formData,
          mode: "no-cors",
        }
      );

      alert("Thank you for registering as a donor! Our team will contact you soon.");
      setDonorForm({
        "Donor Name": "",
        "Blood Group": "",
        "Contact Number": "",
        "Email Address": "",
        "Date of Last Donation": "",
        "Availability Status": "",
        "Medical Conditions": "",
        "Gender": "",
        "Age": "",
        "Height": "",
        "Weight": "",
        "Never Donated": false,
        "Forgot When Donated": false,
      });
    } catch (error) {
      console.error("Error sending data:", error);
      alert("Error sending data: " + error.message);
    } finally {
      setIsDonorSubmitting(false);
    }
  };

  const currentBMI = calculateBMI(parseFloat(donorForm.Weight), parseFloat(donorForm.Height));

  return (
    <>
      <style jsx global>{`
        .donor-page {
          background: linear-gradient(135deg, #0a0a1f 0%, #1a1a3f 50%, #0a0a1f 100%);
          min-height: 100vh;
          padding: 40px 20px;
          color: white;
        }

        .back-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #F22232;
          text-decoration: none;
          font-weight: 600;
          margin-bottom: 30px;
          transition: all 0.3s ease;
        }

        .back-button:hover {
          gap: 12px;
          color: #ff3344;
        }

        .form-container {
          max-width: 700px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.05);
          padding: 40px;
          border-radius: 25px;
          border: 2px solid rgba(242, 34, 50, 0.3);
          backdrop-filter: blur(10px);
        }

        .form-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #F22232;
          margin-bottom: 10px;
          text-align: center;
        }

        .form-subtitle {
          text-align: center;
          color: #d1d5db;
          margin-bottom: 40px;
          font-size: 1.1rem;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          color: #d1d5db;
          font-weight: 600;
          font-size: 0.95rem;
        }

        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          padding: 12px 16px;
          margin-bottom: 20px;
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.05);
          color: white;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #F22232;
          background: rgba(255, 255, 255, 0.08);
        }

        .form-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          cursor: pointer;
          color: #d1d5db;
        }

        .checkbox-input {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }

        .bmi-indicator {
          padding: 16px;
          border-radius: 10px;
          margin-bottom: 20px;
          border: 2px solid;
        }

        .bmi-success {
          background: rgba(34, 197, 94, 0.1);
          border-color: rgba(34, 197, 94, 0.5);
          color: #4ade80;
        }

        .bmi-warning {
          background: rgba(234, 179, 8, 0.1);
          border-color: rgba(234, 179, 8, 0.5);
          color: #facc15;
        }

        .submit-button {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #F22232, #dc2626);
          color: white;
          border: none;
          border-radius: 50px;
          font-size: 1.2rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(242, 34, 50, 0.4);
        }

        .submit-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(242, 34, 50, 0.6);
        }

        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .form-container {
            padding: 30px 20px;
          }

          .form-title {
            font-size: 2rem;
          }
        }
      `}</style>

      <div className="donor-page">
        <div className="form-container">
          <Link href="/emergency" className="back-button">
            ← Back to Emergency Services
          </Link>

          <h1 className="form-title">Become a Blood Donor</h1>
          <p className="form-subtitle">
            Join our community of life-savers. Fill out the form below to register as a blood donor.
          </p>

          <form onSubmit={handleDonorSubmit}>
            <label className="form-label">
              Donor Name *
            </label>
            <input
              name="Donor Name"
              placeholder="Enter your full name"
              value={donorForm["Donor Name"]}
              onChange={handleDonorChange}
              required
              className="form-input"
            />

            <label className="form-label">
              Blood Group *
            </label>
            <select
              name="Blood Group"
              value={donorForm["Blood Group"]}
              onChange={handleDonorChange}
              required
              className="form-select"
            >
              <option value="" disabled>
                Select Blood Group
              </option>
              {bloodGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>

            <label className="form-label">
              Contact Number *
            </label>
            <input
              name="Contact Number"
              placeholder="Enter your contact number"
              value={donorForm["Contact Number"]}
              onChange={handleDonorChange}
              required
              className="form-input"
            />

            <label className="form-label">
              Email Address *
            </label>
            <input
              name="Email Address"
              placeholder="Enter your email address"
              type="email"
              value={donorForm["Email Address"]}
              onChange={handleDonorChange}
              required
              className="form-input"
            />

            <label className="form-label">
              Gender *
            </label>
            <select
              name="Gender"
              value={donorForm.Gender}
              onChange={handleDonorChange}
              required
              className="form-select"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <label className="form-label">
              Age *
            </label>
            <input
              name="Age"
              placeholder="Enter your age"
              type="number"
              value={donorForm.Age}
              onChange={handleDonorChange}
              required
              className="form-input"
            />

            <label className="form-label">
              Height (in cm) *
            </label>
            <input
              name="Height"
              placeholder="Enter your height in centimeters"
              type="number"
              step="0.1"
              value={donorForm.Height}
              onChange={handleDonorChange}
              required
              className="form-input"
            />

            <label className="form-label">
              Weight (in kg) *
            </label>
            <input
              name="Weight"
              placeholder="Enter your weight in kilograms"
              type="number"
              step="0.1"
              value={donorForm.Weight}
              onChange={handleDonorChange}
              required
              className="form-input"
            />

            {currentBMI && (
              <div className={`bmi-indicator ${
                currentBMI >= 18.5 && currentBMI <= 25 
                  ? "bmi-success" 
                  : "bmi-warning"
              }`}>
                <p style={{ fontWeight: 600, marginBottom: '8px' }}>Your BMI: {currentBMI}</p>
                <p style={{ fontSize: '0.95rem' }}>
                  {currentBMI >= 18.5 && currentBMI <= 25 
                    ? "✓ Your BMI is within the acceptable range for blood donation (18.5 - 25)" 
                    : currentBMI < 18.5
                      ? "⚠ Your BMI is below the minimum requirement (18.5)" 
                      : "⚠ Your BMI is above the recommended maximum (25)"}
                </p>
              </div>
            )}

            <label className="form-label">
              Date of Last Donation
            </label>
            <input
              type="date"
              name="Date of Last Donation"
              value={donorForm["Date of Last Donation"]}
              onChange={handleDonorChange}
              disabled={donorForm["Never Donated"]}
              className="form-input"
            />

            <label className="checkbox-label">
              <input
                type="checkbox"
                name="Never Donated"
                checked={donorForm["Never Donated"]}
                onChange={handleDonorChange}
                className="checkbox-input"
              />
              <span>I have never donated blood</span>
            </label>

            <label className="form-label">
              Availability Status *
            </label>
            <input
              name="Availability Status"
              placeholder="e.g., Available, Not Available"
              value={donorForm["Availability Status"]}
              onChange={handleDonorChange}
              required
              className="form-input"
            />

            <label className="form-label">
              Medical Conditions
            </label>
            <textarea
              name="Medical Conditions"
              placeholder="Enter any medical conditions (if any)"
              value={donorForm["Medical Conditions"]}
              onChange={handleDonorChange}
              rows="4"
              className="form-textarea"
            />

            <button
              type="submit"
              disabled={isDonorSubmitting}
              className="submit-button"
            >
              {isDonorSubmitting ? "Submitting..." : "Register as Donor"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
