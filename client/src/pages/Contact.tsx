//git push -u origin mainimport { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const insertContactMessageSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("E-mail invalide"),
  subject: z.string().min(5, "Le sujet doit contenir au moins 5 caractères"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
  type: z.string(),
});

type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useCreateContactMessage } from "@/hooks/use-contact";
import { MapPin, Phone, Mail, MessageCircle, Navigation } from "lucide-react";

export default function Contact() {
  const { mutate, isPending } = useCreateContactMessage();
  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      type: "Général",
    },
  });

  function onSubmit(data: InsertContactMessage) {
    mutate(data, {
      onSuccess: () => form.reset(),
    });
  }

  return (
    <div className="min-h-screen bg-background font-sans pt-20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Info Side */}
            <div>
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Connectons-nous</h1>
                <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                    Vous avez un projet en tête, vous êtes intéressé par un partenariat ou vous voulez simplement nous dire bonjour ? 
                    Nous sommes toujours ouverts à discuter de nouvelles opportunités.
                </p>

                <div className="space-y-8">
                    <div className="flex items-start">
                        <div className="bg-primary/10 p-3 rounded-full mr-4">
                            <MapPin className="text-primary w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-1">Notre Emplacement</h4>
                            <p className="text-muted-foreground">123 Art Avenue, Goma, Nord-Kivu, RDC</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start">
                         <div className="bg-primary/10 p-3 rounded-full mr-4">
                            <Mail className="text-primary w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-1">E-mail</h4>
                            <p className="text-muted-foreground">contact@mapendo-culture.org</p>
                            <p className="text-muted-foreground">press@mapendo-culture.org</p>
                        </div>
                    </div>

                     <div className="flex items-start">
                         <div className="bg-primary/10 p-3 rounded-full mr-4">
                            <Phone className="text-primary w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-1">Téléphone</h4>
                            <p className="text-muted-foreground"><a href="tel:+243858939850" className="hover:text-primary transition-colors">+243 858 939 850</a></p>
                        </div>
                    </div>

                    <div className="flex items-start">
                         <div className="bg-primary/10 p-3 rounded-full mr-4">
                            <MessageCircle className="text-primary w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-1">WhatsApp</h4>
                            <p className="text-muted-foreground"><a href="https://wa.me/243858939850" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Discutez avec nous sur WhatsApp</a></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Side */}
            <div className="bg-card border rounded-3xl p-8 shadow-lg">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nom</FormLabel>
                                        <FormControl><Input placeholder="Votre nom" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>E-mail</FormLabel>
                                        <FormControl><Input placeholder="votre@email.com" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Type de demande</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Sélectionnez le type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Général">Demande générale</SelectItem>
                                                <SelectItem value="Partenariat">Partenariat</SelectItem>
                                                <SelectItem value="Presse">Presse & Médias</SelectItem>
                                                <SelectItem value="Booking">Réservation d'artistes</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="subject"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sujet</FormLabel>
                                        <FormControl><Input placeholder="De quoi s'agit-il ?" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl><Textarea placeholder="Dites-nous en plus..." className="min-h-[150px]" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" size="lg" className="w-full font-bold" disabled={isPending}>
                            {isPending ? "Envoi en cours..." : "Envoyer le message"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
