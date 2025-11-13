const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "davi6vff3",
  api_key: "883233372173783",
  api_secret: "Z9wUcNgU0vgFBSfpjj0kuKdAtlM",
});

// MongoDB connection
const MONGODB_URI =
  "mongodb+srv://info:furdeinfotech@cluster0.1jzah.mongodb.net/SFC?retryWrites=true&w=majority&appName=Cluster0";

// Project Schema
const ProjectSchema = new mongoose.Schema(
  {
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
    },
    images: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ["ongoing", "completed", "upcoming"],
      required: true,
    },
    googleMapLink: {
      type: String,
    },
    brochures: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ProjectModel =
  mongoose.models.Project || mongoose.model("Project", ProjectSchema);

// Projects data from your file
const PROJECTS = [
  {
    name: "Gulmohar Plaza",
    address: "Mashrum Ganpati Near Orchid College, Tuljapur Road, Solapur",
    types: "1 BHK - 1 RK",
    startingPrice: "Rs 10,00,000/-",
    description:
      "Gulmohar Plaza offers compact and modern living spaces near Orchid College on Tuljapur Road. Thoughtfully designed 1 BHK and 1 RK apartments perfect for students, young professionals, and small families. With quality construction and strategic location near educational institutions, Gulmohar Plaza provides affordable housing with excellent connectivity to the city.",
    tagline: "Compact Living Near Education Hub",
    badge: "Student Friendly Homes",
    coverImage: "/GPC.jpg", // Add later
    images: [], // Add later
    status: "completed",
    googleMapLink: "https://maps.app.goo.gl/pVaT9ZUCdwbM43jX7", // Add later
    brochures: ["/GMPB.pdf"], // Add later
  },
  {
    name: "Gulmohar Park",
    address: "Mashrum Ganpati Near Orchid College, Tuljapur Road, Solapur",
    types: "Open Plots",
    startingPrice: "Rs 09,35,000/-",
    description:
      "Gulmohar Park offers premium open plots near Orchid College on Tuljapur Road. Well-planned plots with proper infrastructure and road connectivity, perfect for building your dream home in an educational hub area. The location provides excellent investment potential with proximity to colleges and educational institutions.",
    tagline: "Build Near Education Hub",
    badge: "Educational Zone Plots",
    coverImage: "", // Add later
    images: [], // Add later
    status: "ongoing",
    googleMapLink: "", // Add later
    brochures: ["/GPB.pdf"], // Add later
  },
  {
    name: "Amar Park",
    address: "Soregaon to Pratap Nagar Road, VVP COllege Side, Solapur",
    types: "Open Plots",
    startingPrice: "Rs 13,50,000/-",
    description:
      "Amar Park is strategically located on Soregaon to Pratap Nagar Road near VVP College. These premium open plots offer excellent connectivity and are perfect for building your dream home in a well-established area. With proximity to educational institutions and main roads, Amar Park provides an ideal investment opportunity.",
    tagline: "Premium Plots Near VVP College",
    badge: "College Side Investment",
    coverImage: "", // Add later
    images: [], // Add later
    status: "ongoing",
    googleMapLink: "", // Add later
    brochures: ["/APB.pdf"], // Add later
  },
  {
    name: "Anupam Park",
    address: "Saiful Vijapur Road Opp. Shivganga Mandir, Solapur",
    types: "Open Plots",
    startingPrice: "Rs 1,00,00,000/-",
    description:
      "Anupam Park offers luxury open plots on Saiful Vijapur Road opposite Shivganga Mandir. These premium plots are designed for those seeking high-end residential development opportunities. With excellent road connectivity and proximity to religious landmarks, Anupam Park represents the pinnacle of residential plot investment in Solapur.",
    tagline: "Luxury Plots Near Shivganga Mandir",
    badge: "Premium Investment Opportunity",
    coverImage: "", // Add later
    images: ["/ANUP.png", "/ANUP1.jpg", "/ANUP2.jpg"], // Add later
    status: "ongoing",
    googleMapLink: "", // Add later
    brochures: [], // Add later
  },
  // {
  //   name: "Sai Darshan",
  //   address: "Sai Darshan, Solapur",
  //   types: "Open Plots",
  //   startingPrice: "Rs 8,50,000/-",
  //   description:
  //     "Sai Darshan plots offer an excellent investment opportunity in Solapur's developing areas. Well-planned open plots with proper infrastructure and road connectivity. Perfect for those looking to invest in land or build their custom homes in a peaceful residential environment.",
  //   tagline: "Investment in Your Future",
  //   badge: "Prime Plots",
  //   coverImage: "", // Add later
  //   images: [], // Add later
  //   status: "ongoing",
  //   googleMapLink: "", // Add later
  //   brochures: [], // Add later
  // },
  {
    name: "Amar Homes",
    address: "Near Brijdham Vridhashram, Vijapur Road Hwy, Solapur",
    types: "Open Plots",
    startingPrice: "Rs 21,50,000/-",
    description:
      "Amar Homes offers premium open plots near Brijdham Vridhashram on Vijapur Road Highway. These well-planned plots provide excellent highway connectivity and are perfect for building your dream home. Located in a peaceful area with easy access to the highway while maintaining a serene residential environment.",
    tagline: "Highway Connected Living",
    badge: "Highway Side Plots",
    coverImage: "/AH1.jpg",
    images: ["/AH.jpg", "/AH2.jpg", "/AH2.jpg"],
    status: "ongoing",
    googleMapLink: "", // Add later
    brochures: ["/AMHB.pdf"], // Add later
  },
  // {
  //   name: "Furde Heights",
  //   address: "Ganesh Nagar, Near RTO office",
  //   types: "2 BHK - 3BHK",
  //   startingPrice: "Rs 28,31,000/-",
  //   description:
  //     "Furde Heights redefines modern living in Solapur, offering a perfect balance of comfort, elegance, and convenience. Thoughtfully designed with contemporary architecture, it harmonizes beautifully with its surroundings to create an exceptional residential experience. Located in Ganesh Nagar, near the RTO, this premium address offers residents easy access to the city's key destinations while enjoying a peaceful neighborhood ambiance. With spacious, well-planned flats and every amenity crafted for comfort and well-being, Furde Heights is where quality living truly begins.",
  //   tagline: "The Secret to Signature Living",
  //   badge: "Great Flats, Great Deals",
  //   coverImage: "/her.jpeg",
  //   images: [
  //     "/FH1.png",
  //     "/FH2.png",
  //     "/FH3.png",
  //     "/FH4.png",
  //     "/FH5.png",
  //     "/FH6.png",
  //     "/FH7.png",
  //   ],
  //   status: "ongoing",
  //   googleMapLink: "", // Add later
  //   brochures: [], // Add later
  // },
  // {
  //   name: "Amar Vishwa",
  //   address: "Bibi Darfal Road, Jijamata School, Kondi-Pune Highway, Solapur",
  //   types: "1BHK - 2BHK - Bungalow & Open Plots",
  //   startingPrice: "Rs 19,90,000/-",
  //   description:
  //     "Amar Vishwa brings you a perfect blend of modern amenities and comfortable living spaces. Strategically located on the Kondi-Pune Highway, this project offers excellent connectivity while maintaining a serene environment. Choose from 1BHK, 2BHK premium bungalows designed to suit your lifestyle. With thoughtful planning and quality construction, Amar Vishwa is an ideal choice for those seeking a peaceful yet well-connected home in Solapur.",
  //   tagline: "Your Dream Home Awaits",
  //   badge: "Premium Living Spaces",
  //   coverImage: "/amar-vishwa-cover.jpg",
  //   images: [
  //     "/AV1.jpg",
  //     "/AV2.jpg",
  //     "/AV3.jpg",
  //     "/AV4.jpg",
  //     "/AV5.jpg",
  //     "/AV6.jpg",
  //     "/AV7.jpg",
  //     "/AV8.jpg",
  //     "/AV9.jpg",
  //     "/AV10.jpg",
  //     "/AV11.jpg",
  //     "/AV12.jpg",
  //     "/AV13.jpg",
  //   ],
  //   status: "completed",
  //   googleMapLink: "", // Add later
  //   brochures: [], // Add later
  // },
  // {
  //   name: "Vidyavihar Warehouses",
  //   address:
  //     "Furde Group Warehouse, Vidya-Vihar, Hiraj road, Kondi, Solapur Pune highway, Solapur",
  //   types: "Commercial Warehouses",
  //   description:
  //     "Vidyavihar offers state-of-the-art warehouse facilities designed for modern businesses. Strategically located on the Solapur-Pune highway, these warehouses provide excellent logistics connectivity and accessibility. Built with superior infrastructure and ample space, Vidyavihar warehouses are perfect for storage, distribution, and manufacturing operations. Experience the advantage of premium commercial real estate at a prime location.",
  //   tagline: "Premium Commercial Spaces",
  //   badge: "Strategic Location",
  //   coverImage: "/vidyavihar.jpg",
  //   images: ["/VV1.jpg", "/VV2.jpg", "/VV3.jpg", "/VV4.jpg", "/VV5.jpg"],
  //   status: "upcoming",
  //   googleMapLink: "", // Add later
  //   brochures: [], // Add later
  // },
];

