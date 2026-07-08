"use client";

import React, { useState } from "react";
import Link from "next/link";
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
  X
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

  return (
    <main 
      className={`${cormorant.variable} ${inter.variable} min-h-screen bg-[#f7f2e9] py-20 px-6 text-[#2c2c2c] antialiased relative`}
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      
      {/* Background decoration matching brand style */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#8c6239]/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-20 relative z-10">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8c6239]/70">
          <Link href="/" className="hover:text-[#1f3f21] transition-colors duration-250">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#8c6239]/40" />
          <span className="text-[#1f3f21]">Internship Program</span>
        </div>

        {/* Hero Section with Replicated Typography */}
        <section className="text-center space-y-8 max-w-3xl mx-auto py-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-[#8c6239]/15 text-[10px] font-bold uppercase tracking-[0.25em] text-[#1f3f21] shadow-sm backdrop-blur">
            SATTVIC • PURE • NOURISHING
          </span>
          
          <div className="space-y-4">
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#1f3f21] leading-[1.15]"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              VRNDA Industry <br className="hidden sm:inline" /> Internship Program
            </h1>
            <p 
              className="text-xl md:text-2xl italic text-[#8c6239] font-medium tracking-wide"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              "Learn. Contribute. Build the Future."
            </p>
          </div>

          <p className="text-base leading-relaxed text-[#2c2c2c]/70 max-w-xl mx-auto font-medium">
            A comprehensive gateway for aspiring leaders to get real-world business exposure, work on live strategic projects, and champion bio-diverse cooperative farming products.
          </p>

          <div className="pt-4 font-semibold">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#1f3f21] text-white text-xs font-bold uppercase tracking-widest rounded-2xl hover:bg-[#8c6239] hover:shadow-lg transition-all duration-300"
            >
              Apply for Internship <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Key Benefits Grid Section */}
        <section className="space-y-12">
          <div className="text-center space-y-3">
            <h2 
              className="text-3xl font-bold text-[#1f3f21] tracking-tight"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Key Program Pillars
            </h2>
            <p className="text-xs text-[#8c6239] font-bold uppercase tracking-[0.2em]">What makes our program unique</p>
            <div className="w-12 h-0.5 bg-[#8c6239]/30 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="rounded-[32px] border border-[#8c6239]/10 bg-white/80 p-8 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#8c6239]/10 flex items-center justify-center text-[#8c6239]">
                <Briefcase className="w-5.5 h-5.5" />
              </div>
              <h3 
                className="text-xl font-bold text-[#1f3f21] tracking-tight"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Real Business Exposure
              </h3>
              <p className="text-sm text-[#2c2c2c]/70 leading-relaxed font-semibold">
                Step beyond textbook cases. Engage directly with real-world supply chain flows, rural producer organizations, and direct-to-consumer pipelines.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-[32px] border border-[#8c6239]/10 bg-white/80 p-8 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#8c6239]/10 flex items-center justify-center text-[#8c6239]">
                <GraduationCap className="w-5.5 h-5.5" />
              </div>
              <h3 
                className="text-xl font-bold text-[#1f3f21] tracking-tight"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Learn from Experts
              </h3>
              <p className="text-sm text-[#2c2c2c]/70 leading-relaxed font-semibold">
                Receive direct mentoring from industry leaders, alumni from elite institutions (IIT/IIM), and experienced cooperative management experts.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-[32px] border border-[#8c6239]/10 bg-white/80 p-8 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#8c6239]/10 flex items-center justify-center text-[#8c6239]">
                <BookOpen className="w-5.5 h-5.5" />
              </div>
              <h3 
                className="text-xl font-bold text-[#1f3f21] tracking-tight"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Cross-Functional Learning
              </h3>
              <p className="text-sm text-[#2c2c2c]/70 leading-relaxed font-semibold">
                Experience operations from 360 degrees. Rotate through marketing campaigns, microfinance operations, quality testing, and logistics.
              </p>
            </div>

            {/* Card 4 */}
            <div className="rounded-[32px] border border-[#8c6239]/10 bg-white/80 p-8 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#8c6239]/10 flex items-center justify-center text-[#8c6239]">
                <TrendingUp className="w-5.5 h-5.5" />
              </div>
              <h3 
                className="text-xl font-bold text-[#1f3f21] tracking-tight"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Build Leadership Skills
              </h3>
              <p className="text-sm text-[#2c2c2c]/70 leading-relaxed font-semibold">
                Own high-impact campaigns, coordinate farmer workshops, and lead student cooperative circles. Shape your leadership style in real-time.
              </p>
            </div>

            {/* Card 5 */}
            <div className="rounded-[32px] border border-[#8c6239]/10 bg-white/80 p-8 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#8c6239]/10 flex items-center justify-center text-[#8c6239]">
                <Award className="w-5.5 h-5.5" />
              </div>
              <h3 
                className="text-xl font-bold text-[#1f3f21] tracking-tight"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Career Advantage
              </h3>
              <p className="text-sm text-[#2c2c2c]/70 leading-relaxed font-semibold">
                Enhance your resume with a cooperative internship certificate, recommendation letters, and potential pre-placement opportunities.
              </p>
            </div>

            {/* Card 6 */}
            <div className="rounded-[32px] border border-[#8c6239]/10 bg-white/80 p-8 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#8c6239]/10 flex items-center justify-center text-[#8c6239]">
                <Target className="w-5.5 h-5.5" />
              </div>
              <h3 
                className="text-xl font-bold text-[#1f3f21] tracking-tight"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Purpose-Driven Environment
              </h3>
              <p className="text-sm text-[#2c2c2c]/70 leading-relaxed font-semibold">
                Contribute to organic agriculture, sustainable packaging standards, and fair-wage farmer cooperative movements across rural India.
              </p>
            </div>

          </div>
        </section>

        {/* Highlights & Target Audience Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Program Highlights */}
          <div className="lg:col-span-7 rounded-[32px] border border-[#8c6239]/10 bg-white/80 p-8 md:p-10 shadow-sm backdrop-blur flex flex-col justify-center space-y-8">
            <div className="space-y-2">
              <h3 
                className="text-2xl font-bold text-[#1f3f21] tracking-tight"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Program Highlights
              </h3>
              <div className="w-12 h-0.5 bg-[#8c6239]/20" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#8c6239]/5 flex items-center justify-center text-[#8c6239] shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#1f3f21]">Duration</h4>
                  <p className="text-xs md:text-sm text-[#2c2c2c]/80 font-bold mt-0.5">2 - 6 Months Residency</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#8c6239]/5 flex items-center justify-center text-[#8c6239] shrink-0 mt-0.5">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#1f3f21]">Projects</h4>
                  <p className="text-xs md:text-sm text-[#2c2c2c]/80 font-bold mt-0.5">Live Business Operations</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#8c6239]/5 flex items-center justify-center text-[#8c6239] shrink-0 mt-0.5">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#1f3f21]">Advisory</h4>
                  <p className="text-xs md:text-sm text-[#2c2c2c]/80 font-bold mt-0.5">1-on-1 Executive Mentorship</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#8c6239]/5 flex items-center justify-center text-[#8c6239] shrink-0 mt-0.5">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#1f3f21]">Recognition</h4>
                  <p className="text-xs md:text-sm text-[#2c2c2c]/80 font-bold mt-0.5">Official Program Certificate</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#8c6239]/5 flex items-center justify-center text-[#8c6239] shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#1f3f21]">Advocacy</h4>
                  <p className="text-xs md:text-sm text-[#2c2c2c]/80 font-bold mt-0.5">Letter of Recommendation</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#8c6239]/5 flex items-center justify-center text-[#8c6239] shrink-0 mt-0.5">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#1f3f21]">Placements</h4>
                  <p className="text-xs md:text-sm text-[#2c2c2c]/80 font-bold mt-0.5">Pre-Placement Opportunities</p>
                </div>
              </div>

            </div>
          </div>

          {/* Target Audience */}
          <div className="lg:col-span-5 bg-[#1f3f21] text-[#f7f2e9] p-8 md:p-10 rounded-[32px] shadow-xl flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <h3 
                className="text-2xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Who Should Apply?
              </h3>
              <p className="text-xs md:text-sm text-[#f7f2e9]/80 leading-relaxed font-medium">
                We are looking for self-motivated, proactive, and values-driven change-makers who are ready to make a tangible impact.
              </p>
              
              <div className="border-t border-[#f7f2e9]/15 pt-6 space-y-4">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#8c6239] block">Target Audience</span>
                <p className="text-xs md:text-sm text-[#f7f2e9]/95 font-medium leading-relaxed">
                  Final-Year MBA or Degree students interested in building careers in:
                </p>
                
                <div className="flex flex-wrap gap-2 pt-1 font-semibold">
                  {["Business", "Marketing", "Finance", "HR", "Operations", "Entrepreneurship"].map((domain) => (
                    <span 
                      key={domain} 
                      className="px-3 py-1 rounded-lg bg-[#f7f2e9]/10 text-[10px] font-bold uppercase tracking-widest"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8c6239] block border-t border-[#f7f2e9]/15 pt-4">
              * Open to all locations (Remote/Hybrid options available)
            </span>
          </div>

        </section>

        {/* Application Process Horizontal Timeline */}
        <section className="space-y-12 rounded-[32px] border border-[#8c6239]/10 bg-white/80 p-8 md:p-12 shadow-sm backdrop-blur">
          <div className="text-center space-y-3">
            <h2 
              className="text-3xl font-bold text-[#1f3f21] tracking-tight"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Application Process
            </h2>
            <p className="text-xs text-[#8c6239] font-bold uppercase tracking-[0.2em]">Five Steps to Join</p>
            <div className="w-12 h-0.5 bg-[#8c6239]/30 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative">
            
            {/* Step 1 */}
            <div className="text-center space-y-3 relative group">
              <div className="w-12 h-12 rounded-full bg-[#1f3f21] text-white font-serif font-bold text-base mx-auto flex items-center justify-center border-4 border-[#f7f2e9] shadow transition-transform duration-300 group-hover:scale-105">
                1
              </div>
              <h4 className="font-bold text-xs text-[#1f3f21] uppercase tracking-wider">Application</h4>
              <p className="text-[11px] text-[#2c2c2c]/70 leading-relaxed max-w-[150px] mx-auto font-semibold">
                Submit your CV via our direct email application link.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center space-y-3 relative group">
              <div className="w-12 h-12 rounded-full bg-[#1f3f21] text-white font-serif font-bold text-base mx-auto flex items-center justify-center border-4 border-[#f7f2e9] shadow transition-transform duration-300 group-hover:scale-105">
                2
              </div>
              <h4 className="font-bold text-xs text-[#1f3f21] uppercase tracking-wider">Screening</h4>
              <p className="text-[11px] text-[#2c2c2c]/70 leading-relaxed max-w-[150px] mx-auto font-semibold">
                Our selection board reviews candidates based on core alignment.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center space-y-3 relative group">
              <div className="w-12 h-12 rounded-full bg-[#1f3f21] text-white font-serif font-bold text-base mx-auto flex items-center justify-center border-4 border-[#f7f2e9] shadow transition-transform duration-300 group-hover:scale-105">
                3
              </div>
              <h4 className="font-bold text-xs text-[#1f3f21] uppercase tracking-wider">Interview</h4>
              <p className="text-[11px] text-[#2c2c2c]/70 leading-relaxed max-w-[150px] mx-auto font-semibold">
                Participate in a personal discussion with operational leads.
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center space-y-3 relative group">
              <div className="w-12 h-12 rounded-full bg-[#1f3f21] text-white font-serif font-bold text-base mx-auto flex items-center justify-center border-4 border-[#f7f2e9] shadow transition-transform duration-300 group-hover:scale-105">
                4
              </div>
              <h4 className="font-bold text-xs text-[#1f3f21] uppercase tracking-wider">Offer Letter</h4>
              <p className="text-[11px] text-[#2c2c2c]/70 leading-relaxed max-w-[150px] mx-auto font-semibold">
                Selected candidates receive an official internship placement offer.
              </p>
            </div>

            {/* Step 5 */}
            <div className="text-center space-y-3 relative group">
              <div className="w-12 h-12 rounded-full bg-[#1f3f21] text-white font-serif font-bold text-base mx-auto flex items-center justify-center border-4 border-[#f7f2e9] shadow transition-transform duration-300 group-hover:scale-105">
                5
              </div>
              <h4 className="font-bold text-xs text-[#1f3f21] uppercase tracking-wider">Onboarding</h4>
              <p className="text-[11px] text-[#2c2c2c]/70 leading-relaxed max-w-[150px] mx-auto font-semibold">
                Complete team onboarding and initiate your cooperative rotation.
              </p>
            </div>

          </div>
        </section>

        {/* Mentor Profile Editorial Card */}
        <section className="rounded-[32px] border border-[#8c6239]/10 bg-white/80 p-8 md:p-12 shadow-xl max-w-4xl mx-auto border-l-4 border-l-[#1f3f21] backdrop-blur">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Vector Silhouette in a sharp black suit */}
            <div className="md:col-span-4 flex justify-center">
              <div className="relative">
                <svg viewBox="0 0 100 100" className="w-36 h-36 rounded-full border border-brand-brown/20 bg-brand-light/50 p-1.5 shadow-md">
                  {/* Background backdrop glow */}
                  <circle cx="50" cy="50" r="48" fill="#fcfcfb" />
                  {/* Sharp Black Suit jacket shoulders */}
                  <path d="M15 95 C 15 72, 30 62, 50 62 C 70 62, 85 72, 85 95 Z" fill="#18181b" />
                  {/* Suit Lapels */}
                  <path d="M28 95 L40 68 L50 82 L60 68 L72 95 Z" fill="#09090b" />
                  {/* White Shirt V-neck */}
                  <path d="M40 62 L50 78 L60 62 Z" fill="#ffffff" />
                  {/* Forest Green Tie */}
                  <path d="M47 67 L53 67 L52 86 L48 86 Z" fill="#1f3f21" />
                  {/* Skin tone face */}
                  <circle cx="50" cy="38" r="18" fill="#f5c7a0" />
                  {/* Eyeglasses */}
                  <rect x="36" y="34" width="10" height="4" rx="1" fill="none" stroke="#27272a" strokeWidth="1.5" />
                  <rect x="54" y="34" width="10" height="4" rx="1" fill="none" stroke="#27272a" strokeWidth="1.5" />
                  <line x1="46" y1="36" x2="54" y2="36" stroke="#27272a" strokeWidth="1.5" />
                  {/* Trimmed Hair */}
                  <path d="M30 36 C 30 20, 70 20, 70 36 C 70 23, 30 23, 30 36 Z" fill="#4a3728" />
                </svg>
                <div className="absolute -bottom-1 -right-1 bg-[#1f3f21] text-white p-2 rounded-full shadow border border-white/35">
                  <UserCheck className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="md:col-span-8 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8c6239] block">
                Meet Your Mentor
              </span>
              <div>
                <h3 
                  className="text-2xl md:text-3xl font-bold text-[#1f3f21] tracking-tight"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  Sunil Kumar H. S.
                </h3>
                <p className="text-xs font-bold uppercase tracking-widest text-[#8c6239] mt-0.5">Industry Mentor & Operations Lead</p>
              </div>
              <p className="text-sm text-[#2c2c2c]/75 leading-relaxed font-semibold">
                Sunil holds an MBA from the prestigious <strong className="text-[#1f3f21]">IIT Patna</strong> and brings over 5+ years of managerial and operational stewardship from <strong className="text-[#8c6239]">The Akshaya Patra Foundation</strong>. Under his leadership, interns gain hands-on experience in logistics planning, modern micro-business strategy, quality frameworks, and sustainable cooperative scaling.
              </p>
            </div>

          </div>
        </section>

        {/* Call to Action Statement */}
        <section className="bg-[#8c6239]/5 border border-[#8c6239]/10 p-10 md:p-14 rounded-3xl text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-[#1f3f21]/10 flex items-center justify-center text-[#1f3f21] mx-auto">
            <Mail className="w-6 h-6" />
          </div>
          
          <div className="space-y-2">
            <h3 
              className="text-2xl md:text-3xl font-bold text-[#1f3f21] tracking-tight"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Ready to Begin Your Journey?
            </h3>
            <p className="text-sm text-[#2c2c2c]/70 max-w-lg mx-auto leading-relaxed font-semibold">
              Applications are reviewed on a rolling basis. Please send your updated resume along with a brief cover statement to our recruitment panel.
            </p>
          </div>
          
          <div className="pt-2 font-semibold">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#1f3f21] text-white text-xs font-bold uppercase tracking-widest rounded-2xl hover:bg-[#8c6239] hover:shadow-lg transition-all duration-300"
            >
              Email Your Resume <FileText className="w-4 h-4" />
            </button>
          </div>
        </section>

      </div>

      {/* Application Popup Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[#fbfbf9] border border-[#8c6239]/15 rounded-3xl max-w-md w-full p-8 shadow-2xl space-y-6 relative animate-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-[#2c2c2c]/50 hover:text-[#2c2c2c] transition-colors p-1.5 rounded-lg hover:bg-black/5"
            >
              <X className="w-4.5 h-4.5" />
            </button>

            <div className="space-y-2 text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8c6239] block">Internship Application</span>
              <h3 
                className="text-2xl font-bold text-[#1f3f21]"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Apply for Internship
              </h3>
              <p className="text-[11px] text-[#2c2c2c]/60 max-w-xs mx-auto leading-relaxed font-semibold">
                Submit your details. When you click submit, it will launch your email client pre-filled to email your resume directly to our board.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8c6239] mb-1.5">
                  Full Name
                </label>
                <input 
                  type="text" 
                  name="name" 
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#8c6239]/15 bg-white text-xs font-semibold text-[#2c2c2c] focus:outline-none focus:border-[#1f3f21] focus:ring-1 focus:ring-[#1f3f21]"
                />
              </div>

              {/* Email & Phone grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8c6239] mb-1.5">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    name="email" 
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#8c6239]/15 bg-white text-xs font-semibold text-[#2c2c2c] focus:outline-none focus:border-[#1f3f21] focus:ring-1 focus:ring-[#1f3f21]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8c6239] mb-1.5">
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    name="phone" 
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#8c6239]/15 bg-white text-xs font-semibold text-[#2c2c2c] focus:outline-none focus:border-[#1f3f21] focus:ring-1 focus:ring-[#1f3f21]"
                  />
                </div>
              </div>

              {/* Qualification / Stream */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8c6239] mb-1.5">
                  Qualification / Stream
                </label>
                <select 
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#8c6239]/15 bg-white text-xs font-semibold text-[#2c2c2c] focus:outline-none focus:border-[#1f3f21] focus:ring-1 focus:ring-[#1f3f21]"
                >
                  <option value="MBA">MBA (Master of Business Administration)</option>
                  <option value="BBA">BBA (Bachelor of Business Administration)</option>
                  <option value="Commerce">Commerce / Finance Graduate</option>
                  <option value="Engineering">Engineering / Technology</option>
                  <option value="Other">Other Streams / Arts / Science</option>
                </select>
              </div>

              {/* College / Organization */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8c6239] mb-1.5">
                  Current College / Organization
                </label>
                <input 
                  type="text" 
                  name="college" 
                  required
                  value={formData.college}
                  onChange={handleInputChange}
                  placeholder="e.g. IIT Patna / IIM Bangalore"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#8c6239]/15 bg-white text-xs font-semibold text-[#2c2c2c] focus:outline-none focus:border-[#1f3f21] focus:ring-1 focus:ring-[#1f3f21]"
                />
              </div>

              {/* Statement of Interest */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8c6239] mb-1.5">
                  Brief Statement of Interest
                </label>
                <textarea 
                  name="statement" 
                  rows={3}
                  value={formData.statement}
                  onChange={handleInputChange}
                  placeholder="Why do you wish to join the VRNDA cooperative team?"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#8c6239]/15 bg-white text-xs font-semibold text-[#2c2c2c] focus:outline-none focus:border-[#1f3f21] focus:ring-1 focus:ring-[#1f3f21] resize-none"
                />
              </div>

              {/* Action buttons */}
              <div className="flex gap-4 pt-2 font-bold uppercase tracking-wider text-xs">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 py-3 rounded-xl border border-[#8c6239]/15 text-[#2c2c2c]/70 hover:bg-black/5 transition-colors text-center"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="w-1/2 py-3 rounded-xl bg-[#1f3f21] text-white hover:bg-[#8c6239] transition-colors text-center"
                >
                  Submit
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </main>
  );
}
