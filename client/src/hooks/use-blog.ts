import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type InsertBlogPost } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useBlogPosts() {
  return useQuery({
    queryKey: [api.blogPosts.list.path],
    queryFn: async () => {
      const res = await fetch(api.blogPosts.list.path);
      if (!res.ok) throw new Error("Failed to fetch blog posts");
      return api.blogPosts.list.responses[200].parse(await res.json());
    },
  });
}

export function useBlogPost(id: number) {
  return useQuery({
    queryKey: [api.blogPosts.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.blogPosts.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch post");
      return api.blogPosts.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

export function useCreateBlogPost() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertBlogPost) => {
      const res = await fetch(api.blogPosts.create.path, {
        method: api.blogPosts.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to create post");
      return api.blogPosts.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.blogPosts.list.path] });
      toast({ title: "Success", description: "Blog post created successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
}

export function useUpdateBlogPost() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...data }: { id: number } & Partial<InsertBlogPost>) => {
      const url = buildUrl(api.blogPosts.update.path, { id });
      const res = await fetch(url, {
        method: api.blogPosts.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to update post");
      return api.blogPosts.update.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.blogPosts.list.path] });
      toast({ title: "Success", description: "Blog post updated successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
}

export function useDeleteBlogPost() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.blogPosts.delete.path, { id });
      const res = await fetch(url, { 
        method: api.blogPosts.delete.method,
        credentials: "include" 
      });
      if (!res.ok) throw new Error("Failed to delete post");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.blogPosts.list.path] });
      toast({ title: "Success", description: "Blog post deleted successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
}
