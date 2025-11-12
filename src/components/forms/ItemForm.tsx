'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUpload } from '@/components/ui/file-upload';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

type ItemType = 'project' | 'award' | 'event';

interface ItemFormProps {
  type: ItemType;
  item?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ItemForm({ type, item, onSubmit, onCancel, isLoading = false }: ItemFormProps) {
  const [formData, setFormData] = useState<any>(() => {
    const baseData = {
      images: item?.images || [],
    };
    
    if (type === 'project') {
      return {
        ...baseData,
        name: item?.name || '',
        address: item?.address || '',
        types: item?.types || '',
        startingPrice: item?.startingPrice || '',
        description: item?.description || '',
        tagline: item?.tagline || '',
        badge: item?.badge || '',
        status: item?.status || 'ongoing',
        googleMapLink: item?.googleMapLink || '',
        coverImage: item?.coverImage || '',
        brochures: item?.brochures || [],
      };
    } else if (type === 'award') {
      return {
        ...baseData,
        title: item?.title || '',
        description: item?.description || '',
        category: item?.category || '',
        awardDate: item?.awardDate ? new Date(item.awardDate).toISOString().split('T')[0] : '',
      };
    } else { // event
      return {
        ...baseData,
        title: item?.title || '',
        type: item?.type || '',
      };
    }
  });

  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = async (files: File[]) => {
    setUploading(true);
    try {
      const formDataUpload = new FormData();
      files.forEach(file => formDataUpload.append('files', file));
      formDataUpload.append('folder', `furde-constructions/${type}s`);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      const result = await response.json();
      if (result.success) {
        const newUrls = result.data.map((file: any) => file.url);
        setUploadedFiles(prev => [...prev, ...newUrls]);
        
        // Add to appropriate field based on file type
        const imageUrls = result.data.filter((file: any) => file.resource_type === 'image').map((file: any) => file.url);
        const pdfUrls = result.data.filter((file: any) => file.resource_type === 'raw').map((file: any) => file.url);
        
        setFormData((prev: any) => ({
          ...prev,
          images: [...(prev.images || []), ...imageUrls],
          ...(type === 'project' && { brochures: [...(prev.brochures || []), ...pdfUrls] })
        }));
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleCoverImageUpload = async (files: File[]) => {
    if (files.length === 0) return;
    
    setUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('files', files[0]); // Only take the first file
      formDataUpload.append('folder', `furde-constructions/projects/covers`);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      const result = await response.json();
      if (result.success && result.data.length > 0) {
        const coverImageUrl = result.data[0].url;
        setFormData((prev: any) => ({
          ...prev,
          coverImage: coverImageUrl
        }));
      }
    } catch (error) {
      console.error('Error uploading cover image:', error);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number, field: 'images' | 'brochures' = 'images') => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: prev[field].filter((_: any, i: number) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderProjectFields = () => (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Project Name *</label>
          <Input
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Status *</label>
          <select
            value={formData.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Address *</label>
        <Input
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Property Types *</label>
          <Input
            value={formData.types}
            onChange={(e) => handleInputChange('types', e.target.value)}
            placeholder="e.g., 2BHK - 3BHK"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Starting Price</label>
          <Input
            value={formData.startingPrice}
            onChange={(e) => handleInputChange('startingPrice', e.target.value)}
            placeholder="e.g., Rs 28,31,000/-"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Description *</label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className="w-full p-2 border rounded-md h-24"
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Tagline *</label>
          <Input
            value={formData.tagline}
            onChange={(e) => handleInputChange('tagline', e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Badge *</label>
          <Input
            value={formData.badge}
            onChange={(e) => handleInputChange('badge', e.target.value)}
            required
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Google Maps Link</label>
        <Input
          value={formData.googleMapLink}
          onChange={(e) => handleInputChange('googleMapLink', e.target.value)}
          placeholder="https://maps.google.com/..."
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Cover Image *</label>
        <FileUpload
          onUpload={handleCoverImageUpload}
          accept="image/*"
          multiple={false}
          maxFiles={1}
        />
        {formData.coverImage && (
          <div className="mt-2">
            <Badge variant="outline">Cover image uploaded</Badge>
          </div>
        )}
      </div>
    </>
  );

  const renderAwardFields = () => (
    <>
      <div>
        <label className="block text-sm font-medium mb-2">Award Title *</label>
        <Input
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className="w-full p-2 border rounded-md h-24"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <Input
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            placeholder="e.g., Excellence Award"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Award Date</label>
          <Input
            type="date"
            value={formData.awardDate}
            onChange={(e) => handleInputChange('awardDate', e.target.value)}
          />
        </div>
      </div>
    </>
  );

  const renderEventFields = () => (
    <>
      <div>
        <label className="block text-sm font-medium mb-2">Event Title *</label>
        <Input
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Event Type *</label>
        <Input
          value={formData.type}
          onChange={(e) => handleInputChange('type', e.target.value)}
          placeholder="e.g., Festival, Celebration, Corporate Event"
          required
        />
      </div>
    </>
  );

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>
          {item ? 'Edit' : 'Add New'} {type.charAt(0).toUpperCase() + type.slice(1)}
        </CardTitle>
        <CardDescription>
          Fill in the details below to {item ? 'update' : 'create'} the {type}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {type === 'project' && renderProjectFields()}
          {type === 'award' && renderAwardFields()}
          {type === 'event' && renderEventFields()}
          
          {/* File Upload Section */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Upload Images {type === 'project' && '& Brochures'}
            </label>
            <FileUpload
              onUpload={handleFileUpload}
              accept={type === 'project' ? "image/*,application/pdf" : "image/*"}
              multiple={true}
              maxFiles={10}
            />
          </div>
          
          {/* Display uploaded images */}
          {formData.images.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Images ({formData.images.length})</h4>
              <div className="flex flex-wrap gap-2">
                {formData.images.map((url: string, index: number) => (
                  <div key={index} className="relative">
                    <Badge variant="outline" className="pr-6">
                      Image {index + 1}
                      <button
                        type="button"
                        onClick={() => removeImage(index, 'images')}
                        className="absolute right-1 top-1/2 -translate-y-1/2"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Display uploaded brochures for projects */}
          {type === 'project' && formData.brochures && formData.brochures.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Brochures ({formData.brochures.length})</h4>
              <div className="flex flex-wrap gap-2">
                {formData.brochures.map((url: string, index: number) => (
                  <div key={index} className="relative">
                    <Badge variant="outline" className="pr-6">
                      Brochure {index + 1}
                      <button
                        type="button"
                        onClick={() => removeImage(index, 'brochures')}
                        className="absolute right-1 top-1/2 -translate-y-1/2"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || uploading}>
              {isLoading ? 'Saving...' : uploading ? 'Uploading...' : item ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
