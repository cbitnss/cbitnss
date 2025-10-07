import React from "react";
import Image from "next/image";

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
  }
];

// Inline SVG icons to avoid react-icons dependency
const FacebookIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07C2 17.09 5.66 21.18 10.44 22v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22C18.34 21.18 22 17.09 22 12.07z"/>
  </svg>
);

const TwitterIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.633 7.997c.013.18.013.361.013.542 0 5.53-4.21 11.91-11.91 11.91-2.37 0-4.574-.694-6.427-1.886.33.038.66.051.997.051 1.964 0 3.772-.67 5.21-1.797-1.838-.038-3.387-1.247-3.924-2.915.256.038.512.064.78.064.377 0 .754-.051 1.106-.144-1.918-.388-3.367-2.078-3.367-4.106v-.051c.56.312 1.205.5 1.89.525-1.12-.75-1.858-2.027-1.858-3.47 0-.765.205-1.48.56-2.097 2.056 2.523 5.138 4.18 8.607 4.355-.064-.3-.103-.61-.103-.92 0-2.245 1.824-4.07 4.07-4.07 1.17 0 2.225.494 2.967 1.285.93-.18 1.803-.524 2.588-.994-.305.956-.956 1.757-1.807 2.26.827-.09 1.617-.32 2.35-.647-.548.82-1.243 1.54-2.044 2.12z"/>
  </svg>
);

const LinkedInIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.85-3.037-1.851 0-2.133 1.445-2.133 2.94v5.666H9.36V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.368-1.85 3.6 0 4.267 2.368 4.267 5.448v6.293zM5.337 7.433c-1.144 0-2.07-.927-2.07-2.07 0-1.144.926-2.07 2.07-2.07s2.07.926 2.07 2.07c0 1.143-.926 2.07-2.07 2.07zM6.98 20.452H3.694V9H6.98v11.452z"/>
  </svg>
);

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zM12 7.5A4.5 4.5 0 1 0 12 16.5 4.5 4.5 0 1 0 12 7.5zm0 2A2.5 2.5 0 1 1 12 14.5 2.5 2.5 0 1 1 12 9.5zM17.8 6.2a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8z"/>
  </svg>
);

const SocialIcon = ({ icon, href }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
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
                    <SocialIcon href={executive.socials.facebook} icon={<FacebookIcon />} />
                    <SocialIcon href={executive.socials.twitter} icon={<TwitterIcon />} />
                    <SocialIcon href={executive.socials.linkedin} icon={<LinkedInIcon />} />
                    <SocialIcon href={executive.socials.instagram} icon={<InstagramIcon />} />
                  </div>
                </div>
                <div className="card-back">
                  <p className="text-lg italic text-gray-300">"{executive.message || 'Committed to service.'}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}