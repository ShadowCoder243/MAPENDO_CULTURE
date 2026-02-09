import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { motion } from "framer-motion";
import { getImageUrl } from "@/lib/images";

export default function Blog() {
  return (
    <div className="min-h-screen bg-background font-sans pt-20">
      <Navigation />
      
      <div className="bg-secondary/5 py-20">
        <div className="container mx-auto px-4 text-center">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-display font-bold mb-6"
            >
                Actualités
            </motion.h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Suivez les moments forts, les succès et les coulisses de MAPEND’O CULTURE.
            </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
                {
                    date: "9 Fév 2026",
                    title: "Lancement de la nouvelle plateforme digitale",
                    desc: "MAPEND’O CULTURE modernise sa présence en ligne pour mieux diffuser la culture congolaise.",
                    image: null
                },
                {
                    date: "15 Jan 2026",
                    title: "Atelier de leadership féminin",
                    desc: "Retour sur une semaine intense de formation dédiée aux femmes créatrices à Goma.",
                    image: null
                },
                {
                    date: "20 Déc 2025",
                    title: "Succès du dernier spectacle de théâtre",
                    desc: "Une représentation mémorable qui a réuni plus de 500 passionnés d'arts vivants.",
                    image: null
                }
            ].map((post, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-card border border-border/50 rounded-2xl overflow-hidden group hover:shadow-lg transition-all"
                >
                    <div className="h-48 bg-muted relative">
                        <img 
                            src={getImageUrl(post.image)} 
                            alt={post.title}
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded text-xs font-bold">
                            {post.date}
                        </div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{post.desc}</p>
                        <button className="text-primary font-bold text-sm hover:underline">Lire la suite</button>
                    </div>
                </motion.div>
            ))}
        </div>

        <div className="mt-20 text-center py-16 border-2 border-dashed border-muted rounded-3xl">
            <p className="text-muted-foreground">Plus d'actualités seront publiées prochainement.</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
