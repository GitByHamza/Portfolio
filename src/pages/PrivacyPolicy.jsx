import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <main className="container mx-auto px-6 pt-32 pb-16 relative z-10 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12 shadow-xl"
      >
        <h1 className="text-4xl font-heading font-bold mb-8 text-glow text-primary">Privacy Policy</h1>
        <div className="space-y-6 text-muted-foreground font-body leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <h2 className="text-2xl font-heading font-semibold text-foreground mt-8 mb-4">1. Information We Collect</h2>
          <p>We only collect information that you voluntarily provide to us when you fill out contact forms on the website. This may include your name, email address, country, and message content. This data is securely stored and used exclusively to facilitate communication with you.</p>

          <h2 className="text-2xl font-heading font-semibold text-foreground mt-8 mb-4">2. How We Use Your Information</h2>
          <p>The information we collect is used solely for the purpose of communicating with you, responding to your inquiries, and providing the services you requested. We absolutely do not sell, rent, or share your personal information with third parties for marketing purposes.</p>

          <h2 className="text-2xl font-heading font-semibold text-foreground mt-8 mb-4">3. Data Security</h2>
          <p>We implement appropriate technical and organizational security measures (including secure database solutions provided by Supabase) designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.</p>

          <h2 className="text-2xl font-heading font-semibold text-foreground mt-8 mb-4">4. Third-Party Services</h2>
          <p>This website may contain links to other websites or utilize third-party services. We are not responsible for the privacy practices or the content of such external sites.</p>

          <h2 className="text-2xl font-heading font-semibold text-foreground mt-8 mb-4">5. Contact Us</h2>
          <p>If you have questions or comments about this Privacy Policy, your data, or any concerns, please contact us anytime at professorhamza000@gmail.com.</p>
        </div>
      </motion.div>
    </main>
  );
};

export default PrivacyPolicy;
