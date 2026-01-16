import {
 ArrowUp,
 Instagram,
 Linkedin,
 Mail,
 MapPin,
 Phone,
 Send,
 Twitch,
 Twitter,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const Footer = () => {
 const { toast } = useToast();
 const [isSubmitting, setIsSubmitting] = useState(false);

 const handleSubmit = (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  // Simulate form submission
  setTimeout(() => {
   toast({
    title: "Message sent!",
    description: "Thank you for reaching out. I'll get back to you shortly.",
   });
   setIsSubmitting(false);
   e.target.reset();
  }, 1500);
 };

 const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
 };

 return (
  <footer id="contact-footer" className="relative border-t border-border bg-card pt-16 pb-8 overflow-hidden">
   {/* Background Glow */}
   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 blur-[2px]" />

   <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
     {/* Left Column: Branding & Info */}
     <div className="space-y-8">
      <motion.div
       initial={{ opacity: 0, x: -20 }}
       whileInView={{ opacity: 1, x: 0 }}
       viewport={{ once: true }}
       transition={{ duration: 0.5 }}
      >
       <h2 className="text-4xl font-bold font-heading mb-4">
        <span className="text-glow text-primary">Tex</span> Codes
       </h2>
       <p className="text-muted-foreground font-body max-w-md text-lg leading-relaxed">
        Crafting digital experiences with code and creativity. Let's build something amazing together.
       </p>
      </motion.div>

      <div className="space-y-4">
       <div className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
        <Mail size={18} />
        <span>professorhamza000@gmail.com</span>
       </div>
       <div className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
        <MapPin size={18} />
        <span>Gujranwala, Punjab, Pakistan</span>
       </div>
      </div>

      <div className="flex gap-4">
       {[
        { icon: Linkedin, href: "#" },
        { icon: Instagram, href: "#" },
        { icon: Twitch, href: "#" },
        { icon: Twitter, href: "#" },
       ].map((social, index) => (
        <a
         key={index}
         href={social.href}
         className="p-3 rounded-full bg-secondary/50 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
        >
         <social.icon size={20} />
        </a>
       ))}
      </div>
     </div>

     {/* Right Column: Contact Form */}
     <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-background/50 p-8 rounded-2xl border border-white/5 shadow-xl backdrop-blur-sm"
     >
      <h3 className="text-2xl font-bold font-heading mb-6">Get In Touch</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
         <label htmlFor="name" className="text-sm font-medium">Name</label>
         <input
          id="name"
          required
          className="w-full px-4 py-2 rounded-lg bg-secondary/30 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary outline-none transition-all"
          placeholder="John Doe"
         />
        </div>
        <div className="space-y-2">
         <label htmlFor="country" className="text-sm font-medium">Country</label>
         <input
          id="country"
          required
          className="w-full px-4 py-2 rounded-lg bg-secondary/30 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary outline-none transition-all"
          placeholder="Switzerland"
         />
        </div>
       </div>

       <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <input
         id="email"
         type="email"
         required
         className="w-full px-4 py-2 rounded-lg bg-secondary/30 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary outline-none transition-all"
         placeholder="john@example.com"
        />
       </div>

       <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">Message</label>
        <textarea
         id="message"
         required
         rows={4}
         className="w-full px-4 py-2 rounded-lg bg-secondary/30 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
         placeholder="Tell me about your project..."
        />
       </div>

       <button
        type="submit"
        disabled={isSubmitting}
        className="w-full cosmic-button flex items-center justify-center gap-2 group"
       >
        {isSubmitting ? "Sending..." : "Send Message"}
        <Send size={16} className="group-hover:translate-x-1 transition-transform" />
       </button>
      </form>
     </motion.div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
     <p className="text-sm text-muted-foreground">
      &copy; {new Date().getFullYear()} TexCoder.co. All rights reserved.
     </p>

     <button
      onClick={scrollToTop}
      className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all hover:-translate-y-1"
      aria-label="Scroll to top"
     >
      <ArrowUp size={20} />
     </button>
    </div>
   </div>
  </footer>
 );
};
