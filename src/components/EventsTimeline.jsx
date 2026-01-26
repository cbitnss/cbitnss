"use client";
import React, { useEffect, useRef, useState } from "react";
import HacksmithStickySection from "./hacksmith-sticky-section";

// UPDATED EVENTS
const EVENTS = [
  {
    id: "1",
    title: "Arangetra — Cultural Extravaganza",
    description:
      "Arangetra is our flagship cultural event where students showcase dance, music and theatre. It  was three days of total craziness, laughter, and nonstop fun! From the messy chaos of Break Tissue Make Tissue to wobbling like crazy in Slow Cycle, the days were full of hilarious moments. Some tried to be sneaky in Monopoly, while others ran, tumbled, and screamed through Dashing Duo and the Team Roller Board Race. Trust Me Bro had everyone yelling instructions and laughing till their stomachs hurt, and the giant Sumo battles? Pure comic gold! Three days of madness, giggles, friendly fights, and memories that will keep everyone smiling forever!",
    images: ["/arang2.jpg", "/arang1.jpg", "/arang3.jpg"]
  },
  {
    id: "2",
    title: "Blanket Donation",
    description: "This winter, the CBIT NSS Unit organized a heartfelt Blanket Donation Drive, where volunteers stepped out at night to distribute warm blankets to people sleeping outdoors. With 100+ blankets donated, the initiative aimed to bring comfort during the cold weather while fostering compassion and social responsibility among students.The drive was both impactful and uplifting — a reminder of how meaningful even a small act of kindness can be. Sharing smiles, brief conversations, and warmth reinforced the true spirit of service that NSS stands for.",
    images: ["/Blanket2.jpg", "/BlanketDonation2.PNG","/BlanketDonation3.PNG","/BlanketDonation4.PNG"]
  },
  {
    id: "3",
    title: "TFT Chandippa",
    description: " As part of our Tales From Town initiative, we visited the potters’ community in Chandippa to explore the stories shaped by their hands and their craft. Our volunteers spent the day interacting with local potters, learning about their lifestyle, documenting their challenges, and capturing their heartfelt experiences.From watching live pottery take form to hearing the inspiring journeys behind each creation, the session was both insightful and enjoyable. It offered us a refreshing glimpse into a traditional art that continues to thrive through passion and perseverance.Tales From Town truly brought us closer to the roots of our community and reminded us of the beauty in everyday craftsmanship",
    images: ["/placeholder1.jpg", "/placeholder2.jpg"]
  },
   {
    id: "31",
    title: "Girl Child Day (orphanage-Nalanagar)",
    description:
      "On International Girl Child Day, the heartwarming day was spent at a local orphanage, empowering young girls through self-defence training, safety awareness, and open conversations on good and bad touch and menstrual hygiene. Our goal was to inspire young minds and equip them with tools that empower and protect them The day ended with colourful poster-making and lots of smiles — a beautiful reminder of how confidence grows when children feel safe, supported, and heard.",
    images: ["/GirlChildNalanagar1.jpeg", "/GirlChildNalanagar2.jpeg","/GirlChildNalanagar3.jpeg","/GirlChildNalanagar4.jpeg","/GirlChildNalanagar5.jpeg"]
  },
  {
    id: "4",
    title: "Food donation drive",
    description: "On 29th September, as floods struck Chaderghat, CBIT NSS stepped forward to support affected families in their time of need. The drive provided meals to over 250 people at the rescue camp, offering comfort and hope during a challenging period. We extend our gratitude to the Hyderabad City Police for their support in ensuring the smooth and effective execution of this effort.",
    images: ["/FoodDonation1.jpeg", "/FoodDonation2.jpeg","/FoodDonation3.jpeg","/FoodDonation4.jpeg"]
  },
  {
    id: "5",
    title: "Teachers day-2025",
    description:
     "This Teacher’s Day, we celebrated the mentors who shape our journey with a fun and refreshing segment titled Out of Syllabus. Instead of students answering the questions, we turned the tables and placed our teachers in the spotlight, asking them light-hearted and unexpected questions that filled the room with laughter and warmth.The event blended joy, appreciation, and heartfelt moments as we honoured the educators. Each teacher left with a rose, a smile, and the love of the NSS family — a small gesture of gratitude for their constant guidance and inspiration.",
    images: ["/Teacher20251.JPG", "/Teacher20252.jpg","/Teacher20253.jpg","/Teacher20254.jpg","/Teacher20256.jpg","/Teacher20258.jpg"]
  },
  {
    id: "6",
    title: "Pcos",
    description:
      "The PCOS Awareness Event opened a gentle space where unspoken stories found voice and understanding began. With Dr. Priti Challa’s compassionate insights, we shed light on the unseen struggles of PCOS — its challenges, its myths, and the quiet strength carried by so many.The session empowered students to listen, learn, and speak openly, reminding us that awareness is both healing and transformative. Together, we took a small but powerful step toward breaking stigma and nurturing a community of empathy and support.",
    images: ["/PCOS1.jpg", "/PCOS2.jpg","/PCOS3.jpg","/PCOS4.jpg","/PCOS5.jpg","/PCOS6.jpg"]
  },
  {
    id: "7",
    title: "Clay ganesh orphanage",
    description:
      "On the occasion of Ganesh Chaturthi, the day was joyfully spent at an orphanage where children enthusiastically crafted eco-friendly Ganesh idols. The space buzzed with laughter, creativity, and festive spirit as the kids shaped clay and enjoyed playful moments together. Fun activities, games, and their bright energy made the entire day lively and heartwarming. The celebration became truly special, blending tradition with togetherness and creating memories to cherish. ",
    images: ["/placeholder1.jpg", "/placeholder2.jpg"]
  },
   {
    id: "8",
    title: "Anti ragging walk ",
    description:
      " 'Change begins with one voice: yours.' This Anti-Ragging Day, NSS CBIT marched not just through corridors , but straight into hearts.When footsteps alone couldn’t convey it all, a powerful Nukkad Natak 🎭 by the United Dance Crew (UDC) brought the message alive — turning awareness into action and voices into strength.Together, we stand strong to build a campus that celebrates friendship — not fear. ",
    images: ["/antiraggingwalk_1.HEIC", "/antiraggingwalk_2.HEIC","/antiraggingwalk_3.HEIC","/antiraggingwalk_4.HEIC",]
  },
   {
    id: "9",
    title: "Tft shilparamam",
    description:
      "At Shilparamam, we walked not just among crafts, but among stories. Tales from Town led us into the lives of artisans whose resilience is woven quietly into every piece they create. What began as a fun, engaging activity became a heartfelt reminder of the realities we rarely see  the strength, the struggle, and the soul behind each handcrafted work. It left everyone inspired to appreciate art not just for its beauty, but for the dedication and passion that bring it to life",
    images: ["/placeholder1.jpg", "/placeholder2.jpg"]
  },
   {
    id: "10",
    title: "Anti Drug drive",
    description:
      "The Anti-Drug Drive centred around the thought, ‘Small high spoils life, real high builds life.’The session explained in an easy and engaging way how even small risks can lead to big consequences Students were encouraged to think, respond, and understand why healthy choices matter.With simple examples and clear messages, it created a strong reminder to stay focused, positive, and drug-free",
    images: ["/placeholder1.jpg", "/placeholder2.jpg"]
  },
  {
    id: "11",
    title: "Euphoria ",
    description:
      "Brimming with warmth and youthful exuberance, Euphoria unfolded as a graceful celebration, honouring the Executive Board of 2023–2024. The seniors who steered the team with dedication were fondly acknowledged for their guidance and commitment. The evening sparkled with lively moments, cheerful camaraderie, and spirited dancing. With the esteemed faculty gracing the occasion, Euphoria became a truly memorable gathering filled with gratitude, joy, and festive charm",
    images: ["/Euphoria1.jpg", "/Euphoria2.jpg", "/Euphoria3.jpg", "/Euphoria4.jpg", "/Euphoria5.jpg"]
  },
  {
    id: "12",
    title: "Women's Day — Celebrating Empowerment",
    description:
      "On Women’s Day, a special session was held featuring Dr. Tejaswini Manognya, whose inspiring presence added depth and meaning to the occasion. Her thoughtful insights, real-life experiences, and empowering message left the audience truly motivated. She spoke about confidence, resilience, and the importance of women supporting one another. The atmosphere was filled with admiration, encouragement, and a renewed sense of appreciation for the strength and achievements of women.",
    images: ["/womday1.jpg", "/womday2.jpg", "/womday3.jpg"]
  },
  {
    id: "13",
    title: "TFT Charminar",
    description:
      "Add event description here. This is a placeholder event that you can customize with your own details, images and information.",
    images: ["/placeholder1.jpg", "/placeholder2.jpg"]
  },
  {
    id: "14",
    title: "Blood Donation Drive — Save Lives",
    description:
      " On 6th and 7th February, NSS CBIT, in collaboration with the Lions Club, organized a highly successful blood donation camp that brought together the CBIT community for a life-saving cause. Both faculty members and students actively participated, demonstrating remarkable generosity and social responsibility. The camp collected an impressive total of 470 units of blood, making a significant contribution to local hospitals and patients in need. Events like these highlight the spirit of compassion, unity, and service that defines NSS CBIT, proving how small efforts can create a profound impact on the lives of many.",
    images: ["/bd1.jpg", "/bd2.jpg", "/bd3.jpg"]
  },
  {
    id: "15",
    title: "Khadi",
    description:
      "Celebrating the spirit of India through its timeless craft, Khadi, this event highlighted heritage, sustainability, and pride. The event celebrated handloom artisans, revived support for indigenous industries, and encouraged students to embrace Khadi in their everyday lives.In collaboration with Khadi India and the Telangana Khadi and Village Industries Commission(KVIC), NSS members showcased Khadi’s cultural, economic, and social significance through debates, quizzes, essay competitions, and interactive sessions.  By weaving together patriotism with sustainability, the initiative inspired the youth to appreciate India’s rich traditions while taking an active role in building a self-reliant and eco-conscious future.",
    images: ["/placeholder1.jpg", "/placeholder2.jpg"]
  },
  {
    id: "16",
    title: "YUVA — National Youth Contest",
    certificateUrl: "https://drive.google.com/drive/folders/1_nrtAadXdIIVKLdZTaX_Z2_R7kbTIepE", // Add the actual link from certificates page
    description:
      "YUVA 2025 united talented youth from across India in a national-level contest celebrating leadership, creativity, and social impact. Through debates, cultural performances, tech challenges, and a village immersion to identify local issues and propose solutions, participants showcased their skills and potential. NSS managed the event with energy and dedication, while the final round was judged by Manoj Khanna (NSS National President Medal awardee), Aneboina Nikhil (Founder of NSS Yuva), and Yamini Arlibandi (National-level State Cultural Representative). YUVA 2025 was a vibrant platform for expression, collaboration, and turning ideas into action.",
    images: ["/yuva1.jpg", "/yuva2.jpg", "/yuva3.jpg"]
  },
  {
    id: "17",
    title: "Village Camp — Community Connection",
    certificateUrl: "https://drive.google.com/drive/folders/1tHAFFCZOrYf8PLIx1ghGxaDMM-mMScDU", // Add the actual link from certificates page
    description:
      "From 19 to 21 December 2024, CBITNSS embarked on a transformative 3-day Village Camp in Chinna Shahpur, bringing health, education, and hope to the community. The program featured free medical checkups, hygiene awareness sessions, and fun, educational activities for local children. Beyond the services, students immersed themselves in village life—conducting surveys, interacting with schoolchildren, and understanding the challenges faced by the residents. Group activities fostered genuine connections between students and villagers, turning every interaction into a shared learning experience. The camp was more than outreach—it was a journey of empathy, service, and inspiring a brighter, healthier tomorrow.",
    images: ["/vcamp1.jpg", "/vcamp2.jpg", "/vcamp3.jpg"]
  },
  {
    id: "18",
    title: "Be My Santa — Festive Giving",
    description:
      "Be My Santa” was a heartwarming initiative, bringing the spirit of giving to life. Students visited a local children’s orphanage, where the children’s wishes were thoughtfully written on chits and displayed on the campus Christmas tree. Each student picked a chit and personally fulfilled the wish, turning simple gestures into moments of joy. Acting as a bridge between the orphanage and the campus, NSS CBIT transformed the festive season into a celebration of compassion, kindness, and community, leaving a lasting impact on both the children and the students",
    images: ["/santa1.jpg", "/santa2.jpg", "/santa3.jpg"]
  },
  {
    id: "19",
    title: "Watch for cause ",
    description:
      " On October 30th,a lively and impactful fundraiser titled “Watch for a Cause was conducted .The iconic film Gabbar Singh was screened at CBIT, drawing over 670 enthusiastic students. The event aimed to raise funds for the upcoming NSS Village Camp and successfully collected around ₹27,000 through ticket sales. Watch for a Cause turned a simple movie screening into a powerful initiative, perfectly blending the campus’s love for cinema with a strong commitment to community service. The event not only entertained but also united students in a shared purpose, reflecting the true spirit of NSS and the CBIT student community.",
    images: ["/watch1.jpeg", "/watch2.jpeg"]
  },
  {
    id: "20",
    title: "NSS Summit — College Collaboration",
    description:
      "NOT ME, BUT YOU! the first Inter-College NSS Summit Hyderabad set out to strengthen connectivity between NSS units across institutions. Representatives from IIT Hyderabad, SNIST, VNR VJIET, KLH, GCET, JNGPC, GRIET, and MVSR participated in a series of collaborative interactions and shared learning experiences. Individually, every NSS unit carries the same motto and drive to serve but together, that commitment can create a far greater impact. This summit bridged the long-standing gap in interaction between teams, enabling meaningful exchanges and new connections. The experience sparked fresh perspectives, stronger networks, and a renewed sense of collective purpose.",
    images: ["/sum1.jpg", "/sum2.jpg", "/sum3.jpg", "/sum4.jpg"]
  },
  {
    id: "21",
    title: "Cleanliness drive",
    description:
      " Cleanliness is not just a responsibility it’s a way of life. Inspired by the Swachhata Hi Seva initiative, the day focused on encouraging cleaner surroundings and nurturing a shared sense of responsibility within the community.A brief visit to Zilla Parishad High School, Gandipet added a touch of joy to the day, with light moments shared alongside the students. Small steps like these bring us closer to a healthier, more sustainable future.",
    images: ["/cleanliness1.jpg", "/cleanliness2.jpg","/cleanliness4.jpg","/cleanliness5.jpg","/cleanliness7.jpg","/cleanliness8.jpg"]
  },
  {
    id: "22",
    title: "Girl child day 2024",
    description:
      "The day unfolded with powerful performances and meaningful messages celebrating and empowering young girls. With collaboration from clubs like Chhaaya, United Dance Crew, Chaitanya Geethi, Chaitanya Vaadya, and Chaitanya Suraksha, the event showcased a captivating street play, energetic dance acts, and impactful musical pieces that highlighted the importance of equality. More than a celebration, it became a call to action encouraging everyone to raise awareness, stand for empowerment, and work toward a more inclusive future.",
    images: ["/placeholder1.jpg", "/placeholder2.jpg"]
  },
  {
    id: "23",
    title: "Clay Ganesh Making — Creative Engagement (school)",
    description:
      "This event brings a creative and eco-friendly Clay Ganesh workshop to Zilla Parishad High School Gandipet, giving students a chance to explore hands-on learning and the essence of sustainable celebrations. Their excitement fills the space as they craft meaningful pieces, discovering joy in art, tradition, and environmental awareness. The experience beautifully blends culture, creativity, and conscious living.",
    images: ["/clayg1.jpg", "/clayg2.jpg", "/clayg3.jpg"]
  },
  {
    id: "24",
    title: "Orientation — Welcome to NSS",
    description:
      "CBIT NSS welcomed new volunteers and introduced them to the club's mission, values and activities. Orientation sessions help new members understand how they can contribute to our social service initiatives.",
    images: ["/golconda1.jpg", "/golconda2.jpg", "/golconda3.jpg"]
  },
  {
    id:"25",
    title: "Teachers' Day Celebration 2024",
    description:"This Teacher’s Day, we celebrated the mentors who guide our journey with a fun and lively twistStudents put on special performances that added colour and energy to the celebration. Our Directors addressed the gathering with an inspiring speech, reminding us of the invaluable role teachers play in shaping our futureThe event blended joy, gratitude, and heartfelt moments as we honoured our educatorsEvery teacher walked away with a rose, a smile, and the warmth of the NSS family — a simple gesture to thank them for their endless support and inspiration ",
    images: ["/Teachers2024Day1.jpg", "/Teachers2024Day2.jpg","/Teachers2024Day3.jpg"]
  },
  {
    id: "26",
    title: "Orphanage visit ",
    description:
      "Finding joy in the simplest moments with our new friends at the children’s home.Our visit was filled with heartfelt interactions, from playful games to stories that lit up their eyes.We spent meaningful time with both the children and the elderly, sharing warmth and laughter.Every smile we saw felt like a reminder of the power of kindness. A day that touched our hearts and stayed in our memories.",
    images: ["/placeholder1.jpg", "/placeholder2.jpg"]
  },
  {
    id: "27",
    title: "Hydra Walk — Lake Protection Campaign",
    description:
      "Rallying for a cause, we took a stand to protect our lakes for a better tomorrow.Joining the Telangana Government’s campaign, we walked together at Gandipet Lake to raise awareness against illegal encroachment Through our Hydra Walk, we spread a strong message on preserving our precious water bodies.The energy, unity, and purpose made every step meaningful.",
    images: ["/HYDRAWALK1.jpg", "/HYDRAWALK2.jpg", "/HYDRAWALK3.png", "/HYDRAWALK4.jpg"]
  },
  {
    id: "29",
    title: "Strength in solidarity ",
    description:"Disasters strike even when we least expect them… but the true grace of humanity lies in rising together.Strength in Solidarity brought us together in a united stand against women’s harassment and injustice.We stood together and united against injustice Our march, a small but powerful step towards a justice and equal world, carried the victim's story, a heartbreaking reminder of the pain endured. Each candle, a flicker of hope in the darkness, illuminated the path towards a future where such tragedies are unthinkable ",
    images: ["/Soliditary0.jpg", "/Soliditary1.jpg","/Soliditary2.jpg","/Soliditary3.jpg","/Soliditary4.jpg"]
  },
 {
    id: "30",
    title: "Oldage Home visit",
    description:
      " More than just a place, this is a second home where one finds care, laughter, and companionship; a place where our presence offered a brief, happy break in their daily rhythm. We spent time listening to their stories, sharing smiles, and creating a joyful atmosphere.Small games, songs, and conversations turned into heartfelt memories.The visit reminded everyone of the value of love, respect, and human connection.",
    images: ["/oldagehome2024_1.jpg", "/oldagehome2024_2.jpg","/oldagehome2024_3.jpg","/oldagehome2024_4.jpg"]
  } 
];

