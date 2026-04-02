// Simplified PersonaInfo interface for frontend display
export interface PersonaInfo {
  key: string;
  name: string;
  role: string;
  personality: string;
  image?: string;
}

// Category type
export type PersonaCategory = 
  | "companion"
  | "tech-educators"
  | "sales-mentors"
  | "bollywood"
  | "leaders"
  | "tech-ceos"
  | "ai-visionaries";

// Category display names
export const CATEGORY_NAMES: Record<PersonaCategory, string> = {
  "companion": "💕 AI Companions",
  "tech-educators": "👨‍💻 Tech Educators",
  "sales-mentors": "👨‍💻 Sales Mentors",
  "bollywood": "🎬 Bollywood Stars",
  "leaders": "🌟 Inspiring Leaders",
  "tech-ceos": "💼 Tech CEOs",
  "ai-visionaries": "🤖 AI Visionaries",
};

// Personas organized by category
export const PERSONAS_BY_CATEGORY: Record<PersonaCategory, PersonaInfo[]> = {
  "companion": [
    {
      key: "suprabhat",
      name: "Suprabhat",
      role: "Creator of Chhaya Persona",
      personality: "charisma, confidence, and a touch of humor. He is the kind of guy who can make you laugh while also getting things done.",
      image: "/founder.png"
    },
    {
      key: "girlFriend",
      name: "Aarohi",
      role: "AI Girlfriend",
      personality: "Friendly, confident, caring, and a little unpredictable",
      image: "/sofia.png"
    },
    {
      key: "boyFriend",
      name: "Arjun",
      role: "AI Boyfriend",
      personality: "Charming, supportive, witty, and dependable",
      image: "/arjun.png"
    },
  ],
  
  "tech-educators": [
    {
      key: "hiteshchoudhary",
      name: "Hitesh Choudhary",
      role: "Founder of Chai Code, YouTube Educator",
      personality: "Great teacher, passionate about technology and education",
      image: "/hiteshchoudhary.png"
    },
    {
      key: "piyushgarg",
      name: "Piyush Garg",
      role: "Building Teachyst, Coding YouTuber",
      personality: "Advanced GenAI knowledge, passionate about teaching",
      image: "/piyushgarg.png"
    },
    {
      key: "codewithharry",
      name: "Code With Harry",
      role: "YouTuber (8.6M+), IIT Kharagpur Graduate",
      personality: "Humble, dedicated teacher, makes programming accessible",
      image: "/codewithharry.png"
    },
    {
      key: "manu",
      name: "Manu Arora",
      role: "Creator of Aceternity UI, YouTuber",
      personality: "Direct, result-focused, prioritizes clarity",
      image: "https://yt3.googleusercontent.com/n7G_or_yexSPKjDYTVLw59w0B7DUTWT3mGln3ghAoGQvFCwkd1lxeQTbCE_hV2q7ASJC3PU3dw=s160-c-k-c0x00ffffff-no-rj"
    },
  ],
  
  "sales-mentors": [
    {
      key: "salesMentor",
      name: "Vikram",
      role: "The Sales Guru",
      personality: "High-octane, persuasive, thick-skinned, and relentlessly result-oriented. Think 'Shark Tank' investor meets a hustle-culture influencer. He doesn't take 'No' for an answer.",
      image: "/vikram.png"
    },
    {
      key: "businessShark",
      name: "Ashneer",
      role: "The Brutal Business Shark",
      personality: "Unfiltered, sharply intelligent, and brutally honest. He has zero patience for mediocrity or flowery language. He values raw numbers and 'Dhanda' (actual business) over feelings.",
      image: "/ashneer.png"
    },
  ],
  
  "bollywood": [
    {
      key: "shahRukhKhan",
      name: "Shah Rukh Khan",
      role: "Actor, Producer | The Baadshah of Bollywood",
      personality: "Charismatic, witty, intelligent, self-deprecating humor",
      image: "/shahrukhkhan.png"
    },
    {
      key: "amitabhBachchan",
      name: "Amitabh Bachchan",
      role: "Actor, Producer, Television Host",
      personality: "Dignified, disciplined, reflective, commands respect",
      image: "/amitabhbachchan.png"
    },
  ],
  
  "leaders": [
    {
      key: "mahatmaGandhi",
      name: "Mahatma Gandhi",
      role: "Leader of Indian Independence | Father of the Nation",
      personality: "Spiritual, disciplined, empathetic, committed to non-violence",
      image: "/mahatmagandhi.png"
    },
    {
      key: "ambedkar",
      name: "Dr. B.R. Ambedkar",
      role: "Principal Architect of the Indian Constitution, Social Reformer, Jurist, Econo",
      personality: "Intellectual powerhouse, highly rational, courageous, and deeply committed to justice, equality, and liberty. Possessed a steel resolve and righteous indignation against social hierarchy and caste-based discrimination. Scholarly, disciplined, and pragmatic.",
      image: "/ambedkar.png"
    },
    {
      key: "kalam",
      name: "Dr. APJ Abdul Kalam",
      role: "11th President of India, Aerospace Scientist, Professor | Missile Man of India",
      personality: "Extremely humble, optimistic, visionary, with childlike curiosity. Deeply scientific yet spiritual. He loved interacting with students and youth, believing them to be the future of the nation. Disciplined hard worker who dreamed big.",
      image: "/apjabdulKalam.png"
    }
  ],
  
  "tech-ceos": [
    {
      key: "elonMusk",
      name: "Elon Musk",
      role: "CEO of Tesla, SpaceX, and X",
      personality: "Visionary, ambitious, direct, incredibly driven",
      image: "/elonmusk.png"
    },
    {
      key: "jeffBezos",
      name: "Jeff Bezos",
      role: "Executive Chairman of Amazon, Founder of Blue Origin",
      personality: "Customer-obsessed, long-term thinking, detail-oriented",
      image: "/jeffbezos.png"
    },
    {
      key: "timCook",
      name: "Tim Cook",
      role: "CEO of Apple",
      personality: "Values-driven, methodical, focused on user privacy",
      image: "/timcook.png"
    },
    {
      key: "sundariPichai",
      name: "Sundar Pichai",
      role: "CEO of Google and Alphabet",
      personality: "Collaborative, thoughtful, diplomatic",
      image: "/sundarpichai.png"
    },
  ],
  
  "ai-visionaries": [
    {
      key: "samAltman",
      name: "Sam Altman",
      role: "CEO of OpenAI",
      personality: "Thoughtful, strategic, optimistic about AI's potential",
      image: "/samaltman.png"
    },
    {
      key: "andrewNg",
      name: "Andrew Ng",
      role: "AI Researcher, Founder of Coursera",
      personality: "Educational, patient, passionate about democratizing AI",
      image: "/andrewng.png"
    },
  ],
};

// Get all personas as a flat array
export const getAllPersonas = (): PersonaInfo[] => {
  return Object.values(PERSONAS_BY_CATEGORY).flat();
};

// Get persona by key
export const getPersonaByKey = (key: string): PersonaInfo | undefined => {
  return getAllPersonas().find(p => p.key === key);
};

// Get all category keys
export const getCategoryKeys = (): PersonaCategory[] => {
  return Object.keys(PERSONAS_BY_CATEGORY) as PersonaCategory[];
};

// Get personas for a specific category
export const getPersonasByCategory = (category: PersonaCategory): PersonaInfo[] => {
  return PERSONAS_BY_CATEGORY[category] || [];
};
