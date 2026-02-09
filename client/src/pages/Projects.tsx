import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { useProjects } from "@/hooks/use-projects";
import { getImageUrl } from "@/lib/images";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const CATEGORIES = ["Tous", "Théâtre", "Danse", "Musique", "Cinéma", "Conte"];

export default function Projects() {
  const { data: projects, isLoading } = useProjects();
  const [filter, setFilter] = useState("Tous");

  const filteredProjects = projects?.filter(p => filter === "Tous" || p.category === filter) || [];

  return (
    <div className="min-h-screen bg-background font-sans pt-20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <SectionHeader 
            title="Nos Projets" 
            subtitle="Une vitrine de nos productions artistiques et initiatives communautaires." 
        />

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
            {CATEGORIES.map(cat => (
                <Button 
                    key={cat}
                    variant={filter === cat ? "default" : "outline"}
                    onClick={() => setFilter(cat)}
                    className="rounded-full"
                >
                    {cat}
                </Button>
            ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
                [1,2,3].map(i => <div key={i} className="h-64 bg-muted animate-pulse rounded-xl" />)
            ) : filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                    <motion.div
                        layout
                        key={project.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="group bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="h-56 overflow-hidden relative">
                            <img 
                                src={getImageUrl(project.imageUrl)} 
                                alt={project.title} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-4 left-4">
                                <span className="bg-black/70 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md">
                                    {project.category}
                                </span>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold font-display mb-3">{project.title}</h3>
                            <p className="text-muted-foreground text-sm line-clamp-3">{project.description}</p>
                        </div>
                    </motion.div>
                ))
            ) : (
                <div className="col-span-full text-center py-20 text-muted-foreground">
                    Aucun projet trouvé dans cette catégorie.
                </div>
            )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
