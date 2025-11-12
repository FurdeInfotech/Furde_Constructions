import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Utility function to extract public_id from Cloudinary URL
export function extractPublicId(url: string): string | null {
  try {
    // Cloudinary URL format: https://res.cloudinary.com/cloud_name/image/upload/v1234567890/folder/filename.ext
    const urlParts = url.split('/');
    const uploadIndex = urlParts.findIndex(part => part === 'upload');
    
    if (uploadIndex === -1) return null;
    
    // Get everything after 'upload' and version (if present)
    let pathParts = urlParts.slice(uploadIndex + 1);
    
    // Remove version if present (starts with 'v' followed by numbers)
    if (pathParts[0] && /^v\d+$/.test(pathParts[0])) {
      pathParts = pathParts.slice(1);
    }
    
    // Join the remaining parts and remove file extension
    const publicId = pathParts.join('/').replace(/\.[^/.]+$/, '');
    return publicId;
  } catch (error) {
    console.error('Error extracting public_id from URL:', error);
    return null;
  }
}

// Function to delete multiple files from Cloudinary
export async function deleteCloudinaryFiles(urls: string[]): Promise<void> {
  try {
    const deletePromises = urls.map(async (url) => {
      const publicId = extractPublicId(url);
      if (publicId) {
        // Determine resource type based on file extension or URL pattern
        const resourceType = url.includes('/image/') ? 'image' : 
                           url.includes('/video/') ? 'video' : 
                           url.includes('/raw/') ? 'raw' : 'auto';
        
        return cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
      }
    });
    
    await Promise.all(deletePromises.filter(Boolean));
  } catch (error) {
    console.error('Error deleting files from Cloudinary:', error);
  }
}

export default cloudinary;
