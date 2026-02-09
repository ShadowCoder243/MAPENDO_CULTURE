import { Link } from "wouter";
import { Facebook, Instagram, Mail, MapPin, Phone, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-bold text-white">MAPEND'O</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Promouvoir et célébrer les arts de la scène en République Démocratique du Congo. Un carrefour pour la créativité, l'expression et le patrimoine culturel.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://facebook.com/mapendoculture" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" title="Facebook @mapendo culture"><Facebook size={20} /></a>
              <a href="https://instagram.com/mapendoculture" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" title="Instagram @mapendo culture"><Instagram size={20} /></a>
              <a href="https://wa.me/243858939850" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" title="WhatsApp +243 858 939 850"><MessageCircle size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-white">Liens Rapides</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">À propos</Link></li>
              <li><Link href="/events" className="hover:text-primary transition-colors">Calendrier des événements</Link></li>
              <li><Link href="/projects" className="hover:text-primary transition-colors">Nos Projets</Link></li>
              <li><Link href="/training" className="hover:text-primary transition-colors">Ateliers</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Domains */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-white">Nos Arts</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>Théâtre</li>
              <li>Danse Contemporaine</li>
              <li>Musique & Concerts</li>
              <li>Conte</li>
              <li>Cinéma & Projection</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-white">Contactez-nous</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 mt-0.5 text-primary" />
                <span>123 Art Avenue, Goma,<br />North Kivu, DRC</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 text-primary" />
                <a href="tel:+243858939850" className="hover:text-primary transition-colors">+243 858 939 850</a>
              </li>
              <li className="flex items-center">
                <MessageCircle size={18} className="mr-3 text-primary" />
                <a href="https://wa.me/243858939850" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">WhatsApp</a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-primary" />
                <span>contact@mapendo-culture.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Mapend'o Culture. Tous droits réservés.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white">Politique de confidentialité</Link>
            <Link href="/terms" className="hover:text-white">Conditions d'utilisation</Link>
            <Link href="/admin" className="hover:text-white">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
