import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type InsertTraining } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useTrainings() {
  return useQuery({
    queryKey: [api.trainings.list.path],
    queryFn: async () => {
      const res = await fetch(api.trainings.list.path);
      if (!res.ok) throw new Error("Failed to fetch trainings");
      return api.trainings.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateTraining() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertTraining) => {
      const res = await fetch(api.trainings.create.path, {
        method: api.trainings.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to create training");
      return api.trainings.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.trainings.list.path] });
      toast({ title: "Success", description: "Training created successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
}

export function useUpdateTraining() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...data }: { id: number } & Partial<InsertTraining>) => {
      const url = buildUrl(api.trainings.update.path, { id });
      const res = await fetch(url, {
        method: api.trainings.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to update training");
      return api.trainings.update.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.trainings.list.path] });
      toast({ title: "Success", description: "Training updated successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
}

export function useDeleteTraining() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.trainings.delete.path, { id });
      const res = await fetch(url, { 
        method: api.trainings.delete.method,
        credentials: "include" 
      });
      if (!res.ok) throw new Error("Failed to delete training");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.trainings.list.path] });
      toast({ title: "Success", description: "Training deleted successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
}
