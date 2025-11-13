'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, FolderOpen, Edit, Trash2, MapPin, FileText } from 'lucide-react';
import { ItemForm } from '@/components/forms/ItemForm';
import Image from 'next/image';

interface Project {
  _id: string;
  name: string;
  address: string;
  types: string;
  startingPrice?: string;
  description: string;
  tagline: string;
  badge: string;
  coverImage: string;
  images: string[];
  status: 'ongoing' | 'completed' | 'upcoming';
  googleMapLink?: string;
  brochures: string[];
  createdAt: string;
  [key: string]: unknown;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      if (data.success) {
        setProjects(data.data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project? This will also delete all associated files from Cloudinary.')) return;

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchProjects(); // Refresh data
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleSubmit = async (data: any) => {
    setSubmitting(true);
    try {
      const method = editingProject ? 'PUT' : 'POST';
      const url = editingProject ? `/api/projects/${editingProject._id}` : '/api/projects';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        setShowForm(false);
        setEditingProject(null);
        fetchProjects(); // Refresh data
      }
    } catch (error) {
      console.error('Error submitting project:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h2>
            <p className="text-muted-foreground">
              {editingProject ? 'Update project details' : 'Create a new construction project'}
            </p>
          </div>
        </div>
        
        <ItemForm
          type="project"
          item={editingProject || undefined}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={submitting}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Projects Management</h2>
          <p className="text-muted-foreground">
            Manage your construction projects and their details.
          </p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Project
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      ) : projects.length === 0 ? (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="flex flex-col items-center justify-center p-12">
            <FolderOpen className="h-16 w-16 text-gray-400 mb-4" />
            <CardTitle className="text-xl text-gray-600 mb-2">No Projects Yet</CardTitle>
            <CardDescription className="text-center mb-4">
              Create your first construction project to get started.
            </CardDescription>
            <Button onClick={handleAddNew}>
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project._id} className="overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={project.coverImage}
                  alt={project.name}
                  fill
                  className="object-cover"
                />
                <Badge 
                  className="absolute top-2 right-2" 
                  variant={project.status === 'ongoing' ? 'default' : 'secondary'}
                >
                  {project.status}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="truncate">{project.name}</span>
                  <div className="flex space-x-1 ml-2">
                    {project.googleMapLink && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => window.open(project.googleMapLink, '_blank')}
                        title="View on Google Maps"
                      >
                        <MapPin className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(project)}
                      title="Edit Project"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(project._id)}
                      title="Delete Project"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription className="text-sm">{project.address}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">{project.types}</p>
                  {project.startingPrice && (
                    <p className="font-semibold text-green-600">{project.startingPrice}</p>
                  )}
                  <p className="text-xs text-gray-500 line-clamp-2">{project.description}</p>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">{project.images.length} images</span>
                      {project.brochures.length > 0 && (
                        <Badge variant="outline" className="text-xs">
                          <FileText className="h-3 w-3 mr-1" />
                          {project.brochures.length}
                        </Badge>
                      )}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {project.badge}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
