import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { useTeamMembers } from "@/hooks/use-team";
import { getImageUrl } from "@/lib/images";
import { motion } from "framer-motion";

export default function About() {
  const { data: team } = useTeamMembers();

  return (
    <div className="min-h-screen bg-background font-sans pt-20">
      <Navigation />
      
      {/* Header */}
      <div className="bg-muted/30 py-20">
        <div className="container mx-auto px-4 text-center">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-display font-bold mb-6"
            >
                About Mapend'o
            </motion.h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover the story, mission, and people behind DRC's leading cultural institution.
            </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Mission / Vision */}
        <div className="grid md:grid-cols-2 gap-16 mb-24">
            <div>
                <h3 className="text-2xl font-display font-bold mb-4 text-primary">Our Mission</h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    To preserve, promote, and modernize the performing arts of the Congo. We strive to provide a platform where tradition meets innovation, creating a space for artists to thrive and for audiences to be transformed.
                </p>
                
                <h3 className="text-2xl font-display font-bold mb-4 text-primary">Our Vision</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    A vibrant cultural ecosystem in the Great Lakes region where art is a driver for social cohesion, economic development, and international dialogue.
                </p>
            </div>
            <div className="relative">
                <div className="absolute inset-0 bg-secondary/20 rounded-2xl transform translate-x-4 translate-y-4" />
                <img 
                    src={getImageUrl("WhatsApp Image 2026-02-08 at 16.14.48.jpeg")} 
                    alt="Mapendo Mission" 
                    className="relative rounded-2xl shadow-lg w-full h-full object-cover min-h-[400px]" 
                />
            </div>
        </div>

        {/* Team Section */}
        <SectionHeader title="Meet the Team" subtitle="The passionate individuals driving our vision forward." />
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team?.map((member) => (
                <motion.div 
                    key={member.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-center group"
                >
                    <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-muted group-hover:border-primary transition-colors duration-300">
                        <img 
                            src={getImageUrl(member.imageUrl)} 
                            alt={member.name} 
                            className="w-full h-full object-cover" 
                        />
                    </div>
                    <h3 className="text-xl font-bold font-display">{member.name}</h3>
                    <p className="text-primary font-medium text-sm mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm max-w-xs mx-auto">{member.bio}</p>
                </motion.div>
            ))}
            
            {/* Fallback if no team members yet */}
            {(!team || team.length === 0) && (
                <div className="col-span-full text-center py-12 bg-muted/20 rounded-xl">
                    <p className="text-muted-foreground">Team profiles loading...</p>
                </div>
            )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
