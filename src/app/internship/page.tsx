"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  Users, 
  CheckCircle, 
  Clock, 
  BookOpen, 
  ChevronRight, 
  ArrowRight,
  TrendingUp,
  Target,
  FileText,
  UserCheck,
  Mail,
  X,
  Compass,
  Zap,
  Globe,
  Sparkles
} from "lucide-react";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export default function InternshipPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "MBA",
    college: "",
    statement: ""
  });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("apply") === "true") {
        setIsModalOpen(true);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoSubject = encodeURIComponent(`Application for VRNDA Internship - ${formData.name}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Qualification/Stream: ${formData.qualification}\n` +
      `College/Organization: ${formData.college}\n\n` +
      `Statement of Interest:\n${formData.statement}`
    );
    window.location.href = `mailto:vrndarootedindevotion@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
    setIsModalOpen(false);
  };

  const handleScrollToForm = () => {
    const element = document.getElementById("apply-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main 
      className={`${cormorant.variable} ${inter.variable} relative min-h-screen bg-transparent antialiased text-[#2c2c2c]`}
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {/* Sunlit Forest & Stone Arch Background (Page 3 Background in PDF) - Fix bg-fixed on mobile */}
      <div 
        className="fixed inset-0 -z-10 bg-cover bg-center bg-scroll md:bg-fixed transition-all duration-700" 
        style={{ backgroundImage: "url('/images/bg_combined.jpg')" }}
      />
      <div className="fixed inset-0 -z-10 bg-[#faf8f5]/90 backdrop-blur-[4px]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 relative z-10 space-y-16">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8c6239]/70">
          <Link href="/" className="hover:text-[#1f3f21] transition-colors duration-250">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#8c6239]/40" />
          <span className="text-[#1f3f21]">Internship Program</span>
        </div>

        {/* Master Logo Header (Flyer Header Copy) */}
        <header className="flex flex-col md:flex-row items-center justify-between bg-white/70 border border-[#8c6239]/15 p-6 md:p-8 rounded-[2rem] shadow-sm backdrop-blur-md gap-6">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 bg-white rounded-full overflow-hidden border border-[#8c6239]/15 flex items-center justify-center p-1">
              <Image src="/images/logo.jpeg" alt="Vrnda Logo" width={56} height={56} className="object-contain" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#8c6239] block">ROOTED IN DEVOTION</span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1f3f21] leading-tight mt-0.5" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                VRNDA
              </h2>
            </div>
          </div>

          <div className="text-center">
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1f3f21] uppercase tracking-wider leading-tight" style={{ fontFamily: "var(--font-cormorant), serif" }}>
              INDUSTRY INTERNSHIP PROGRAM
            </h1>
            <span className="text-[10px] font-bold text-[#8c6239] tracking-widest uppercase block mt-1">
              An Initiative by ISKCON Mangalore
            </span>
            <button 
              onClick={handleScrollToForm}
              className="mt-3.5 inline-flex items-center gap-2 px-5 py-2.5 bg-[#1f3f21] hover:bg-[#8c6239] text-[#f7f2e9] text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-sm"
            >
              Apply for Internship <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="text-right hidden md:block">
            <div className="border-l border-[#8c6239]/20 pl-4 py-1 text-left">
              <span className="text-[9px] font-bold uppercase text-[#8c6239] block leading-none">Srila Prabhupada's</span>
              <span className="font-serif text-sm font-extrabold text-[#1f3f21] block tracking-wide" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                ISKCON
              </span>
              <span className="text-[9px] font-bold text-[#2c2c2c]/60 uppercase tracking-widest block leading-none mt-0.5">MANGALORE</span>
            </div>
          </div>
        </header>

        {/* SECTION 1: Values-Driven Enterprise (Page 1) */}
        <section className="bg-white/60 border border-[#8c6239]/10 p-8 md:p-12 rounded-[2.5rem] shadow-xl backdrop-blur space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Building Values-Driven Enterprise */}
            <div className="lg:col-span-6 space-y-4 text-left">
              <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-[#1f3f21] leading-tight tracking-tight" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                Building a Values-Driven Enterprise
              </h2>
              <div className="w-16 h-0.5 bg-[#8c6239]" />
              <p className="text-sm leading-relaxed text-[#2c2c2c]/85 font-semibold pt-2">
                VRNDA is a values-driven initiative of ISKCON Mangalore focused on building a professionally managed enterprise offering premium food products and significant experiences through restaurant, retail, e-commerce and collaborations.
              </p>
              <p className="text-sm leading-relaxed text-[#2c2c2c]/85 font-semibold">
                We create meaningful value for customers, communities and future business leaders.
              </p>
              <div className="pt-2">
                <button 
                  onClick={handleScrollToForm}
                  className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#1f3f21] hover:bg-[#8c6239] text-[#f7f2e9] text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow hover:shadow-md"
                >
                  Start Your Application <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Vision & Mission */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-[#f7f2e9]/75 border border-[#8c6239]/15 p-6 rounded-2xl space-y-2 text-left">
                <h3 className="font-serif text-lg font-bold text-[#1f3f21] uppercase tracking-wider" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                  Our Vision
                </h3>
                <p className="text-xs text-[#2c2c2c]/80 font-medium leading-relaxed">
                  To be one of India's most respected values-driven enterprises known for quality, integrity and positive impact.
                </p>
              </div>

              <div className="bg-[#f7f2e9]/75 border border-[#8c6239]/15 p-6 rounded-2xl space-y-3 text-left">
                <h3 className="font-serif text-lg font-bold text-[#1f3f21] uppercase tracking-wider" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                  Our Mission
                </h3>
                <ul className="text-xs text-[#2c2c2c]/85 font-semibold space-y-2">
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-[#1f3f21] shrink-0" /> Deliver premium quality products</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-[#1f3f21] shrink-0" /> Create memorable customer experiences</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-[#1f3f21] shrink-0" /> Promote ethical and sustainable business</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-[#1f3f21] shrink-0" /> Empower communities</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-[#1f3f21] shrink-0" /> Develop future business leaders</li>
                </ul>
              </div>
            </div>

          </div>

          {/* Business focus Areas */}
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="font-serif text-2xl font-bold text-[#1f3f21]" style={{ fontFamily: "var(--font-cormorant), serif" }}>What We Focus On</h3>
              <p className="text-xs text-[#8c6239] font-bold uppercase tracking-widest">We operate across multiple business verticals that create value for people and society</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { title: "Premium Food Products", bg: "/images/bg_coconut.jpg", desc: "Pure organic ghee, honey, moringa, coconut oil, and wood-fired masala." },
                { title: "Restaurant & Café", bg: "/images/bg_honey.jpg", desc: "Offering clean, organic, and sanctified dining experiences." },
                { title: "Retail Outlets", bg: "/images/bg_masala.jpg", desc: "Direct physical outlets serving values-driven premium items." },
                { title: "E-Commerce", bg: "/images/bg_ghee.jpg", desc: "Sleek, frictionless digital shopping cart and shipping systems." },
                { title: "Business Collaborations", bg: "/images/bg_moringa.jpg", desc: "Cooperative partnerships with agricultural communities." }
              ].map((vertical) => (
                <div 
                  key={vertical.title} 
                  className="relative rounded-2xl overflow-hidden border border-[#8c6239]/15 group h-52 shadow-sm flex flex-col justify-end p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  style={{ backgroundImage: `url(${vertical.bg})`, backgroundSize: "cover", backgroundPosition: "center" }}
                >
                  <div className="absolute inset-0 bg-[#1f3f21]/80 transition-colors group-hover:bg-[#1f3f21]/85 z-0" />
                  <div className="relative z-10 space-y-1.5 text-white text-left">
                    <h4 className="font-serif text-sm font-bold text-[#f7f2e9]" style={{ fontFamily: "var(--font-cormorant), serif" }}>{vertical.title}</h4>
                    <p className="text-[9px] text-[#f7f2e9]/85 font-medium leading-relaxed">{vertical.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Page 1 Banner Quote */}
          <div className="bg-[#1f3f21] text-[#f7f2e9] p-6 rounded-2xl text-center shadow-md border-l-4 border-l-[#8c6239]">
            <p className="font-serif text-base italic" style={{ fontFamily: "var(--font-cormorant), serif" }}>
              "We are building an organization that delivers products and services with purity, quality, and devotion."
            </p>
          </div>

        </section>

        {/* SECTION 2: Why Join / Key Benefits (Page 2) */}
        <section className="bg-white/60 border border-[#8c6239]/10 p-8 md:p-12 rounded-[2.5rem] shadow-xl backdrop-blur space-y-12">
          
          <div className="text-center space-y-3">
            <h2 className="font-serif text-3xl font-extrabold text-[#1f3f21] tracking-tight" style={{ fontFamily: "var(--font-cormorant), serif" }}>
              Why Join the VRNDA Industry Internship Program?
            </h2>
            <p className="text-xs text-[#8c6239] font-bold uppercase tracking-[0.2em] italic">
              "A meaningful internship that prepares you for real-world success."
            </p>
            <div className="w-12 h-0.5 bg-[#8c6239] mx-auto" />
          </div>

          {/* 6 Key Benefits Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Real Business Exposure", desc: "Work on real-time projects that create impact." },
              { num: "02", title: "Learn from Experts", desc: "Guidance and mentorship from industry professionals." },
              { num: "03", title: "Cross-Functional Learning", desc: "Experience across diverse departments and business functions." },
              { num: "04", title: "Build Leadership Skills", desc: "Take ownership, solve problems, and lead with confidence." },
              { num: "05", title: "Career Advantage", desc: "Earn an advantage, LOR and potential PPO based on performance." },
              { num: "06", title: "Purpose-Driven Environment", desc: "Be part of a values-driven organization creating value for society." }
            ].map((pillar) => (
              <div 
                key={pillar.num} 
                className="rounded-3xl border border-[#8c6239]/10 bg-white/70 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-md space-y-3 text-left relative overflow-hidden"
              >
                <div className="absolute right-4 top-4 text-4xl font-serif font-extrabold text-[#8c6239]/10 select-none">{pillar.num}</div>
                <div className="w-8 h-8 rounded-lg bg-[#8c6239]/10 flex items-center justify-center text-[#8c6239] font-bold text-xs">
                  {pillar.num}
                </div>
                <h3 className="text-lg font-bold text-[#1f3f21] tracking-tight" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#2c2c2c]/75 leading-relaxed font-semibold">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
            
            {/* Internship Highlights Table */}
            <div className="lg:col-span-6 bg-[#f7f2e9]/75 border border-[#8c6239]/15 p-6 rounded-[2rem] space-y-4 text-left">
              <h3 className="font-serif text-lg font-extrabold text-[#1f3f21] uppercase tracking-wider border-b border-[#8c6239]/10 pb-2" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                Internship Highlights
              </h3>
              <div className="divide-y divide-[#8c6239]/10 text-xs font-semibold">
                {[
                  { label: "Duration", val: "6 Months" },
                  { label: "Live Business Projects", val: "Real Impact" },
                  { label: "Mentorship", val: "Industry Experts" },
                  { label: "Certificate", val: "Upon Completion" },
                  { label: "Letter of Recommendation", val: "For Eligible Interns" },
                  { label: "PPO Opportunity", val: "Based on Performance" }
                ].map((row) => (
                  <div key={row.label} className="py-2.5 flex justify-between gap-4">
                    <span className="text-[#2c2c2c]/55">{row.label}</span>
                    <span className="text-[#1f3f21] font-bold text-right">{row.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Target streams and skills */}
            <div className="lg:col-span-6 flex flex-col justify-between gap-6">
              
              <div className="bg-[#1f3f21] text-[#f7f2e9] p-6 rounded-[2rem] shadow-md space-y-4 text-left">
                <h3 className="font-serif text-lg font-bold tracking-wider" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                  Who Can Apply
                </h3>
                <div className="space-y-1.5 text-xs text-[#f7f2e9]/80 font-medium">
                  <p className="font-bold text-white">MBA | BBA | Commerce</p>
                  <p>Marketing | Finance | HR | Operations</p>
                  <p>Entrepreneurship & related folds</p>
                </div>
              </div>

              <div className="bg-white/70 border border-[#8c6239]/15 p-6 rounded-[2rem] space-y-3 flex-grow text-left">
                <h3 className="font-serif text-lg font-extrabold text-[#1f3f21]" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                  Skills You Will Develop
                </h3>
                <div className="flex flex-wrap gap-1.5 pt-1 text-[9px] font-bold uppercase tracking-wider text-[#1f3f21]">
                  {[
                    "Business Planning", "Market Research", "Financial Analysis", 
                    "Leadership", "Communication", "Team Management", 
                    "Negotiation", "Business Strategy", "Project Management", 
                    "Analytics", "Presentation Skills", "Customer Insight"
                  ].map((skill) => (
                    <span key={skill} className="px-2.5 py-1 rounded bg-[#8c6239]/10 border border-[#8c6239]/15">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

          <div className="text-center pt-2">
            <span className="font-serif text-xl italic font-semibold text-[#8c6239]" style={{ fontFamily: "var(--font-cormorant), serif" }}>
              "Learn by Doing. Grow by Leading."
            </span>
          </div>

        </section>

        {/* SECTION 3: Internship Experience & Mentor (Page 3) */}
        <section className="bg-white/60 border border-[#8c6239]/10 p-8 md:p-12 rounded-[2.5rem] shadow-xl backdrop-blur space-y-12">
          
          <div className="text-center space-y-3">
            <h2 className="font-serif text-3xl font-extrabold text-[#1f3f21] tracking-tight" style={{ fontFamily: "var(--font-cormorant), serif" }}>
              INTERNSHIP EXPERIENCE
            </h2>
            <p className="text-xs text-[#8c6239] font-bold uppercase tracking-[0.2em] italic">
              "Learn Through Real Business"
            </p>
            <div className="w-12 h-0.5 bg-[#8c6239] mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* What you will work on */}
            <div className="lg:col-span-6 bg-[#f7f2e9]/75 border border-[#8c6239]/15 p-6 rounded-[2rem] space-y-4 text-left">
              <h3 className="font-serif text-lg font-extrabold text-[#1f3f21] border-b border-[#8c6239]/10 pb-2" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                What You Will Work On
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-xs text-[#2c2c2c]/85 font-semibold">
                {[
                  "Business Strategy",
                  "Marketing & Brand Development",
                  "Sales & Business Development",
                  "Operations & Supply Chain",
                  "Product Development",
                  "Retail & Customer Experience",
                  "Restaurant Operations",
                  "E-Commerce"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#8c6239] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Learning Approach */}
            <div className="lg:col-span-6 bg-[#f7f2e9]/75 border border-[#8c6239]/15 p-6 rounded-[2rem] space-y-4 text-left">
              <h3 className="font-serif text-lg font-extrabold text-[#1f3f21] border-b border-[#8c6239]/10 pb-2" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                Learning Approach
              </h3>
              <p className="text-xs leading-relaxed text-[#2c2c2c]/80 font-medium">
                At VRNDA, interns work on real business initiatives under professional guidance. The program is designed to provide practical experience, cross functional exposure and meaningful responsibilities that prepare students for management careers.
              </p>
            </div>

          </div>

          {/* Mentor Profile Editorial Card - Changed vector silhouette to actual photo */}
          <div className="rounded-[2.5rem] border border-[#8c6239]/15 bg-white/70 p-6 md:p-8 shadow-md max-w-4xl mx-auto border-l-4 border-l-[#1f3f21] backdrop-blur">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
              
              {/* Actual photo of Mentor Sunil Kumar H.S. */}
              <div className="md:col-span-4 flex justify-center">
                <div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-[#8c6239]/30 shadow-md">
                  <Image 
                    src="/images/sunil.jpeg" 
                    alt="Sunil Kumar H.S." 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-[#1f3f21] text-white p-2 rounded-full shadow border border-white z-10">
                    <UserCheck className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Profile Details */}
              <div className="md:col-span-8 space-y-3 text-left">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8c6239] block">
                  Meet Your Mentor
                </span>
                <div>
                  <h3 className="text-2xl font-bold text-[#1f3f21] tracking-tight leading-none" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                    Sunil Kumar H. S.
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#8c6239] block mt-1">
                    MBA, Indian Institute of Technology (IIT) Patna
                  </span>
                </div>
                <p className="text-xs text-[#2c2c2c]/80 leading-relaxed font-medium">
                  5+ years as Manager of Akshaya Patra Foundation. Extensive experience in restaurant management and business ownership.
                </p>
                <p className="text-xs text-[#2c2c2c]/80 leading-relaxed font-semibold italic border-t border-[#8c6239]/10 pt-2">
                  "Sunil Kumar H.S. mentors interns through practical business exposure, structured guidance and collaborative project execution, helping students transform classroom learning into professional management capability."
                </p>
              </div>

            </div>
          </div>

          <div className="text-center pt-2">
            <span className="font-serif text-lg italic font-semibold text-[#1f3f21]" style={{ fontFamily: "var(--font-cormorant), serif" }}>
              "Great leaders are shaped through meaningful work, continuous learning and purposeful mentorship."
            </span>
          </div>

        </section>

        {/* SECTION 4: Application Process & Details (Page 4) */}
        <section className="bg-white/60 border border-[#8c6239]/10 p-8 md:p-12 rounded-[2.5rem] shadow-xl backdrop-blur space-y-12">
          
          <div className="text-center space-y-3">
            <h2 className="font-serif text-3xl font-extrabold text-[#1f3f21] tracking-tight" style={{ fontFamily: "var(--font-cormorant), serif" }}>
              APPLICATION PROCESS
            </h2>
            <div className="w-12 h-0.5 bg-[#8c6239] mx-auto" />
          </div>

          {/* 5 steps process bar */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4 relative pt-2">
            {[
              { step: "1", title: "Application", desc: "Submit your details via our online portal." },
              { step: "2", title: "Resume Screening", desc: "Our recruitment board reviews each profile." },
              { step: "3", title: "Personal Interview", desc: "Discuss goals with key operational leaders." },
              { step: "4", title: "Offer Letter", desc: "Receive an official program placement offer." },
              { step: "5", title: "Onboarding", desc: "Complete documentation and join the team." }
            ].map((proc) => (
              <div key={proc.step} className="text-center space-y-3 relative group">
                <div className="w-10 h-10 rounded-full bg-[#1f3f21] text-white font-serif font-bold text-sm mx-auto flex items-center justify-center border-4 border-[#faf8f5] shadow-sm transition-transform duration-300 group-hover:scale-105">
                  {proc.step}
                </div>
                <h4 className="font-bold text-xs text-[#1f3f21] uppercase tracking-wider">{proc.title}</h4>
                <p className="text-[10px] text-[#2c2c2c]/75 leading-relaxed max-w-[140px] mx-auto font-medium">
                  {proc.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
            
            {/* Eligibility */}
            <div className="lg:col-span-6 bg-[#f7f2e9]/75 border border-[#8c6239]/15 p-6 rounded-[2rem] space-y-4 text-left">
              <h3 className="font-serif text-lg font-extrabold text-[#1f3f21] border-b border-[#8c6239]/10 pb-2" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                Who Can Apply
              </h3>
              <ul className="text-xs text-[#2c2c2c]/85 font-semibold space-y-3">
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#1f3f21] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-[#1f3f21]">Final-Year MBA Students</h5>
                    <p className="text-[10px] text-[#2c2c2c]/65 font-medium mt-0.5">Specializing in Marketing, Finance, HR, or Supply Chain.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#1f3f21] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-[#1f3f21]">Final-Year Students from Any Degree Stream</h5>
                    <p className="text-[10px] text-[#2c2c2c]/65 font-medium mt-0.5">Highly motivated individuals with a strong academic/extracurricular record.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#1f3f21] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-[#1f3f21]">Entrepreneurial Thinkers</h5>
                    <p className="text-[10px] text-[#2c2c2c]/65 font-medium mt-0.5">Aspiring business leaders, self-starters, and management candidates.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Benefits */}
            <div className="lg:col-span-6 bg-[#f7f2e9]/75 border border-[#8c6239]/15 p-6 rounded-[2rem] space-y-4 text-left">
              <h3 className="font-serif text-lg font-extrabold text-[#1f3f21] border-b border-[#8c6239]/10 pb-2" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                Program Benefits
              </h3>
              <ul className="text-xs text-[#2c2c2c]/85 font-semibold space-y-2.5">
                <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-[#1f3f21] shrink-0" /> Certificate of Completion</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-[#1f3f21] shrink-0" /> Performance Based Stipend*</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-[#1f3f21] shrink-0" /> Letter of Recommendation*</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-[#1f3f21] shrink-0" /> Performance Based Pre-Placement Opportunity*</li>
              </ul>
              <span className="block text-[9px] text-[#2c2c2c]/50 font-bold uppercase tracking-wider pt-2 border-t border-[#8c6239]/10">
                *Based on individual performance and organizational requirements.
              </span>
            </div>

          </div>

          {/* Interactive Contact / Application Form */}
          <div id="apply-form" className="max-w-xl mx-auto bg-[#faf8f5] border border-[#8c6239]/15 p-8 rounded-[2rem] shadow-md space-y-6">
            <div className="text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#1f3f21]/10 flex items-center justify-center text-[#1f3f21] mx-auto">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1f3f21]" style={{ fontFamily: "var(--font-cormorant), serif" }}>Submit Application Portal</h3>
              <p className="text-[10px] text-[#2c2c2c]/60 max-w-xs mx-auto leading-relaxed font-semibold">
                Launch your email request. On submit, your email client will launch with preloaded information to our board.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="text-left">
                <label className="block text-[9px] font-bold uppercase tracking-wider text-[#8c6239] mb-1">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Rahul Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#8c6239]/15 bg-white text-xs font-semibold text-[#2c2c2c] focus:outline-none focus:border-[#1f3f21]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-[#8c6239] mb-1">Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="rahul@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#8c6239]/15 bg-white text-xs font-semibold text-[#2c2c2c] focus:outline-none focus:border-[#1f3f21]"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-[#8c6239] mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#8c6239]/15 bg-white text-xs font-semibold text-[#2c2c2c] focus:outline-none focus:border-[#1f3f21]"
                  />
                </div>
              </div>

              <div className="text-left">
                <label className="block text-[9px] font-bold uppercase tracking-wider text-[#8c6239] mb-1">Qualification Stream</label>
                <select 
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#8c6239]/15 bg-white text-xs font-semibold text-[#2c2c2c] focus:outline-none focus:border-[#1f3f21]"
                >
                  <option value="MBA">MBA (Master of Business Administration)</option>
                  <option value="BBA">BBA (Bachelor of Business Administration)</option>
                  <option value="Commerce">Commerce / Finance Graduate</option>
                  <option value="Engineering">Engineering / Technology</option>
                  <option value="Other">Other / Arts / Science</option>
                </select>
              </div>

              <div className="text-left">
                <label className="block text-[9px] font-bold uppercase tracking-wider text-[#8c6239] mb-1">Current College / Organization</label>
                <input 
                  type="text" 
                  name="college" 
                  required
                  value={formData.college}
                  onChange={handleInputChange}
                  placeholder="IIT Patna / IIM Bangalore"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#8c6239]/15 bg-white text-xs font-semibold text-[#2c2c2c] focus:outline-none focus:border-[#1f3f21]"
                />
              </div>

              <div className="text-left">
                <label className="block text-[9px] font-bold uppercase tracking-wider text-[#8c6239] mb-1">Statement of Interest</label>
                <textarea 
                  name="statement" 
                  rows={3}
                  value={formData.statement}
                  onChange={handleInputChange}
                  placeholder="Why do you wish to join the VRNDA cooperative team?"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#8c6239]/15 bg-white text-xs font-semibold text-[#2c2c2c] focus:outline-none focus:border-[#1f3f21] resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-[#1f3f21] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#8c6239] transition-colors"
              >
                Submit & Email Application
              </button>

            </form>
          </div>

          {/* Associated Organizations */}
          <div className="space-y-6 pt-4 border-t border-[#8c6239]/10">
            <div className="text-center space-y-1">
              <h3 className="font-serif text-lg font-bold text-[#1f3f21]" style={{ fontFamily: "var(--font-cormorant), serif" }}>Associated Organizations</h3>
              <div className="w-12 h-0.5 bg-[#8c6239]/20 mx-auto" />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2">
              {[
                { name: "Akshaya Patra", desc: "Cooperative Kitchens" },
                { name: "Vasudha", desc: "Organic Dairy Farms" },
                { name: "Goloka", desc: "Sattvic Products" },
                { name: "Madhava's", desc: "Healthy Lifestyle" },
                { name: "Maghava's Eco Village", desc: "Sustainable Living" }
              ].map((org) => (
                <div key={org.name} className="px-5 py-3 rounded-2xl border border-[#8c6239]/15 bg-white/70 backdrop-blur shadow-sm text-center min-w-[150px] flex flex-col justify-center gap-0.5 hover:border-[#1f3f21] hover:-translate-y-0.5 transition-all duration-200">
                  <span className="font-serif text-xs font-extrabold text-[#1f3f21]">{org.name}</span>
                  <span className="text-[7px] uppercase tracking-widest text-[#8c6239] font-bold">{org.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Details Footer */}
          <div className="pt-6 border-t border-[#8c6239]/10 grid grid-cols-1 md:grid-cols-4 gap-6 text-xs text-left font-semibold text-[#2c2c2c]/70">
            <div className="space-y-1">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#8c6239] block">Location</span>
              <p>Vrndā PVS Kalakunj,</p>
              <p>Opposite MG Road,</p>
              <p>Mangalore - 575003</p>
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#8c6239] block">Call Us</span>
              <p className="text-sm font-bold text-[#1f3f21]">+91 94814 11722</p>
              <p className="text-[10px]">+91 74814 11722</p>
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#8c6239] block">Email Inquiry</span>
              <p className="hover:text-[#1f3f21] transition-colors"><a href="mailto:vrndarootedindevotion@gmail.com">vrndarootedindevotion@gmail.com</a></p>
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#8c6239] block">Web Portal</span>
              <p className="hover:text-[#1f3f21] transition-colors"><a href="https://www.vrndaonline.com" target="_blank" rel="noopener noreferrer">www.vrndaonline.com</a></p>
            </div>
          </div>

          <div className="text-center pt-2">
            <span className="font-serif text-sm italic font-semibold text-[#8c6239]" style={{ fontFamily: "var(--font-cormorant), serif" }}>
              "Learn. Contribute. Build the Future."
            </span>
          </div>

        </section>

      </div>
    </main>
  );
}
