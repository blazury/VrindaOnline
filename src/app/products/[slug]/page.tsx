import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { ArrowLeft, MapPin, Hammer, Sparkles } from "lucide-react";
import BuyNowButton from "@/components/BuyNowButton";
import { getProductBySlug } from "@/lib/db";

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

interface ProductData {
  title: string;
  bg: string;
  image: string;
  video: string;
  origin: string;
  method: string;
  tagline: string;
  desc: string;
  price: number;
  stockQuantity: number;
  nutrition: Record<string, string>;
}

const products: Record<string, ProductData> = {
  ghee: {
    title: "Vedic A2 Ghee",
    bg: "/images/bg_ghee.jpg",
    image: "/images/ghee.jpg",
    video: "/videos/ghee.mp4",
    origin: "Gir Cow Cooperative, Gujarat",
    method: "Churned via traditional Bilona method (curd-to-ghee)",
    tagline: "Golden elixir for gut-health, immunity, and memory reinforcement.",
    desc: "Our Vedic A2 Ghee is prepared strictly following the scriptures. Hand-churned at sunrise using curd rather than raw cream, this ghee contains healthy fatty acids and has high medicinal quality. Sourced from native Gir cows grazed on diverse organic pastureland.",
    price: 1250,
    stockQuantity: 1,
    nutrition: {
      "Saturated Fat": "60g",
      "Butyric Acid": "4.5g",
      "Vitamin A": "1200IU",
      "Energy": "890 kcal"
    }
  },
  honey: {
    title: "Raw Himalayan Honey",
    bg: "/images/bg_honey.jpg",
    image: "/images/honey.jpg",
    video: "/videos/honey.mp4",
    origin: "Wild Hives, Himachal Valley",
    method: "Raw cold-extraction (uncured, unfiltered, unheated)",
    tagline: "Enzyme-active mountain honey collected by tribal foragers.",
    desc: "Harvested from wild hives in deep deciduous forests, this honey has rich multi-floral notes. Never heated, micro-filtered, or adulterated, it remains in its true biological state with active honeybee pollen, trace minerals, and vitamins intact.",
    price: 850,
    stockQuantity: 1,
    nutrition: {
      "Carbohydrates": "82g",
      "Natural Sugars": "80g",
      "Active Enzymes": "High",
      "Energy": "304 kcal"
    }
  },
  moringa: {
    title: "Organic Moringa Leaf Powder",
    bg: "/images/bg_moringa.jpg",
    image: "/images/moringa.jpg",
    video: "/videos/moringa.mp4",
    origin: "Rain-fed agricultural farms, Tamil Nadu",
    method: "Shade-dried and low-temperature stone ground leaves",
    tagline: "Superfood green powder packed with vitamins and essential minerals.",
    desc: "Made from fresh leaves of the miracle tree moringa. Handpicked at peak nutrient density, shade-dried to protect the chlorophyll, and finely milled into a pure superfood powder. Excellent for metabolic wellness and natural energy support.",
    price: 450,
    stockQuantity: 1,
    nutrition: {
      "Protein": "27g",
      "Iron": "28mg",
      "Calcium": "2000mg",
      "Vitamin C": "220mg"
    }
  },
  "coconut-oil": {
    title: "Cold Pressed Coconut Oil",
    bg: "/images/bg_coconut.jpg",
    image: "/images/oil.jpg",
    video: "/videos/coconut_oil.mp4",
    origin: "Artisanal Cooperatives, Kerala Coastal Belt",
    method: "Low-temperature wood-press extraction (Kachi Ghani)",
    tagline: "Unrefined raw virgin oil rich in immune-boosting Lauric acid.",
    desc: "Extracted from sun-dried organic coconut meat using traditional heavy wood-presses. Never chemically bleached, deodorized, or refined, this oil retains its fresh tropical aroma and vital MCT nutrition suited for dietary and wellness practices.",
    price: 950,
    stockQuantity: 1,
    nutrition: {
      "Lauric Acid": "49g",
      "Caprylic Acid": "8g",
      "Medium Chain Fats": "64g",
      "Energy": "862 kcal"
    }
  },
  "premium-masala": {
    title: "Premium Masala",
    bg: "/images/bg_masala.jpg",
    image: "/images/masala.jpg",
    video: "/videos/masala.mp4",
    origin: "Cooperative Farms, Malabar Hills",
    method: "Slow-roasted, stone-ground traditional spices",
    tagline: "Traditional stone-ground spice blend for aromatic culinary excellence.",
    desc: "Vṛndā Premium Masala is an artisanal blend of hand-selected whole spices, roasted gently and stone-ground to preserve their volatile oils and rich aromatic flavor. Sourced from natural cooperative growers without any artificial coloring, fillers, or chemical preservation.",
    price: 350,
    stockQuantity: 1,
    nutrition: {
      "Protein": "12g",
      "Dietary Fiber": "35g",
      "Vitamin C": "15mg",
      "Energy": "320 kcal"
    }
  }
};

