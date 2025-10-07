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
