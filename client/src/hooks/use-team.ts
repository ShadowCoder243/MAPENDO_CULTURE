export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  imageUrl: string | null;
}

const MOCK_TEAM: TeamMember[] = [
  {
    id: 1,
    name: "Maguy Kalomba",
    role: "Directrice Artistique & Fondatrice",
    bio: "Visionnaire et passionnée par les arts vivants, Maguy Kalomba a fondé Mapend'o Culture pour promouvoir la richesse culturelle de la RDC.",
    imageUrl: "WhatsApp Image 2026-02-08 at 16.14.47.jpeg"
  }
];

export function useTeamMembers() {
  return {
    data: MOCK_TEAM,
    isLoading: false,
    error: null
  };
}

export function useCreateTeamMember() {
  return { mutate: () => {}, isPending: false };
}

export function useUpdateTeamMember() {
  return { mutate: () => {}, isPending: false };
}

export function useDeleteTeamMember() {
  return { mutate: () => {}, isPending: false };
}
