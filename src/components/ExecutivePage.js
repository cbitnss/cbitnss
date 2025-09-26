import React from "react";
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const executives = [
  {
    name: "Nikhil",
    title: "President",
    imageUrl: "/akhilesh.png",
    socials: { facebook: "#", twitter: "#", linkedin: "#", instagram: "#" },
    message: "Leading with purpose, serving with heart. Let's make a difference together.",
  },
  {
    name: "Surya",
    title: "Vice President",
    imageUrl: "/akhilesh.png",
    socials: { facebook: "#", twitter: "#", linkedin: "#", instagram: "#" },
    message: "Community is our strength. Honored to support our team and mission.",
  },
  {
    name: "Sunny",
    title: "General Secretary",
    imageUrl: "/akhilesh.png",
    socials: { facebook: "#", twitter: "#", linkedin: "#", instagram: "#" },
    message: "Organizing today for a better tomorrow. Every detail matters.",
  },
  {
    name: "Hrushikesh",
    title: "General Secretary",
    imageUrl: "/akhilesh.png",
    socials: { facebook: "#", twitter: "#", linkedin: "#", instagram: "#" },
    message: "Driven by service and the power of collective action.",
  },
  {
    name: "Neha Sree",
    title: "General Secretary",
    imageUrl: "/akhilesh.png",
    socials: { facebook: "#", twitter: "#", linkedin: "#", instagram: "#" },
    message: "Passion and persistence can change the world. Let's get to work.",
  },
  {
    name: "Sushant",
    title: "General Secretary",
    imageUrl: "/akhilesh.png",
    socials: { facebook: "#", twitter: "#", linkedin: "#", instagram: "#" },
    message: "Creativity in service is my motto. Let's build something amazing.",
  },
  {
    name: "Rishitha",
    title: "General Secretary",
    imageUrl: "/akhilesh.png",
    socials: { facebook: "#", twitter: "#", linkedin: "#", instagram: "#" },
    message: "Connecting people, creating impact. Our story is one of unity.",
  },
  {
    name: "Shwetha",
    title: "General Secretary",
    imageUrl: "/akhilesh.png",
    socials: { facebook: "#", twitter: "#", linkedin: "#", instagram: "#" },
    message: "Designing a future where everyone feels they belong.",
  },
  {
    name: "Tanmayi",
    title: "General Secretary",
    imageUrl: "/akhilesh.png",
    socials: { facebook: "#", twitter: "#", linkedin: "#", instagram: "#" },
    message: "Service is the rent we pay for our room on Earth.",
  },
  {
    name: "Viduyulatha",
    title: "General Secretary",
    imageUrl: "/akhilesh.png",
    socials: { facebook: "#", twitter: "#", linkedin: "#", instagram: "#" },
    message: "Empowering communities through dedicated action and teamwork.",
  },
  {
    name: "Shashank",
    title: "General Secretary",
    imageUrl: "/akhilesh.png",
    socials: { facebook: "#", twitter: "#", linkedin: "#", instagram: "#" },
    message: "Innovation in service is key to lasting change.",
  },
  {
    name: "Pragna",
    title: "General Secretary",
    imageUrl: "/akhilesh.png",
    socials: { facebook: "#", twitter: "#", linkedin: "#", instagram: "#" },
    message: "Together, we can achieve the extraordinary.",
  },
  {
    name: "Varshini",
    title: "General Secretary",
    imageUrl: "/akhilesh.png",
    socials: { facebook: "#", twitter: "#", linkedin: "#", instagram: "#" },
    message: "Committed to our cause, inspired by our community.",
  }
];

const SocialIcon = ({ icon, href }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
    {icon}
  </a>
);

export default function ExecutivePage() {
  return (
    <div className="bg-black text-white py-20 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-2" style={{ color: 'var(--glow-color)' }}>
            Meet Our Executive Board
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            The dedicated team leading CBIT NSS for the 2024-2025 term, committed to making a difference.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {executives.map((executive, index) => (
            <div
              key={index}
              className="card-flipper-container"
              style={{
                animation: `card-entry 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
                animationDelay: `${index * 100}ms`,
                opacity: 0,
              }}
            >
              <div className="executive-card">
                <div className="card-front">
                  <div className="image-container">
                    <Image
                      src={executive.imageUrl}
                      alt={executive.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold glitch-text" data-text={executive.name} style={{ color: 'var(--glow-color)' }}>
                    {executive.name}
                  </h3>
                  <p className="text-gray-400 mb-4">{executive.title}</p>
                  <div className="flex justify-center space-x-4 mt-auto">
                    <SocialIcon href={executive.socials.facebook} icon={<FaFacebookF />} />
                    <SocialIcon href={executive.socials.twitter} icon={<FaTwitter />} />
                    <SocialIcon href={executive.socials.linkedin} icon={<FaLinkedinIn />} />
                    <SocialIcon href={executive.socials.instagram} icon={<FaInstagram />} />
                  </div>
                </div>
                <div className="card-back">
                  <p className="text-lg italic text-gray-300">"{executive.message}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}