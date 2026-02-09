import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { useEvents } from "@/hooks/use-events";
import { getImageUrl } from "@/lib/images";
import { format } from "date-fns";
import { Calendar, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function Events() {
  const { data: events, isLoading } = useEvents();

  return (
    <div className="min-h-screen bg-background font-sans pt-20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <SectionHeader 
            title="Event Calendar" 
            subtitle="Don't miss out on our upcoming performances and festivals." 
        />

        <div className="max-w-4xl mx-auto space-y-8">
            {isLoading ? (
                <div className="space-y-4">
                    {[1,2,3].map(i => <div key={i} className="h-40 bg-muted animate-pulse rounded-2xl" />)}
                </div>
            ) : events?.length ? (
                events.map((event) => (
                    <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-card rounded-2xl overflow-hidden border hover:border-primary/50 transition-colors shadow-sm hover:shadow-md flex flex-col md:flex-row"
                    >
                        {/* Date Box Mobile */}
                        <div className="md:hidden bg-primary text-white p-4 flex items-center justify-between">
                            <span className="font-bold">{format(new Date(event.date), "MMMM d, yyyy")}</span>
                            <span className="text-sm bg-white/20 px-2 py-0.5 rounded">{event.category}</span>
                        </div>

                        {/* Image */}
                        <div className="w-full md:w-64 h-48 md:h-auto shrink-0 relative">
                            <img 
                                src={getImageUrl(event.imageUrl)} 
                                alt={event.title} 
                                className="w-full h-full object-cover" 
                            />
                            {/* Desktop Date Overlay */}
                            <div className="hidden md:flex flex-col items-center justify-center absolute top-4 left-4 bg-white/95 backdrop-blur-sm w-16 h-16 rounded-xl shadow-lg text-foreground">
                                <span className="text-xs font-bold uppercase text-muted-foreground">{format(new Date(event.date), "MMM")}</span>
                                <span className="text-2xl font-bold text-primary font-display">{format(new Date(event.date), "dd")}</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 md:p-8 flex flex-col justify-center grow">
                            <div className="hidden md:block text-xs font-bold text-primary uppercase tracking-wider mb-2">{event.category}</div>
                            <h3 className="text-2xl font-bold font-display mb-3">{event.title}</h3>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                                <div className="flex items-center"><Clock size={16} className="mr-2" /> {format(new Date(event.date), "h:mm a")}</div>
                                <div className="flex items-center"><MapPin size={16} className="mr-2" /> {event.location}</div>
                            </div>
                            <p className="text-muted-foreground mb-0 line-clamp-2">{event.description}</p>
                        </div>
                    </motion.div>
                ))
            ) : (
                <div className="text-center py-20 bg-muted/20 rounded-2xl text-muted-foreground">
                    No events scheduled at the moment. Check back soon!
                </div>
            )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
