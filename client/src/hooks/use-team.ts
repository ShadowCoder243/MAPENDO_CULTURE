import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type InsertTeamMember } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useTeamMembers() {
  return useQuery({
    queryKey: [api.teamMembers.list.path],
    queryFn: async () => {
      const res = await fetch(api.teamMembers.list.path);
      if (!res.ok) throw new Error("Failed to fetch team members");
      return api.teamMembers.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateTeamMember() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertTeamMember) => {
      const res = await fetch(api.teamMembers.create.path, {
        method: api.teamMembers.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to create team member");
      return api.teamMembers.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.teamMembers.list.path] });
      toast({ title: "Success", description: "Team member added successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
}

export function useUpdateTeamMember() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...data }: { id: number } & Partial<InsertTeamMember>) => {
      const url = buildUrl(api.teamMembers.update.path, { id });
      const res = await fetch(url, {
        method: api.teamMembers.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to update team member");
      return api.teamMembers.update.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.teamMembers.list.path] });
      toast({ title: "Success", description: "Team member updated successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
}

export function useDeleteTeamMember() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.teamMembers.delete.path, { id });
      const res = await fetch(url, { 
        method: api.teamMembers.delete.method,
        credentials: "include" 
      });
      if (!res.ok) throw new Error("Failed to delete team member");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.teamMembers.list.path] });
      toast({ title: "Success", description: "Team member deleted successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
}
