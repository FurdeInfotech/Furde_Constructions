# Admin Authentication Setup

This document explains how to set up and use the admin authentication system for Furde Constructions.

## Features Created

✅ **Admin Sign-in Page** (`/sign-in`)
- Clean, modern UI with form validation
- NextAuth integration with credentials provider
- Automatic redirect to dashboard after successful login

✅ **Admin Dashboard** (`/dashboard`)
- Protected route with authentication middleware
- Sidebar navigation with Gallery and Projects sections
- Overview cards showing statistics
- Sign out functionality

✅ **Enhanced Gallery Management** (`/dashboard/gallery`)
- **Three Filter Categories**: All Projects, Awards, Festival Events
- **Full CRUD Operations**: Create, Read, Update, Delete for all categories
- **Cloudinary Integration**: Upload multiple images and PDF files
- **Google Maps Integration**: Display project locations
- **Responsive Grid Layout**: Modern card-based interface

✅ **Projects Management** 
- Complete project management with MongoDB integration
- Google Maps link support for project locations
- Brochure upload functionality (PDF files)
- Project status tracking (ongoing, completed, upcoming)
- Image gallery for each project

✅ **Awards Management**
- Create and manage company awards
- Multiple image uploads per award
- Award categories and dates
- Description and metadata support

✅ **Festival Events Management**
- Manage company events and festivals
- Event location and date tracking
- Event type categorization
- Multiple image support per event

## Setup Instructions

### 1. Environment Variables
Create a `.env.local` file in the root directory with:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/furde_constructions

# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3001

# Cloudinary Configuration (for image/file uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Google Maps API Key (optional, for embedded maps)
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

### 2. Create Admin User
Run the admin creation script:

```bash
node scripts/create-admin.js
```

This creates an admin user with:
- **Email**: admin@furde.com
- **Password**: admin123

### 3. Migrate Existing Project Data (Optional)
If you want to migrate your existing project data to the database:

```bash
node scripts/migrate-projects.js
```

This will import all projects from your `Projects.ts` file into MongoDB.

### 4. Set up Cloudinary (Required for file uploads)
1. Create a free account at [Cloudinary](https://cloudinary.com/)
2. Get your Cloud Name, API Key, and API Secret from the dashboard
3. Add these to your `.env.local` file

### 5. Start the Application
```bash
npm run dev
```

The application will be available at `http://localhost:3001`

## Usage

1. **Access Admin Panel**: Navigate to `/sign-in`
2. **Login**: Use the credentials created above
3. **Dashboard**: After login, you'll be redirected to `/dashboard`
4. **Navigation**: Use the sidebar to access Gallery and Projects sections
5. **Sign Out**: Click the "Sign Out" button in the sidebar

## Authentication Flow

- **Middleware Protection**: `/dashboard/*` routes are protected
- **Auto Redirect**: Signed-in users are redirected away from `/sign-in`
- **Session Management**: Uses NextAuth with JWT strategy
- **Password Security**: Passwords are hashed with bcryptjs

## File Structure

```
src/
├── app/
│   ├── sign-in/page.tsx          # Admin login page
│   ├── dashboard/
│   │   ├── layout.tsx            # Dashboard layout with sidebar
│   │   ├── page.tsx              # Dashboard overview
│   │   ├── gallery/page.tsx      # Gallery management
│   │   └── projects/page.tsx     # Projects management
│   └── api/auth/[...nextauth]/   # NextAuth configuration
├── components/
│   ├── ui/sidebar.tsx            # Sidebar component
│   └── providers.tsx             # Session provider wrapper
├── models/Admin.ts               # Admin user model
├── middleware.ts                 # Route protection
└── types/next-auth.d.ts          # NextAuth type definitions
```

## Next Steps

1. **Database Setup**: Configure your MongoDB connection
2. **Image Upload**: Implement gallery image upload functionality
3. **Project CRUD**: Add create, read, update, delete operations for projects
4. **User Management**: Add ability to manage multiple admin users
5. **Analytics**: Implement dashboard statistics and analytics

## Security Notes

- Change the default admin credentials after first login
- Use a strong `NEXTAUTH_SECRET` in production
- Ensure MongoDB is properly secured
- Consider implementing rate limiting for login attempts
