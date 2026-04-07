import React from 'react';
import { motion } from 'framer-motion';

const TermsOfService = () => {
  return (
    <main className="container mx-auto px-6 pt-32 pb-16 relative z-10 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12 shadow-xl"
      >
        <h1 className="text-4xl font-heading font-bold mb-8 text-glow text-primary">Terms of Service</h1>
        <div className="space-y-6 text-muted-foreground font-body leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-heading font-semibold text-foreground mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>

          <h2 className="text-2xl font-heading font-semibold text-foreground mt-8 mb-4">2. Use License</h2>
          <p>Permission is granted to temporarily view the materials (information or software) on this website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>

          <h2 className="text-2xl font-heading font-semibold text-foreground mt-8 mb-4">3. Disclaimer</h2>
          <p>The materials on this website are provided on an 'as is' basis. TexCodes makes no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

          <h2 className="text-2xl font-heading font-semibold text-foreground mt-8 mb-4">4. Limitations</h2>
          <p>In no event shall TexCodes or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website.</p>

          <h2 className="text-2xl font-heading font-semibold text-foreground mt-8 mb-4">5. Contact Information</h2>
          <p>If you have any questions about these Terms, please contact us at professorhamza000@gmail.com.</p>
        </div>
      </motion.div>
    </main>
  );
};

export default TermsOfService;