// Function to upload image to Cloudinary
async function uploadImageToCloudinary(imagePath, folder) {
  try {
    const publicPath = path.join(process.cwd(), "public", imagePath);

    // Check if file exists
    if (!fs.existsSync(publicPath)) {
      console.log(`⚠️  Image not found: ${publicPath}`);
      return null;
    }

    console.log(`📤 Uploading: ${imagePath}`);

    const result = await cloudinary.uploader.upload(publicPath, {
      folder: folder,
      resource_type: "auto",
      // Optimize images to reduce file size
      quality: "auto:good",
      fetch_format: "auto",
      // Resize large images
      transformation: [{ width: 1920, height: 1080, crop: "limit" }],
    });

    console.log(`✅ Uploaded: ${imagePath} -> ${result.secure_url}`);
    return result.secure_url;
  } catch (error) {
    console.error(`❌ Error uploading ${imagePath}:`, error.message);
    return null;
  }
}

// Function to upload all images for a project
async function uploadProjectImages(project) {
  console.log(`\n🚀 Processing project: ${project.name}`);

  const uploadedProject = { ...project };

  // Upload cover image
  if (project.coverImage) {
    console.log(`📸 Uploading cover image...`);
    const coverImageUrl = await uploadImageToCloudinary(
      project.coverImage,
      `furde-constructions/projects/covers`
    );
    if (coverImageUrl) {
      uploadedProject.coverImage = coverImageUrl;
    }
  }

  // Upload gallery images
  if (project.images && project.images.length > 0) {
    console.log(`🖼️  Uploading ${project.images.length} gallery images...`);
    const uploadedImages = [];

    for (const imagePath of project.images) {
      const imageUrl = await uploadImageToCloudinary(
        imagePath,
        `furde-constructions/projects/images`
      );
      if (imageUrl) {
        uploadedImages.push(imageUrl);
      }
    }

    uploadedProject.images = uploadedImages;
  }

  // Remove the id field (we'll use MongoDB's _id)
  delete uploadedProject.id;

  return uploadedProject;
}

