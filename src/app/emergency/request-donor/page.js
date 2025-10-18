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
"use client";

import { useState } from "react";
import Link from "next/link";

export default function RequestDonorPage() {
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

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const urgencyLevels = [
    "Critical (Within 2 hours)", 
    "Urgent (Within 6 hours)", 
    "Moderate (Within 24 hours)", 
    "Planned (Within 3 days)"
  ];

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

      if (response.ok || response.status === 200) {
        return true;
      } else {
        throw new Error(`Failed to send email: ${responseText}`);
      }
    } catch (error) {
      throw error;
    }
  };

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    setIsRequestSubmitting(true);

    try {
      await sendEmail();
      alert("Blood request submitted successfully! The emergency team has been notified via email and will contact you shortly.");
      
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
      alert(`Error sending email notification: ${error.message}. Please try again or contact our helpline directly.`);
    } finally {
      setIsRequestSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-5" style={{
      background: 'linear-gradient(135deg, #0a0a1f 0%, #1a1a3f 50%, #0a0a1f 100%)',
      color: 'white'
    }}>
      <style jsx global>{`
        .request-form-container {
          max-width: 700px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.05);
          padding: 40px;
          border-radius: 25px;
          border: 2px solid rgba(46, 52, 140, 0.3);
          backdrop-filter: blur(10px);
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #2E348C;
          text-decoration: none;
          font-weight: 600;
          margin-bottom: 30px;
          transition: all 0.3s ease;
        }

        .back-link:hover {
          gap: 12px;
          color: #3d4db8;
        }

        .form-title-main {
          font-size: 2.5rem;
          font-weight: 800;
          color: #2E348C;
          margin-bottom: 10px;
          text-align: center;
        }

        .form-subtitle-text {
          text-align: center;
          color: #d1d5db;
          margin-bottom: 30px;
          font-size: 1.1rem;
          line-height: 1.6;
        }

        .urgent-indicator {
          display: inline-block;
          padding: 8px 16px;
          background: rgba(242, 34, 50, 0.2);
          border: 2px solid #F22232;
          border-radius: 50px;
          color: #F22232;
          font-weight: 700;
          font-size: 0.9rem;
          margin-bottom: 30px;
        }

        .input-field, .select-field, .textarea-field {
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

        .input-field:focus, .select-field:focus, .textarea-field:focus {
          outline: none;
          border-color: #2E348C;
          background: rgba(255, 255, 255, 0.08);
        }

        .submit-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #2E348C, #1e40af);
          color: white;
          border: none;
          border-radius: 50px;
          font-size: 1.2rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(46, 52, 140, 0.4);
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(46, 52, 140, 0.6);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .request-form-container {
            padding: 30px 20px;
          }
          .form-title-main {
            font-size: 2rem;
          }
        }
      `}</style>

      <div className="request-form-container">
        <Link href="/emergency" className="back-link">
          ← Back to Emergency Services
        </Link>

        <div style={{ textAlign: 'center' }}>
          <span className="urgent-indicator">🚨 EMERGENCY REQUEST</span>
        </div>

        <h1 className="form-title-main">Request Blood Donor</h1>
        <p className="form-subtitle-text">
          Fill out this form to request blood from our emergency donor network. 
          Our External Affairs team will be notified immediately.
        </p>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: '#d1d5db', fontWeight: 600 }}>
            Patient Name *
          </label>
          <input
            name="Patient Name"
            placeholder="Enter patient's full name"
            value={requestForm["Patient Name"]}
            onChange={handleRequestChange}
            required
            className="input-field"
          />

          <label style={{ display: 'block', marginBottom: '8px', color: '#d1d5db', fontWeight: 600 }}>
            Blood Group Required *
          </label>
          <select
            name="Blood Group Required"
            value={requestForm["Blood Group Required"]}
            onChange={handleRequestChange}
            required
            className="select-field"
          >
            <option value="">Select Blood Group Required</option>
            {bloodGroups.map((group) => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>

          <label style={{ display: 'block', marginBottom: '8px', color: '#d1d5db', fontWeight: 600 }}>
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
            className="input-field"
          />

          <label style={{ display: 'block', marginBottom: '8px', color: '#d1d5db', fontWeight: 600 }}>
            Urgency Level *
          </label>
          <select
            name="Urgency Level"
            value={requestForm["Urgency Level"]}
            onChange={handleRequestChange}
            required
            className="select-field"
          >
            <option value="">Select Urgency Level</option>
            {urgencyLevels.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', cursor: 'pointer', padding: '12px', background: 'rgba(242, 34, 50, 0.1)', borderRadius: '10px', border: '2px solid rgba(242, 34, 50, 0.3)' }}>
            <input
              type="checkbox"
              name="Live Donor Required"
              checked={requestForm["Live Donor Required"]}
              onChange={handleRequestChange}
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
            <span style={{ fontWeight: 600 }}>🔴 Live Donor Required (Direct transfusion needed)</span>
          </label>

          <label style={{ display: 'block', marginBottom: '8px', color: '#d1d5db', fontWeight: 600 }}>
            Required By Date *
          </label>
          <input
            type="date"
            name="Required By Date"
            value={requestForm["Required By Date"]}
            onChange={handleRequestChange}
            required
            className="input-field"
          />

          <label style={{ display: 'block', marginBottom: '8px', color: '#d1d5db', fontWeight: 600 }}>
            Required By Time *
          </label>
          <input
            type="time"
            name="Required By Time"
            value={requestForm["Required By Time"]}
            onChange={handleRequestChange}
            required
            className="input-field"
          />

          <label style={{ display: 'block', marginBottom: '8px', color: '#d1d5db', fontWeight: 600 }}>
            Hospital Name *
          </label>
          <input
            name="Hospital Name"
            placeholder="Enter hospital name"
            value={requestForm["Hospital Name"]}
            onChange={handleRequestChange}
            required
            className="input-field"
          />

          <label style={{ display: 'block', marginBottom: '8px', color: '#d1d5db', fontWeight: 600 }}>
            Hospital Location *
          </label>
          <textarea
            name="Hospital Location"
            placeholder="Enter complete hospital address"
            value={requestForm["Hospital Location"]}
            onChange={handleRequestChange}
            required
            rows={3}
            className="textarea-field"
          />

          <label style={{ display: 'block', marginBottom: '8px', color: '#d1d5db', fontWeight: 600 }}>
            Contact Person Name *
          </label>
          <input
            name="Contact Person Name"
            placeholder="Enter contact person's name"
            value={requestForm["Contact Person Name"]}
            onChange={handleRequestChange}
            required
            className="input-field"
          />

          <label style={{ display: 'block', marginBottom: '8px', color: '#d1d5db', fontWeight: 600 }}>
            Contact Number *
          </label>
          <input
            name="Contact Number"
            placeholder="Enter contact number"
            value={requestForm["Contact Number"]}
            onChange={handleRequestChange}
            required
            className="input-field"
          />

          <label style={{ display: 'block', marginBottom: '8px', color: '#d1d5db', fontWeight: 600 }}>
            Email Address *
          </label>
          <input
            name="Email Address"
            placeholder="Enter email address"
            type="email"
            value={requestForm["Email Address"]}
            onChange={handleRequestChange}
            required
            className="input-field"
          />

          <label style={{ display: 'block', marginBottom: '8px', color: '#d1d5db', fontWeight: 600 }}>
            Additional Notes
          </label>
          <textarea
            name="Additional Notes"
            placeholder="Any additional information (optional)"
            value={requestForm["Additional Notes"]}
            onChange={handleRequestChange}
            rows={4}
            className="textarea-field"
          />

          <button
            onClick={handleRequestSubmit}
            disabled={isRequestSubmitting}
            className="submit-btn"
          >
            {isRequestSubmitting ? "Submitting Request..." : "🆘 Submit Emergency Request"}
          </button>

          <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '0.9rem', marginTop: '20px' }}>
            Your request will be sent to our External Affairs team immediately via email
          </p>
        </div>
      </div>
    </div>
  );
}