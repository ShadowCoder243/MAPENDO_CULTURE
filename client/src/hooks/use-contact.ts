import { useMutation, useQuery } from "@tanstack/react-query";
import { api, type InsertContactMessage } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useCreateContactMessage() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      const res = await fetch(api.contact.create.path, {
        method: api.contact.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send message");
      return api.contact.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({ title: "Message sent", description: "We will get back to you shortly." });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
}

export function useContactMessages() {
  return useQuery({
    queryKey: [api.contact.list.path],
    queryFn: async () => {
      const res = await fetch(api.contact.list.path, { credentials: "include" });
      if (res.status === 401) throw new Error("Unauthorized");
      if (!res.ok) throw new Error("Failed to fetch messages");
      return api.contact.list.responses[200].parse(await res.json());
    },
  });
}
