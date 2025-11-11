export interface Project {
  id: string;
  name: string;
  address: string;
  types: string;
  startingPrice?: string;
  description: string;
  tagline: string;
  badge: string;
  coverImage: string;
  images: string[];
  status: "ongoing" | "completed" | "upcoming";
}

export const PROJECTS: Project[] = [
  {
    id: "furde-heights",
    name: "Furde Heights",
    address: "Ganesh Nagar, Near RTO office",
    types: "2 BHK - 3BHK",
    startingPrice: "Rs 28,31,000/-",
    description:
      "Furde Heights redefines modern living in Solapur, offering a perfect balance of comfort, elegance, and convenience. Thoughtfully designed with contemporary architecture, it harmonizes beautifully with its surroundings to create an exceptional residential experience. Located in Ganesh Nagar, near the RTO, this premium address offers residents easy access to the city's key destinations while enjoying a peaceful neighborhood ambiance. With spacious, well-planned flats and every amenity crafted for comfort and well-being, Furde Heights is where quality living truly begins.",
    tagline: "The Secret to Signature Living",
    badge: "Great Flats, Great Deals",
    coverImage: "/hero.png",
    images: [
      "/FH1.png",
      "/FH2.png",
      "/FH3.png",
      "/FH4.png",
      "/FH5.png",
      "/FH6.png",
      "/FH7.png",
    ],
    status: "ongoing",
  },
  {
    id: "amar-vishwa",
    name: "Amar Vishwa",
    address: "Bibi Darfal Road, Jijamata School, Kondi-Pune Highway, Solapur",
    types: "1BHK - 2BHK - Bungalow",
    startingPrice: "Rs 19,90,000/-",
    description:
      "Amar Vishwa brings you a perfect blend of modern amenities and comfortable living spaces. Strategically located on the Kondi-Pune Highway, this project offers excellent connectivity while maintaining a serene environment. Choose from 1BHK, 2BHK premium bungalows designed to suit your lifestyle. With thoughtful planning and quality construction, Amar Vishwa is an ideal choice for those seeking a peaceful yet well-connected home in Solapur.",
    tagline: "Your Dream Home Awaits",
    badge: "Premium Living Spaces",
    coverImage: "/amar-vishwa-cover.jpg",
    images: [
      "/AV1.jpg",
      "/AV2.jpg",
      "/AV3.jpg",
      "/AV4.jpg",
      "/AV5.jpg",
      "/AV6.jpg",
      "/AV7.jpg",
      "/AV8.jpg",
      "/AV9.jpg",
      "/AV10.jpg",
      "/AV11.jpg",
      "/AV12.jpg",
    ],
    status: "completed",
  },
  {
    id: "vidyavihar",
    name: "Vidyavihar Warehouses",
    address:
      "Furde Group Warehouse, Vidya-Vihar, Hiraj road, Kondi, Solapur Pune highway, Solapur",
    types: "Commercial Warehouses",
    description:
      "Vidyavihar offers state-of-the-art warehouse facilities designed for modern businesses. Strategically located on the Solapur-Pune highway, these warehouses provide excellent logistics connectivity and accessibility. Built with superior infrastructure and ample space, Vidyavihar warehouses are perfect for storage, distribution, and manufacturing operations. Experience the advantage of premium commercial real estate at a prime location.",
    tagline: "Premium Commercial Spaces",
    badge: "Strategic Location",
    coverImage: "/VV1.jpg",
    images: [
      "/VV1.jpg",
      "/VV2.jpg",
      "/VV3.jpg",
      "/VV4.jpg",
      "/VV5.jpg",
      "/VV6.jpg",
      "/VV7.jpg",
      "/VV8.jpg",
      "/VV9.jpg",
      "/VV10.jpg",
      "/VV11.jpg",
      "/VV12.jpg",
      "/VV13.jpg",
    ],
    status: "completed",
  },
];

// Helper function to get project by ID
export const getProjectById = (id: string): Project | undefined => {
  return PROJECTS.find((project) => project.id === id);
};

// Helper function to get projects by status
export const getProjectsByStatus = (
  status: "ongoing" | "completed" | "upcoming"
): Project[] => {
  return PROJECTS.filter((project) => project.status === status);
};
