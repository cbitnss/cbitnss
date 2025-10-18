"use client";

import React from "react";
import Image from "next/image";

const boardData = {
  advisory: [
    {
      name: "Akhilesh Reddy",
      title: "Chief Advisor",
      imageUrl: "/akhilesh.png",
    },
    {
      name: "Tejaswini Akula",
      title: "Advisor",
      imageUrl: "/akhilesh.png",
    },
    {
      name: "Udith Pulijala",
      title: "Advisor",
      imageUrl: "/akhilesh.png",
    },
  ],

  externalAffairs: [
    { name: "pranathi", title: "In-charge", imageUrl: "/akhilesh.png" },
    { name: "sampath", title: "In-charge", imageUrl: "/akhilesh.png" },
    { name: "sai Priya", title: "In-charge", imageUrl: "/akhilesh.png" },
    { name: "Aishwarya", title: "In-charge", imageUrl: "/akhilesh.png" },
    { name: "Wasim", title: "In-charge", imageUrl: "/akhilesh.png" },
    { name: "Komali Acharya", title: "In-charge", imageUrl: "/akhilesh.png" },
  ],
  events: [
    { name: "Nithesh", title: "In-charge", imageUrl: "/akhilesh.png" },
    { name: "Tahura", title: "In-charge", imageUrl: "/akhilesh.png" },
    { name: "Hamsini", title: "In-charge", imageUrl: "/akhilesh.png" },
    { name: "Sudha ", title: "In-charge", imageUrl: "/akhilesh.png" },
    { name: "Satya Sri", title: "In-charge", imageUrl: "/akhilesh.png" },
    { name: "Jaiveer reddy", title: "In-charge", imageUrl: "/akhilesh.png" },
  ],
  technical: [
    { name: "Sankeerth Reddy", title: "In-charge", imageUrl: "/akhilesh.png" },
    { name: "Rashmith", title: "In-charge", imageUrl: "/akhilesh.png" },
    { name: "Shreeja", title: "In-charge", imageUrl: "/akhilesh.png" },
    { name: "Kulsum", title: "In-charge", imageUrl: "/akhilesh.png" },
    { name: "Devi", title: "In-charge", imageUrl: "/akhilesh.png" },
    { name: "Eeshan", title: "In-charge", imageUrl: "/akhilesh.png" },
  ],
  design: [
    { name: "Samiksha", title: "In-charge", imageUrl: "/akhilesh.png" },
    { name: "Ishwarya", title: "In-charge", imageUrl: "/akhilesh.png" },
    { name: "Lohitha", title: "In-charge", imageUrl: "/akhilesh.png" },
    { name: "Nomini", title: "In-charge", imageUrl: "/akhilesh.png" },
    { name: "Ratna Teja", title: "In-charge", imageUrl: "/akhilesh.png" },
    { name: "Neha Reddy", title: "In-charge", imageUrl: "/akhilesh.png" },
  ],
  mediaPublicity: [
    { name: "Sriniketh", title: "In-charge", imageUrl: "/akhilesh.png" },
    { name: "Varun", title: "In-charge", imageUrl: "/akhilesh.png" },
    { name: "Bhargavi", title: "In-charge", imageUrl: "/akhilesh.png" },
    { name: "Rukmini", title: "In-charge", imageUrl: "/akhilesh.png" },
    { name: "Mahima", title: "In-charge", imageUrl: "/akhilesh.png" },
    { name: "Usha", title: "In-charge", imageUrl: "/akhilesh.png" },
  ],
};

const MemberCard = ({ member, index }) => (
  <div
    className="member-card"
    style={{
      animation: `fadeInUp 0.6s ease-out forwards`,
      animationDelay: `${index * 0.1}s`,
      opacity: 0,
    }}
  >
    <div className="card-inner">
      <div className="image-wrapper">
        <Image
          src={member.imageUrl}
          alt={member.name}
          fill
          className="card-img"
        />
        <div className="image-overlay"></div>
      </div>
      <div className="card-body">
        <h3 className="member-name">{member.name}</h3>
        <h4 className="member-title">{member.title}</h4>
      </div>
    </div>
  </div>
);

