import { useToast } from "@/hooks/use-toast";

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  imageUrl: string | null;
  createdAt: string;
}

const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Le rôle de l'art dans la paix",
    content: "L'art a toujours été un vecteur de changement social...",
    excerpt: "L'art a toujours été un vecteur de changement social...",
    imageUrl: "WhatsApp Image 2026-02-08 at 16.14.48.jpeg",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Nouveaux talents à Goma",
    content: "La scène artistique de Goma est en pleine effervescence...",
    excerpt: "La scène artistique de Goma est en pleine effervescence...",
    imageUrl: "WhatsApp Image 2026-02-08 at 16.14.49.jpeg",
    createdAt: new Date().toISOString()
  }
];

export function useBlogPosts() {
  return {
    data: MOCK_BLOG_POSTS,
    isLoading: false,
    error: null
  };
}

export function useBlogPost(id: number) {
  const post = MOCK_BLOG_POSTS.find(p => p.id === id);
  return {
    data: post || null,
    isLoading: false,
    error: null
  };
}

export function useCreateBlogPost() {
  const { toast } = useToast();
  return {
    mutate: (data: any) => {
      console.log("Mock blog post created:", data);
      toast({ title: "Succès", description: "Article créé (simulation)" });
    },
    isPending: false
  };
}

export function useUpdateBlogPost() {
  const { toast } = useToast();
  return {
    mutate: ({ id, ...data }: any) => {
      console.log("Mock blog post updated:", id, data);
      toast({ title: "Succès", description: "Article mis à jour (simulation)" });
    },
    isPending: false
  };
}

export function useDeleteBlogPost() {
  const { toast } = useToast();
  return {
    mutate: (id: number) => {
      console.log("Mock blog post deleted:", id);
      toast({ title: "Succès", description: "Article supprimé (simulation)" });
    },
    isPending: false
  };
}
