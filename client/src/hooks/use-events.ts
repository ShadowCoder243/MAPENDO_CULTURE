import { fr } from "date-fns/locale";

export interface Event {
  id: number;
  title: string;
  description: string;
  date: Date;
  location: string;
  category: string;
  imageUrl: string | null;
}

const MOCK_EVENTS: Event[] = [
  {
    id: 1,
    title: "Festival Mapend'o 2026",
    description: "La grande célébration des arts vivants au cœur de Kinshasa.",
    date: new Date("2026-06-15"),
    location: "Institut Français de Kinshasa",
    category: "Festival",
    imageUrl: "WhatsApp Image 2026-02-08 at 16.14.48.jpeg"
  },
  {
    id: 2,
    title: "Atelier de Danse Contemporaine",
    description: "Masterclass avec des chorégraphes internationaux.",
    date: new Date("2026-04-10"),
    location: "Espace Mapend'o",
    category: "Danse",
    imageUrl: "WhatsApp Image 2026-02-08 at 16.14.49.jpeg"
  }
];

export function useEvents() {
  return {
    data: MOCK_EVENTS,
    isLoading: false,
    error: null
  };
}

export function useEvent(id: number) {
  const event = MOCK_EVENTS.find(e => e.id === id);
  return {
    data: event || null,
    isLoading: false,
    error: null
  };
}

// No-op mutations for static version
export function useCreateEvent() {
  return { mutate: () => {}, isPending: false };
}

export function useUpdateEvent() {
  return { mutate: () => {}, isPending: false };
}

export function useDeleteEvent() {
  return { mutate: () => {}, isPending: false };
}
