"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function EmergencyServicesMain() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "Who can donate blood?",
      answer: "Anyone between 18-65 years, weighing at least 45 kg, with a BMI between 18.5-25, and in good health can donate blood. You must not have donated in the last 3 months."
    },
    {
      question: "How often can I donate blood?",
      answer: "You can donate whole blood every 3 months (90 days). This gap allows your body to replenish the donated blood cells and maintain healthy iron levels."
    },
    {
      question: "Is blood donation safe?",
      answer: "Yes, blood donation is completely safe. Sterile, disposable equipment is used for each donor, and the process is supervised by trained medical professionals."
    },
    {
      question: "How long does the donation process take?",
      answer: "The entire process takes about 30-45 minutes, including registration, health screening, donation (10-15 minutes), and refreshments. The actual blood collection takes only 10-15 minutes."
    },
    {
      question: "What should I do before donating blood?",
      answer: "Get a good night's sleep, eat a healthy meal 3 hours before donation, drink plenty of water, avoid fatty foods, and bring a valid ID proof."
    },
    {
      question: "How quickly can I get a donor for an emergency request?",
      answer: "Our emergency response team works 24/7 to connect you with donors. In critical cases, we aim to respond within 2-6 hours depending on blood type availability and location."
    },
    {
      question: "What information do I need to request blood?",
      answer: "You'll need patient details, required blood group, number of units, urgency level, hospital information, and contact details. Our team will guide you through the process."
    },
    {
      question: "Do you charge for blood donation services?",
      answer: "No, NSS CBIT provides this service completely free of charge. However, hospital charges for blood processing and storage may apply."
    }
  ];

  const impactStats = [
    {
      number: "650+",
      label: "Units Collected Last Year",
      icon: "💉"
    },
    {
      number: "50+",
      label: "Emergency Requests Fulfilled",
      icon: "🚨"
    },
    {
      number: "350+",
      label: "Active Registered Donors",
      icon: "❤️"
    }
  ];

  return (
    <>
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 500px;
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .emergency-page {
          background: linear-gradient(135deg, #0a0a1f 0%, #1a1a3f 50%, #0a0a1f 100%);
          min-height: 100vh;
          color: white;
        }

        .hero-section {
          padding: 100px 20px 80px;
          text-align: center;
          background: linear-gradient(180deg, rgba(242, 34, 50, 0.1) 0%, transparent 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 70vh;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 30px;
          background: linear-gradient(135deg, #F22232, #ffffff);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: fadeInUp 0.8s ease-out;
          text-align: center;
        }

        .hero-subtitle {
          font-size: 1.5rem;
          color: #d1d5db;
          max-width: 900px;
          margin: 0 auto 40px;
          line-height: 1.8;
          animation: fadeInUp 0.8s ease-out 0.2s both;
          text-align: center;
        }

        .cta-buttons {
          display: flex;
          gap: 30px;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          animation: fadeInUp 0.8s ease-out 0.4s both;
        }

        .cta-button {
          padding: 24px 70px;
          font-size: 1.4rem;
          font-weight: 700;
          border-radius: 15px;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          display: inline-block;
          min-width: 320px;
          text-align: center;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .cta-button:hover::before {
          width: 300px;
          height: 300px;
        }

        .cta-button span {
          position: relative;
          z-index: 1;
        }

        .donate-button {
          background: linear-gradient(135deg, #F22232, #dc2626);
          color: white;
          box-shadow: 0 10px 30px rgba(242, 34, 50, 0.4);
        }

        .donate-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(242, 34, 50, 0.6);
        }

        .request-button {
          background: linear-gradient(135deg, #2E348C, #1e40af);
          color: white;
          box-shadow: 0 10px 30px rgba(46, 52, 140, 0.4);
        }

        .request-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(46, 52, 140, 0.6);
        }

        .impact-section {
          padding: 80px 20px;
          text-align: center;
        }

        .section-title {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 20px;
          color: #F22232;
        }

        .section-description {
          font-size: 1.2rem;
          color: #d1d5db;
          max-width: 900px;
          margin: 0 auto 60px;
          line-height: 1.8;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto 60px;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.05);
          padding: 40px 30px;
          border-radius: 20px;
          border: 2px solid rgba(242, 34, 50, 0.3);
          transition: all 0.4s ease;
          backdrop-filter: blur(10px);
        }

        .stat-card:hover {
          transform: translateY(-10px);
          border-color: #F22232;
          box-shadow: 0 20px 40px rgba(242, 34, 50, 0.3);
          animation: pulse 1s ease-in-out infinite;
        }

        .stat-icon {
          font-size: 4rem;
          margin-bottom: 20px;
        }

        .stat-number {
          font-size: 3rem;
          font-weight: 800;
          color: #F22232;
          margin-bottom: 10px;
        }

        .stat-label {
          font-size: 1.1rem;
          color: #d1d5db;
        }

        .images-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .impact-image {
          position: relative;
          height: 300px;
          border-radius: 20px;
          overflow: hidden;
          border: 2px solid rgba(255, 255, 255, 0.1);
          transition: all 0.4s ease;
        }

        .impact-image:hover {
          transform: scale(1.05);
          border-color: #F22232;
          box-shadow: 0 20px 40px rgba(242, 34, 50, 0.4);
        }

        .faq-section {
          padding: 80px 20px;
          background: rgba(255, 255, 255, 0.02);
        }

        .faq-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .faq-item {
          margin-bottom: 20px;
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .faq-item:hover {
          border-color: rgba(242, 34, 50, 0.5);
        }

        .faq-question {
          padding: 25px 30px;
          background: rgba(255, 255, 255, 0.05);
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1.2rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .faq-question:hover {
          background: rgba(242, 34, 50, 0.1);
        }

        .faq-icon {
          font-size: 1.5rem;
          transition: transform 0.3s ease;
        }

        .faq-icon.open {
          transform: rotate(180deg);
        }

        .faq-answer {
          padding: 0 30px;
          max-height: 0;
          overflow: hidden;
          transition: all 0.4s ease;
          background: rgba(0, 0, 0, 0.2);
        }

        .faq-answer.open {
          padding: 25px 30px;
          max-height: 500px;
          animation: slideDown 0.4s ease;
        }

        .faq-answer p {
          color: #d1d5db;
          line-height: 1.8;
          font-size: 1.05rem;
        }

        .collaboration-section {
          padding: 80px 20px;
          text-align: center;
        }

        .collab-card {
          max-width: 800px;
          margin: 0 auto;
          padding: 50px;
          background: linear-gradient(135deg, rgba(242, 34, 50, 0.1), rgba(46, 52, 140, 0.1));
          border-radius: 25px;
          border: 2px solid rgba(242, 34, 50, 0.3);
          backdrop-filter: blur(10px);
        }

        .collab-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 20px;
          color: #F22232;
        }

        .collab-description {
          font-size: 1.2rem;
          color: #d1d5db;
          line-height: 1.8;
        }

        .helpline-section {
          padding: 80px 20px;
          text-align: center;
          background: rgba(242, 34, 50, 0.05);
        }

        .helpline-card {
          max-width: 600px;
          margin: 0 auto;
          padding: 40px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          border: 2px solid #F22232;
          backdrop-filter: blur(10px);
        }

        .helpline-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 30px;
          color: #F22232;
        }

        .helpline-contact {
          margin-bottom: 20px;
        }

        .contact-name {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .contact-number {
          font-size: 1.8rem;
          font-weight: 700;
          color: #F22232;
          letter-spacing: 1px;
        }

        .emergency-badge {
          display: inline-block;
          padding: 10px 20px;
          background: #F22232;
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 600;
          margin-top: 20px;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.2rem;
          }

          .section-title {
            font-size: 2.2rem;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
            width: 100%;
          }

          .cta-button {
            width: 85%;
            max-width: 450px;
            padding: 22px 50px;
            font-size: 1.3rem;
            min-width: unset;
          }
        }

        @media (max-width: 480px) {
          .cta-button {
            width: 90%;
            padding: 20px 40px;
            font-size: 1.2rem;
          }
        }
      `}</style>

      <div className="emergency-page">
        {/* Hero Section */}
        <section className="hero-section">
          <h1 className="hero-title">
            Be a Life Saver – Donate Blood Today!
          </h1>
          <p className="hero-subtitle">
            Welcome to the Blood Donation & Emergency Response Platform of CBIT NSS. 
            Your generosity can save lives in critical moments. Join our community of heroes 
            and make a lasting impact through the gift of blood donation.
          </p>
          <div className="cta-buttons">
            <Link href="/emergency/become-donor" className="cta-button donate-button">
              <span>become Blood-donor</span>
            </Link>
            <Link href="/emergency/request-donor" className="cta-button request-button">
              <span>Request Blood donor</span>
            </Link>
          </div>
        </section>

        {/* Impact Section */}
        <section className="impact-section">
          <h2 className="section-title">Our Life-Saving Impact</h2>
          <p className="section-description">
            At CBIT NSS, we take pride in our commitment to saving lives through regular blood donation 
            drives and emergency response services. Last year alone, our dedicated volunteers and donors 
            came together to create a remarkable impact in our community.
          </p>

          <div className="stats-grid">
            {impactStats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="images-grid">
            <div className="impact-image">
              <Image
                src="/bd1.jpg"
                alt="Blood Donation Camp"
                fill
                style={{ objectFit: 'cover' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.style.background = 'linear-gradient(135deg, #F22232, #2E348C)';
                  e.target.parentElement.style.display = 'flex';
                  e.target.parentElement.style.alignItems = 'center';
                  e.target.parentElement.style.justifyContent = 'center';
                  const text = document.createElement('div');
                  text.textContent = 'Blood Donation Camp';
                  text.style.fontSize = '1.5rem';
                  text.style.fontWeight = '700';
                  text.style.textAlign = 'center';
                  e.target.parentElement.appendChild(text);
                }}
              />
            </div>
            <div className="impact-image">
              <Image
                src="/bd2.jpg"
                alt="Emergency Response Team"
                fill
                style={{ objectFit: 'cover' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.style.background = 'linear-gradient(135deg, #2E348C, #F22232)';
                  e.target.parentElement.style.display = 'flex';
                  e.target.parentElement.style.alignItems = 'center';
                  e.target.parentElement.style.justifyContent = 'center';
                  const text = document.createElement('div');
                  text.textContent = 'Emergency Response';
                  text.style.fontSize = '1.5rem';
                  text.style.fontWeight = '700';
                  text.style.textAlign = 'center';
                  e.target.parentElement.appendChild(text);
                }}
              />
            </div>
            <div className="impact-image">
              <Image
                src="/bd3.jpg"
                alt="Donor Appreciation"
                fill
                style={{ objectFit: 'cover' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.style.background = 'linear-gradient(135deg, #F22232, #2E348C)';
                  e.target.parentElement.style.display = 'flex';
                  e.target.parentElement.style.alignItems = 'center';
                  e.target.parentElement.style.justifyContent = 'center';
                  const text = document.createElement('div');
                  text.textContent = 'Donor Appreciation';
                  text.style.fontSize = '1.5rem';
                  text.style.fontWeight = '700';
                  text.style.textAlign = 'center';
                  e.target.parentElement.appendChild(text);
                }}
              />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <h2 className="section-title text-center mb-4">Frequently Asked Questions</h2>
          <p className="section-description text-center mb-8">
            Have questions about blood donation? We've got answers to help you understand 
            the process and make an informed decision.
          </p>

          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <div
                  className="faq-question"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  <span>{faq.question}</span>
                  <span className={`faq-icon ${openFAQ === index ? 'open' : ''}`}>
                    ▼
                  </span>
                </div>
                <div className={`faq-answer ${openFAQ === index ? 'open' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Collaboration Section */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto bg-black/40 backdrop-blur-sm rounded-xl p-8 hover:bg-black/50 transition-all duration-300">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Partnership with Lions Club</h2>
                <p className="text-gray-300 leading-relaxed">
                  Last year, CBIT NSS proudly collaborated with Lions Club Hyderabad for a mega 
                  blood donation drive. Together, we organized donation camp in the college campus, 
                  bringing together volunteers, donors, and medical professionals to create a 
                  significant impact. This partnership exemplifies our commitment to community 
                  service and saving lives through collaborative efforts.
                </p>
                <a href="https://www.lionsclubs.org" target="_blank" rel="noopener noreferrer" 
                   className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mt-4">
                  <span>Visit Lions Club International</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
              <div className="w-32 h-32 md:w-40 md:h-40 relative flex-shrink-0">
                <Image
                  src="/lionslogo.png"
                  alt="Lions Club Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Compact Emergency Helpline */}
        <div className="fixed bottom-6 right-6 bg-[#F22232] rounded-full px-6 py-3 shadow-lg flex items-center gap-4 hover:bg-[#d41e2d] transition-all cursor-pointer">
          <div className="text-white">
            <div className="text-sm font-medium">Emergency Helpline</div>
            <div className="text-lg font-bold">+91 7396998809</div>
          </div>
          <div className="bg-white rounded-full p-2">
            <span className="text-xl">📞</span>
          </div>
        </div>
      </div>
    </>
  );
}