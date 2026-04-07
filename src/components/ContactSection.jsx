import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import SuccessModal from "./SuccessModal";
import { supabase } from "@/lib/supabase";

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
        setFormData({ name: "", email: "", country: "", message: "" });
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-footer" className="py-24 px-4 relative bg-secondary/30">
      <SuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center font-heading">
          Get In <span className="text-primary"> Touch</span>
        </h2>

        <p className="font-body text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? Feel free to reach out.
          I'm always open to discussing new opportunities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold mb-6 font-body"> Contact Information</h3>

            <div className="space-y-6 justify-center">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-left font-medium font-body"> Email</h4>
                  <a
                    href="mailto:professorhamza000@gmail.com"
                    className="font-body text-muted-foreground hover:text-primary transition-colors"
                  >
                    professorhamza000@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-left font-medium font-body"> Phone</h4>
                  <a
                    href="tel:+923390001824"
                    className="font-body text-muted-foreground hover:text-primary transition-colors"
                  >
                    +92 339 0001824
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="font-body p-3 rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-left font-medium font-body"> Location</h4>
                  <span className="font-body text-muted-foreground hover:text-primary transition-colors cursor-default">
                    Gujranwala, Punjab, Pakistan
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h4 className="font-medium mb-4 font-body"> Connect With Me</h4>
              <div className="flex space-x-4 justify-center">
                <a href="https://github.com/GitByHamza" target="_blank" rel="noopener noreferrer">
                  <Github className="hover:text-primary transition-colors" />
                </a>
                <a href="#" target="_blank" rel="noreferrer">
                  <Linkedin className="hover:text-primary transition-colors" />
                </a>
                <a href="#" target="_blank" rel="noreferrer">
                  <Instagram className="hover:text-primary transition-colors" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-card p-8 rounded-lg shadow-xs">
            <h3 className="text-2xl font-semibold mb-6 font-body"> Send a Message</h3>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 font-body">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="font-body w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                  placeholder="Ameer Hamza ..."
                />
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium mb-2 font-body">
                  Your Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="font-body w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                  placeholder="Pakistan etc."
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 font-body">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="font-body w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                  placeholder="professorhamza000@gmail.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 font-body">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="font-body w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary resize-none h-32"
                  placeholder="Hello, I'd like to talk about..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "cosmic-button w-full flex items-center justify-center gap-2 font-body",
                  isSubmitting && "opacity-70 cursor-not-allowed"
                )}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};