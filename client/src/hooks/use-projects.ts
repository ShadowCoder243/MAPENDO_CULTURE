export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string | null;
}

const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    title: "Racines",
    description: "Une création théâtrale explorant l'identité et la mémoire à travers les récits ancestraux.",
    category: "Théâtre",
    imageUrl: "WhatsApp Image 2026-02-08 at 16.14.50.jpeg"
  },
  {
    id: 2,
    title: "Échos du Fleuve",
    description: "Documentaire sur la musique traditionnelle riveraine et son influence moderne.",
    category: "Cinéma",
    imageUrl: "WhatsApp Image 2026-02-08 at 16.14.51.jpeg"
  },
  {
    id: 3,
    title: "Mouvements Libres",
    description: "Performance de danse contemporaine fusionnant tradition et gestuelle urbaine.",
    category: "Danse",
    imageUrl: null
  },
  {
    id: 4,
    title: "Paroles d'Or",
    description: "Festival de conte mettant en lumière les récits des sages pour la nouvelle génération.",
    category: "Conte",
    imageUrl: null
  },
  {
    id: 5,
    title: "Mélodies du Kivu",
    description: "Concert symphonique intégrant des instruments traditionnels congolais.",
    category: "Musique",
    imageUrl: null
  }
];

export function useProjects() {
  return {
    data: MOCK_PROJECTS,
    isLoading: false,
    error: null
  };
}

export function useCreateProject() {
  return { mutate: () => {}, isPending: false };
}

export function useUpdateProject() {
  return { mutate: () => {}, isPending: false };
}

export function useDeleteProject() {
  return { mutate: () => {}, isPending: false };
}
