import { useToast } from "@/hooks/use-toast";

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  type: string;
  createdAt: Date;
}

export function useCreateContactMessage() {
  const { toast } = useToast();

  return {
    mutate: (data: any, { onSuccess }: any) => {
      console.log("Mock contact message sent:", data);
      toast({ title: "Message envoyé", description: "Ceci est une version de démonstration. Votre message a été simulé." });
      if (onSuccess) onSuccess();
    },
    isPending: false
  };
}

export function useContactMessages() {
  return {
    data: [],
    isLoading: false,
    error: null
  };
}
