import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import BriefingForm from "../components/BriefingForm";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <Hero />
      
      <main className="flex-1 relative overflow-hidden">
        {/* Imagem de fundo com classe personalizada */}
        <div className="absolute inset-0 gradient-background"></div>
        
        <section className="container relative z-10 max-w-4xl mx-auto py-16 px-4">
          <div className="bg-white/75 backdrop-blur-lg rounded-xl shadow-xl p-6 md:p-10 border border-white/50">
            <BriefingForm />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
