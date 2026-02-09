import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { motion } from "framer-motion";
import { BookOpen, Users, Award, Briefcase } from "lucide-react";

export default function Training() {
  return (
    <div className="min-h-screen bg-background font-sans pt-20">
      <Navigation />
      
      <div className="bg-primary/5 py-20">
        <div className="container mx-auto px-4 text-center">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-display font-bold mb-6"
            >
                Nos Formations
            </motion.h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Renforcer les capacités artistiques et professionnelles des jeunes talents congolais.
            </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <div>
                <h2 className="text-3xl font-display font-bold mb-6">Transmettre l'Excellence</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    L’un des piliers majeurs de MAPEND’O CULTURE est la transmission des savoirs. Nous formons et accompagnons les jeunes artistes aux techniques artistiques et scéniques les plus exigeantes.
                </p>
                <div className="space-y-4">
                    {[
                        { icon: BookOpen, title: "Interprétation & Jeu d'acteur", desc: "Maîtrise du corps, de la voix et de l'émotion sur scène." },
                        { icon: Award, title: "Mise en scène & Dramaturgie", desc: "Apprendre à concevoir et structurer une œuvre artistique porteuse de sens." },
                        { icon: Users, title: "Leadership Artistique", desc: "Programmes spécifiques pour encourager la création féminine et inclusive." },
                        { icon: Briefcase, title: "Gestion Culturelle", desc: "Former les futurs opérateurs culturels à l'industrie créative." }
                    ].map((item, i) => (
                        <div key={i} className="flex gap-4">
                            <div className="bg-primary/10 p-3 rounded-lg h-fit">
                                <item.icon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-bold text-foreground">{item.title}</h4>
                                <p className="text-muted-foreground text-sm">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-muted rounded-3xl p-8 aspect-square flex items-center justify-center border-2 border-dashed border-border">
                <div className="text-center">
                    <p className="text-muted-foreground italic mb-4">"Former une nouvelle génération d'artistes conscients, formés et engagés culturellement."</p>
                    <div className="font-bold text-primary">— Vision Mapend'o Culture</div>
                </div>
            </div>
        </div>

        <div className="bg-foreground text-background rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-display font-bold mb-6">Prochains Ateliers</h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">Nos sessions de formation sont annoncées périodiquement. Restez à l'écoute pour les prochaines dates de recrutement.</p>
            <div className="inline-block bg-primary text-white px-8 py-3 rounded-full font-bold">
                Inscriptions bientôt ouvertes
            </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
