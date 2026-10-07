'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle, Globe2, PackageSearch, ShieldCheck, Ship, FlaskConical, Mail, Phone, MapPin, Building2, Factory, Search, Menu, X, Droplets, Wheat, Flame, Star, Instagram } from 'lucide-react';

// Supplied holding logo: copy the accompanying PNG into the project's public folder.
const LOGO_PATH = '/eurostar-master-logo.png';
const SITE_URL = 'https://eurostar.co.za';
const SEO_TITLE = 'EUROSTAR GROUP | Global Trade. Trusted Supply.';
const SEO_DESCRIPTION = 'EUROSTAR GROUP connects buyers and suppliers across Commodities, Chemicals, Foods, Energy & Fuels and Personal & Home Care, with offices in Dubai, Turkey and South Africa.';
const divisions = [
  { key: 'commodities', color: '#9A5834', pale: '#FBF5F0', logo: '/division-logos-v2/eurostar-commodities.png', title: 'Commodities', icon: Building2, description: 'Sulphur, chrome ore, minerals, agricultural commodities and bulk raw materials.', examples: ['Sulphur', 'Chrome ore', 'Urea, fertilizers & bulk raw materials'] },
  { key: 'chemicals', color: '#087F8C', pale: '#EFFAFA', logo: '/division-logos-v2/eurostar-chemicals-original.png', title: 'Chemicals', icon: FlaskConical, description: 'The full Eurostar Chemicals portfolio: industrial chemicals, food ingredients, pharmaceutical supplies, oleochemicals and specialty chemicals.', examples: ['LABSA, caustic soda, glycerine & NP9', 'Food ingredients & pharmaceutical supplies', 'Oleochemicals, polymers & specialty chemicals'] },
  { key: 'foods', color: '#3D793E', pale: '#F2F8F1', logo: '/division-logos-v2/eurostar-foods.png', title: 'Foods', icon: Wheat, description: 'Rice and sugar for wholesale and trade enquiries.', examples: ['Rice', 'Sugar'] },
  { key: 'energy-fuels', color: '#B66A08', pale: '#FFF8EB', logo: '/division-logos-v2/eurostar-energy-fuels.png', title: 'Energy & Fuels', icon: Flame, description: 'Diesel, Jet A-1 aviation fuel and LNG, alongside selected petroleum products.', examples: ['Diesel', 'Jet A-1 aviation fuel', 'LNG, LPG & selected petroleum products'] },
  { key: 'personal-home-care', color: '#7953A1', pale: '#F7F2FB', logo: '/division-logos-v2/eurostar-personal-home-care.png', title: 'Personal & Home Care', icon: Droplets, description: 'Skincare and haircare, with Pure Star products for household cleaning.', examples: ['Skincare & haircare', 'Pure Star washing powder', 'Pure Star dishwashing liquid'] },
] as const;
type EnquiryType = 'buyer' | 'supplier' | 'general';
type ContactForm = { name: string; email: string; company: string; message: string };
const enquiryTitles: Record<EnquiryType, string> = { buyer: 'Buyer RFQ', supplier: 'Supplier enquiry', general: 'General enquiry' };

// Client-safe metadata preserves the integration pattern of the uploaded page.
// For server-rendered SEO, mirror these values in the project's existing layout metadata.
function Seo() {
  useEffect(() => {
    document.title = SEO_TITLE;
    const setMeta = (attr: 'name' | 'property', key: string, value: string) => {
      let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.content = value;
    };
    setMeta('name', 'description', SEO_DESCRIPTION);
    setMeta('property', 'og:title', SEO_TITLE);
    setMeta('property', 'og:description', SEO_DESCRIPTION);
    setMeta('property', 'og:site_name', 'EUROSTAR GROUP');
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:url', SITE_URL);
    setMeta('name', 'twitter:card', 'summary');
    setMeta('name', 'twitter:title', SEO_TITLE);
    setMeta('name', 'twitter:description', SEO_DESCRIPTION);
    let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
    link.href = SITE_URL;
  }, []);
  return null;
}

function BrandLogo({ inverse = false }: { inverse?: boolean }) {
  const [fallback, setFallback] = useState(false);
  return <span className={`flex items-center gap-3 ${inverse ? 'text-white' : 'text-slate-900'}`}>
    {!fallback && <img src={LOGO_PATH} alt="EUROSTAR GROUP holding logo" className="h-14 w-14 shrink-0 rounded-full object-contain" data-testid="navbar-logo" onError={() => setFallback(true)} />}
    <span className="flex flex-col gap-1"><span className="text-lg font-bold tracking-[0.09em]" data-testid={fallback ? 'navbar-logo-fallback' : undefined}>EUROSTAR GROUP</span><span className={`text-[10px] tracking-wide ${inverse ? 'text-slate-300' : 'text-slate-500'}`}>Global Trade. Trusted Supply.</span></span>
  </span>;
}

