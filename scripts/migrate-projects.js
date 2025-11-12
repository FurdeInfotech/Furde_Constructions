const mongoose = require('mongoose');

// Project Schema (same as in the model)
const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Project name is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  types: {
    type: String,
    required: [true, "Property types are required"],
  },
  startingPrice: {
    type: String,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  tagline: {
    type: String,
    required: [true, "Tagline is required"],
  },
  badge: {
    type: String,
    required: [true, "Badge is required"],
  },
  coverImage: {
    type: String,
    required: [true, "Cover image is required"],
  },
  images: [{
    type: String,
  }],
  status: {
    type: String,
    enum: ["ongoing", "completed", "upcoming"],
    required: true,
  },
  googleMapLink: {
    type: String,
  },
  brochures: [{
    type: String,
  }],
}, {
  timestamps: true,
});

const ProjectModel = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

// Static project data from your Projects.ts file
const PROJECTS = [
  {
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
    googleMapLink: "", // Add your Google Maps link here
    brochures: [], // Add brochure URLs here
  },
  {
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
      "/AV13.jpg",
    ],
    status: "completed",
    googleMapLink: "", // Add your Google Maps link here
    brochures: [], // Add brochure URLs here
  },
  {
    name: "Vidyavihar Warehouses",
    address:
      "Furde Group Warehouse, Vidya-Vihar, Hiraj road, Kondi, Solapur Pune highway, Solapur",
    types: "Commercial Warehouses",
    description:
      "Vidyavihar offers state-of-the-art warehouse facilities designed for modern businesses. Strategically located on the Solapur-Pune highway, these warehouses provide excellent logistics connectivity and accessibility. Built with superior infrastructure and ample space, Vidyavihar warehouses are perfect for storage, distribution, and manufacturing operations. Experience the advantage of premium commercial real estate at a prime location.",
    tagline: "Premium Commercial Spaces",
    badge: "Strategic Location",
    coverImage: "/vidyavihar.jpg",
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
    googleMapLink: "", // Add your Google Maps link here
    brochures: [], // Add brochure URLs here
  },
];

async function migrateProjects() {
  try {
    // Connect to MongoDB
    const MONGODB_URI = "mongodb+srv://info:furdeinfotech@cluster0.1jzah.mongodb.net/SFC?retryWrites=true&w=majority&appName=Cluster0";
    await mongoose.connect(MONGODB_URI);
    
    console.log('Connected to MongoDB');

    // Clear existing projects (optional)
    // await ProjectModel.deleteMany({});
    // console.log('Cleared existing projects');

    // Insert projects
    for (const projectData of PROJECTS) {
      try {
        // Check if project already exists
        const existingProject = await ProjectModel.findOne({ name: projectData.name });
        if (existingProject) {
          console.log(`Project ${projectData.name} already exists, skipping...`);
          continue;
        }

        const project = new ProjectModel(projectData);
        await project.save();
        console.log(`✅ Migrated project: ${projectData.name}`);
      } catch (error) {
        console.error(`❌ Error migrating project ${projectData.name}:`, error.message);
      }
    }

    console.log('🎉 Project migration completed!');

  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

migrateProjects();
