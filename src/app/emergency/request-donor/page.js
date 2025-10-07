// "use client";
// import { useState } from "react";

// export default function RequestDonor() {
//   const [form, setForm] = useState({
//     "Patient Name": "",
//     "Blood Group Required": "",
//     "Units Required": "",
//     "Required By Date": "",
//     "Required By Time": "",
//     "Hospital Name": "",
//     "Hospital Location": "",
//     "Contact Person Name": "",
//     "Contact Number": "",
//     "Email Address": "",
//     "Urgency Level": "",
//     "Additional Notes": "",
//     "Live Donor Required": false,
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
//   const urgencyLevels = ["Critical (Within 2 hours)", "Urgent (Within 6 hours)", "Moderate (Within 24 hours)", "Planned (Within 3 days)"];

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const sendEmail = async () => {
//     try {
//       const emailParams = {
//         to_name: "Emergency Team",
//         patient_name: form["Patient Name"],
//         blood_group: form["Blood Group Required"],
//         units: form["Units Required"],
//         urgency: form["Urgency Level"],
//         required_date: form["Required By Date"],
//         required_time: form["Required By Time"],
//         hospital: form["Hospital Name"],
//         location: form["Hospital Location"],
//         contact_person: form["Contact Person Name"],
//         contact_number: form["Contact Number"],
//         contact_email: form["Email Address"],
//         notes: form["Additional Notes"] || "None",
//         live_donor: form["Live Donor Required"] ? "YES - Live Donor Required" : "NO - Blood Bank Acceptable",
//         reply_to: form["Email Address"]
//       };

//       const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           service_id: 'service_9pb3aok',
//           template_id: 'template_oby1f18',
//           user_id: 'SPk97mei6nDi8GNAs',
//           template_params: emailParams
//         })
//       });

//       const responseText = await response.text();
//       console.log('EmailJS Response:', responseText);

//       if (response.ok || response.status === 200) {
//         return true;
//       } else {
//         console.error('EmailJS Error Response:', responseText);
//         throw new Error(`Failed to send email: ${responseText}`);
//       }
//     } catch (error) {
//       console.error('Email sending error:', error);
//       throw error;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       await sendEmail();
//       alert("Blood request submitted successfully! The emergency team has been notified via email.");
      
//       setForm({
//         "Patient Name": "",
//         "Blood Group Required": "",
//         "Units Required": "",
//         "Required By Date": "",
//         "Required By Time": "",
//         "Hospital Name": "",
//         "Hospital Location": "",
//         "Contact Person Name": "",
//         "Contact Number": "",
//         "Email Address": "",
//         "Urgency Level": "",
//         "Additional Notes": "",
//         "Live Donor Required": false,
//       });
//     } catch (error) {
//       console.error("Error submitting request:", error);
//       alert(`Error sending email notification: ${error.message}. Please try again or contact support directly.`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10"
//     >
//       <h2 className="text-2xl font-bold mb-6 text-red-700">Request Blood Donor</h2>
//       <p className="text-gray-600 mb-6 text-sm">
//         Fill out this form to request blood from our emergency donor network. Our team will be notified immediately via email.
//       </p>

//       <label className="block mb-1 text-gray-700 font-medium text-sm">
//         Patient Name *
//       </label>
//       <input
//         name="Patient Name"
//         placeholder="Enter patient's full name"
//         value={form["Patient Name"]}
//         onChange={handleChange}
//         required
//         className="w-full mb-4 p-2 border rounded text-black"
//       />

//       <label className="block mb-1 text-gray-700 font-medium text-sm">
//         Blood Group Required *
//       </label>
//       <select
//         name="Blood Group Required"
//         value={form["Blood Group Required"]}
//         onChange={handleChange}
//         required
//         className="w-full mb-4 p-2 border rounded text-black"
//       >
//         <option value="" disabled>
//           Select Blood Group Required
//         </option>
//         {bloodGroups.map((group) => (
//           <option key={group} value={group}>
//             {group}
//           </option>
//         ))}
//       </select>

//       <label className="block mb-1 text-gray-700 font-medium text-sm">
//         Units Required *
//       </label>
//       <input
//         name="Units Required"
//         placeholder="Number of units needed"
//         type="number"
//         min="1"
//         value={form["Units Required"]}
//         onChange={handleChange}
//         required
//         className="w-full mb-4 p-2 border rounded text-black"
//       />

//       <label className="block mb-1 text-gray-700 font-medium text-sm">
//         Urgency Level *
//       </label>
//       <select
//         name="Urgency Level"
//         value={form["Urgency Level"]}
//         onChange={handleChange}
//         required
//         className="w-full mb-4 p-2 border rounded text-black"
//       >
//         <option value="" disabled>
//           Select Urgency Level
//         </option>
//         {urgencyLevels.map((level) => (
//           <option key={level} value={level}>
//             {level}
//           </option>
//         ))}
//       </select>
      
//       <label className="flex items-center mb-4 text-gray-700 cursor-pointer">
//         <input
//           type="checkbox"
//           name="Live Donor Required"
//           checked={form["Live Donor Required"]}
//           onChange={handleChange}
//           className="mr-2 w-4 h-4"
//         />
//         <span className="font-medium">Live Donor Required</span>
//       </label>

//       <label className="block mb-1 text-gray-700 font-medium text-sm">
//         Required By Date *
//       </label>
//       <input
//         type="date"
//         name="Required By Date"
//         value={form["Required By Date"]}
//         onChange={handleChange}
//         required
//         className="w-full mb-4 p-2 border rounded text-black"
//       />

//       <label className="block mb-1 text-gray-700 font-medium text-sm">
//         Required By Time *
//       </label>
//       <input
//         type="time"
//         name="Required By Time"
//         value={form["Required By Time"]}
//         onChange={handleChange}
//         required
//         className="w-full mb-4 p-2 border rounded text-black"
//       />

//       <label className="block mb-1 text-gray-700 font-medium text-sm">
//         Hospital Name *
//       </label>
//       <input
//         name="Hospital Name"
//         placeholder="Enter hospital name"
//         value={form["Hospital Name"]}
//         onChange={handleChange}
//         required
//         className="w-full mb-4 p-2 border rounded text-black"
//       />

//       <label className="block mb-1 text-gray-700 font-medium text-sm">
//         Hospital Location *
//       </label>
//       <textarea
//         name="Hospital Location"
//         placeholder="Enter complete hospital address"
//         value={form["Hospital Location"]}
//         onChange={handleChange}
//         required
//         rows="2"
//         className="w-full mb-4 p-2 border rounded text-black"
//       />

//       <label className="block mb-1 text-gray-700 font-medium text-sm">
//         Contact Person Name *
//       </label>
//       <input
//         name="Contact Person Name"
//         placeholder="Enter contact person's name"
//         value={form["Contact Person Name"]}
//         onChange={handleChange}
//         required
//         className="w-full mb-4 p-2 border rounded text-black"
//       />

//       <label className="block mb-1 text-gray-700 font-medium text-sm">
//         Contact Number *
//       </label>
//       <input
//         name="Contact Number"
//         placeholder="Enter contact number"
//         value={form["Contact Number"]}
//         onChange={handleChange}
//         required
//         className="w-full mb-4 p-2 border rounded text-black"
//       />

//       <label className="block mb-1 text-gray-700 font-medium text-sm">
//         Email Address *
//       </label>
//       <input
//         name="Email Address"
//         placeholder="Enter email address"
//         type="email"
//         value={form["Email Address"]}
//         onChange={handleChange}
//         required
//         className="w-full mb-4 p-2 border rounded text-black"
//       />



//       <label className="block mb-1 text-gray-700 font-medium text-sm">
//         Additional Notes
//       </label>
//       <textarea
//         name="Additional Notes"
//         placeholder="Any additional information (optional)"
//         value={form["Additional Notes"]}
//         onChange={handleChange}
//         rows="3"
//         className="w-full mb-6 p-2 border rounded text-black"
//       />

//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition disabled:bg-red-400 w-full font-semibold"
//       >
//         {isSubmitting ? "Submitting Request..." : "Submit Blood Request"}
//       </button>

//       <p className="text-xs text-gray-500 mt-4 text-center">
//         Your request will be sent to our External Affairs team immediately
//       </p>
//     </form>
//   );
// }