// Hero images for sticky scroll section
const HERO_IMAGES = [
  { src: '/arang2.jpg', title: 'Arangetra' },
  { src: '/sum2.jpg', title: 'NSS Summit' },
  { src: '/sis2.JPG', title: 'Strength in Solidarity' },
  { src: '/santa2.jpg', title: 'Be My Santa' },
  { src: '/bd2.jpg', title: 'Blood Donation' }
];

// Main Timeline Component
export default function EventsTimeline() {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const movingDotRef = useRef(null);
  const blueLineRef = useRef(null);
  const targetYRef = useRef(0);
  const currentYRef = useRef(0);
  const rafRef = useRef(null);
  const [activeId, setActiveId] = useState(null);

  const lerp = (start, end, factor) => start + (end - start) * factor;

  const updateTarget = () => {
    if (!containerRef.current) return;

    const viewportCenter = window.innerHeight / 2;
    const containerRect = containerRef.current.getBoundingClientRect();

    let minDiff = Infinity;
    let newTargetY = currentYRef.current;
    let closestId = null;

    itemRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const rect = ref.getBoundingClientRect();
      const itemCenter = rect.top + 24;
      const diff = Math.abs(itemCenter - viewportCenter);

      if (diff < minDiff) {
        minDiff = diff;
        newTargetY = itemCenter - containerRect.top;
        closestId = EVENTS[index].id;
      }
    });

    targetYRef.current = newTargetY;
    if (closestId !== activeId) setActiveId(closestId);
  };

  const animate = () => {
    const ease = 0.1;
    currentYRef.current = lerp(currentYRef.current, targetYRef.current, ease);

    if (movingDotRef.current) {
      movingDotRef.current.style.transform = `translateY(${currentYRef.current}px)`;
    }
    if (blueLineRef.current) {
      blueLineRef.current.style.height = `${currentYRef.current + 12}px`;
    }

    rafRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);

    const handleScroll = () => requestAnimationFrame(updateTarget);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    updateTarget();
    currentYRef.current = targetYRef.current;

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [activeId]);

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden font-sans">
      {/* Hacksmith-style Sticky Scroll Section */}
      <HacksmithStickySection />

      {/* Timeline Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-24 bg-[#050505]">
        <div className="relative" ref={containerRef}>
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-[4px] bg-gray-800/60 rounded-full" />
          <div
            ref={blueLineRef}
            className="absolute left-8 md:left-12 top-0 w-[4px] bg-blue-600 rounded-full z-10 transition-all duration-75 ease-out"
            style={{ height: "0px" }}
          />
          <div
            ref={movingDotRef}
            className="absolute left-8 md:left-12 z-30 w-6 h-6 -ml-[10px] -mt-[12px] pointer-events-none"
            style={{ transform: "translateY(0px)" }}
          >
            <div className="w-full h-full bg-blue-500 rounded-full shadow-[0_0_25px_5px_rgba(37,99,235,0.9)] border-[3px] border-[#050505]"></div>
          </div>

          <div className="space-y-32 pb-48 pt-12">
            {EVENTS.map((ev, i) => (
              <div
                key={ev.id}
                ref={el => itemRefs.current[i] = el}
                className="relative flex items-start"
              >
                <div className="flex-shrink-0 w-24 md:w-32 flex flex-col items-end relative pt-[12px]"> 
                  <div className="absolute right-0 top-[23px] w-[calc(100%-32px-12px)] md:w-[calc(100%-48px-12px)] h-[3px] bg-gray-700/80"></div>
                  <div className={`absolute right-[calc(100%-32px-12px)] md:right-[calc(100%-48px-12px)] top-[12px] w-6 h-6 rounded-full border-[3px] transition-colors duration-500 z-20
                    ${activeId === ev.id ? "bg-blue-600 border-blue-950 shadow-[0_0_15px_rgba(37,99,235,0.8)]" : "bg-gray-800 border-[#050505]"}
                  `}></div>
                </div>

                <div className={`flex-1 pl-6 transition-all duration-700 ${activeId === ev.id ? "opacity-100 translate-y-0" : "opacity-50 translate-y-4"}`}>
                  <article className="relative group">
                    <div className="relative z-10 flex flex-col gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 flex-wrap">
                          <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wide leading-none">{ev.title}</h2>
                          {ev.certificateUrl && (
                            <a
                              href={ev.certificateUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-blue-500/50"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              Certificate
                            </a>
                          )}
                        </div>
                        <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light max-w-4xl mt-6">{ev.description}</p>
                      </div>
                      <ImageCarousel images={ev.images} />
                    </div>
                  </article>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function ImageCarousel({ images }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || !images || images.length < 2) return;

    let scrollAmount = 0;
    const speed = 1.5;

    const runScroll = () => {
      scrollAmount += speed;
      if (scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollAmount = 0;
      }
      scrollContainer.scrollTo({ left: scrollAmount, behavior: "auto" });
    };

    const intervalId = setInterval(runScroll, 20);
    return () => clearInterval(intervalId);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full mt-12 relative rounded-xl overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#050505] via-[#050505]/80 to-transparent z-10 pointer-events-none"></div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto py-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {images.map((src, idx) => (
          <div key={idx} className="flex-shrink-0 w-[80%] md:w-[55%] aspect-video relative rounded-xl overflow-hidden border border-gray-800/30 bg-[#111]">
            <img src={src} alt={`Event image ${idx}`} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
        {images.length > 1 && images.slice(0, 2).map((src, idx) => (
          <div key={`dup-${idx}`} className="flex-shrink-0 w-[80%] md:w-[55%] aspect-video relative rounded-xl overflow-hidden border border-gray-800/30 bg-[#111]" aria-hidden="true">
            <img src={src} alt="duplicated" className="w-full h-full object-cover opacity-90"/>
          </div>
        ))}
      </div>
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}