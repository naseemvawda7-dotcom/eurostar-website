"use client";

import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  Globe2,
  PackageSearch,
  ShieldCheck,
  Ship,
  FlaskConical,
  Mail,
  Phone,
  MapPin,
  Building2,
  Factory,
  FileText,
  Search,
} from "lucide-react";

/** SEO helper (client-safe) */
function Seo() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.title = "Eurostar Chemicals | Global Chemical Trading & Sourcing";
  }, []);
  return null;
}

/** Brand logo with fallback (default size; override with className where needed) */
function BrandLogo({ className = "w-20 h-20" }: { className?: string }) {
  const [fallback, setFallback] = useState(false);
  return fallback ? (
    <div
      className={`grid place-items-center ${className} rounded-2xl bg-emerald-700 text-white text-xs font-semibold`}
      data-testid="navbar-logo-fallback"
    >
      EC
    </div>
  ) : (
    <img
      src="/eurostar-logo.png"
      alt="Eurostar Chemicals Logo"
      className={className}
      data-testid="navbar-logo"
      onError={() => setFallback(true)}
    />
  );
}

/** Local image component with graceful placeholder if file missing */
function ResponsiveImg({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [ok, setOk] = useState(true);
  return ok ? (
    <img
      src={src}
      alt={alt}
      className={`w-full h-full object-cover ${className}`}
      onError={() => setOk(false)}
    />
  ) : (
    <div
      className={`w-full h-full ${className} bg-gradient-to-tr from-slate-200 via-slate-100 to-white`}
      aria-label={`${alt} placeholder`}
    />
  );
}

/** Catalog controls */
function CatalogControls({
  categories,
  query,
  setQuery,
  activeCat,
  setActiveCat,
}: {
  categories: { key: string; title: string; icon: React.ReactNode }[];
  query: string;
  setQuery: (v: string) => void;
  activeCat: string;
  setActiveCat: (v: string) => void;
}) {
  return (
    <div className="mt-6 flex flex-col md:flex-row gap-3 items-stretch" data-testid="catalog-controls">
      <div className="relative flex-1">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search chemicals (e.g., glycerine, VAM)"
          className="w-full rounded-2xl border border-slate-300 pl-10 pr-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
          aria-label="Search products"
        />
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
      </div>
      <div className="flex gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveCat("all")}
          className={`px-4 py-2 rounded-2xl border ${
            activeCat === "all"
              ? "bg-emerald-700 text-white border-emerald-700"
              : "border-slate-300 text-slate-700"
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setActiveCat(c.key)}
            className={`px-4 py-2 rounded-2xl border whitespace-nowrap ${
              activeCat === c.key
                ? "bg-emerald-700 text-white border-emerald-700"
                : "border-slate-300 text-slate-700"
            }`}
          >
            {c.title}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Catalog grid */
function CatalogGrid({
  categories,
  catalog,
  query,
  activeCat,
}: {
  categories: { key: string; title: string; icon: React.ReactNode }[];
  catalog: Record<string, string[]>;
  query: string;
  activeCat: string;
}) {
  const normalizedQuery = (query || "").trim().toLowerCase();
  const visibleCats = activeCat === "all" ? categories.map((c) => c.key) : [activeCat];
  return (
    <div className="mt-8 space-y-10" data-testid="catalog-grid">
      {visibleCats.map((key) => {
        const group = catalog[key] || [];
        const cat = categories.find((c) => c.key === key);
        const title = cat?.title || key;
        const icon = cat?.icon;
        const filtered = normalizedQuery
          ? group.filter((n) => n.toLowerCase().includes(normalizedQuery))
          : group;
        if (filtered.length === 0) return null;
        return (
          <div key={key}>
            <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
              {icon}
              {title}
            </h3>
            <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filtered.map((name) => (
                <div
                  key={name}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                  data-testid={`product-${key}`}
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function EurostarChemicals() {
  // Form & UI state
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("all");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Suppliers & categories
  const suppliers = [
    { country: "Brazil" },
    { country: "Turkey" },
    { country: "Indonesia" },
    { country: "Malaysia" },
    { country: "Iran" },
    { country: "India" },
    { country: "China" },
  ];

  const categories = [
    { key: "raw", icon: <FlaskConical className="w-6 h-6" />, title: "Raw Materials & Commodity Chemicals" },
    { key: "food", icon: <PackageSearch className="w-6 h-6" />, title: "Food Ingredients" },
    { key: "pharma", icon: <Factory className="w-6 h-6" />, title: "Pharmaceutical & Nutraceutical Supplies" },
    { key: "oleo", icon: <Ship className="w-6 h-6" />, title: "Oleo Chemicals" },
    { key: "petro", icon: <Building2 className="w-6 h-6" />, title: "Petrochemicals & Specialty Chemicals" },
  ];

  const industries = [
    "Food & Beverage",
    "Pharmaceutical & Nutraceutical",
    "Personal Care & Cosmetics",
    "Home & Industrial Care",
    "Mining & Water Treatment",
    "Paints, Inks & Coatings",
    "Plastics & Packaging",
  ];

  // Product catalog (from profile)
  const productCatalog: Record<string, string[]> = {
    raw: [
      "Hydroxyethyl Acrylate (2-HEA)",
      "Hydroxyhexyl Acrylate (2-HHA)",
      "Acetic Acid (Tech & Food Grade)",
      "Acetone",
      "Adipic Acid",
      "Benzoic Acid",
      "Calcium Carbonate",
      "Caustic Soda (flakes/lyes)",
      "Chlorinated Paraffin",
      "Carbon Black",
      "Citric Acid",
      "Cyclohexanone",
      "Ethyl Acetate",
      "Ethyl Acrylate",
      "Ethylene Glycol",
      "Formic Acid",
      "Glycerine (Crude / Tech / USP / Refined)",
      "Hexane / Heptane",
      "Hydrogen Peroxide (50%)",
      "Isopropyl Alcohol (IPA) & Isopropyl Acetate",
      "Methanol",
      "Nitric Acid",
      "Phenol",
      "Phosphoric Acid (85%)",
      "Potassium Hydroxide (KOH)",
      "Sodium Acetate",
      "Sodium Citrate",
      "Sodium Hydroxide",
      "Sulphur",
      "Toluene",
      "Xylene",
      "Urea",
      "Zinc Stearate",
    ],
    food: [
      "Corn Starch",
      "Dextrose",
      "Liquid Glucose / Glucose Syrup",
      "Guar Gum",
      "Gum Rosin",
      "Glycerine (Food / USP)",
      "Xanthan Gum",
      "Citric Acid",
      "Starch derivatives",
    ],
    pharma: [
      "Glycerine USP",
      "Propylene Glycol USP",
      "Ethanol (denatured where applicable)",
      "Isopropyl Alcohol (IPA)",
      "Excipients & binders (starches, gums)",
    ],
    oleo: [
      "Castor Oil (Crude / Refined / Dehydrated)",
      "Linseed Oil (Raw / Refined / Boiled)",
      "Soya Bean Oil (Refined)",
      "Sunflower Oil (Refined)",
      "Stearic Acid (Triple Pressed)",
      "Tall Oil Fatty Acid",
      "Soap Noodles",
      "Fully Refined Paraffin Wax",
      "Semi Refined Paraffin Wax",
      "Microcrystalline Wax",
      "Slack Wax",
      "White Oil",
    ],
    petro: [
      "Acrylates (Butyl / Ethyl / Hydroxy / Methacrylates)",
      "Styrene Monomer",
      "Maleic Anhydride",
      "Phthalic Anhydride",
      "Vinyl Acetate Monomer (VAM)",
      "LABSA (Linear Alkyl Benzene Sulfonic Acid)",
      "Petroleum Jelly",
      "Transformer Oil (Uninhibited)",
      "Rubber Processing Oils (RPO)",
      "Rubber Latex (HA/LA, Natural & Synthetic)",
      "Solvents: N-Butanol, N-Propanol, N-Propyl Acetate, White Spirit, Chloroform, Trichloroethylene, Perchloroethylene",
      "Plasticizers: DOP, DOA, DIBK",
      "Polyether Polyols",
      "PEG 200/300/400",
      "Hydrocarbon Mix / Heavy Fuel Oil (HFO)",
      "Naphtha Solvents (100/150)",
      "Bitumen Base Oil (Group I/II/III & BS)",
      "Brake Fluids (DOT3/DOT4)",
      "Grease (Calcium & Lithium)",
      "Pine Oil",
      "White Spirit",
      "Rubber (Natural & Synthetic)",
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Seo />

      {/* Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-slate-200">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between"
          data-testid="navbar"
        >
          <div className="flex items-center gap-4">
            {/* MUCH bigger logo in header */}
            <BrandLogo className="w-32 h-32 md:w-40 md:h-40" />
            <span className="font-semibold text-slate-900 text-xl">Eurostar Chemicals</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#about" className="hover:text-emerald-700">About</a>
            <a href="#products" className="hover:text-emerald-700">Products</a>
            <a href="#industries" className="hover:text-emerald-700">Industries</a>
            <a href="#quality" className="hover:text-emerald-700">Quality</a>
            <a href="#network" className="hover:text-emerald-700">Global Network</a>
            <a href="#offices" className="hover:text-emerald-700">Offices</a>
            <a href="#contact" className="hover:text-emerald-700">Contact</a>
          </nav>
          <a
            href="mailto:sales@eurostar.co.za?subject=Eurostar%20Chemicals%20Enquiry"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl shadow-sm bg-emerald-700 text-white text-sm hover:bg-emerald-800 transition"
            data-testid="cta-enquire"
          >
            <Mail className="w-4 h-4" />
            Enquire
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden" data-testid="hero">
        <div className="absolute inset-0 bg-[#1C7C76]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center text-white">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Global Chemical Trading & Distribution
            </h1>
            <p className="mt-5 text-lg max-w-prose">
              A global chemical trading partner with offices in <strong>Dubai</strong>,{" "}
              <strong>Turkey</strong> and <strong>South Africa</strong>. Our <strong>Head Office</strong> is in
              South Africa, connecting reliable producers worldwide to manufacturers across Africa.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#products"
                className="px-5 py-3 rounded-2xl bg-white text-emerald-700 text-sm shadow hover:opacity-95"
              >
                Browse Products
              </a>
              <a
                href="#contact"
                className="px-5 py-3 rounded-2xl border border-white text-white text-sm hover:bg-white/10"
              >
                Partner with Us
              </a>
            </div>
            <div className="mt-6 flex items-center gap-3 text-sm opacity-90">
              <ShieldCheck className="w-4 h-4" /> ISO-aligned QA • REACH aware • Responsible Sourcing
            </div>
          </div>
          <div className="relative w-full h-72 md:h-96 rounded-3xl overflow-hidden shadow-lg ring-1 ring-white/20">
            <ResponsiveImg src="/hero.jpg" alt="Eurostar supply chain" />
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 md:py-20" data-testid="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">About Eurostar Chemicals</h2>
              <p className="mt-4 text-slate-600">
                We are a global chemical trading partner with offices in <strong>Dubai (UAE)</strong>,{" "}
                <strong>Turkey</strong> and <strong>South Africa</strong>. Our <strong>Head Office</strong> is in
                South Africa, serving a wide customer base with bonded warehousing and port-side logistics. Our vetted
                suppliers span Brazil, Turkey, Indonesia, Malaysia, Iran, India, China and beyond—selected for quality,
                reliability and continuity.
              </p>
              <ul className="mt-6 space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-700 mt-0.5" /> Competitive, transparent pricing
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-700 mt-0.5" /> On-time delivery with flexible Incoterms
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-700 mt-0.5" /> Technical data sheets (TDS), COAs & SDS on
                  request
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
              <h3 className="font-semibold text-slate-900">Quick Facts</h3>
              <dl className="mt-3 text-sm grid grid-cols-1 gap-2 text-slate-700">
                <div className="flex justify-between">
                  <dt>Head Office</dt>
                  <dd>South Africa</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Global Offices</dt>
                  <dd>Dubai • Turkey • South Africa</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Coverage</dt>
                  <dd>Middle East • Europe • Southern & Sub-Saharan Africa</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Trade</dt>
                  <dd>Import & Export</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Segments</dt>
                  <dd>Food • Pharma • Oleo • Petro • Industrial</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalog */}
      <section id="products" className="py-16 md:py-20 bg-white" data-testid="products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">Product Portfolio</h2>
          <p className="mt-3 text-slate-600 max-w-3xl">
            Explore our structured portfolio. Use search and filters to find chemicals by category.
          </p>
          <CatalogControls
            categories={categories}
            query={query}
            setQuery={setQuery}
            activeCat={activeCat}
            setActiveCat={setActiveCat}
          />
          <CatalogGrid
            categories={categories}
            catalog={productCatalog}
            query={query}
            activeCat={activeCat}
          />
        </div>
      </section>

      {/* Industries */}
      <section id="industries" className="py-16 md:py-20" data-testid="industries">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">Industries We Serve</h2>
              <p className="mt-3 text-slate-600">
                From regulated pharmaceutical supply chains to food-grade ingredients and specialty industrials, we
                tailor sourcing and logistics to your sector.
              </p>
              <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {industries.map((ind) => (
                  <li key={ind} className="flex items-center gap-2 text-slate-700 text-sm">
                    <CheckCircle className="w-5 h-5 text-emerald-700" />
                    {ind}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-sm">
              <ResponsiveImg src="/industries.jpg" alt="Industries collage" />
            </div>
          </div>
        </div>
      </section>

      {/* Quality & Compliance */}
      <section id="quality" className="py-16 md:py-20 bg-white" data-testid="quality">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">Quality & Compliance</h2>
              <p className="mt-3 text-slate-600">
                We operate with ISO-aligned processes and provide full documentation for traceability and regulatory
                needs.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li className="flex gap-2 items-start">
                  <ShieldCheck className="w-5 h-5 text-emerald-700 mt-0.5" /> Supplier qualification & audits
                </li>
                <li className="flex gap-2 items-start">
                  <ShieldCheck className="w-5 h-5 text-emerald-700 mt-0.5" /> SDS, COA & TDS management
                </li>
                <li className="flex gap-2 items-start">
                  <ShieldCheck className="w-5 h-5 text-emerald-700 mt-0.5" /> REACH & food/pharma regulatory awareness
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-sm">
                <ResponsiveImg src="/quality.jpg" alt="Quality & compliance" />
              </div>
              <div className="rounded-3xl border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Sample Documents
                </h3>
                <ul className="mt-3 text-sm text-emerald-700 space-y-2">
                  <li><a href="#" className="hover:underline">Quality Policy (PDF)</a></li>
                  <li><a href="#" className="hover:underline">Sample SDS (PDF)</a></li>
                  <li><a href="#" className="hover:underline">Supplier Code of Conduct (PDF)</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Network */}
      <section id="network" className="py-16 md:py-20" data-testid="network">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">Global Supplier Network</h2>
              <p className="mt-3 text-slate-600">We maintain long-term partnerships with consistent, reliable producers around the world.</p>
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {suppliers.map((s) => (
                  <div
                    key={s.country}
                    className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 text-sm"
                    data-testid={`supplier-${s.country}`}
                  >
                    <Globe2 className="w-4 h-4 text-emerald-700" /> {s.country}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-sm">
              <ResponsiveImg src="/network.jpg" alt="Global logistics network" />
            </div>
          </div>
        </div>
      </section>

      {/* Logistics */}
      <section className="py-16 md:py-20 bg-white" data-testid="logistics">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">Efficient Logistics</h2>
              <p className="mt-3 text-slate-600">
                Seamless import/export with sea, air and overland options. Port-side warehousing, customs clearance and
                flexible delivery aligned to your production schedule.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <Ship className="w-5 h-5 text-emerald-700" /> Incoterms EXW • FOB • CFR • CIF • DDP
                </li>
                <li className="flex items-center gap-2">
                  <Ship className="w-5 h-5 text-emerald-700" /> Hazardous & non-hazardous handling
                </li>
                <li className="flex items-center gap-2">
                  <Ship className="w-5 h-5 text-emerald-700" /> Bonded & temperature-controlled storage
                </li>
              </ul>
            </div>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-sm">
              <ResponsiveImg src="/logistics.jpg" alt="Freight logistics" />
            </div>
          </div>
        </div>
      </section>

      {/* Offices */}
      <section id="offices" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">Our Offices</h2>
          <p className="mt-3 text-slate-600 max-w-3xl">
            Eurostar Chemicals operates globally with a presence in the Middle East, Europe and Africa. Our{" "}
            <strong>Head Office</strong> is located in <strong>South Africa</strong>.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-2 text-slate-900 font-semibold">
                <MapPin className="w-4 h-4 text-emerald-700" /> Dubai, UAE
              </div>
              <p className="mt-2 text-sm text-slate-600">Regional hub for Middle East sourcing and re-export.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-2 text-slate-900 font-semibold">
                <MapPin className="w-4 h-4 text-emerald-700" /> Turkey
              </div>
              <p className="mt-2 text-sm text-slate-600">Strategic link between European and Asian supply chains.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-2 text-slate-900 font-semibold">
                <MapPin className="w-4 h-4 text-emerald-700" /> South Africa (Head Office)
              </div>
              <p className="mt-2 text-sm text-slate-600">Headquarters supporting Southern & Sub-Saharan Africa.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Callout */}
      <section className="py-10" data-testid="callout">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 md:p-10 bg-gradient-to-tr from-emerald-700 to-emerald-500 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-semibold">Looking for a specific grade or spec?</h3>
              <p className="opacity-90 mt-1">
                Send us your TDS/COA requirements and we’ll source matched options.
              </p>
            </div>
            <a
              href="mailto:sales@eurostar.co.za?subject=Eurostar%20Sourcing%20Request"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-emerald-800 text-sm shadow hover:opacity-95"
            >
              <Mail className="w-4 h-4" />
              Talk to Sourcing
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 md:py-20 bg-white" data-testid="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Left column: details */}
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">Contact Us</h2>
              <p className="mt-3 text-slate-600">We respond within one business day.</p>
              <div className="mt-6 space-y-3 text-sm text-slate-700">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />{" "}
                  <a href="mailto:sales@eurostar.co.za" className="hover:underline">
                    sales@eurostar.co.za
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />{" "}
                  <a href="mailto:rafiq@eurostar.co.za" className="hover:underline">
                    rafiq@eurostar.co.za
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />{" "}
                  <a href="mailto:naseem@eurostar.co.za" className="hover:underline">
                    naseem@eurostar.co.za
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />{" "}
                  <a href="mailto:accounts@eurostar.co.za" className="hover:underline">
                    accounts@eurostar.co.za
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />{" "}
                  <a href="tel:+27837868549" className="hover:underline">
                    +27 83 786 8549
                  </a>{" "}
                  (Rafiq)
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />{" "}
                  <a href="tel:+27837863161" className="hover:underline">
                    +27 83 786 3161
                  </a>{" "}
                  (Naseem)
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Durban, South Africa
                </div>
              </div>
            </div>

            {/* Right column: form */}
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-slate-200 p-6 bg-slate-50"
              data-testid="contact-form"
            >
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm text-slate-700">Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full rounded-xl border border-slate-300 p-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full rounded-xl border border-slate-300 p-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-700">Company</label>
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xl border border-slate-300 p-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-700">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xl border border-slate-300 p-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    placeholder="Tell us what you need (spec, grade, volume, terms)…"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 inline-flex justify-center px-5 py-3 rounded-2xl bg-emerald-700 text-white text-sm hover:bg-emerald-800"
                  data-testid="submit-enquiry"
                >
                  {submitted ? "Thanks — we'll be in touch" : "Send Enquiry"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50" data-testid="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-4">
              {/* MUCH bigger logo in footer */}
              <BrandLogo className="w-32 h-32 md:w-40 md:h-40" />
              <span className="font-semibold text-slate-900 text-xl">Eurostar Chemicals</span>
            </div>
            <p className="mt-3 text-slate-600">Global presence. Reliable sourcing. Responsive service.</p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900">Products</h4>
            <ul className="mt-2 space-y-1 text-slate-600">
              <li>Raw Materials</li>
              <li>Food Ingredients</li>
              <li>Pharma Supplies</li>
              <li>Oleo Chemicals</li>
              <li>Petrochemicals</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900">Company</h4>
            <ul className="mt-2 space-y-1 text-slate-600">
              <li><a href="#about">About</a></li>
              <li><a href="#quality">Quality</a></li>
              <li><a href="#network">Global Network</a></li>
              <li><a href="#offices">Offices</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900">Legal</h4>
            <ul className="mt-2 space-y-1 text-slate-600">
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>PO Terms</li>
            </ul>
          </div>
        </div>
        <div className="py-4 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Eurostar Chemicals. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
