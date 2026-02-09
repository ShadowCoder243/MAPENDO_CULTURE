import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-bold text-white">MAPEND'O</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Promoting and celebrating the performing arts in the Democratic Republic of Congo. A hub for creativity, expression, and cultural heritage.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/events" className="hover:text-primary transition-colors">Events Schedule</Link></li>
              <li><Link href="/projects" className="hover:text-primary transition-colors">Our Projects</Link></li>
              <li><Link href="/training" className="hover:text-primary transition-colors">Workshops</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Domains */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-white">Our Arts</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>Theater</li>
              <li>Contemporary Dance</li>
              <li>Music & Concerts</li>
              <li>Storytelling (Conte)</li>
              <li>Cinema & Projection</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-white">Get in Touch</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 mt-0.5 text-primary" />
                <span>123 Art Avenue, Goma,<br />North Kivu, DRC</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 text-primary" />
                <span>+243 999 123 456</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-primary" />
                <span>contact@mapendo-culture.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Mapend'o Culture. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            <Link href="/admin" className="hover:text-white">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
