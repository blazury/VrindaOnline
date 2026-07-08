import React from "react";
import Link from "next/link";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { MapPin, Phone, Mail } from "lucide-react";

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

export default function Footer() {
  return (
    <footer 
      className={`${cormorant.variable} ${inter.variable} relative z-20 bg-brand-dark text-brand-light border-t border-brand-brown/20 py-16 px-6 antialiased`}
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Brand */}
        <div className="md:col-span-4 space-y-3">
          <div>
            <span 
              className="text-2xl font-bold tracking-[0.15em] text-brand-light block uppercase"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              VṚNDĀ
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8c6239] block mt-0.5">
              Rooted in Devotion
            </span>
          </div>
          <p className="text-[11px] text-brand-light/60 leading-relaxed max-w-xs font-medium">
            A values-driven initiative of ISKCON Mangalore focused on delivering premium organic products and meaningful cooperative service.
          </p>
        </div>
        
        {/* Center column: Navigation */}
        <div className="md:col-span-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#8c6239] mb-4">Verticals</h4>
          <ul className="space-y-2.5 text-[11px] text-brand-light/75 font-semibold">
            <li><Link href="/products" className="hover:text-brand-light transition-colors">Premium Foods</Link></li>
            <li><Link href="/breakfast-combo" className="hover:text-brand-light transition-colors">Breakfast Combo</Link></li>
            <li><Link href="/internship" className="hover:text-brand-light transition-colors">Internship Program</Link></li>
            <li><Link href="/#cafe-details" className="hover:text-brand-light transition-colors">Slow Dining Café</Link></li>
            <li><Link href="/#retail-details" className="hover:text-brand-light transition-colors">Experiential Retail</Link></li>
          </ul>
        </div>

        {/* Right column: Contact information from final_2.pdf */}
        <div className="md:col-span-5 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#8c6239] mb-4">Contact Information</h4>
          
          <div className="space-y-3.5 text-[11px] text-brand-light/75 font-semibold">
            
            {/* Address */}
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#8c6239] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Vrndā PVS Kalakunj,<br />
                Opposite MG Road,<br />
                Mangalore
              </p>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#8c6239] shrink-0" />
              <a href="tel:+919481411722" className="hover:text-brand-light transition-colors">
                +91 94814 11722
              </a>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#8c6239] shrink-0" />
              <a href="mailto:vrndarootedindevotion@gmail.com" className="hover:text-brand-light transition-colors">
                vrndarootedindevotion@gmail.com
              </a>
            </div>

          </div>
        </div>

      </div>
      
      {/* Bottom bar with no produced by tags */}
      <div className="max-w-6xl mx-auto border-t border-brand-light/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-brand-light/45 font-semibold">
        <p>&copy; {new Date().getFullYear()} Vrnda. All Rights Reserved.</p>
        <p className="italic tracking-wider text-brand-light/40">
          An Initiative by ISKCON Mangalore
        </p>
      </div>
    </footer>
  );
}
