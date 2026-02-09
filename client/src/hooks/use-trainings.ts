import { useToast } from "@/hooks/use-toast";

export interface Training {
  id: number;
  title: string;
  description: string;
  duration: string;
  level: string;
  imageUrl: string | null;
}

const MOCK_TRAININGS: Training[] = [
  {
    id: 1,
    title: "Formation Sonorisation",
    description: "Apprenez les bases de la sonorisation de spectacle.",
    duration: "3 mois",
    level: "Débutant",
    imageUrl: "WhatsApp Image 2026-02-08 at 16.14.50.jpeg"
  },
  {
    id: 2,
    title: "Gestion Culturelle",
    description: "Administrer et promouvoir des projets artistiques.",
    duration: "6 mois",
    level: "Intermédiaire",
    imageUrl: "WhatsApp Image 2026-02-08 at 16.14.51.jpeg"
  }
];

export function useTrainings() {
  return {
    data: MOCK_TRAININGS,
    isLoading: false,
    error: null
  };
}

export function useCreateTraining() {
  const { toast } = useToast();
  return {
    mutate: (data: any) => {
      console.log("Mock training created:", data);
      toast({ title: "Succès", description: "Formation créée (simulation)" });
    },
    isPending: false
  };
}

export function useUpdateTraining() {
  const { toast } = useToast();
  return {
    mutate: ({ id, ...data }: any) => {
      console.log("Mock training updated:", id, data);
      toast({ title: "Succès", description: "Formation mise à jour (simulation)" });
    },
    isPending: false
  };
}

export function useDeleteTraining() {
  const { toast } = useToast();
  return {
    mutate: (id: number) => {
      console.log("Mock training deleted:", id);
      toast({ title: "Succès", description: "Formation supprimée (simulation)" });
    },
    isPending: false
  };
}
