"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2, ListChecks } from "lucide-react";

interface InquirySubject {
  _id: string;
  name: string;
  createdAt: string;
}

export default function InquirySubjectsPage() {
  const [subjects, setSubjects] = useState<InquirySubject[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSubject, setEditingSubject] = useState<InquirySubject | null>(
    null
  );
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/inquiry-subjects");
      const data = await response.json();
      if (data.success) {
        setSubjects(data.data);
      }
    } catch (error) {
      console.error("Error fetching inquiry subjects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingSubject(null);
    setName("");
    setShowForm(true);
  };

  const handleEdit = (subject: InquirySubject) => {
    setEditingSubject(subject);
    setName(subject.name);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingSubject(null);
    setName("");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry subject?"))
      return;

    try {
      const response = await fetch(`/api/inquiry-subjects/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchSubjects();
      }
    } catch (error) {
      console.error("Error deleting inquiry subject:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitting(true);
    try {
      const method = editingSubject ? "PUT" : "POST";
      const url = editingSubject
        ? `/api/inquiry-subjects/${editingSubject._id}`
        : "/api/inquiry-subjects";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name.trim() }),
      });

      if (response.ok) {
        setShowForm(false);
        setEditingSubject(null);
        setName("");
        fetchSubjects();
      }
    } catch (error) {
      console.error("Error saving inquiry subject:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              {editingSubject ? "Edit Inquiry Subject" : "Add Inquiry Subject"}
            </h2>
            <p className="text-muted-foreground">
              Manage the list of subjects shown in inquiry forms.
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {editingSubject ? "Update Subject" : "New Subject"}
            </CardTitle>
            <CardDescription>
              Enter a short, descriptive subject name.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Subject Name
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. New Project Inquiry"
                  disabled={submitting}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button type="submit" disabled={submitting || !name.trim()}>
                  {submitting ? "Saving..." : "Save"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={submitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <ListChecks className="h-6 w-6" /> Inquiry Subjects
          </h2>
          <p className="text-muted-foreground">
            Manage the subjects that users can choose when submitting inquiries.
          </p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" />
          Add Subject
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      ) : subjects.length === 0 ? (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="flex flex-col items-center justify-center p-12">
            <ListChecks className="h-16 w-16 text-gray-400 mb-4" />
            <CardTitle className="text-xl text-gray-600 mb-2">
              No Inquiry Subjects Yet
            </CardTitle>
            <CardDescription className="text-center mb-4">
              Create your first inquiry subject to get started.
            </CardDescription>
            <Button onClick={handleAddNew}>
              <Plus className="mr-2 h-4 w-4" />
              Add Subject
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Subjects</CardTitle>
            <CardDescription>All available inquiry subjects.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {subjects.map((subject) => (
                <div
                  key={subject._id}
                  className="flex items-center justify-between rounded-md border px-4 py-2 bg-white"
                >
                  <div>
                    <p className="font-medium">{subject.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(subject)}
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(subject._id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
