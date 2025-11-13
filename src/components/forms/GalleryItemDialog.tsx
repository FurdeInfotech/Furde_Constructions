'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileUpload } from '@/components/ui/file-upload';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type ItemType = 'award' | 'event';

interface AwardData {
  title: string;
  description?: string;
  category?: string;
  awardDate?: string;
  images: string[];
}

interface EventData {
  title: string;
  type?: string;
  images: string[];
}

interface GalleryItemDialogProps {
  type: ItemType;
  item?: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: AwardData | EventData) => void;
  isLoading?: boolean;
}

export function GalleryItemDialog({ 
  type, 
  item, 
  open, 
  onOpenChange, 
  onSubmit, 
  isLoading = false 
}: GalleryItemDialogProps) {
  const [formData, setFormData] = useState(() => ({
    title: item?.title || '',
    type: item?.type || (type === 'award' ? item?.category || '' : item?.type || ''),
    images: item?.images || [],
    // Keep additional fields for awards
    ...(type === 'award' && {
      description: item?.description || '',
      awardDate: item?.awardDate ? new Date(item.awardDate).toISOString().split('T')[0] : '',
    })
  }));

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
        const imageUrls = result.data
          .filter((file: any) => file.resource_type === 'image')
          .map((file: any) => file.url);
        
        setFormData((prev: any) => ({
          ...prev,
          images: [...prev.images, ...imageUrls]
        }));
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      images: prev.images.filter((_: any, i: number) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare data based on type
    let submitData: AwardData | EventData;
    
    if (type === 'award') {
      // For awards, map 'type' field to 'category'
      submitData = {
        title: formData.title,
        description: formData.description,
        category: formData.type, // Map type to category for awards
        awardDate: formData.awardDate,
        images: formData.images,
      } as AwardData;
    } else {
      // For events, keep as is
      submitData = {
        title: formData.title,
        type: formData.type,
        images: formData.images,
      } as EventData;
    }
    
    onSubmit(submitData);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      type: '',
      images: [],
      ...(type === 'award' && {
        description: '',
        awardDate: '',
      })
    });
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && !isLoading) {
      resetForm();
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {item ? 'Edit' : 'Add New'} {type === 'award' ? 'Award' : 'Event'}
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to {item ? 'update' : 'create'} the {type}.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              {type === 'award' ? 'Award' : 'Event'} Title *
            </label>
            <Input
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder={`Enter ${type} title`}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              {type === 'award' ? 'Category' : 'Event Type'} *
            </label>
            <Input
              value={formData.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
              placeholder={type === 'award' ? 'e.g., Excellence Award' : 'e.g., Festival, Celebration'}
              required
            />
          </div>
          
          {type === 'award' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full p-2 border rounded-md h-20 text-sm"
                  placeholder="Award description (optional)"
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
            </>
          )}
          
          <div>
            <label className="block text-sm font-medium mb-2">Upload Images</label>
            <FileUpload
              onUpload={handleFileUpload}
              accept="image/*"
              multiple={true}
              maxFiles={10}
            />
          </div>
          
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
                        onClick={() => removeImage(index)}
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
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => handleOpenChange(false)}
              disabled={isLoading || uploading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading || uploading || !formData.title || !formData.type}
            >
              {isLoading ? 'Saving...' : uploading ? 'Uploading...' : item ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
