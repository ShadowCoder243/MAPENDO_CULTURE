import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import {
  events, projects, teamMembers, blogPosts, contactMessages, trainings,
  type Event, type InsertEvent, type UpdateEventRequest,
  type Project, type InsertProject, type UpdateProjectRequest,
  type TeamMember, type InsertTeamMember, type UpdateTeamMemberRequest,
  type BlogPost, type InsertBlogPost, type UpdateBlogPostRequest,
  type ContactMessage, type InsertContactMessage,
  type Training, type InsertTraining, type UpdateTrainingRequest
} from "@shared/schema";

export interface IStorage {
  // Events
  getEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: number, event: UpdateEventRequest): Promise<Event>;
  deleteEvent(id: number): Promise<void>;

  // Projects
  getProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: UpdateProjectRequest): Promise<Project>;
  deleteProject(id: number): Promise<void>;

  // Team
  getTeamMembers(): Promise<TeamMember[]>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  updateTeamMember(id: number, member: UpdateTeamMemberRequest): Promise<TeamMember>;
  deleteTeamMember(id: number): Promise<void>;

  // Blog
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: UpdateBlogPostRequest): Promise<BlogPost>;
  deleteBlogPost(id: number): Promise<void>;

  // Contact
  getContactMessages(): Promise<ContactMessage[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;

  // Trainings
  getTrainings(): Promise<Training[]>;
  createTraining(training: InsertTraining): Promise<Training>;
  updateTraining(id: number, training: UpdateTrainingRequest): Promise<Training>;
  deleteTraining(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // Events
  async getEvents(): Promise<Event[]> {
    return await db.select().from(events).orderBy(desc(events.date));
  }
  async getEvent(id: number): Promise<Event | undefined> {
    const [event] = await db.select().from(events).where(eq(events.id, id));
    return event;
  }
  async createEvent(event: InsertEvent): Promise<Event> {
    const [newEvent] = await db.insert(events).values(event).returning();
    return newEvent;
  }
  async updateEvent(id: number, event: UpdateEventRequest): Promise<Event> {
    const [updated] = await db.update(events).set(event).where(eq(events.id, id)).returning();
    return updated;
  }
  async deleteEvent(id: number): Promise<void> {
    await db.delete(events).where(eq(events.id, id));
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(desc(projects.createdAt));
  }
  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db.insert(projects).values(project).returning();
    return newProject;
  }
  async updateProject(id: number, project: UpdateProjectRequest): Promise<Project> {
    const [updated] = await db.update(projects).set(project).where(eq(projects.id, id)).returning();
    return updated;
  }
  async deleteProject(id: number): Promise<void> {
    await db.delete(projects).where(eq(projects.id, id));
  }

  // Team
  async getTeamMembers(): Promise<TeamMember[]> {
    return await db.select().from(teamMembers);
  }
  async createTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    const [newMember] = await db.insert(teamMembers).values(member).returning();
    return newMember;
  }
  async updateTeamMember(id: number, member: UpdateTeamMemberRequest): Promise<TeamMember> {
    const [updated] = await db.update(teamMembers).set(member).where(eq(teamMembers.id, id)).returning();
    return updated;
  }
  async deleteTeamMember(id: number): Promise<void> {
    await db.delete(teamMembers).where(eq(teamMembers.id, id));
  }

  // Blog
  async getBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
  }
  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }
  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db.insert(blogPosts).values(post).returning();
    return newPost;
  }
  async updateBlogPost(id: number, post: UpdateBlogPostRequest): Promise<BlogPost> {
    const [updated] = await db.update(blogPosts).set(post).where(eq(blogPosts.id, id)).returning();
    return updated;
  }
  async deleteBlogPost(id: number): Promise<void> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }

  // Contact
  async getContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [newMessage] = await db.insert(contactMessages).values(message).returning();
    return newMessage;
  }

  // Trainings
  async getTrainings(): Promise<Training[]> {
    return await db.select().from(trainings).orderBy(desc(trainings.date));
  }
  async createTraining(training: InsertTraining): Promise<Training> {
    const [newTraining] = await db.insert(trainings).values(training).returning();
    return newTraining;
  }
  async updateTraining(id: number, training: UpdateTrainingRequest): Promise<Training> {
    const [updated] = await db.update(trainings).set(training).where(eq(trainings.id, id)).returning();
    return updated;
  }
  async deleteTraining(id: number): Promise<void> {
    await db.delete(trainings).where(eq(trainings.id, id));
  }
}

export const storage = new DatabaseStorage();
