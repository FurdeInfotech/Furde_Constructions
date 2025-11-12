'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Images, Award, Calendar, Edit, Trash2 } from 'lucide-react';
import { GalleryItemDialog } from '@/components/forms/GalleryItemDialog';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type FilterType = 'awards' | 'events';


interface Award {
  _id: string;
  title: string;
  description?: string;
  images: string[];
  awardDate?: string;
  category?: string;
  createdAt: string;
}

interface Event {
  _id: string;
  title: string;
  type: string;
  images: string[];
  createdAt: string;
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('awards');
  const [awards, setAwards] = useState<Award[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  const filters = [
    { id: 'awards', label: 'Awards', icon: Award, count: awards.length },
    { id: 'events', label: 'Events', icon: Calendar, count: events.length },
  ] as const;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [awardsRes, eventsRes] = await Promise.all([
        fetch('/api/awards'),
        fetch('/api/events'),
      ]);

      const [awardsData, eventsData] = await Promise.all([
        awardsRes.json(),
        eventsRes.json(),
      ]);

      if (awardsData.success) setAwards(awardsData.data);
      if (eventsData.success) setEvents(eventsData.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, type: FilterType) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const endpoint = type === 'awards' ? 'awards' : 'events';
      const response = await fetch(`/api/${endpoint}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchData(); // Refresh data
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleSubmit = async (data: any) => {
    setSubmitting(true);
    try {
      const endpoint = activeFilter === 'awards' ? 'awards' : 'events';
      const method = editingItem ? 'PUT' : 'POST';
      const url = editingItem ? `/api/${endpoint}/${editingItem._id}` : `/api/${endpoint}`;
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        setDialogOpen(false);
        setEditingItem(null);
        fetchData(); // Refresh data
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const renderAwards = () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {awards.map((award) => (
        <Card key={award._id} className="overflow-hidden">
          <div className="relative h-48">
            <Image
              src={award.images[0] || '/placeholder.jpg'}
              alt={award.title}
              fill
              className="object-cover"
            />
          </div>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {award.title}
              <div className="flex space-x-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setEditingItem(award);
                    setDialogOpen(true);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDelete(award._id, 'awards')}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
            {award.category && (
              <Badge variant="secondary">{award.category}</Badge>
            )}
          </CardHeader>
          <CardContent>
            {award.description && (
              <p className="text-sm text-gray-600 mb-2">{award.description}</p>
            )}
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-gray-500">{award.images.length} images</span>
              {award.awardDate && (
                <span className="text-xs text-gray-500">
                  {new Date(award.awardDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderEvents = () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <Card key={event._id} className="overflow-hidden">
          <div className="relative h-48">
            <Image
              src={event.images[0] || '/placeholder.jpg'}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {event.title}
              <div className="flex space-x-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setEditingItem(event);
                    setDialogOpen(true);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDelete(event._id, 'events')}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
            <Badge variant="secondary">{event.type}</Badge>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-gray-500">{event.images.length} images</span>
              <span className="text-xs text-gray-500">
                {new Date(event.createdAt).toLocaleDateString()}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      );
    }

    const isEmpty = (
      (activeFilter === 'awards' && awards.length === 0) ||
      (activeFilter === 'events' && events.length === 0)
    );

    if (isEmpty) {
      return (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="flex flex-col items-center justify-center p-12">
            <Images className="h-16 w-16 text-gray-400 mb-4" />
            <CardTitle className="text-xl text-gray-600 mb-2">
              No {activeFilter.replace('-', ' ')} yet
            </CardTitle>
            <CardDescription className="text-center mb-4">
              Create your first {activeFilter.replace('-', ' ')} to get started.
            </CardDescription>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add {activeFilter === 'awards' ? 'Award' : 'Event'}
            </Button>
          </CardContent>
        </Card>
      );
    }

    switch (activeFilter) {
      case 'awards':
        return renderAwards();
      case 'events':
        return renderEvents();
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gallery Management</h2>
          <p className="text-muted-foreground">
            Manage your awards and events.
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add {activeFilter === 'awards' ? 'Award' : 'Event'}
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {filters.map((filter) => {
          const Icon = filter.icon;
          return (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                activeFilter === filter.id
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{filter.label}</span>
              <Badge variant="secondary" className="ml-1">
                {filter.count}
              </Badge>
            </button>
          );
        })}
      </div>

      {/* Content */}
      {renderContent()}
      
      {/* Dialog Form */}
      <GalleryItemDialog
        type={activeFilter === 'awards' ? 'award' : 'event'}
        item={editingItem}
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) {
            setEditingItem(null);
          }
        }}
        onSubmit={handleSubmit}
        isLoading={submitting}
      />
    </div>
  );
}
