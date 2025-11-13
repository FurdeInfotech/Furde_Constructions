'use client';

import { useState, useEffect } from 'react';

export interface Project {
  _id: string;
  name: string;
  address: string;
  types: string;
  startingPrice?: string;
  description: string;
  tagline: string;
  badge: string;
  coverImage?: string;
  images: string[];
  status: 'ongoing' | 'completed' | 'upcoming';
  googleMapLink?: string;
  brochures: string[];
  createdAt: string;
  updatedAt: string;
}

interface UseProjectsReturn {
  projects: Project[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

interface UseProjectReturn {
  project: Project | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useProjects = (): UseProjectsReturn => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/projects', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setProjects(data.data || []);
      } else {
        throw new Error(data.message || 'Failed to fetch projects');
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
  };
};

export const useProject = (id: string): UseProjectReturn => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProject = async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/projects/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch project: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setProject(data.data);
      } else {
        throw new Error(data.message || 'Failed to fetch project');
      }
    } catch (err) {
      console.error('Error fetching project:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setProject(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  return {
    project,
    loading,
    error,
    refetch: fetchProject,
  };
};

// Helper function to get featured projects (specific ones for home page)
export const getFeaturedProjects = (projects: Project[]): Project[] => {
  const featuredNames = ['Furde Heights', 'Amar Vishwa', 'Vidyavihar Warehouses'];
  
  const featured = featuredNames
    .map(name => projects.find(p => p.name.toLowerCase().includes(name.toLowerCase())))
    .filter(Boolean) as Project[];
  
  // If we don't have all 3 featured projects, fill with the first available projects
  if (featured.length < 3) {
    const remaining = projects
      .filter(p => !featured.some(f => f._id === p._id))
      .slice(0, 3 - featured.length);
    featured.push(...remaining);
  }
  
  return featured.slice(0, 3);
};
