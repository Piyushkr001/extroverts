import { LocationData } from "@/types/signup";

export const INDIAN_LOCATIONS: LocationData[] = [
  {
    state: "Maharashtra",
    cities: [
      {
        name: "Mumbai",
        popularColleges: [
          "St. Xavier's College",
          "IIT Bombay",
          "NMIMS",
          "HR College of Commerce",
          "Working Professional / Tech",
        ],
      },
      {
        name: "Pune",
        popularColleges: [
          "Symbiosis International University",
          "COEP Technological University",
          "Fergusson College",
          "MIT World Peace University",
          "Working Professional / Tech",
        ],
      },
      {
        name: "Nagpur",
        popularColleges: [
          "VNIT Nagpur",
          "G.H. Raisoni College",
          "RCOEM Nagpur",
          "Working Professional / Tech",
        ],
      },
    ],
  },
  {
    state: "Karnataka",
    cities: [
      {
        name: "Bengaluru",
        popularColleges: [
          "IISc Bengaluru",
          "Christ University",
          "BMS College of Engineering",
          "RV College of Engineering",
          "PES University",
          "Working Professional / Tech Startup",
        ],
      },
      {
        name: "Mysuru",
        popularColleges: [
          "SJCE Mysuru",
          "NIE Mysuru",
          "University of Mysore",
          "Working Professional",
        ],
      },
      {
        name: "Manipal",
        popularColleges: [
          "Manipal Academy of Higher Education (MAHE)",
          "MIT Manipal",
          "KMC Manipal",
        ],
      },
    ],
  },
  {
    state: "Delhi NCR",
    cities: [
      {
        name: "New Delhi",
        popularColleges: [
          "Delhi University (North Campus)",
          "Delhi University (South Campus)",
          "IIT Delhi",
          "JNU",
          "DTU",
          "NSUT",
          "Working Professional / Corporate",
        ],
      },
      {
        name: "Gurugram",
        popularColleges: [
          "Ashoka University",
          "MDI Gurgaon",
          "Working Professional / Corporate",
        ],
      },
      {
        name: "Noida",
        popularColleges: [
          "Amity University",
          "Shiv Nadar University",
          "Jaypee Institute (JIIT)",
          "Working Professional / Tech",
        ],
      },
    ],
  },
  {
    state: "Telangana",
    cities: [
      {
        name: "Hyderabad",
        popularColleges: [
          "IIIT Hyderabad",
          "BITS Pilani Hyderabad",
          "Osmania University",
          "CBIT Hyderabad",
          "Working Professional / Hitec City",
        ],
      },
    ],
  },
  {
    state: "Tamil Nadu",
    cities: [
      {
        name: "Chennai",
        popularColleges: [
          "IIT Madras",
          "Loyola College",
          "Anna University",
          "SRM Institute",
          "Working Professional / IT",
        ],
      },
      {
        name: "Coimbatore",
        popularColleges: [
          "PSG College of Technology",
          "Amrita Vishwa Vidyapeetham",
          "CIT Coimbatore",
        ],
      },
    ],
  },
  {
    state: "West Bengal",
    cities: [
      {
        name: "Kolkata",
        popularColleges: [
          "Jadavpur University",
          "St. Xavier's College Kolkata",
          "Presidency University",
          "IIM Calcutta",
          "Working Professional",
        ],
      },
    ],
  },
];

export const VIBE_OPTIONS = [
  { id: "rooftop", label: "Rooftop Party 🍸", emoji: "🍸" },
  { id: "live_music", label: "Live Music & Gigs 🎸", emoji: "🎸" },
  { id: "coffee", label: "Coffee & Deep Chats ☕", emoji: "☕" },
  { id: "board_games", label: "Board Games & Trivia 🎲", emoji: "🎲" },
  { id: "sunset_treks", label: "Weekend Treks & Outdoors 🏔️", emoji: "🏔️" },
  { id: "foodies", label: "Late Night Food Crawls 🍕", emoji: "🍕" },
  { id: "clubbing", label: "Clubbing & Dancing 🪩", emoji: "🪩" },
  { id: "fitness", label: "Run Clubs & Workouts 🏃", emoji: "🏃" },
  { id: "art_culture", label: "Art Galleries & Indie Cinema 🎨", emoji: "🎨" },
  { id: "gaming", label: "LAN & Esports Sessions 🎮", emoji: "🎮" },
];

export const HANGOUT_STYLES = [
  { value: "high_energy", label: "High Energy & Big Groups (10+ people) 🔥" },
  { value: "balanced", label: "Balanced & Small Circles (4-8 people) ✨" },
  { value: "one_on_one", label: "Chill & 1-on-1 / Duo Hangouts ☕" },
];

export const AVAILABILITY_OPTIONS = [
  { value: "weekends", label: "Friday Nights & Weekends 🥂" },
  { value: "weekdays", label: "Weekday Evenings post 6 PM 🌆" },
  { value: "anytime", label: "Spontaneous & Anytime Vibes ⚡" },
];
