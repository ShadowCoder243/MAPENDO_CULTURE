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
                À propos de Mapend'o
            </motion.h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Fondée en 2013 par Maguy Kalomba, MAPEND’O CULTURE est une structure artistique et culturelle engagée dans le développement des arts vivants en RDC.
            </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Présentation Générale */}
        <div className="max-w-4xl mx-auto mb-24 text-center">
            <h2 className="text-3xl font-display font-bold mb-6">Présentation générale</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
                Née d’une volonté forte de création, de transmission et de valorisation culturelle, MAPEND’O CULTURE s’inscrit comme un acteur engagé dans le développement des arts vivants et de l’industrie culturelle congolaise. Sous la direction artistique de Maguy Kalomba, actrice et metteure en scène, la structure conçoit et met en œuvre des projets qui privilégient la qualité, l’innovation et l’ancrage culturel.
            </p>
        </div>

        {/* Domaines d'intervention */}
        <div className="mb-24">
            <SectionHeader title="Nos Domaines d'Intervention" subtitle="MAPEND’O CULTURE développe ses activités autour de cinq principaux champs artistiques." />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-12">
                {[
                    { icon: "🎭", title: "Théâtre" },
                    { icon: "💃", title: "Danse" },
                    { icon: "🎶", title: "Musique" },
                    { icon: "📖", title: "Conte" },
                    { icon: "🎬", title: "Cinéma" }
                ].map((item, i) => (
                    <div key={i} className="bg-muted/50 p-8 rounded-2xl text-center hover:bg-primary/10 transition-colors">
                        <div className="text-4xl mb-4">{item.icon}</div>
                        <h4 className="font-bold">{item.title}</h4>
                    </div>
                ))}
            </div>
        </div>

        {/* Mission / Vision */}
        <div className="grid md:grid-cols-2 gap-16 mb-24">
            <div>
                <h3 className="text-2xl font-display font-bold mb-4 text-primary">Notre Mission</h3>
                <ul className="space-y-4 text-muted-foreground text-lg">
                    <li className="flex gap-3">
                        <span className="text-primary font-bold">•</span>
                        <span>Créer et produire des spectacles professionnels porteurs de sens et d’identité.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary font-bold">•</span>
                        <span>Former et accompagner les jeunes artistes aux techniques artistiques et scéniques (interprétation, mise en scène, écriture).</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary font-bold">•</span>
                        <span>Promouvoir le leadership artistique féminin, en mettant en lumière le talent et la créativité des femmes.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary font-bold">•</span>
                        <span>Valoriser et diffuser la culture congolaise, tant au niveau national qu’international.</span>
                    </li>
                </ul>
            </div>
            <div>
                <h3 className="text-2xl font-display font-bold mb-4 text-primary">Notre Vision</h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    MAPEND’O CULTURE ambitionne de devenir une référence incontournable des arts vivants en Afrique centrale, capable de produire des œuvres artistiques d’excellence, tout en contribuant à l’émergence d’une nouvelle génération d’artistes conscients, formés et engagés culturellement.
                </p>
                <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                    <h4 className="font-bold text-primary mb-2">Engagement culturel</h4>
                    <p className="text-sm text-muted-foreground italic">
                        "Nous nous engageons pour un art vivant, éducatif et transformateur, qui questionne la société, valorise les identités locales et crée des ponts entre tradition et modernité."
                    </p>
                </div>
            </div>
        </div>

        {/* Objectifs Spécifiques */}
        <div className="bg-muted/30 p-12 rounded-3xl mb-24">
            <h3 className="text-2xl font-display font-bold mb-8 text-center">Objectifs spécifiques</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    "Renforcer les capacités artistiques et professionnelles des jeunes talents",
                    "Encourager la création artistique féminine et inclusive",
                    "Développer des spectacles et projets culturels de haut niveau",
                    "Favoriser la transmission des savoirs culturels et artistiques",
                    "Participer activement au rayonnement international de la culture congolaise"
                ].map((obj, i) => (
                    <div key={i} className="flex items-start gap-4">
                        <div className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 text-xs font-bold">{i + 1}</div>
                        <p className="text-muted-foreground">{obj}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Team Section */}
        <div className="pt-16">
            <SectionHeader title="Rencontrez l'Équipe" subtitle="Les personnes passionnées qui font avancer notre vision." />
        </div>
        
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
                    <p className="text-muted-foreground">Chargement des profils de l'équipe...</p>
                </div>
            )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