const TeamSection = ({ title, members, titleColor = "#2E348C" }) => (
  <section className="team-section">
    <h1 className="cat-title" style={{ color: titleColor }}>
      {title}
    </h1>
    <div className="team-cards">
      {members.map((member, index) => (
        <MemberCard key={index} member={member} index={index} />
      ))}
    </div>
  </section>
);

export default function ExecutivePage() {
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

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .executive-page {
          background: linear-gradient(135deg, #0a0a1f 0%, #1a1a3f 50%, #0a0a1f 100%);
          min-height: 100vh;
          padding: 80px 0;
        }

        .page-header {
          text-align: center;
          margin-bottom: 60px;
          padding: 0 20px;
        }

        .page-title {
          font-size: 3.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #2E348C, #F22232, #F2F2F2);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 16px;
          animation: shimmer 3s ease-in-out infinite;
        }

        .page-subtitle {
          font-size: 1.25rem;
          color: #9ca3af;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .team-section {
          margin-bottom: 80px;
          padding: 0 20px;
        }

        .cat-title {
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 50px;
          position: relative;
          padding-bottom: 20px;
        }

        .cat-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 4px;
          background: linear-gradient(90deg, transparent, currentColor, transparent);
          border-radius: 2px;
        }

        .team-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
          justify-items: center;
        }

        .team-cards .member-card {
          width: 100%;
          max-width: 350px;
        }

        .member-card {
          perspective: 1000px;
        }

        .card-inner {
          position: relative;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 2px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }

        .card-inner:hover {
          transform: translateY(-10px) scale(1.02);
          border-color: rgba(46, 52, 140, 0.5);
          box-shadow: 
            0 20px 40px rgba(46, 52, 140, 0.3),
            0 0 60px rgba(242, 34, 50, 0.2),
            inset 0 0 20px rgba(255, 255, 255, 0.05);
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          height: 320px;
          overflow: hidden;
        }

        .card-img {
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-inner:hover .card-img {
          transform: scale(1.1);
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(10, 10, 31, 0.3) 50%,
            rgba(10, 10, 31, 0.9) 100%
          );
          transition: opacity 0.4s ease;
        }

        .card-inner:hover .image-overlay {
          opacity: 0.7;
        }

        .card-body {
          padding: 24px;
          text-align: center;
          background: rgba(10, 10, 31, 0.6);
          backdrop-filter: blur(10px);
        }

        .member-name {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 8px;
          letter-spacing: 0.5px;
          transition: color 0.3s ease;
        }

        .card-inner:hover .member-name {
          color: #F22232;
        }

        .member-title {
          font-size: 1rem;
          color: #9ca3af;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: color 0.3s ease;
        }

        .card-inner:hover .member-title {
          color: #2E348C;
        }

        @media (max-width: 1024px) {
          .team-cards {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .page-title {
            font-size: 2.5rem;
          }

          .cat-title {
            font-size: 2rem;
          }

          .team-cards {
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
          }

          .image-wrapper {
            height: 280px;
          }
        }

        @media (max-width: 480px) {
          .page-title {
            font-size: 2rem;
          }

          .cat-title {
            font-size: 1.75rem;
          }

          .team-cards {
            grid-template-columns: 1fr;
            gap: 25px;
          }
        }
      `}</style>

      <div className="executive-page">
        <div className="page-header">
          <h1 className="page-title">Meet Our Executive Board</h1>
          <p className="page-subtitle">
            The dedicated team leading CBIT NSS for the 2026-2026 term, committed to making a difference in our community.
          </p>
        </div>

        <TeamSection
          title="Advisory Board"
          members={boardData.advisory}
          titleColor="#F22232"
        />

        <TeamSection
          title="External Affairs Team"
          members={boardData.externalAffairs}
          titleColor="#F22232"
        />

        <TeamSection
          title="Events Team"
          members={boardData.events}
          titleColor="#F22232"
        />

        <TeamSection
          title="Technical Team"
          members={boardData.technical}
          titleColor="#F22232"
        />

        <TeamSection
          title="Design Team"
          members={boardData.design}
          titleColor="#F22232"
        />

        <TeamSection
          title="Media & Publicity Team"
          members={boardData.mediaPublicity}
          titleColor="#F22232"
        />
      </div>
    </>
  );
}