export async function generateStaticParams() {
  return [
    { slug: "ghee" },
    { slug: "honey" },
    { slug: "moringa" },
    { slug: "coconut-oil" },
    { slug: "premium-masala" }
  ];
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products[slug];
  if (!product) {
    notFound();
  }

  const dbProduct = await getProductBySlug(slug);
  const currentPrice = dbProduct ? dbProduct.price : product.price;
  const discountPercentage = dbProduct ? dbProduct.discountPercentage : 0;
  const finalPrice = discountPercentage > 0
    ? Math.round(currentPrice - (currentPrice * (discountPercentage / 100)))
    : currentPrice;

  return (
    <main 
      className={`${cormorant.variable} ${inter.variable} relative min-h-[90vh] bg-transparent antialiased text-[#2c2c2c]`}
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      
      {/* Product-Specific Static Background Image */}
      <div 
        className="fixed inset-0 -z-10 bg-cover bg-center bg-fixed transition-all duration-700" 
        style={{ backgroundImage: `url(${product.bg})` }}
      />
      <div className="fixed inset-0 -z-10 bg-brand-light/35" />

      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10 space-y-8">
        
        {/* Back Button */}
        <div className="font-semibold">
          <Link 
            href="/products"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-[#8c6239]/10 text-xs font-bold uppercase tracking-wider text-[#1f3f21] hover:border-[#8c6239]/30 shadow-sm hover:shadow transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>
        </div>

        {/* Dynamic Ad Video Section framed by an organic tree-branch SVG overlay */}
        <div className="bg-white/80 border border-[#8c6239]/10 p-8 md:p-12 rounded-3xl shadow-xl flex flex-col items-center space-y-6 backdrop-blur-md">
          <div className="text-center space-y-2 max-w-lg">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8c6239] block">
              Pure Production
            </span>
            <h2 
              className="text-2xl font-bold text-[#1f3f21]"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Ad Video & Harvest Process
            </h2>
            <p className="text-xs text-[#2c2c2c]/70 leading-relaxed font-semibold">
              Experience the natural journey of our {product.title}. Watch the cooperative farming, traditional preparation, and sustainable bottling operations in action.
            </p>
          </div>

          {/* Organic Branch Framed Video Container */}
          <div className="relative w-full max-w-3xl aspect-[16/9] rounded-2xl md:rounded-3xl overflow-hidden border border-[#8c6239]/10 shadow-lg group">
            {/* HTML5 Auto-playing Looped Video */}
            <video 
              src={product.video} 
              autoPlay 
              loop 
              muted 
              playsInline 
              controls
              className="absolute inset-0 w-full h-full object-cover z-0 rounded-2xl md:rounded-3xl"
            />
            
            {/* SVG Organic Overlay of Branches and Vines */}
            <svg 
              viewBox="0 0 800 450" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 w-full h-full z-10 pointer-events-none select-none opacity-90 transition-opacity duration-300 group-hover:opacity-75"
            >
              {/* Vines Wrapping Borders */}
              {/* Top Branch */}
              <path d="M-20 -10 C 150 40, 250 -20, 450 25 C 550 5, 680 40, 820 -10" stroke="#5d4037" strokeWidth="6" strokeLinecap="round" />
              <path d="M-20 -10 C 150 40, 250 -20, 450 25 C 550 5, 680 40, 820 -10" stroke="#1f3f21" strokeWidth="2" strokeLinecap="round" />
              
              {/* Bottom Branch */}
              <path d="M-10 460 C 120 420, 300 450, 480 415 C 600 440, 720 410, 810 465" stroke="#5d4037" strokeWidth="8" strokeLinecap="round" />
              
              {/* Left Branch */}
              <path d="M-10 -10 C 30 150, -20 280, 25 460" stroke="#5d4037" strokeWidth="6" strokeLinecap="round" />

              {/* Right Branch */}
              <path d="M810 -20 C 770 120, 820 250, 780 470" stroke="#5d4037" strokeWidth="6" strokeLinecap="round" />

              {/* Stylized Leaves and Twigs */}
              {/* Top Left Twigs */}
              <path d="M80 15 C 100 0, 110 -10, 100 -20 C 90 -10, 90 5, 80 15 Z" fill="#1f3f21" />
              <path d="M120 10 C 140 -5, 145 -20, 135 -30 C 125 -20, 125 0, 120 10 Z" fill="#1f3f21" />
              <path d="M50 10 C 40 -10, 20 -15, 30 -30 C 40 -15, 45 0, 50 10 Z" fill="#1f3f21" />
              <path d="M220 5 C 240 -15, 260 -10, 250 10 C 230 10, 230 -5, 220 5 Z" fill="#1f3f21" stroke="#5d4037" strokeWidth="1" />
              
              {/* Top Right Leaves */}
              <path d="M600 25 C 630 15, 650 0, 635 -15 C 620 -5, 610 15, 600 25 Z" fill="#1f3f21" />
              <path d="M670 32 C 690 15, 710 10, 695 -10 C 680 0, 680 20, 670 32 Z" fill="#1f3f21" />
              <path d="M740 18 C 770 5, 780 -10, 765 -25 C 750 -15, 750 5, 740 18 Z" fill="#1f3f21" stroke="#5d4037" strokeWidth="1" />
              
              {/* Bottom Left Leaves */}
              <path d="M150 432 C 170 450, 190 450, 175 425 C 160 415, 160 425, 150 432 Z" fill="#1f3f21" />
              <path d="M280 430 C 310 445, 320 460, 305 470 C 290 455, 290 440, 280 430 Z" fill="#1f3f21" stroke="#5d4037" strokeWidth="1" />
              <path d="M80 440 C 60 460, 50 470, 65 480 C 80 470, 75 450, 80 440 Z" fill="#1f3f21" />

              {/* Bottom Right Leaves */}
              <path d="M620 425 C 600 445, 595 460, 610 470 C 625 455, 625 440, 620 425 Z" fill="#1f3f21" />
              <path d="M720 435 C 740 455, 750 465, 735 480 C 720 470, 720 450, 720 435 Z" fill="#1f3f21" />
              <path d="M500 420 C 530 435, 540 450, 525 460 C 510 445, 510 430, 500 420 Z" fill="#1f3f21" stroke="#5d4037" strokeWidth="1" />
            </svg>
          </div>
        </div>

        {/* Product Details Panel */}
        <div className="bg-white/80 border border-[#8c6239]/10 p-8 md:p-12 rounded-3xl shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-12 backdrop-blur-md">
          
          {/* Left Column: Image and Nutrition */}
          <div className="lg:col-span-5 space-y-8">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#8c6239]/10 shadow-md">
              <Image 
                src={product.image} 
                alt={product.title} 
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
                className="object-cover"
              />
            </div>

            {/* Nutrition Information */}
            <div className="bg-[#f7f2e9] border border-[#8c6239]/10 p-6 rounded-2xl space-y-4">
              <h3 
                className="text-sm font-bold text-[#1f3f21] uppercase tracking-wider border-b border-[#8c6239]/10 pb-2"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Nutritional Profile (per 100g)
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(product.nutrition).map(([key, val]) => (
                  <div key={key} className="space-y-1">
                    <span className="text-[10px] text-[#2c2c2c]/50 uppercase font-semibold">{key}</span>
                    <p className="font-serif text-sm font-bold text-[#8c6239]">{val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Descriptions & Details */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            
            <div className="space-y-6">
              
              {/* Product Header */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8c6239] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> High-Grade Food Item
                </span>
                <h1 
                  className="text-3xl md:text-4xl font-bold text-[#1f3f21]"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  {product.title}
                  {discountPercentage > 0 && (
                    <span className="inline-block bg-[#1f3f21] text-white text-[9px] font-sans font-bold uppercase tracking-wider px-2.5 py-1 rounded-xl ml-3 align-middle">
                      {discountPercentage}% OFF
                    </span>
                  )}
                </h1>
              </div>

              {/* Tagline */}
              <blockquote className="border-l-2 border-[#8c6239] pl-4 text-xs italic text-[#2c2c2c]/80 font-medium">
                "{product.tagline}"
              </blockquote>

              {/* Origin & Method Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Origin */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1f3f21]/10 flex items-center justify-center text-[#1f3f21] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#1f3f21]">Harvest Origin</h4>
                    <p className="text-xs text-[#2c2c2c]/70 font-semibold">{product.origin}</p>
                  </div>
                </div>

                {/* Extraction Method */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1f3f21]/10 flex items-center justify-center text-[#1f3f21] shrink-0 mt-0.5">
                    <Hammer className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#1f3f21]">Processing Standard</h4>
                    <p className="text-xs text-[#2c2c2c]/70 font-semibold">{product.method}</p>
                  </div>
                </div>

              </div>

              {/* Long Description */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#8c6239] border-b border-[#8c6239]/10 pb-1">
                  Product Description
                </h4>
                <p className="text-xs md:text-sm text-[#2c2c2c]/75 leading-relaxed font-semibold">
                  {product.desc}
                </p>
              </div>

            </div>

            {/* Purchase CTA */}
            <div className="border-t border-[#8c6239]/10 pt-6 flex items-center justify-between gap-6 font-semibold">
              <div>
                <span className="text-[9px] font-bold uppercase text-[#2c2c2c]/50 block">Cooperative Price</span>
                {discountPercentage > 0 ? (
                  <div className="flex flex-col">
                    <span className="text-[10px] line-through text-[#2c2c2c]/40 font-sans font-medium block">
                      ₹ {currentPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="font-serif text-2xl font-bold text-[#1f3f21] -mt-0.5">
                      ₹ {finalPrice.toLocaleString("en-IN")}{" "}
                      <span className="text-xs text-[#2c2c2c]/60 font-sans font-medium">/ unit</span>
                    </span>
                  </div>
                ) : (
                  <span className="font-serif text-2xl font-bold text-[#1f3f21]">
                    ₹ {currentPrice.toLocaleString("en-IN")}{" "}
                    <span className="text-xs text-[#2c2c2c]/60 font-sans font-medium">/ unit</span>
                  </span>
                )}
              </div>
              <BuyNowButton 
                id={slug}
                name={product.title}
                price={finalPrice}
                originalPrice={currentPrice}
                discountPercentage={discountPercentage}
                image={product.image}
              />
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
