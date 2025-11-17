const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Admin Schema
const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please use a valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
});

const AdminModel = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

async function createAdmin() {
  try {
    // Connect to MongoDB (you'll need to set your connection string)
    const MONGODB_URI = "mongodb+srv://info:furdeinfotech@cluster0.1jzah.mongodb.net/SFC?retryWrites=true&w=majority&appName=Cluster0";
    if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not set in environment variables');
  process.exit(1);
}
    await mongoose.connect(MONGODB_URI);
    
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await AdminModel.findOne({ email: 'furderohan@gmail.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('Qwaszx@3011', 12);

    // Create admin user
    const admin = new AdminModel({
      email: 'furderohan@gmail.com',
      password: hashedPassword,
    });

    await admin.save();
    console.log('Admin user created successfully!');
    console.log('Email: furderohan@gmail.com');
    console.log('Password: Qwaszx@3011');

  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

createAdmin();
