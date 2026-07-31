/* eslint-disable @typescript-eslint/no-explicit-any */

// export const Footer = () => {
//   return (
//     <footer className="bg-white border-t py-4 px-6 md:px-10">
//       <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//         <p className="text-sm text-gray-500 text-center">
//           © {new Date().getFullYear()} School Management System. All rights reserved.
//         </p>
//         <div className="flex gap-6">
//           <a href="#" className="text-xs text-gray-400 hover:text-primary transition">Support</a>
//           <a href="#" className="text-xs text-gray-400 hover:text-primary transition">Privacy Policy</a>
//           <a href="#" className="text-xs text-gray-400 hover:text-primary transition">Terms</a>
//         </div>
//       </div>
//     </footer>
//   );
// };

"use client";

import React, { Suspense, useEffect, useState } from "react";
import { FaFacebook, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  GraduationCap
} from "lucide-react";
import { motion } from "framer-motion";
// import { Copyright } from "../layout/footer";


export const Footer = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    };

    checkTheme();
    
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });

    window.addEventListener("storage", checkTheme);
    return () => {
      observer.disconnect();
      window.removeEventListener("storage", checkTheme);
    };
  }, []);


  return (
    <footer className={`w-full transition-colors duration-300 border-t ${
      isDarkMode 
        ? "bg-[#0B0F1A] border-white/10 text-gray-400" 
        : "bg-white border-gray-200 text-gray-600"
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">

        {/* Bottom Section */}
        <div className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 ${
          isDarkMode ? "border-white/10" : "border-gray-100"
        }`}>
          <p className="text-xs text-center md:text-left">
            © {year} RentNest All rights reserved. Developed by Md Nazmus Shakib.
          </p>
          <div className="flex items-center gap-6 text-xs font-medium">
            <a href="#" className="hover:text-purple-500 transition-colors">Support</a>
            <a href="#" className="hover:text-purple-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-purple-500 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Sub-components
function SocialIcon({ icon: Icon, isDark }: { icon: any; isDark: boolean }) {
  return (
    <motion.a
      whileHover={{ y: -3, scale: 1.1 }}
      className={`p-2 rounded-lg border transition-all cursor-pointer ${
        isDark 
          ? "bg-white/5 border-white/10 text-gray-400 hover:bg-purple-600 hover:text-white" 
          : "bg-gray-100 border-gray-200 text-gray-600 hover:bg-purple-600 hover:text-white shadow-sm"
      }`}
    >
      <Icon size={18} />
    </motion.a>
  );
}

function FooterLink({ label }: { label: string }) {
  return (
    <li>
      <a className="hover:text-purple-500 transition-colors cursor-pointer flex items-center group">
        <span className="w-0 group-hover:w-2 h-[2px] bg-purple-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
        {label}
      </a>
    </li>
  );
}