function EnergyIdentity() {
  return <div className="flex items-center gap-4">
    <span className="relative grid h-16 w-16 shrink-0 place-items-center text-amber-400" aria-hidden="true">
      <svg viewBox="0 0 64 64" className="absolute inset-0 h-full w-full fill-none stroke-current"><path d="M32 3 57 17.5v29L32 61 7 46.5v-29Z" strokeWidth="2" /></svg>
      <Flame size={29} /><Star size={11} className="absolute right-2 top-2 fill-current" />
    </span>
    <div><p className="text-lg font-bold tracking-[0.16em]">EUROSTAR</p><p className="mt-1 text-xs font-semibold tracking-[0.16em] text-amber-300">ENERGY &amp; FUELS</p></div>
  </div>;
}

// Original products are regrouped under the five master divisions below.
const productCatalog: Record<string, string[]> = {
  "commodities": [
    "Sulphur",
    "Chrome Ore (Chromite)",
    "Urea (Agricultural / Fertilizer)",
    "Agricultural commodities",
    "Fertilizers",
    "Industrial minerals",
    "Bulk raw materials"
  ],
  "chemicals": [
    "LABSA (Linear Alkyl Benzene Sulfonic Acid)",
    "NP9 (Nonylphenol Ethoxylate)",
    "Polymers",
    "Industrial chemicals",
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
    "Sulphur (see Commodities)",
    "Toluene",
    "Xylene",
    "Zinc Stearate",
    "Glycerine USP",
    "Propylene Glycol USP",
    "Ethanol (denatured where applicable)",
    "Isopropyl Alcohol (IPA)",
    "Excipients & binders (starches, gums)",
    "Castor Oil (Crude / Refined / Dehydrated)",
    "Linseed Oil (Raw / Refined / Boiled)",
    "Tall Oil Fatty Acid",
    "Fully Refined Paraffin Wax",
    "Semi Refined Paraffin Wax",
    "Microcrystalline Wax",
    "Slack Wax",
    "Acrylates (Butyl / Ethyl / Hydroxy / Methacrylates)",
    "Styrene Monomer",
    "Maleic Anhydride",
    "Phthalic Anhydride",
    "Vinyl Acetate Monomer (VAM)",
    "Rubber Latex (HA/LA, Natural & Synthetic)",
    "Solvents: N-Butanol, N-Propanol, N-Propyl Acetate, White Spirit, Chloroform, Trichloroethylene, Perchloroethylene",
    "Plasticizers: DOP, DOA, DIBK",
    "Polyether Polyols",
    "Naphtha Solvents (100/150)",
    "White Spirit",
    "Rubber (Natural & Synthetic)",
    "Gum Rosin",
    "Urea (Agricultural / Fertilizer — see Commodities)",
    "Corn Starch",
    "Dextrose",
    "Liquid Glucose / Glucose Syrup",
    "Guar Gum",
    "Glycerine (Food / USP)",
    "Xanthan Gum",
    "Starch derivatives",
    "Soya Bean Oil (Refined)",
    "Sunflower Oil (Refined)",
    "Stearic Acid (Triple Pressed)",
    "Soap Noodles",
    "White Oil",
    "Petroleum Jelly",
    "Transformer Oil (Uninhibited)",
    "Rubber Processing Oils (RPO)",
    "PEG 200/300/400",
    "Hydrocarbon Mix / Heavy Fuel Oil (HFO)",
    "Base Oils (Group I / II / III & Bright Stock)",
    "Brake Fluids (DOT3/DOT4)",
    "Grease (Calcium & Lithium)",
    "Pine Oil"
  ],
  "foods": [
    "Rice",
    "Sugar"
  ],
  "energy-fuels": [
    "Diesel",
    "Jet A-1 Aviation Fuel",
    "Liquefied Natural Gas (LNG)",
    "Liquefied Petroleum Gas (LPG)",
    "Gasoline / Petrol",
    "Naphtha",
    "Fuel Oils",
    "Bitumen"
  ],
  "personal-home-care": [
    "Skincare",
    "Haircare",
    "Pure Star Washing Powder",
    "Pure Star Dishwashing Liquid"
  ]
};

const chemicalGroups = [
  {
    "key": "raw",
    "title": "Industrial & Commodity Chemicals",
    "products": [
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
      "Sulphur (see Commodities)",
      "Toluene",
      "Xylene",
      "Urea (Agricultural / Fertilizer — see Commodities)",
      "Zinc Stearate"
    ]
  },
  {
    "key": "food",
    "title": "Food Ingredients",
    "products": [
      "Corn Starch",
      "Dextrose",
      "Liquid Glucose / Glucose Syrup",
      "Guar Gum",
        "Glycerine (Food / USP)",
      "Xanthan Gum",
      "Citric Acid",
      "Starch derivatives"
    ]
  },
  {
    "key": "pharma",
    "title": "Pharmaceutical & Nutraceutical Supplies",
    "products": [
      "Glycerine USP",
      "Propylene Glycol USP",
      "Ethanol (denatured where applicable)",
      "Isopropyl Alcohol (IPA)",
      "Excipients & binders (starches, gums)"
    ]
  },
  {
    "key": "oleo",
    "title": "Oleochemicals",
    "products": [
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
      "White Oil"
    ]
  },
  {
    "key": "petro",
    "title": "Petrochemicals & Specialty Chemicals",
    "products": [
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
      "Base Oils (Group I / II / III & Bright Stock)",
      "Brake Fluids (DOT3/DOT4)",
      "Grease (Calcium & Lithium)",
      "Pine Oil",
      "White Spirit",
      "Rubber (Natural & Synthetic)"
    ]
  }
];

