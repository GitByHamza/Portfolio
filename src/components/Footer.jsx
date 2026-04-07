import {
 ArrowUp,
 Instagram,
 Linkedin,
 Mail,
 MapPin,
 Send,
 Twitch,
 Twitter,
 Github,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import SuccessModal from "./SuccessModal";

export const Footer = () => {
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [formData, setFormData] = useState({
  name: "",
  country: "",
  email: "",
  message: "",
 });

 const handleChange = (e) => {
  setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
   const { error } = await supabase.from("messages").insert([
    {
     name: formData.name,
     email: formData.email,
     country: formData.country,
     message: formData.message,
    },
   ]);

   if (error) {
    console.error("Error inserting message:", error);
    alert("Failed to send message. Please try again.");
   } else {
    setIsModalOpen(true);
    setFormData({ name: "", country: "", email: "", message: "" });
    e.target.reset();
   }
  } catch (err) {
   console.error("Unexpected error:", err);
   alert("An unexpected error occurred.");
  } finally {
   setIsSubmitting(false);
  }
 };

 const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
 };

 return (
  <footer id="contact-footer" className="relative border-t border-border bg-card pt-16 pb-8 overflow-hidden">
   <SuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

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
        { icon: Github,    href: "https://github.com/GitByHamza" },
        { icon: Linkedin,  href: "#" },
        { icon: Instagram, href: "#" },
        { icon: Twitter,   href: "#" },
       ].map((social, index) => (
        <a
         key={index}
         href={social.href}
         target="_blank"
         rel="noopener noreferrer"
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
         <label htmlFor="footer-name" className="text-sm font-medium">Name</label>
         <input
          id="footer-name"
          name="name"
          required
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-secondary/30 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary outline-none transition-all"
          placeholder="John Doe"
         />
        </div>
        <div className="space-y-2">
         <label htmlFor="footer-country" className="text-sm font-medium">Country</label>
         <input
          id="footer-country"
          name="country"
          required
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-secondary/30 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary outline-none transition-all"
          placeholder="Switzerland"
         />
        </div>
       </div>

       <div className="space-y-2">
        <label htmlFor="footer-email" className="text-sm font-medium">Email</label>
        <input
         id="footer-email"
         name="email"
         type="email"
         required
         onChange={handleChange}
         className="w-full px-4 py-2 rounded-lg bg-secondary/30 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary outline-none transition-all"
         placeholder="john@example.com"
        />
       </div>

       <div className="space-y-2">
        <label htmlFor="footer-message" className="text-sm font-medium">Message</label>
        <textarea
         id="footer-message"
         name="message"
         required
         rows={4}
         onChange={handleChange}
         className="w-full px-4 py-2 rounded-lg bg-secondary/30 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
         placeholder="Tell me about your project..."
        />
       </div>

       <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
         "w-full cosmic-button flex items-center justify-center gap-2 group",
         isSubmitting && "opacity-70 cursor-not-allowed"
        )}
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
      &copy; {new Date().getFullYear()} TexCodes. All rights reserved.
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
