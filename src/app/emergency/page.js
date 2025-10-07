"use client";
import { useState } from "react";

export default function EmergencyServices() {
  // Tab state management
  const [activeTab, setActiveTab] = useState("become-donor");

  // ========== BECOME A DONOR FORM STATE ==========
  const [donorForm, setDonorForm] = useState({
    "Donor Name": "",
    "Blood Group": "",
    "Contact Number": "",
    "Email Address": "",
    "Gender": "",
    "Age": "",
    "Date of Last Donation": "",
    "Availability Status": "",
    "Medical Conditions": "",
    "Never Donated": false,
    "Forgot When Donated": false,
  });
  const [isDonorSubmitting, setIsDonorSubmitting] = useState(false);

  // ========== REQUEST DONOR FORM STATE ==========
  const [requestForm, setRequestForm] = useState({
    "Patient Name": "",
    "Blood Group Required": "",
    "Units Required": "",
    "Required By Date": "",
    "Required By Time": "",
    "Hospital Name": "",
    "Hospital Location": "",
    "Contact Person Name": "",
    "Contact Number": "",
    "Email Address": "",
    "Urgency Level": "",
    "Additional Notes": "",
    "Live Donor Required": false,
  });
  const [isRequestSubmitting, setIsRequestSubmitting] = useState(false);

  // Shared data
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const urgencyLevels = ["Critical (Within 2 hours)", "Urgent (Within 6 hours)", "Moderate (Within 24 hours)", "Planned (Within 3 days)"];

  // ========== BECOME A DONOR HANDLERS ==========
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

    if (!donorForm.Gender) {
      alert("Please select your gender.");
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

      await fetch(
        "https://script.google.com/macros/s/AKfycbx7i6OCBliYZrGjAtmAr-kylbmWAdghv7bQx7wLPHd6EM6-pVhnLTF7hjZOJMWzms8l0Q/exec",
        {
          method: "POST",
          body: formData,
          mode: "no-cors",
        }
      );

      alert("Thank you for registering as a donor!");
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

  // ========== REQUEST DONOR HANDLERS ==========
  const handleRequestChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRequestForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const sendEmail = async () => {
    try {
      const emailParams = {
        to_name: "Emergency Team",
        patient_name: requestForm["Patient Name"],
        blood_group: requestForm["Blood Group Required"],
        units: requestForm["Units Required"],
        urgency: requestForm["Urgency Level"],
        required_date: requestForm["Required By Date"],
        required_time: requestForm["Required By Time"],
        hospital: requestForm["Hospital Name"],
        location: requestForm["Hospital Location"],
        contact_person: requestForm["Contact Person Name"],
        contact_number: requestForm["Contact Number"],
        contact_email: requestForm["Email Address"],
        notes: requestForm["Additional Notes"] || "None",
        live_donor: requestForm["Live Donor Required"] ? "YES - Live Donor Required" : "NO - Blood Bank Acceptable",
        reply_to: requestForm["Email Address"]
      };

      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'service_9pb3aok',
          template_id: 'template_oby1f18',
          user_id: 'SPk97mei6nDi8GNAs',
          template_params: emailParams
        })
      });

      const responseText = await response.text();
      console.log('EmailJS Response:', responseText);

      if (response.ok || response.status === 200) {
        return true;
      } else {
        console.error('EmailJS Error Response:', responseText);
        throw new Error(`Failed to send email: ${responseText}`);
      }
    } catch (error) {
      console.error('Email sending error:', error);
      throw error;
    }
  };

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    setIsRequestSubmitting(true);

    try {
      await sendEmail();
      alert("Blood request submitted successfully! The emergency team has been notified via email.");
      
      setRequestForm({
        "Patient Name": "",
        "Blood Group Required": "",
        "Units Required": "",
        "Required By Date": "",
        "Required By Time": "",
        "Hospital Name": "",
        "Hospital Location": "",
        "Contact Person Name": "",
        "Contact Number": "",
        "Email Address": "",
        "Urgency Level": "",
        "Additional Notes": "",
        "Live Donor Required": false,
      });
    } catch (error) {
      console.error("Error submitting request:", error);
      alert(`Error sending email notification: ${error.message}. Please try again or contact support directly.`);
    } finally {
      setIsRequestSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Saving Life Starts Here..</h1>
      
      {/* ========== TAB NAVIGATION ========== */}
      <div className="flex border-b border-gray-300 mb-6">
        <button
          onClick={() => setActiveTab("become-donor")}
          className={`flex-1 px-6 py-3 font-semibold transition-colors ${
            activeTab === "become-donor"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          Become a Donor
        </button>
        <button
          onClick={() => setActiveTab("request-donor")}
          className={`flex-1 px-6 py-3 font-semibold transition-colors ${
            activeTab === "request-donor"
              ? "border-b-2 border-red-600 text-red-600"
              : "text-gray-600 hover:text-red-600"
          }`}
        >
          Request a Donor
        </button>
      </div>

      {/* ========== TAB CONTENT ========== */}
      {activeTab === "become-donor" ? (
        // BECOME A DONOR FORM
        <form
          onSubmit={handleDonorSubmit}
          className="p-6 bg-white rounded shadow"
        >
          <h2 className="text-2xl font-bold mb-6 text-blue-700">Become a Donor</h2>

          <label className="block mb-1 text-gray-700 font-medium text-sm">
            Donor Name *
          </label>
          <input
            name="Donor Name"
            placeholder="Enter your full name"
            value={donorForm["Donor Name"]}
            onChange={handleDonorChange}
            required
            className="w-full mb-4 p-2 border rounded text-black"
          />

          <label className="block mb-1 text-gray-700 font-medium text-sm">
            Blood Group *
          </label>
          <select
            name="Blood Group"
            value={donorForm["Blood Group"]}
            onChange={handleDonorChange}
            required
            className="w-full mb-4 p-2 border rounded text-black"
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

          <label className="block mb-1 text-gray-700 font-medium text-sm">
            Contact Number *
          </label>
          <input
            name="Contact Number"
            placeholder="Enter your contact number"
            value={donorForm["Contact Number"]}
            onChange={handleDonorChange}
            required
            className="w-full mb-4 p-2 border rounded text-black"
          />

          <label className="block mb-1 text-gray-700 font-medium text-sm">
            Email Address *
          </label>
          <input
            name="Email Address"
            placeholder="Enter your email address"
            type="email"
            value={donorForm["Email Address"]}
            onChange={handleDonorChange}
            required
            className="w-full mb-4 p-2 border rounded text-black"
          />

          <label className="block mb-1 text-gray-700 font-medium text-sm">
            Gender *
          </label>
          <select
            name="Gender"
            value={donorForm.Gender}
            onChange={handleDonorChange}
            required
            className="w-full mb-4 p-2 border rounded text-black"
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <label className="block mb-1 text-gray-700 font-medium text-sm">
            Age *
          </label>
          <input
            name="Age"
            placeholder="Enter your age"
            type="number"
            value={donorForm.Age}
            onChange={handleDonorChange}
            required
            className="w-full mb-4 p-2 border rounded text-black"
          />

          <label className="block mb-1 text-gray-700 font-medium text-sm">
            Date of Last Donation
          </label>
          <input
            type="date"
            name="Date of Last Donation"
            value={donorForm["Date of Last Donation"]}
            onChange={handleDonorChange}
            disabled={donorForm["Never Donated"]}
            className="w-full mb-4 p-2 border rounded text-black"
          />

          <label className="flex items-center mb-4 text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              name="Never Donated"
              checked={donorForm["Never Donated"]}
              onChange={handleDonorChange}
              className="mr-2 w-4 h-4"
            />
            <span className="font-medium">I have never donated blood</span>
          </label>

          <label className="block mb-1 text-gray-700 font-medium text-sm">
            Availability Status *
          </label>
          <input
            name="Availability Status"
            placeholder="e.g., Available, Not Available"
            value={donorForm["Availability Status"]}
            onChange={handleDonorChange}
            required
            className="w-full mb-4 p-2 border rounded text-black"
          />

          <label className="block mb-1 text-gray-700 font-medium text-sm">
            Medical Conditions
          </label>
          <textarea
            name="Medical Conditions"
            placeholder="Enter any medical conditions (if any)"
            value={donorForm["Medical Conditions"]}
            onChange={handleDonorChange}
            rows="3"
            className="w-full mb-6 p-2 border rounded text-black"
          />

          <button
            type="submit"
            disabled={isDonorSubmitting}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition disabled:bg-blue-400 w-full font-semibold"
          >
            {isDonorSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      ) : (
        // REQUEST DONOR FORM
        <form
          onSubmit={handleRequestSubmit}
          className="p-6 bg-white rounded shadow"
        >
          <h2 className="text-2xl font-bold mb-6 text-red-700">Request Blood Donor</h2>
          <p className="text-gray-600 mb-6 text-sm">
            Fill out this form to request blood from our emergency donor network. Our team will be notified immediately via email.
          </p>

          <label className="block mb-1 text-gray-700 font-medium text-sm">
            Patient Name *
          </label>
          <input
            name="Patient Name"
            placeholder="Enter patient's full name"
            value={requestForm["Patient Name"]}
            onChange={handleRequestChange}
            required
            className="w-full mb-4 p-2 border rounded text-black"
          />

          <label className="block mb-1 text-gray-700 font-medium text-sm">
            Blood Group Required *
          </label>
          <select
            name="Blood Group Required"
            value={requestForm["Blood Group Required"]}
            onChange={handleRequestChange}
            required
            className="w-full mb-4 p-2 border rounded text-black"
          >
            <option value="" disabled>
              Select Blood Group Required
            </option>
            {bloodGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>

          <label className="block mb-1 text-gray-700 font-medium text-sm">
            Units Required *
          </label>
          <input
            name="Units Required"
            placeholder="Number of units needed"
            type="number"
            min="1"
            value={requestForm["Units Required"]}
            onChange={handleRequestChange}
            required
            className="w-full mb-4 p-2 border rounded text-black"
          />

          <label className="block mb-1 text-gray-700 font-medium text-sm">
            Urgency Level *
          </label>
          <select
            name="Urgency Level"
            value={requestForm["Urgency Level"]}
            onChange={handleRequestChange}
            required
            className="w-full mb-4 p-2 border rounded text-black"
          >
            <option value="" disabled>
              Select Urgency Level
            </option>
            {urgencyLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          
          <label className="flex items-center mb-4 text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              name="Live Donor Required"
              checked={requestForm["Live Donor Required"]}
              onChange={handleRequestChange}
              className="mr-2 w-4 h-4"
            />
            <span className="font-medium">Live Donor Required</span>
          </label>

          <label className="block mb-1 text-gray-700 font-medium text-sm">
            Required By Date *
          </label>
          <input
            type="date"
            name="Required By Date"
            value={requestForm["Required By Date"]}
            onChange={handleRequestChange}
            required
            className="w-full mb-4 p-2 border rounded text-black"
          />

          <label className="block mb-1 text-gray-700 font-medium text-sm">
            Required By Time *
          </label>
          <input
            type="time"
            name="Required By Time"
            value={requestForm["Required By Time"]}
            onChange={handleRequestChange}
            required
            className="w-full mb-4 p-2 border rounded text-black"
          />

          <label className="block mb-1 text-gray-700 font-medium text-sm">
            Hospital Name *
          </label>
          <input
            name="Hospital Name"
            placeholder="Enter hospital name"
            value={requestForm["Hospital Name"]}
            onChange={handleRequestChange}
            required
            className="w-full mb-4 p-2 border rounded text-black"
          />

          <label className="block mb-1 text-gray-700 font-medium text-sm">
            Hospital Location *
          </label>
          <textarea
            name="Hospital Location"
            placeholder="Enter complete hospital address"
            value={requestForm["Hospital Location"]}
            onChange={handleRequestChange}
            required
            rows="2"
            className="w-full mb-4 p-2 border rounded text-black"
          />

          <label className="block mb-1 text-gray-700 font-medium text-sm">
            Contact Person Name *
          </label>
          <input
            name="Contact Person Name"
            placeholder="Enter contact person's name"
            value={requestForm["Contact Person Name"]}
            onChange={handleRequestChange}
            required
            className="w-full mb-4 p-2 border rounded text-black"
          />

          <label className="block mb-1 text-gray-700 font-medium text-sm">
            Contact Number *
          </label>
          <input
            name="Contact Number"
            placeholder="Enter contact number"
            value={requestForm["Contact Number"]}
            onChange={handleRequestChange}
            required
            className="w-full mb-4 p-2 border rounded text-black"
          />

          <label className="block mb-1 text-gray-700 font-medium text-sm">
            Email Address *
          </label>
          <input
            name="Email Address"
            placeholder="Enter email address"
            type="email"
            value={requestForm["Email Address"]}
            onChange={handleRequestChange}
            required
            className="w-full mb-4 p-2 border rounded text-black"
          />

          <label className="block mb-1 text-gray-700 font-medium text-sm">
            Additional Notes
          </label>
          <textarea
            name="Additional Notes"
            placeholder="Any additional information (optional)"
            value={requestForm["Additional Notes"]}
            onChange={handleRequestChange}
            rows="3"
            className="w-full mb-6 p-2 border rounded text-black"
          />

          <button
            type="submit"
            disabled={isRequestSubmitting}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition disabled:bg-red-400 w-full font-semibold"
          >
            {isRequestSubmitting ? "Submitting Request..." : "Submit Blood Request"}
          </button>

          <p className="text-xs text-gray-500 mt-4 text-center">
            Your request will be sent to our External Affairs team immediately
          </p>
        </form>
      )}
    </div>
  );
}