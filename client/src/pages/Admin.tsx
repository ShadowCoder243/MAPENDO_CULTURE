import { useAuth } from "@/hooks/use-auth";
import { useEvents, useCreateEvent, useDeleteEvent } from "@/hooks/use-events";
import { useProjects, useCreateProject, useDeleteProject } from "@/hooks/use-projects";
import { useContactMessages } from "@/hooks/use-contact";
import { useTeamMembers, useCreateTeamMember, useDeleteTeamMember } from "@/hooks/use-team";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertEventSchema, insertProjectSchema, insertTeamMemberSchema } from "@shared/schema";
import { format } from "date-fns";
import { Loader2, Plus, Trash2, LogOut } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { getImageUrl } from "@/lib/images";

// --- Sub-Components for Admin Sections ---

function EventsManager() {
  const { data: events, isLoading } = useEvents();
  const deleteMutation = useDeleteEvent();
  const createMutation = useCreateEvent();
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(insertEventSchema),
    defaultValues: {
      title: "",
      description: "",
      date: new Date(),
      location: "",
      imageUrl: "",
      category: "Theater",
    }
  });

  function onSubmit(data: any) {
    // Force date to be a Date object if coerce fails
    createMutation.mutate({ ...data, date: new Date(data.date) }, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      }
    });
  }

  if (isLoading) return <Loader2 className="animate-spin" />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Events</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" /> Add Event</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create Event</DialogTitle></DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="title" render={({ field }) => (
                  <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="category" render={({ field }) => (
                    <FormItem><FormLabel>Category</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="date" render={({ field }) => (
                    <FormItem><FormLabel>Date (YYYY-MM-DD)</FormLabel><FormControl><Input type="datetime-local" {...field} value={field.value ? format(field.value, "yyyy-MM-dd'T'HH:mm") : ''} onChange={(e) => field.onChange(new Date(e.target.value))} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="location" render={({ field }) => (
                  <FormItem><FormLabel>Location</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="imageUrl" render={({ field }) => (
                  <FormItem><FormLabel>Image URL (Optional)</FormLabel><FormControl><Input {...field} value={field.value || ''} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" disabled={createMutation.isPending}>{createMutation.isPending ? "Saving..." : "Create"}</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {events?.map((event) => (
          <div key={event.id} className="flex justify-between items-center p-4 border rounded-lg bg-card">
            <div className="flex gap-4">
              <img src={getImageUrl(event.imageUrl)} className="w-16 h-16 object-cover rounded" />
              <div>
                <h3 className="font-bold">{event.title}</h3>
                <p className="text-sm text-muted-foreground">{format(new Date(event.date), "PPP")} • {event.location}</p>
              </div>
            </div>
            <Button variant="destructive" size="icon" onClick={() => deleteMutation.mutate(event.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsManager() {
  const { data: projects, isLoading } = useProjects();
  const deleteMutation = useDeleteProject();
  const createMutation = useCreateProject();
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(insertProjectSchema),
    defaultValues: { title: "", description: "", imageUrl: "", category: "Theater" }
  });

  const onSubmit = (data: any) => createMutation.mutate(data, { onSuccess: () => { setOpen(false); form.reset(); }});

  if (isLoading) return <Loader2 className="animate-spin" />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" /> Add Project</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create Project</DialogTitle></DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="title" render={({ field }) => (
                  <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="category" render={({ field }) => (
                  <FormItem><FormLabel>Category</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="imageUrl" render={({ field }) => (
                  <FormItem><FormLabel>Image URL</FormLabel><FormControl><Input {...field} value={field.value || ''} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" disabled={createMutation.isPending}>{createMutation.isPending ? "Saving..." : "Create"}</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {projects?.map((project) => (
          <div key={project.id} className="flex justify-between items-center p-4 border rounded-lg bg-card">
             <div className="flex gap-4">
              <img src={getImageUrl(project.imageUrl)} className="w-16 h-16 object-cover rounded" />
              <div>
                <h3 className="font-bold">{project.title}</h3>
                <p className="text-sm text-muted-foreground">{project.category}</p>
              </div>
            </div>
            <Button variant="destructive" size="icon" onClick={() => deleteMutation.mutate(project.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function MessagesManager() {
  const { data: messages, isLoading } = useContactMessages();
  if (isLoading) return <Loader2 className="animate-spin" />;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Messages</h2>
      <div className="grid gap-4">
        {messages?.map((msg) => (
          <div key={msg.id} className="p-4 border rounded-lg bg-card space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold">{msg.subject}</h3>
                <p className="text-sm text-primary">{msg.type}</p>
              </div>
              <span className="text-xs text-muted-foreground">
                {format(new Date(msg.createdAt || new Date()), "PP p")}
              </span>
            </div>
            <p className="text-sm bg-muted p-3 rounded-md">{msg.message}</p>
            <div className="text-xs text-muted-foreground mt-2">
              From: <span className="font-medium text-foreground">{msg.name}</span> ({msg.email})
            </div>
          </div>
        ))}
        {(!messages || messages.length === 0) && <p className="text-muted-foreground">No messages yet.</p>}
      </div>
    </div>
  );
}

// --- Main Page ---

export default function Admin() {
  const { user, isLoading, logout } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation("/");
    }
  }, [user, isLoading, setLocation]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user.firstName || user.username || "Admin"}</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setLocation("/")}>View Site</Button>
            <Button variant="destructive" onClick={() => logout()}>
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="events" className="space-y-6">
          <TabsList>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>
          
          <TabsContent value="events" className="bg-card p-6 rounded-xl border shadow-sm">
            <EventsManager />
          </TabsContent>
          <TabsContent value="projects" className="bg-card p-6 rounded-xl border shadow-sm">
            <ProjectsManager />
          </TabsContent>
          <TabsContent value="messages" className="bg-card p-6 rounded-xl border shadow-sm">
            <MessagesManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
