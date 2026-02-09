import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/events", label: "Events" },
    { href: "/projects", label: "Projects" },
    { href: "/training", label: "Training" },
    { href: "/blog", label: "News" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 border-b",
      scrolled 
        ? "bg-background/95 backdrop-blur-md border-border/40 py-2 shadow-sm" 
        : "bg-background border-transparent py-4"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/">
            <div className="text-2xl font-bold font-display text-primary cursor-pointer tracking-tighter">
              MAPEND'O <span className="text-foreground">CULTURE</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <div className={cn(
                  "text-sm font-medium transition-colors hover:text-primary cursor-pointer relative py-1",
                  location === link.href ? "text-primary after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-primary" : "text-muted-foreground"
                )}>
                  {link.label}
                </div>
              </Link>
            ))}
            {user ? (
              <Link href="/admin">
                <Button variant="outline" size="sm" className="ml-4 border-primary/20 text-primary hover:text-primary hover:bg-primary/5">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <a href="/api/login">
                <Button variant="ghost" size="sm" className="ml-2 text-muted-foreground hover:text-primary">
                  Login
                </Button>
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
             {/* Only show login on mobile if not logged in, or dashboard link if logged in */}
             {user ? (
                <Link href="/admin">
                    <Button variant="ghost" size="icon" className="mr-2 text-primary">
                        <span className="sr-only">Dashboard</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg>
                    </Button>
                </Link>
             ) : null}

            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-background border-t border-border/40 p-4 absolute w-full shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-4">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <div 
                  className={cn(
                    "text-lg font-medium px-2 py-1.5 rounded-md hover:bg-muted cursor-pointer",
                    location === link.href ? "text-primary bg-primary/5" : "text-foreground"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </div>
              </Link>
            ))}
             {!user && (
                 <a href="/api/login" className="px-2">
                    <span className="text-sm text-muted-foreground">Staff Login</span>
                 </a>
             )}
          </div>
        </div>
      )}
    </nav>
  );
}
