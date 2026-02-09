import { z } from 'zod';
import { 
  insertEventSchema, 
  insertProjectSchema, 
  insertTeamMemberSchema, 
  insertBlogPostSchema, 
  insertContactMessageSchema,
  insertTrainingSchema,
  events,
  projects,
  teamMembers,
  blogPosts,
  contactMessages,
  trainings
} from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  events: {
    list: {
      method: 'GET' as const,
      path: '/api/events' as const,
      responses: {
        200: z.array(z.custom<typeof events.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/events/:id' as const,
      responses: {
        200: z.custom<typeof events.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/events' as const,
      input: insertEventSchema,
      responses: {
        201: z.custom<typeof events.$inferSelect>(),
        400: errorSchemas.validation,
        401: errorSchemas.internal, // Unauthorized
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/events/:id' as const,
      input: insertEventSchema.partial(),
      responses: {
        200: z.custom<typeof events.$inferSelect>(),
        400: errorSchemas.validation,
        404: errorSchemas.notFound,
        401: errorSchemas.internal,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/events/:id' as const,
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
        401: errorSchemas.internal,
      },
    },
  },
  projects: {
    list: {
      method: 'GET' as const,
      path: '/api/projects' as const,
      responses: {
        200: z.array(z.custom<typeof projects.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/projects' as const,
      input: insertProjectSchema,
      responses: {
        201: z.custom<typeof projects.$inferSelect>(),
        400: errorSchemas.validation,
        401: errorSchemas.internal,
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/projects/:id' as const,
      input: insertProjectSchema.partial(),
      responses: {
        200: z.custom<typeof projects.$inferSelect>(),
        400: errorSchemas.validation,
        404: errorSchemas.notFound,
        401: errorSchemas.internal,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/projects/:id' as const,
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
        401: errorSchemas.internal,
      },
    },
  },
  teamMembers: {
    list: {
      method: 'GET' as const,
      path: '/api/team-members' as const,
      responses: {
        200: z.array(z.custom<typeof teamMembers.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/team-members' as const,
      input: insertTeamMemberSchema,
      responses: {
        201: z.custom<typeof teamMembers.$inferSelect>(),
        400: errorSchemas.validation,
        401: errorSchemas.internal,
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/team-members/:id' as const,
      input: insertTeamMemberSchema.partial(),
      responses: {
        200: z.custom<typeof teamMembers.$inferSelect>(),
        400: errorSchemas.validation,
        404: errorSchemas.notFound,
        401: errorSchemas.internal,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/team-members/:id' as const,
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
        401: errorSchemas.internal,
      },
    },
  },
  blogPosts: {
    list: {
      method: 'GET' as const,
      path: '/api/blog-posts' as const,
      responses: {
        200: z.array(z.custom<typeof blogPosts.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/blog-posts/:id' as const,
      responses: {
        200: z.custom<typeof blogPosts.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/blog-posts' as const,
      input: insertBlogPostSchema,
      responses: {
        201: z.custom<typeof blogPosts.$inferSelect>(),
        400: errorSchemas.validation,
        401: errorSchemas.internal,
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/blog-posts/:id' as const,
      input: insertBlogPostSchema.partial(),
      responses: {
        200: z.custom<typeof blogPosts.$inferSelect>(),
        400: errorSchemas.validation,
        404: errorSchemas.notFound,
        401: errorSchemas.internal,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/blog-posts/:id' as const,
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
        401: errorSchemas.internal,
      },
    },
  },
  contact: {
    create: {
      method: 'POST' as const,
      path: '/api/contact' as const,
      input: insertContactMessageSchema,
      responses: {
        201: z.custom<typeof contactMessages.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    list: {
      method: 'GET' as const,
      path: '/api/contact' as const,
      responses: {
        200: z.array(z.custom<typeof contactMessages.$inferSelect>()),
        401: errorSchemas.internal,
      },
    },
  },
  trainings: {
    list: {
      method: 'GET' as const,
      path: '/api/trainings' as const,
      responses: {
        200: z.array(z.custom<typeof trainings.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/trainings' as const,
      input: insertTrainingSchema,
      responses: {
        201: z.custom<typeof trainings.$inferSelect>(),
        400: errorSchemas.validation,
        401: errorSchemas.internal,
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/trainings/:id' as const,
      input: insertTrainingSchema.partial(),
      responses: {
        200: z.custom<typeof trainings.$inferSelect>(),
        400: errorSchemas.validation,
        404: errorSchemas.notFound,
        401: errorSchemas.internal,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/trainings/:id' as const,
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
        401: errorSchemas.internal,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