function PureStarProducts({ onEnquire }: { onEnquire: (product: string) => void }) {
  const [activeProduct, setActiveProduct] = useState(0);
  const tabs = ['Washing Powder', 'Dishwashing Liquid'];
  return <section id="purestar" className="mt-8 scroll-mt-28" aria-label="Pure Star products"><p className="text-xs font-semibold uppercase tracking-widest text-purple-700">Our brand</p><h3 className="mt-3 text-2xl font-semibold text-slate-950">PURESTAR</h3><div role="tablist" aria-label="Pure Star product categories" className="mt-5 flex flex-wrap gap-3">{tabs.map((label, index) => <button key={label} id={`purestar-tab-${index}`} type="button" role="tab" aria-selected={activeProduct === index} aria-controls={`purestar-panel-${index}`} tabIndex={activeProduct === index ? 0 : -1} onClick={() => setActiveProduct(index)} onKeyDown={event => { if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) { event.preventDefault(); const next = event.key === 'Home' ? 0 : event.key === 'End' ? 1 : 1 - index; setActiveProduct(next); document.getElementById('purestar-tab-' + next)?.focus(); } }} className={`rounded-lg border px-5 py-3 text-sm font-semibold ${activeProduct === index ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"}`}>{label}</button>)}</div><div id="purestar-panel-0" role="tabpanel" aria-labelledby="purestar-tab-0" hidden={activeProduct !== 0} className="mt-5"><article className="rounded-xl border border-slate-200 bg-white p-6"><h3 className="text-xl font-semibold text-slate-900">Pure Star Washing Powder</h3><figure className="mt-5"><img src="/purestar-washing-powder-concept.png" alt="Original PURESTAR washing-powder packaging concept with navy, silver and blue front and back packs" className="max-h-[32rem] w-full rounded-lg object-contain" /><figcaption className="mt-3 text-xs text-slate-500">Original packaging concept. Final labels and specifications are confirmed separately.</figcaption></figure><p className="mt-3 text-sm leading-7 text-slate-600">Laundry washing powder. Contact our team for product and supply enquiries.</p><button type="button" onClick={() => onEnquire('Pure Star Washing Powder')} className="mt-6 rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white">Enquire about washing powder</button></article></div><div id="purestar-panel-1" role="tabpanel" aria-labelledby="purestar-tab-1" hidden={activeProduct !== 1} className="mt-5"><article className="rounded-xl border border-slate-200 bg-white p-6"><h3 className="text-xl font-semibold text-slate-900">Pure Star Dishwashing Liquid</h3><figure className="mt-5"><img src="/purestar-dishwashing-concept.png" alt="Original PURESTAR dishwashing-liquid packaging concept with green bottles and star branding" className="max-h-[32rem] w-full rounded-lg object-contain" /><figcaption className="mt-3 text-xs text-slate-500">Original packaging concept. Final labels and specifications are confirmed separately.</figcaption></figure><button type="button" onClick={() => onEnquire('Pure Star Dishwashing Liquid')} className="mt-6 rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white">Enquire about dishwashing liquid</button></article></div></section>;
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState('all');
  const [form, setForm] = useState<ContactForm>({ name: '', email: '', company: '', message: '' });
  const [enquiryType, setEnquiryType] = useState<EnquiryType>('buyer');
  const [division, setDivision] = useState<string>('');
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [destination, setDestination] = useState('');
  const [terms, setTerms] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const submitting = useRef(false);
  const contactRef = useRef<HTMLElement>(null);
  const fieldClass = 'mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600';
  const container = 'mx-auto max-w-7xl px-5 sm:px-8 lg:px-10';
  const filteredDivisions = divisions.map(d => ({ ...d, products: (productCatalog[d.key] || []).filter(p => p.toLowerCase().includes(query.trim().toLowerCase())) })).filter(d => (activeCat === 'all' || activeCat === d.key) && d.products.length > 0);
  const resetStatus = () => { if (!submitting.current) setStatus('idle'); };
  const chooseEnquiry = (type: EnquiryType, selectedDivision = '') => {
    setEnquiryType(type); setDivision(selectedDivision); resetStatus();
    window.requestAnimationFrame(() => {
      contactRef.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      document.getElementById('enquiry-type')?.focus({ preventScroll: true });
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(previous => ({ ...previous, [e.target.name]: e.target.value })); resetStatus();
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting.current || status === 'success') return;
    submitting.current = true; setStatus('sending');
    const selectedDivision = divisions.find(d => d.key === division)?.title || 'Not specified';
    // Keep the existing API envelope and form keys. Structured enquiry fields go
    // inside message so a handler reading only name/email/company/message still works.
    const message = [
      `Enquiry type: ${enquiryTitles[enquiryType]}`, `Division: ${selectedDivision}`,
      product && `Product / grade: ${product}`, quantity && `Quantity / capacity: ${quantity}`,
      destination && `${enquiryType === 'supplier' ? 'Origin / export markets' : 'Delivery destination'}: ${destination}`,
      terms && `Trade terms / timing: ${terms}`, '', form.message,
    ].filter(line => line !== false).join('\n');
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 30000);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: controller.signal,
        body: JSON.stringify({ subject: 'Website Enquiry – Eurostar', to: 'enquiries@eurostar.co.za', cc: ['sales@eurostar.co.za', 'accounts@eurostar.co.za'], form: { ...form, message } }),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
    } catch { setStatus('error'); }
    finally { window.clearTimeout(timeout); submitting.current = false; }
  };

  return <div className="min-h-screen bg-white text-slate-800 selection:bg-teal-100">
    <Seo />
    <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:p-4">Skip to content</a>
    <div className="bg-slate-950 text-slate-300"><div className={`${container} flex flex-wrap justify-between gap-2 py-2 text-[11px] tracking-wide`}><span>Dubai · Turkey · South Africa</span><a href="mailto:enquiries@eurostar.co.za" className="hover:text-white">enquiries@eurostar.co.za</a></div></div>
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur" data-testid="navbar">
      <div className={`${container} flex items-center justify-between gap-5 py-4`}>
        <a href="#home" aria-label="EUROSTAR GROUP home"><BrandLogo /></a>
        <nav aria-label="Main navigation" className="hidden items-center gap-5 text-xs font-medium xl:flex">
          <details className="relative"><summary className="cursor-pointer py-2">Our divisions</summary><div className="absolute left-0 top-full w-64 rounded-lg border border-slate-200 bg-white p-3 shadow-lg">{divisions.map(d => <a key={d.key} href={`#${d.key}`} onClick={e => { e.currentTarget.closest('details')?.removeAttribute('open'); }} className="block rounded px-3 py-3 hover:bg-slate-50 hover:text-teal-700">{d.title}</a>)}</div></details>
          <a href="#about" className="hover:text-teal-700">About</a><a href="#network" className="hover:text-teal-700">Global Network</a><a href="#contact" className="hover:text-teal-700">Contact</a>
        </nav>
        <div className="flex items-center gap-3"><button type="button" onClick={() => chooseEnquiry('buyer')} className="hidden rounded-lg bg-slate-900 px-4 py-3 text-xs font-semibold text-white hover:bg-teal-800 sm:block" data-testid="cta-enquire">Request a quote</button><button type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)} className="rounded-lg border border-slate-200 p-2 xl:hidden">{menuOpen ? <X size={22} /> : <Menu size={22} />}</button></div>
      </div>
      {menuOpen && <nav id="mobile-navigation" aria-label="Mobile navigation" className={`${container} max-h-[70vh] overflow-y-auto border-t border-slate-100 pb-4 xl:hidden`}>{[...divisions.map(d => ({ href: `#${d.key}`, title: d.title })), { href: '#about', title: 'About' }, { href: '#network', title: 'Global Network' }, { href: '#contact', title: 'Contact' }].map(link => <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="block border-b border-slate-100 py-3 text-sm">{link.title}</a>)}</nav>}
    </header>
    <main id="main">
      <section id="home" className="relative overflow-hidden bg-slate-950 text-white" data-testid="hero">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-teal-950" />
        <div className={`${container} relative grid gap-12 py-20 md:py-28 lg:grid-cols-[1.2fr_1fr] lg:items-center`}>
          <div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-300">One master brand. Five specialist divisions.</p><h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[1.08] tracking-tight sm:text-6xl">Global Trade.<br /><span className="text-slate-300">Trusted Supply.</span></h1><p className="mt-6 max-w-xl text-base leading-7 text-slate-300">Connecting buyers, producers and markets. EUROSTAR GROUP brings commodities, chemicals, foods, energy and care ingredients together through responsive sourcing and coordinated supply.</p><div className="mt-9 flex flex-wrap gap-3"><button type="button" onClick={() => chooseEnquiry('buyer')} className="inline-flex items-center gap-3 rounded-lg bg-white px-5 py-3.5 text-sm font-semibold text-slate-950 hover:bg-slate-200">Submit a buyer RFQ <ArrowRight size={17} /></button><a href="#divisions" className="rounded-lg border border-slate-500 px-5 py-3.5 text-sm font-medium hover:bg-white/10">Explore our divisions</a></div><p className="mt-9 flex items-center gap-2 text-xs text-slate-400"><Globe2 size={16} className="text-teal-400" /> Dubai / Turkey / South Africa</p></div>
          <div className="rounded-xl border border-white/15 bg-white/[0.03] p-6 sm:p-8"><div className="flex items-center justify-between border-b border-white/15 pb-5"><span className="text-xs uppercase tracking-[0.18em] text-slate-400">Our trade portfolio</span><Globe2 className="text-teal-400" size={28} /></div>{divisions.map((d, i) => <a key={d.key} href={`#${d.key}`} className="group flex items-center gap-4 border-b border-white/10 py-5 last:border-0"><span className="text-xs" style={{ color: d.color }}>0{i + 1}</span><span className="flex-1 text-lg font-medium">{d.title}</span><span className="h-2 w-2 rounded-full" style={{ backgroundColor: d.color }} aria-hidden="true" /><ArrowRight size={18} className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-teal-300" /></a>)}</div>
        </div>
      </section>

      <section id="divisions" className={`${container} scroll-mt-28 py-20`}>
        <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">Our divisions</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Specialist focus. Global perspective.</h2></div><p className="max-w-md text-sm leading-6 text-slate-500">Five connected divisions, with product expertise and sourcing shaped around your business.</p></div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{divisions.map((d, i) => { const Icon = d.icon; return <article key={d.key} id={d.key} className="flex scroll-mt-32 flex-col rounded-xl border border-slate-200 p-5" style={{ backgroundColor: d.pale, borderTop: `4px solid ${d.color}` }} data-testid={`division-${d.key}`}><div className="flex justify-between"><Icon size={26} style={{ color: d.color }} /><span className="text-xs text-slate-400">0{i + 1}</span></div><img src={d.logo} alt={`EUROSTAR ${d.title} division logo`} className="mt-5 h-auto w-full" /><h3 className="mt-5 text-xl font-semibold leading-tight text-slate-950">Eurostar {d.title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{d.description}</p><ul className="my-5 space-y-2 border-t border-slate-200 pt-4 text-xs leading-5 text-slate-600">{d.examples.map(example => <li key={example}>{example}</li>)}</ul><a href="#products" onClick={() => { setActiveCat(d.key); setQuery(''); }} className="mt-auto inline-flex items-center gap-2 text-sm font-semibold" style={{ color: d.color }}>Explore products <ArrowRight size={15} /></a><button type="button" onClick={() => chooseEnquiry('buyer', d.key)} className="mt-3 text-left text-xs text-slate-500 underline underline-offset-4">Request supply</button></article>; })}</div>
      </section>

      <section aria-label="Eurostar Energy & Fuels" className="bg-blue-950 py-14 text-white"><div className={container}><div className="grid items-center gap-8 md:grid-cols-2"><div><EnergyIdentity /><h2 className="mt-6 text-3xl font-semibold tracking-tight">Powering Trade. Moving Markets.</h2><p className="mt-4 max-w-xl text-sm leading-7 text-blue-100">Diesel, Jet A-1 aviation fuel and liquefied natural gas (LNG), with enquiries for LPG, gasoline, naphtha, fuel oils and bitumen. Product specifications, availability and commercial terms are confirmed for each enquiry.</p></div><div className="rounded-xl border border-amber-400/30 bg-blue-900/30 p-7"><p className="text-xs font-semibold uppercase tracking-widest text-amber-300">Energy &amp; Fuels enquiries</p><p className="mt-4 text-sm leading-7 text-blue-100">Share your specification, required volume, destination and delivery schedule with our team.</p><button type="button" onClick={() => chooseEnquiry('buyer', 'energy-fuels')} className="mt-6 inline-flex items-center gap-3 rounded-lg bg-amber-400 px-5 py-3 text-sm font-semibold text-blue-950 hover:bg-amber-300">Request energy supply <ArrowRight size={16} /></button></div></div></div></section>

      <section id="about" className="scroll-mt-28 border-y border-slate-200 bg-slate-50 py-20" data-testid="about"><div className={`${container} grid gap-12 lg:grid-cols-2`}><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">About EUROSTAR</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">A dependable connection<br />between supply and demand.</h2><p className="mt-5 text-base leading-7 text-slate-600">EUROSTAR GROUP is a South Africa–based import and export business serving customers across Southern Africa and international markets. Our group brings five specialist businesses together, supported by a global supplier network and offices in Dubai, Turkey and South Africa. Our South African head office serves Southern and Sub-Saharan Africa, with international connections across the Middle East and Europe.</p><p className="mt-4 text-sm leading-7 text-slate-600">From the first specification to delivery planning, we work with buyers and producers to align product requirements, documentation, commercial terms and logistics.</p></div><div className="grid gap-5 sm:grid-cols-2">{[{ icon: PackageSearch, title: 'Responsive sourcing', text: 'Product, grade and volume requirements guide each enquiry.' }, { icon: ShieldCheck, title: 'Documentation matters', text: 'Request applicable TDS, SDS and COA documentation for your product.' }, { icon: Ship, title: 'Coordinated logistics', text: 'Origin, destination, timing and Incoterms agreed around the shipment.' }, { icon: Factory, title: 'Producer partnerships', text: 'Long-term supplier relationships across industries and markets.' }].map(item => <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-6"><item.icon size={23} className="text-teal-700" /><h3 className="mt-4 font-semibold text-slate-900">{item.title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{item.text}</p></div>)}</div></div></section>

      <section id="products" className={`${container} scroll-mt-28 py-20`} data-testid="products"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">Product portfolio</p><h2 className="mt-3 text-3xl font-semibold text-slate-950">Find the right product. Start the conversation.</h2><p className="mt-4 max-w-3xl text-sm leading-6 text-slate-500">Explore products by division. Chemicals retains the complete original Eurostar Chemicals offering, including food-grade and care ingredients; Foods currently focuses on rice and sugar. Supply, grades and availability are confirmed against each enquiry.</p><div className="mt-8" data-testid="catalog-controls"><div className="relative max-w-xl"><Search size={18} className="absolute left-3 top-3.5 text-slate-400" /><input aria-label="Search products" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products, e.g. chromite, glycerine, base oil" className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600" /></div><div className="mt-4 flex flex-wrap gap-2">{[{ key: 'all', title: 'All divisions' }, ...divisions].map(d => <button type="button" key={d.key} aria-pressed={activeCat === d.key} onClick={() => setActiveCat(d.key)} className={`rounded-lg border px-4 py-2.5 text-xs font-medium ${activeCat === d.key ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-teal-600'}`}>{d.title}</button>)}</div></div><div className="mt-10 space-y-9" data-testid="catalog-grid">{filteredDivisions.map(d => <div key={d.key} style={{ borderTop: `3px solid ${d.color}`, paddingTop: 20 }}><div className="flex flex-wrap items-center justify-between gap-3"><img src={d.logo} alt={`EUROSTAR ${d.title}`} className="h-auto w-64 max-w-full" /><button type="button" onClick={() => chooseEnquiry('buyer', d.key)} className="text-xs font-semibold text-teal-800">Request a quote →</button></div>{d.key === 'chemicals' ? <div className="mt-5 space-y-7">{[...chemicalGroups, { key: 'additional', title: 'Additional Industrial Chemicals', products: ['LABSA (Linear Alkyl Benzene Sulfonic Acid)', 'NP9 (Nonylphenol Ethoxylate)', 'Polymers', 'Industrial chemicals', 'Gum Rosin'] }].map(group => { const matches = group.products.filter(name => name.toLowerCase().includes(query.trim().toLowerCase())); return matches.length ? <div key={group.key}><h3 className="text-base font-semibold text-slate-900">{group.title}</h3><div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{matches.map(name => <div key={name} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600" data-testid="product-chemicals">{name}</div>)}</div></div> : null; })}</div> : <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{d.products.map(name => <div key={name} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600" data-testid={`product-${d.key}`}>{name}</div>)}</div>}{d.key === 'personal-home-care' && <PureStarProducts onEnquire={selectedProduct => { setProduct(selectedProduct); chooseEnquiry('buyer', 'personal-home-care'); }} />}</div>)}{filteredDivisions.length === 0 && <p role="status" className="rounded-lg bg-slate-50 p-6 text-sm text-slate-600">No products match this search. Try another term or send us your sourcing requirement.</p>}</div></section>


      <section id="network" className="scroll-mt-28 bg-slate-950 py-20 text-white" data-testid="network"><div className={container}><div className="grid gap-8 lg:grid-cols-2"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">Global Network</p><h2 className="mt-3 text-3xl font-semibold tracking-tight">International reach.<br />Personal connections.</h2></div><p className="max-w-xl text-sm leading-7 text-slate-300">With offices in Dubai, Turkey and South Africa, EUROSTAR GROUP connects regional demand with international supply. Our supplier network spans Brazil, Turkey, Indonesia, Malaysia, Iran, India and China.</p></div><div className="mt-10 grid gap-4 md:grid-cols-3">{[{ name: 'Dubai, UAE', description: 'Regional hub for Middle East sourcing and re-export' }, { name: 'Turkey', description: 'Strategic link between European and Asian supply chains' }, { name: 'South Africa', description: 'Durban · Head office supporting Southern & Sub-Saharan Africa' }].map((country, i) => <div key={country.name} className="rounded-xl border border-white/15 bg-white/[0.03] p-7" data-testid={`supplier-${country.name}`}><div className="flex items-center justify-between"><Globe2 size={27} className="text-teal-400" /><span className="text-xs text-slate-500">0{i + 1}</span></div><h3 className="mt-6 text-2xl font-semibold">{country.name}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{country.description}</p></div>)}</div><p className="mt-6 text-xs leading-6 text-slate-400">For enquiries relating to any market, contact our South African team.</p></div></section>

      <section className={`${container} grid gap-5 py-20 md:grid-cols-2`} aria-label="Trade enquiries"><div id="buyer-rfq" className="scroll-mt-28 rounded-xl border border-slate-200 bg-slate-50 p-8"><p className="text-xs font-semibold uppercase tracking-widest text-teal-700">For buyers</p><h2 className="mt-4 text-2xl font-semibold text-slate-950">Tell us what you need.</h2><p className="mt-4 text-sm leading-7 text-slate-600">Share your product, grade, quantity, destination and delivery timing. Include specification and documentation requirements so we can assess suitable supply options.</p><button type="button" onClick={() => chooseEnquiry('buyer')} className="mt-6 inline-flex items-center gap-3 rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-800">Submit a buyer RFQ <ArrowRight size={16} /></button></div><div id="supplier-enquiry" className="scroll-mt-28 rounded-xl border border-slate-200 p-8"><p className="text-xs font-semibold uppercase tracking-widest text-teal-700">For suppliers</p><h2 className="mt-4 text-2xl font-semibold text-slate-950">Build a supply partnership.</h2><p className="mt-4 text-sm leading-7 text-slate-600">Introduce your company, products, origin, production capacity and export markets. Tell us about available grades, documentation and commercial terms.</p><button type="button" onClick={() => chooseEnquiry('supplier')} className="mt-6 inline-flex items-center gap-3 rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50">Send a supplier enquiry <ArrowRight size={16} /></button></div></section>

      <section id="contact" ref={contactRef} className="scroll-mt-28 border-t border-slate-200 bg-slate-50 py-20" data-testid="contact"><div className={`${container} grid gap-12 lg:grid-cols-[0.8fr_1.2fr]`}><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">Contact EUROSTAR GROUP</p><h2 className="mt-3 text-3xl font-semibold text-slate-950">Let’s move your<br />business forward.</h2><p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">Speak to our team about sourcing, supply partnerships or your next shipment.</p><div className="mt-8 space-y-4 text-sm"><p className="flex items-center gap-3"><MapPin size={17} className="text-teal-700" />Durban, South Africa</p>{['enquiries@eurostar.co.za', 'sales@eurostar.co.za', 'accounts@eurostar.co.za'].map(email => <p key={email} className="flex items-center gap-3"><Mail size={17} className="shrink-0 text-teal-700" /><a href={`mailto:${email}`} className="underline underline-offset-4 hover:text-teal-800">{email}</a></p>)}<p className="flex items-center gap-3 border-t border-slate-200 pt-5"><Instagram size={18} className="shrink-0 text-teal-700" /><a href="https://www.instagram.com/eurostar.global/" target="_blank" rel="noopener noreferrer" aria-label="EUROSTAR on Instagram: @eurostar.global (opens in a new tab)" className="underline underline-offset-4 hover:text-teal-800">@eurostar.global</a></p></div></div>
        <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8" data-testid="contact-form" aria-busy={status === 'sending'}>
          <h3 className="text-xl font-semibold text-slate-950">{enquiryTitles[enquiryType]}</h3><p className="mt-2 text-xs leading-6 text-slate-500">Fields marked * are required. Please email any supporting documents to sales@eurostar.co.za.</p>
          <fieldset disabled={status === 'sending' || status === 'success'} className="mt-6 grid gap-5 sm:grid-cols-2">
            <div><label htmlFor="enquiry-type" className="text-sm font-medium">Enquiry type *</label><select id="enquiry-type" value={enquiryType} onChange={e => { setEnquiryType(e.target.value as EnquiryType); resetStatus(); }} className={fieldClass}>{Object.entries(enquiryTitles).map(([key, title]) => <option key={key} value={key}>{title}</option>)}</select></div>
            <div><label htmlFor="division" className="text-sm font-medium">Division{enquiryType !== 'general' ? ' *' : ''}</label><select id="division" value={division} required={enquiryType !== 'general'} onChange={e => { setDivision(e.target.value); resetStatus(); }} className={fieldClass}><option value="">Select a division</option>{divisions.map(d => <option key={d.key} value={d.key}>{d.title}</option>)}</select></div>
            <div><label htmlFor="name" className="text-sm font-medium">Name *</label><input id="name" name="name" autoComplete="name" value={form.name} onChange={handleChange} required maxLength={150} className={fieldClass} /></div>
            <div><label htmlFor="email" className="text-sm font-medium">Email *</label><input id="email" name="email" type="email" autoComplete="email" value={form.email} onChange={handleChange} required maxLength={254} className={fieldClass} /></div>
            <div className="sm:col-span-2"><label htmlFor="company" className="text-sm font-medium">Company</label><input id="company" name="company" autoComplete="organization" value={form.company} onChange={handleChange} maxLength={200} className={fieldClass} /></div>
            {enquiryType !== 'general' && <><div><label htmlFor="product" className="text-sm font-medium">Product / grade *</label><input id="product" value={product} onChange={e => { setProduct(e.target.value); resetStatus(); }} required maxLength={300} className={fieldClass} /></div><div><label htmlFor="quantity" className="text-sm font-medium">{enquiryType === 'supplier' ? 'Capacity / minimum order' : 'Required quantity'}</label><input id="quantity" value={quantity} onChange={e => { setQuantity(e.target.value); resetStatus(); }} placeholder="Include units, e.g. 20 tonnes" maxLength={200} className={fieldClass} /></div><div><label htmlFor="destination" className="text-sm font-medium">{enquiryType === 'supplier' ? 'Origin / export markets' : 'Delivery destination'}</label><input id="destination" value={destination} onChange={e => { setDestination(e.target.value); resetStatus(); }} maxLength={200} className={fieldClass} /></div><div><label htmlFor="terms" className="text-sm font-medium">Trade terms / timing</label><input id="terms" value={terms} onChange={e => { setTerms(e.target.value); resetStatus(); }} placeholder="Incoterms and delivery timing" maxLength={300} className={fieldClass} /></div></>}
            <div className="sm:col-span-2"><label htmlFor="message" className="text-sm font-medium">{enquiryType === 'supplier' ? 'Company / product details' : 'Message / specifications'} *</label><textarea id="message" name="message" rows={5} value={form.message} onChange={handleChange} required maxLength={5000} placeholder={enquiryType === 'supplier' ? 'Introduce your business, available grades, documentation and supply capabilities…' : 'Share specifications, packaging, required documentation and any other details…'} className={fieldClass} /></div>
            <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white hover:bg-teal-800 disabled:opacity-60 sm:col-span-2" data-testid="submit-enquiry">{status === 'sending' ? 'Sending…' : status === 'success' ? 'Enquiry sent' : 'Send enquiry'}<ArrowRight size={16} /></button>
          </fieldset>
          <p className="mt-4 text-xs leading-6 text-slate-500">By submitting, you ask EUROSTAR to contact you about this enquiry.</p>
          {status === 'success' && <div role="status" className="mt-4 rounded-lg border border-teal-200 bg-teal-50 p-4 text-sm text-teal-900"><p className="flex items-center gap-2"><CheckCircle size={18} />Thank you. Your enquiry has been sent to our team.</p><button type="button" onClick={() => { setForm({ name: '', email: '', company: '', message: '' }); setProduct(''); setQuantity(''); setDestination(''); setTerms(''); setStatus('idle'); }} className="mt-3 underline underline-offset-4">Send another enquiry</button></div>}
          {status === 'error' && <p role="alert" className="mt-4 rounded-lg border border-slate-300 bg-slate-50 p-4 text-sm text-slate-800">We couldn’t confirm delivery of your enquiry. Please retry or email <a href="mailto:sales@eurostar.co.za" className="font-semibold underline">sales@eurostar.co.za</a> directly.</p>}
        </form>
      </div></section>
    </main>
    <footer className="bg-slate-950 text-slate-400" data-testid="footer"><div className={`${container} grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4`}><div><a href="#home" aria-label="EUROSTAR GROUP home"><BrandLogo inverse /></a><p className="mt-5 text-xs leading-6">Connecting buyers, suppliers and markets across five specialist divisions.</p></div><div><h2 className="text-sm font-semibold text-white">Our divisions</h2><ul className="mt-4 space-y-3 text-xs">{divisions.map(d => <li key={d.key}><a href={`#${d.key}`} className="hover:text-white">{d.title}</a></li>)}</ul></div><div><h2 className="text-sm font-semibold text-white">EUROSTAR GROUP</h2><ul className="mt-4 space-y-3 text-xs"><li><a href="#about" className="hover:text-white">About</a></li><li><a href="#network" className="hover:text-white">Global Network</a></li><li><a href="#contact" className="hover:text-white">Contact</a></li><li><a href="#buyer-rfq" className="hover:text-white">Buyer RFQ</a></li><li><a href="#supplier-enquiry" className="hover:text-white">Supplier enquiry</a></li></ul></div><div><h2 className="text-sm font-semibold text-white">Global presence</h2><p className="mt-4 text-xs leading-7">Dubai, UAE<br />Turkey<br />South Africa · Head Office</p><div className="mt-4 space-y-3 text-xs">{['enquiries@eurostar.co.za', 'sales@eurostar.co.za', 'accounts@eurostar.co.za'].map(email => <a key={email} href={`mailto:${email}`} className="block underline underline-offset-4 hover:text-white">{email}</a>)}<a href="https://www.instagram.com/eurostar.global/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 underline underline-offset-4 hover:text-white" aria-label="EUROSTAR on Instagram: @eurostar.global (opens in a new tab)"><Instagram size={16} />@eurostar.global</a></div></div></div><div className="border-t border-white/10"><div className={`${container} flex flex-wrap justify-between gap-3 py-5 text-[11px]`}><span>© {new Date().getFullYear()} EUROSTAR GROUP. All rights reserved.</span><span>Global Trade. Trusted Supply.</span></div></div></footer>
  </div>;
}






