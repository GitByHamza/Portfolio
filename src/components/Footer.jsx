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
import { motion, useReducedMotion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import SuccessModal from "./SuccessModal";

export const Footer = () => {
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [isModalOpen, setIsModalOpen] = useState(false);
 const shouldReduceMotion = useReducedMotion();
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

 const containerVariants = {
   hidden: { opacity: 0 },
   visible: {
     opacity: 1,
     transition: { staggerChildren: 0.1, delayChildren: 0.2 },
   },
 };

 const itemVariants = {
   hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
 };

 return (
  <footer id="contact-footer" className="relative border-t border-white/5 bg-background pt-32 pb-8 overflow-hidden z-20">
   <SuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

   {/* Grand Finale Glow Effects */}
   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-primary/5 rounded-[100%] blur-[120px] pointer-events-none" />
   <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />

   <div className="container mx-auto px-4 relative z-10">
    <motion.div 
     variants={containerVariants}
     initial="hidden"
     whileInView="visible"
     viewport={{ once: true, margin: "-100px" }}
     className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24"
    >
     {/* Left Column: Branding & Info */}
     <div className="space-y-12">
      <motion.div variants={itemVariants}>
       <h2 className="text-5xl md:text-7xl font-bold font-heading mb-6 tracking-tight">
        Let's build<br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pop">the future.</span>
       </h2>
       <p className="text-muted-foreground font-body max-w-md text-xl leading-relaxed">
        Got a project in mind? Let's turn your vision into a digital reality. Reach out and let's craft something exceptional together.
       </p>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-6">
       <a href="mailto:professorhamza000@gmail.com" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer group w-fit">
        <div className="p-4 rounded-full bg-secondary/50 group-hover:bg-primary/20 transition-colors border border-white/5">
         <Mail size={24} className="text-foreground group-hover:text-primary transition-colors" />
        </div>
        <span className="font-heading text-lg">professorhamza000@gmail.com</span>
       </a>
       <div className="flex items-center gap-4 text-muted-foreground cursor-pointer group w-fit">
        <div className="p-4 rounded-full bg-secondary/50 border border-white/5">
         <MapPin size={24} className="text-foreground" />
        </div>
        <span className="font-heading text-lg">Gujranwala, Punjab, Pakistan</span>
       </div>
      </motion.div>

      <motion.div variants={itemVariants} className="flex gap-4 pt-4">
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
         className="p-4 rounded-full bg-secondary/30 border border-white/5 hover:bg-primary/20 hover:border-primary/30 text-muted-foreground hover:text-primary transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(79,142,247,0.2)]"
        >
         <social.icon size={22} />
        </a>
       ))}
      </motion.div>
     </div>

     {/* Right Column: Contact Form */}
     <motion.div
      variants={itemVariants}
      className="bg-card/40 p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl relative overflow-hidden"
     >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
      <h3 className="text-3xl font-bold font-heading mb-8 relative z-10 text-foreground drop-shadow-md">Send a Message</h3>
      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 group">
         <label htmlFor="footer-name" className="text-sm font-medium text-muted-foreground group-focus-within:text-primary transition-colors">Name</label>
         <input
          id="footer-name"
          name="name"
          required
          onChange={handleChange}
          className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/10 focus:border-primary focus:ring-4 focus:ring-primary/20 focus:bg-black/60 outline-none transition-all hover:border-white/20 text-foreground"
          placeholder="John Doe"
         />
        </div>
        <div className="space-y-2 group">
         <label htmlFor="footer-country" className="text-sm font-medium text-muted-foreground group-focus-within:text-primary transition-colors">Country</label>
         <input
          id="footer-country"
          name="country"
          required
          onChange={handleChange}
          className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/10 focus:border-primary focus:ring-4 focus:ring-primary/20 focus:bg-black/60 outline-none transition-all hover:border-white/20 text-foreground"
          placeholder="Switzerland"
         />
        </div>
       </div>

       <div className="space-y-2 group">
        <label htmlFor="footer-email" className="text-sm font-medium text-muted-foreground group-focus-within:text-primary transition-colors">Email</label>
        <input
         id="footer-email"
         name="email"
         type="email"
         required
         onChange={handleChange}
         className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/10 focus:border-primary focus:ring-4 focus:ring-primary/20 focus:bg-black/60 outline-none transition-all hover:border-white/20 text-foreground"
         placeholder="john@example.com"
        />
       </div>

       <div className="space-y-2 group">
        <label htmlFor="footer-message" className="text-sm font-medium text-muted-foreground group-focus-within:text-primary transition-colors">Message</label>
        <textarea
         id="footer-message"
         name="message"
         required
         rows={5}
         onChange={handleChange}
         className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/10 focus:border-primary focus:ring-4 focus:ring-primary/20 focus:bg-black/60 outline-none transition-all hover:border-white/20 text-foreground resize-none"
         placeholder="Tell me about your project..."
        />
       </div>

       <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
         "w-full cosmic-button flex items-center justify-center gap-3 group mt-4 text-lg",
         isSubmitting && "opacity-70 cursor-not-allowed"
        )}
       >
        {isSubmitting ? "Sending..." : "Send Message"}
        <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
       </button>
      </form>
     </motion.div>
    </motion.div>

    {/* Bottom Bar */}
    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
     <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
      <p className="text-sm text-muted-foreground font-body">
       &copy; {new Date().getFullYear()} TexCodes. All rights reserved.
      </p>
      <div className="flex items-center gap-6 text-sm font-body text-muted-foreground">
       <a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
       <a href="/terms" className="hover:text-primary transition-colors">Terms of Service</a>
      </div>
     </div>

     <button
      onClick={scrollToTop}
      className="p-4 rounded-full bg-primary/10 hover:bg-primary border border-primary/20 hover:border-primary text-primary hover:text-primary-foreground transition-all duration-300 hover:-translate-y-2 group"
      aria-label="Scroll to top"
     >
      <ArrowUp size={24} className="group-hover:animate-bounce" />
     </button>
    </div>
   </div>
  </footer>
 );
};
