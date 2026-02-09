import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { setupAuth, registerAuthRoutes, isAuthenticated } from "./replit_integrations/auth";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup Auth
  await setupAuth(app);
  registerAuthRoutes(app);

  // --- Events ---
  app.get(api.events.list.path, async (req, res) => {
    const events = await storage.getEvents();
    res.json(events);
  });
  app.get(api.events.get.path, async (req, res) => {
    const event = await storage.getEvent(Number(req.params.id));
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  });
  app.post(api.events.create.path, isAuthenticated, async (req, res) => {
    try {
      const input = api.events.create.input.parse(req.body);
      const event = await storage.createEvent(input);
      res.status(201).json(event);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json(err.errors);
      throw err;
    }
  });
  app.put(api.events.update.path, isAuthenticated, async (req, res) => {
    try {
      const input = api.events.update.input.parse(req.body);
      const event = await storage.updateEvent(Number(req.params.id), input);
      if (!event) return res.status(404).json({ message: "Event not found" });
      res.json(event);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json(err.errors);
      throw err;
    }
  });
  app.delete(api.events.delete.path, isAuthenticated, async (req, res) => {
    await storage.deleteEvent(Number(req.params.id));
    res.status(204).send();
  });

  // --- Projects ---
  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });
  app.post(api.projects.create.path, isAuthenticated, async (req, res) => {
    try {
      const input = api.projects.create.input.parse(req.body);
      const project = await storage.createProject(input);
      res.status(201).json(project);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json(err.errors);
      throw err;
    }
  });
  app.put(api.projects.update.path, isAuthenticated, async (req, res) => {
    try {
      const input = api.projects.update.input.parse(req.body);
      const project = await storage.updateProject(Number(req.params.id), input);
      if (!project) return res.status(404).json({ message: "Project not found" });
      res.json(project);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json(err.errors);
      throw err;
    }
  });
  app.delete(api.projects.delete.path, isAuthenticated, async (req, res) => {
    await storage.deleteProject(Number(req.params.id));
    res.status(204).send();
  });

  // --- Team Members ---
  app.get(api.teamMembers.list.path, async (req, res) => {
    const members = await storage.getTeamMembers();
    res.json(members);
  });
  app.post(api.teamMembers.create.path, isAuthenticated, async (req, res) => {
    try {
      const input = api.teamMembers.create.input.parse(req.body);
      const member = await storage.createTeamMember(input);
      res.status(201).json(member);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json(err.errors);
      throw err;
    }
  });
  app.put(api.teamMembers.update.path, isAuthenticated, async (req, res) => {
    try {
      const input = api.teamMembers.update.input.parse(req.body);
      const member = await storage.updateTeamMember(Number(req.params.id), input);
      if (!member) return res.status(404).json({ message: "Member not found" });
      res.json(member);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json(err.errors);
      throw err;
    }
  });
  app.delete(api.teamMembers.delete.path, isAuthenticated, async (req, res) => {
    await storage.deleteTeamMember(Number(req.params.id));
    res.status(204).send();
  });

  // --- Blog Posts ---
  app.get(api.blogPosts.list.path, async (req, res) => {
    const posts = await storage.getBlogPosts();
    res.json(posts);
  });
  app.get(api.blogPosts.get.path, async (req, res) => {
    const post = await storage.getBlogPost(Number(req.params.id));
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  });
  app.post(api.blogPosts.create.path, isAuthenticated, async (req, res) => {
    try {
      const input = api.blogPosts.create.input.parse(req.body);
      const post = await storage.createBlogPost(input);
      res.status(201).json(post);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json(err.errors);
      throw err;
    }
  });
  app.put(api.blogPosts.update.path, isAuthenticated, async (req, res) => {
    try {
      const input = api.blogPosts.update.input.parse(req.body);
      const post = await storage.updateBlogPost(Number(req.params.id), input);
      if (!post) return res.status(404).json({ message: "Post not found" });
      res.json(post);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json(err.errors);
      throw err;
    }
  });
  app.delete(api.blogPosts.delete.path, isAuthenticated, async (req, res) => {
    await storage.deleteBlogPost(Number(req.params.id));
    res.status(204).send();
  });

  // --- Contact ---
  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      const message = await storage.createContactMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json(err.errors);
      throw err;
    }
  });
  app.get(api.contact.list.path, isAuthenticated, async (req, res) => {
    const messages = await storage.getContactMessages();
    res.json(messages);
  });

  // --- Trainings ---
  app.get(api.trainings.list.path, async (req, res) => {
    const trainings = await storage.getTrainings();
    res.json(trainings);
  });
  app.post(api.trainings.create.path, isAuthenticated, async (req, res) => {
    try {
      const input = api.trainings.create.input.parse(req.body);
      const training = await storage.createTraining(input);
      res.status(201).json(training);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json(err.errors);
      throw err;
    }
  });
  app.put(api.trainings.update.path, isAuthenticated, async (req, res) => {
    try {
      const input = api.trainings.update.input.parse(req.body);
      const training = await storage.updateTraining(Number(req.params.id), input);
      if (!training) return res.status(404).json({ message: "Training not found" });
      res.json(training);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json(err.errors);
      throw err;
    }
  });
  app.delete(api.trainings.delete.path, isAuthenticated, async (req, res) => {
    await storage.deleteTraining(Number(req.params.id));
    res.status(204).send();
  });

  return httpServer;
}

// Helper to seed data
async function seedData() {
  const events = await storage.getEvents();
  if (events.length === 0) {
    console.log("Seeding data...");
    
    // Seed Team
    await storage.createTeamMember({
      name: "Maguy Kalomba",
      role: "Directrice Artistique & Fondatrice",
      bio: "Visionnaire et passionnée par les arts vivants, Maguy Kalomba a fondé Mapend'o Culture pour promouvoir la richesse culturelle de la RDC.",
      imageUrl: "/images/mr culturel/WhatsApp Image 2026-02-08 at 16.14.47.jpeg"
    });

    // Seed Events
    await storage.createEvent({
      title: "Festival Mapend'o 2026",
      description: "La grande célébration des arts vivants au cœur de Kinshasa.",
      date: new Date("2026-06-15"),
      location: "Institut Français de Kinshasa",
      category: "Festival",
      imageUrl: "/images/mr culturel/WhatsApp Image 2026-02-08 at 16.14.48.jpeg"
    });

    await storage.createEvent({
      title: "Atelier de Danse Contemporaine",
      description: "Masterclass avec des chorégraphes internationaux.",
      date: new Date("2026-04-10"),
      location: "Espace Mapend'o",
      category: "Danse",
      imageUrl: "/images/mr culturel/WhatsApp Image 2026-02-08 at 16.14.49.jpeg"
    });

    // Seed Projects
    await storage.createProject({
      title: "Racines",
      description: "Une création théâtrale explorant l'identité et la mémoire.",
      category: "Théâtre",
      imageUrl: "/images/mr culturel/WhatsApp Image 2026-02-08 at 16.14.50.jpeg"
    });

    await storage.createProject({
      title: "Échos du Fleuve",
      description: "Documentaire sur la musique traditionnelle riveraine.",
      category: "Cinéma",
      imageUrl: "/images/mr culturel/WhatsApp Image 2026-02-08 at 16.14.51.jpeg"
    });

    console.log("Data seeded successfully!");
  }
}

// Call seed data (you might want to call this conditionally or in index.ts, but here works for simple setup)
seedData().catch(console.error);
