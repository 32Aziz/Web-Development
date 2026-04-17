import React from "react";
import { motion } from "framer-motion";
import Hero from "../Components/home/Hero";
import Features from "../Components/home/Features";

function Home() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      {/* Main hero section of the home page */}
      <Hero />

      {/* Features section placeholder for now */}
      <Features />
    </motion.main>
  );
}

export default Home;