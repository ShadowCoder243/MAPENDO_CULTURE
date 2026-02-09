import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useCreateContactMessage } from "@/hooks/use-contact";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Contact() {
  const { mutate, isPending } = useCreateContactMessage();
  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      type: "General",
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
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Let's Connect</h1>
                <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                    Have a project in mind, interested in a partnership, or just want to say hello? 
                    We are always open to discussing new opportunities.
                </p>

                <div className="space-y-8">
                    <div className="flex items-start">
                        <div className="bg-primary/10 p-3 rounded-full mr-4">
                            <MapPin className="text-primary w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-1">Our Location</h4>
                            <p className="text-muted-foreground">123 Art Avenue, Goma, North Kivu, DRC</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start">
                         <div className="bg-primary/10 p-3 rounded-full mr-4">
                            <Mail className="text-primary w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-1">Email Us</h4>
                            <p className="text-muted-foreground">contact@mapendo-culture.org</p>
                            <p className="text-muted-foreground">press@mapendo-culture.org</p>
                        </div>
                    </div>

                     <div className="flex items-start">
                         <div className="bg-primary/10 p-3 rounded-full mr-4">
                            <Phone className="text-primary w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-1">Call Us</h4>
                            <p className="text-muted-foreground">+243 999 123 456</p>
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
                                        <FormLabel>Name</FormLabel>
                                        <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl><Input placeholder="john@example.com" {...field} /></FormControl>
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
                                        <FormLabel>Inquiry Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="General">General Inquiry</SelectItem>
                                                <SelectItem value="Partnership">Partnership</SelectItem>
                                                <SelectItem value="Press">Press & Media</SelectItem>
                                                <SelectItem value="Booking">Artist Booking</SelectItem>
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
                                        <FormLabel>Subject</FormLabel>
                                        <FormControl><Input placeholder="What is this regarding?" {...field} /></FormControl>
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
                                    <FormControl><Textarea placeholder="Tell us more..." className="min-h-[150px]" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" size="lg" className="w-full font-bold" disabled={isPending}>
                            {isPending ? "Sending..." : "Send Message"}
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