// Function to fix database indexes
async function fixDatabaseIndexes() {
  try {
    console.log("🔧 Checking and fixing database indexes...");

    // Drop the old 'id' index if it exists
    try {
      await ProjectModel.collection.dropIndex("id_1");
      console.log("✅ Dropped old 'id' index");
    } catch (error) {
      if (error.code === 27) {
        console.log("ℹ️  Old 'id' index doesn't exist, continuing...");
      } else {
        console.log("⚠️  Could not drop 'id' index:", error.message);
      }
    }
  } catch (error) {
    console.error("❌ Error fixing indexes:", error.message);
  }
}

// Main migration function
async function migrateProjects() {
  try {
    console.log("🔗 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Fix database indexes first
    await fixDatabaseIndexes();

    console.log("🗂️  Starting project migration with image uploads...");

    for (const projectData of PROJECTS) {
      try {
        // Check if project already exists
        const existingProject = await ProjectModel.findOne({
          name: projectData.name,
        });
        if (existingProject) {
          console.log(
            `⏭️  Project "${projectData.name}" already exists, skipping...`
          );
          continue;
        }

        // Upload images and get updated project data
        const uploadedProject = await uploadProjectImages(projectData);

        // Save to database
        const project = new ProjectModel(uploadedProject);
        await project.save();

        console.log(`✅ Successfully migrated project: ${projectData.name}`);
        console.log(
          `   - Cover image: ${uploadedProject.coverImage ? "Uploaded" : "Skipped"}`
        );
        console.log(
          `   - Gallery images: ${uploadedProject.images.length} uploaded`
        );
      } catch (error) {
        console.error(
          `❌ Error migrating project "${projectData.name}":`,
          error.message
        );
      }
    }

    console.log("\n🎉 Migration completed!");
    console.log(
      "📝 Note: You can update Google Maps links and brochures later through the admin interface."
    );
  } catch (error) {
    console.error("❌ Migration failed:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

// Run the migration
if (require.main === module) {
  migrateProjects();
}

module.exports = { migrateProjects };
