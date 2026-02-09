import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/SectionHeader";
import { ArrowRight, Calendar, Users, Star, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useEvents } from "@/hooks/use-events";
import { useProjects } from "@/hooks/use-projects";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { getRandomImage, getImageUrl } from "@/lib/images";

export default function Home() {
  const { data: events } = useEvents();
  const { data: projects } = useProjects();
  
  // Use first 3 events/projects or placeholders
  const featuredEvents = events?.slice(0, 3) || [];
  const featuredProjects = projects?.slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10" />
          <img 
            src={getImageUrl("WhatsApp Image 2026-02-08 at 16.14.47.jpeg")} 
            alt="Mapendo Culture Hero" 
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
          />
        </div>

        <div className="container relative z-20 px-4 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
              Célébrer l'<span className="text-primary italic">Âme</span> des <br/>
              Arts Congolais
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
              MAPEND’O CULTURE est la première plateforme des arts de la scène en RDC. 
              Nous faisons le pont entre tradition et modernité à travers le théâtre, la danse, la musique et le cinéma.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/events">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full">
                  Événements à venir
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full bg-transparent">
                  Découvrir notre histoire
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Introduction / Mission */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-2 gap-4">
                 <img src={getImageUrl(null)} className="rounded-2xl shadow-xl w-full h-64 object-cover -mt-8" alt="Culture 1" />
                 <img src={getImageUrl(null)} className="rounded-2xl shadow-xl w-full h-64 object-cover mt-8" alt="Culture 2" />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Qui sommes-nous</h4>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Une volonté de création, de transmission et de valorisation culturelle
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                MAPEND’O CULTURE est une structure artistique et culturelle congolaise fondée en 2013 par Maguy Kalomba. 
                Nous sommes un acteur engagé dans le développement des arts vivants et de l’industrie culturelle congolaise, 
                conçevant des projets qui privilégient la qualité et l’innovation.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  "🎭 Théâtre",
                  "💃 Danse",
                  "🎶 Musique",
                  "📖 Conte",
                  "🎬 Cinéma",
                  "👩 Leadership Féminin"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-foreground font-medium bg-white p-3 rounded-lg shadow-sm border border-border/50">
                    <Star className="w-4 h-4 text-primary mr-3 fill-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/about">
                <Button variant="link" className="text-primary p-0 h-auto font-semibold text-lg group">
                  Découvrir notre histoire complète <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="Événements à venir" 
            subtitle="Rejoignez-nous pour des spectacles, des festivals et des rencontres culturelles."
          />
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredEvents.length > 0 ? featuredEvents.map((event) => (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-foreground px-3 py-1 rounded-lg text-sm font-bold z-10 shadow-sm">
                    {format(new Date(event.date), "d MMM", { locale: fr })}
                  </div>
                  <img 
                    src={getImageUrl(event.imageUrl)} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                </div>
                <div className="p-6">
                  <div className="text-xs font-bold text-primary mb-2 uppercase tracking-wider">{event.category}</div>
                  <h3 className="text-xl font-bold font-display mb-2 group-hover:text-primary transition-colors">{event.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{event.description}</p>
                  <div className="flex items-center text-xs text-muted-foreground font-medium">
                    <Calendar className="w-4 h-4 mr-1.5" />
                    {format(new Date(event.date), "HH:mm", { locale: fr })} • {event.location}
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="col-span-3 text-center py-12 text-muted-foreground bg-muted/20 rounded-2xl">
                Aucun événement n'est prévu pour le moment.
              </div>
            )}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/events">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white rounded-full px-8">
                Voir le calendrier complet
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-foreground text-background relative overflow-hidden">
         {/* Decorative elements */}
         <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Notre Portfolio</h2>
              <p className="text-white/60 max-w-xl">Explorez nos dernières productions et collaborations artistiques.</p>
            </div>
            <Link href="/projects">
              <Button variant="ghost" className="text-white hover:text-primary mt-6 md:mt-0 group">
                Voir tous les projets <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, i) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-muted/10 cursor-pointer"
              >
                <img 
                  src={getImageUrl(project.imageUrl)} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <div className="text-secondary text-xs font-bold uppercase mb-2">{project.category}</div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2">{project.title}</h3>
                  <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
                    <p className="text-white/80 text-sm line-clamp-2">{project.description}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  <ArrowUpRight className="text-white w-5 h-5" />
                </div>
              </motion.div>
            ))}
             {featuredProjects.length === 0 && (
                 <div className="col-span-full py-20 text-center text-white/50 border border-white/10 rounded-xl">
                     Galerie de projets bientôt disponible.
                 </div>
             )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Prêt à vivre la magie ?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-10">
            Que vous souhaitiez assister à un spectacle, devenir partenaire ou participer à un atelier, 
            nous serions ravis de vous rencontrer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link href="/contact">
               <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 font-bold px-8 py-6 rounded-full">
                 Nous contacter
               </Button>
             </Link>
             <Link href="/training">
               <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 px-8 py-6 rounded-full bg-transparent">
                 Rejoindre un atelier
               </Button>
             </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
