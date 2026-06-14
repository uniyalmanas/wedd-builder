'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

const translations = {
  en: {
    navLogo: "MANAS UNIYAL",
    navPhilosophy: "Philosophy",
    navCatalogues: "Selected Catalogues",
    navCraft: "The Craft",
    navInquire: "Inquire",
    
    atelierLabel: "[ DIRECT SYSTEMS ATELIER ]",
    heroHeading: (
      <>
        We design <br />
        <span className="italic font-extralight text-[#c8891e] lowercase">sensory</span> digital <br />
        spaces <span className="font-sans font-extrabold tracking-tighter text-zinc-700 block md:inline uppercase text-4xl sm:text-6xl md:text-7xl lg:text-[6rem]">THAT CAPTIVATE</span>
      </>
    ),
    heroHeadingLight: (
      <>
        We design <br />
        <span className="italic font-extralight text-[#b07b22] lowercase">sensory</span> digital <br />
        spaces <span className="font-sans font-extrabold tracking-tighter text-zinc-400 block md:inline uppercase text-4xl sm:text-6xl md:text-7xl lg:text-[6rem]">THAT CAPTIVATE</span>
      </>
    ),
    studioRef: "Studio Reference: Arch & Symmetry",
    heroDesc: "An engineering house specializing in bespoke Next.js interfaces. Locked, layout-proof brand architectures equipped with offline contact caches, test Stripe integrations, and Gemini copywriting nodes. Designed for those who refuse templated solutions.",
    viewCatalogues: "View Catalogues",
    inquireDetails: "Inquire Details",
    
    philosophyLabel: "01 / Philosophy",
    philosophyHeading: "The luxury of absolute layout stability.",
    philosophyQuote: "\"A premium brand's first signature is digital. A templated layout is a generic entrance. We build flagships.\"",
    philosophyDesc1: "Most digital architectures are built on drag-and-drop systems that break, slow down, and clutter visual focus. We decouple design architecture from editor content. Your layout parameters remain locked and polished, preserving the designer's exact intent.",
    philosophyDesc2: "We craft fast, custom Next.js platforms. The owner can edit typography values, swap photography references, and check leads directly in an elegant inline editor layer — while the template remains 100% rigid, protected, and fast.",
    mobilePerf: "Mobile Performance",
    visualLock: "Visual Lock Protection",
    
    worksLabel: "02 / Selected Works",
    worksHeading: "Selected Catalogues",
    
    atelier01Label: "[ ATELIER 01 / CLIENT SANDBOX ]",
    work1Title: "Vows & Vistas",
    work1Desc: "An editorial display template designed for wedding planners and spatial stylists. Equipped with inline data modifiers, Local Leads CRM, and a Stripe Deposit checkout simulator.",
    openLiveSandbox: "Open Live Sandbox →",
    inspectCode: "Inspect Code",
    
    atelier02Label: "[ ATELIER 02 / COMPILER ]",
    work2Title: "WeddingCanvas",
    work2Desc: "A standalone single-page compiler for wedding events. Features a lightweight wizard that structures itineraries, ceremony details, and guest blessings, generating a fully independent, downloadable HTML site.",
    openCompilerApp: "Open Compiler App →",
    
    atelier03Label: "[ ATELIER 03 / OPERATIONS PORTAL ]",
    work3Title: "Zenith Workspace",
    work3Desc: "A high-ticket workspace portal tailored for boutique business consultants. Built to coordinate client proposals, track private workbooks, cache documents offline, and process secure payments.",
    architecturalPhase: "Architectural Phase",
    designBlueprintCompleted: "Design Blueprint Completed",
    
    atelier04Label: "[ ATELIER 04 / WEBGL CANVAS ]",
    work4Title: "Aether Studio",
    work4Desc: "An immersive showcase for high-fashion brands. Designed with liquid displacement WebGL shaders, camera scroll link triggers, and high-contrast typographic layouts to capture aesthetic brand stories.",
    creativePhase: "Creative Phase",
    typographySystemLocked: "Typography System Locked",
    
    craftLabel: "03 / The Craft",
    craftHeading: "Operational Systems, Artfully Wrapped.",
    craft1Title: "Invisible Leads CRM",
    craft1Desc: "An inline leads logger that captures customer inquiries and details without third-party libraries. Accessible via a secure admin panel directly inside the workspace layout.",
    craft2Title: "Stripe Billing Sandbox",
    craft2Desc: "Secure checkout modals integrated into the visual templates. Validates bookings, calculates transaction fees, and mocks merchant deposits in real time.",
    craft3Title: "Gemini AI Copywriters",
    craft3Desc: "Real-time generative text modules linked directly to the inline text modifiers. Prompts the LLM directly on the page to expand, rewrite, or polish copy while remaining layout-proof.",
    
    standardsLabel: "04 / System Standards",
    standardsHeading: "The Technical Specifications of a Digital Flagship.",
    standard1Title: "100/100 Lighthouse Performance",
    standard1Desc: "Fully optimized static pages that load in under 0.2 seconds, ensuring search engines index your brand with maximum visibility.",
    standard2Title: "0.0 Cumulative Layout Shift",
    standard2Desc: "Decoupled typography and grid layers remain completely rigid. Brand graphics never jump or shift during image loading.",
    standard3Title: "Total Data Sovereignty",
    standard3Desc: "Customer inquiries, leads, and transaction logs are stored directly on your private server, completely free from monthly SaaS fees.",
    standard4Title: "Gemini AI Copywriting",
    standard4Desc: "Direct integration with Google Gemini API allows you to rewrite, polish, or generate contextual copy in-situ with visual lock protection.",

    conversationLabel: "05 / Conversation",
    conversationHeading: "Draft your digital blueprint.",
    
    formIam: "I am",
    formNamePlaceholder: "your name",
    formBusinessNichePlaceholder: "your business niche",
    formCollaborateText: ", and I would like to collaborate on a digital flagship for my business, ",
    formOperationsSuiteText: "We want to integrate an operations suite containing ",
    formLaunchAimText: ", and aim to launch this experience in ",
    formContactText: "You can contact me at ",
    formEmailPlaceholder: "your email address",
    formVisionText: ". Here is a brief snapshot of our brand vision:",
    formTextareaPlaceholder: "Describe your target clientele, color aesthetics, or visual references...",
    formSubmitButton: "Send Blueprint Request →",
    
    footerLogoSub: "Atelier of Digital Flagships © ",
  },
  hi: {
    navLogo: "MANAS UNIYAL",
    navPhilosophy: "Philosophy",
    navCatalogues: "Selected Catalogues",
    navCraft: "The Craft",
    navInquire: "Inquire",
    
    atelierLabel: "[ DIRECT SYSTEMS ATELIER ]",
    heroHeading: (
      <>
        हम आकार देते हैं <br />
        <span className="italic font-extralight text-[#c8891e] lowercase">sensory</span> digital <br />
        spaces को <span className="font-sans font-extrabold tracking-tighter text-zinc-700 block md:inline uppercase text-4xl sm:text-6xl md:text-7xl lg:text-[6rem]">जो आकर्षित करते हैं</span>
      </>
    ),
    heroHeadingLight: (
      <>
        हम आकार देते हैं <br />
        <span className="italic font-extralight text-[#b07b22] lowercase">sensory</span> digital <br />
        spaces को <span className="font-sans font-extrabold tracking-tighter text-zinc-400 block md:inline uppercase text-4xl sm:text-6xl md:text-7xl lg:text-[6rem]">जो आकर्षित करते हैं</span>
      </>
    ),
    studioRef: "Studio Reference: Arch & Symmetry",
    heroDesc: "Bespoke Next.js interfaces में specialization रखने वाला एक engineering house। Locked, layout-proof brand architectures जो offline contact caches, test Stripe integrations और Gemini copywriting nodes से लैस हैं। उनके लिए design किया गया है जो templated solutions को refuse करते हैं।",
    viewCatalogues: "View Catalogues",
    inquireDetails: "Inquire Details",
    
    philosophyLabel: "01 / Philosophy",
    philosophyHeading: "Absolute layout stability की luxury।",
    philosophyQuote: "\"एक premium brand का पहला signature digital होता है। एक templated layout एक साधारण entry point है। हम flagships बनाते हैं।\"",
    philosophyDesc1: "अधिकांश digital architectures drag-and-drop systems पर बनाए जाते हैं जो break होते हैं, speed slow करते हैं और visual focus को clutter करते हैं। हम design architecture को editor content से decouple करते हैं। आपके layout parameters locked और polished रहते हैं, जो designer के exact intent को preserve करता है।",
    philosophyDesc2: "हम fast, custom Next.js platforms तैयार करते हैं। Owner एक elegant inline editor layer में सीधे typography values को edit कर सकता है, photography references को swap कर सकता है और leads की जांच कर सकता है — जबकि template 100% rigid, protected और fast रहता है।",
    mobilePerf: "Mobile Performance",
    visualLock: "Visual Lock Protection",
    
    worksLabel: "02 / Selected Works",
    worksHeading: "Selected Catalogues",
    
    atelier01Label: "[ ATELIER 01 / CLIENT SANDBOX ]",
    work1Title: "Vows & Vistas",
    work1Desc: "wedding planners और spatial stylists के लिए design किया गया एक editorial display template। Inline data modifiers, Local Leads CRM, और Stripe Deposit checkout simulator से लैस।",
    openLiveSandbox: "Open Live Sandbox →",
    inspectCode: "Inspect Code",
    
    atelier02Label: "[ ATELIER 02 / COMPILER ]",
    work2Title: "WeddingCanvas",
    work2Desc: "wedding events के लिए एक standalone single-page compiler। इसमें एक lightweight wizard है जो itineraries, ceremony details, और guest blessings को structure करता है, जिससे एक fully independent, downloadable HTML site generate होती है।",
    openCompilerApp: "Open Compiler App →",
    
    atelier03Label: "[ ATELIER 03 / OPERATIONS PORTAL ]",
    work3Title: "Zenith Workspace",
    work3Desc: "boutique business consultants के लिए tailored एक high-ticket workspace portal। Client proposals को coordinate करने, private workbooks को track करने, documents को offline cache करने, और secure payments को process करने के लिए built।",
    architecturalPhase: "Architectural Phase",
    designBlueprintCompleted: "Design Blueprint Completed",
    
    atelier04Label: "[ ATELIER 04 / WEBGL CANVAS ]",
    work4Title: "Aether Studio",
    work4Desc: "high-fashion brands के लिए एक immersive showcase। Aesthetic brand stories को capture करने के लिए liquid displacement WebGL shaders, camera scroll link triggers, और high-contrast typographic layouts के साथ design किया गया।",
    creativePhase: "Creative Phase",
    typographySystemLocked: "Typography System Locked",
    
    craftLabel: "03 / The Craft",
    craftHeading: "Operational Systems, Artfully Wrapped.",
    craft1Title: "Invisible Leads CRM",
    craft1Desc: "एक inline leads logger जो third-party libraries के बिना customer inquiries और details को capture करता है। Workspace layout के अंदर सीधे एक secure admin panel के माध्यम से accessible।",
    craft2Title: "Stripe Billing Sandbox",
    craft2Desc: "visual templates में integrated secure checkout modals। Bookings को validate करता है, transaction fees को calculate करता है, और real time में merchant deposits को mock करता है।",
    craft3Title: "Gemini AI Copywriters",
    craft3Desc: "inline text modifiers से सीधे linked real-time generative text modules। Layout-proof रहते हुए copy को expand, rewrite या polish करने के लिए page पर सीधे LLM को prompt करता है।",
    
    standardsLabel: "04 / System Standards",
    standardsHeading: "Digital Flagship की Technical Specifications.",
    standard1Title: "100/100 Lighthouse Performance",
    standard1Desc: "Fully optimized static pages जो 0.2 seconds से कम में load होती हैं, जिससे search engines आपके brand को maximum visibility के साथ index करें।",
    standard2Title: "0.0 Cumulative Layout Shift",
    standard2Desc: "Decoupled typography और grid layers पूरी तरह rigid रहते हैं। Image loading के दौरान brand graphics कभी jump या shift नहीं होते।",
    standard3Title: "Total Data Sovereignty",
    standard3Desc: "Customer inquiries, leads, और transaction logs सीधे आपके private server पर store होते हैं, जो monthly SaaS fees से पूरी तरह free हैं।",
    standard4Title: "Gemini AI Copywriting",
    standard4Desc: "Google Gemini API के साथ direct integration आपको visual lock protection के साथ in-situ copy को rewrite, polish, या generate करने की अनुमति देता है।",

    conversationLabel: "05 / Conversation",
    conversationHeading: "Draft your digital blueprint.",
    
    formIam: "I am",
    formNamePlaceholder: "your name",
    formBusinessNichePlaceholder: "your business niche",
    formCollaborateText: ", और मैं अपने business के लिए एक digital flagship पर collaborate करना चाहता हूँ, ",
    formOperationsSuiteText: "हम एक operations suite को integrate करना चाहते हैं जिसमें शामिल हो ",
    formLaunchAimText: ", और aim है इस experience को launch करने का ",
    formContactText: "आप मुझसे contact कर सकते हैं ",
    formEmailPlaceholder: "your email address",
    formVisionText: "। यहाँ हमारे brand vision का एक snapshot है:",
    formTextareaPlaceholder: "अपने target clientele, color aesthetics, या visual references को describe करें...",
    formSubmitButton: "Send Blueprint Request →",
    
    footerLogoSub: "Atelier of Digital Flagships © ",
  }
};

const styles = {
  dark: {
    bg: "bg-[#060608]",
    textPrimary: "text-[#f4f3f0]",
    textSecondary: "text-zinc-400",
    textTertiary: "text-zinc-650",
    whiteText: "text-white",
    goldText: "text-[#c8891e]",
    borderThin: "border-white/[0.03]",
    bgSection: "bg-[#09090b]",
    bgFooter: "bg-[#040405]",
    ruleBg: "bg-white/[0.02]",
    grainOpacity: "opacity-[0.015]",
    fluidOpacity: "opacity-[0.04]",
    formBg: "bg-[#09090b]/40 border-white/[0.03]",
    inputBorder: "border-[#c8891e]/40 placeholder-zinc-800",
    btnBg: "bg-[#c8891e] hover:bg-[#ab7314] text-zinc-950",
    selectBg: "bg-[#09090b]",
    aurora1: "bg-[#c8891e]/3",
    aurora2: "bg-[#6366f1]/4",
    aurora3: "bg-[#c8891e]/2",
    mandalaStroke: "#C9A84C",
    logoColor: "text-white hover:text-[#c8891e]"
  },
  light: {
    bg: "bg-[#fbfaf7]",
    textPrimary: "text-[#1c1a17]",
    textSecondary: "text-zinc-650",
    textTertiary: "text-zinc-400",
    whiteText: "text-black",
    goldText: "text-[#b07b22]",
    borderThin: "border-black/[0.04]",
    bgSection: "bg-[#f5f4ef]",
    bgFooter: "bg-[#ebeae4]",
    ruleBg: "bg-black/[0.03]",
    grainOpacity: "opacity-[0.025]",
    fluidOpacity: "opacity-[0.025]",
    formBg: "bg-[#f3f2eb]/65 border-black/[0.04]",
    inputBorder: "border-[#b07b22]/40 placeholder-zinc-400",
    btnBg: "bg-[#b07b22] hover:bg-[#966518] text-white",
    selectBg: "bg-[#f5f4ef]",
    aurora1: "bg-[#c8891e]/2",
    aurora2: "bg-[#6366f1]/2",
    aurora3: "bg-[#c8891e]/1",
    mandalaStroke: "#b07b22",
    logoColor: "text-black hover:text-[#b07b22]"
  }
};

export default function Home() {
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('manas-portfolio-theme') as 'dark' | 'light';
    if (savedTheme) setTheme(savedTheme);
    const savedLang = localStorage.getItem('manas-portfolio-lang') as 'en' | 'hi';
    if (savedLang) setLang(savedLang);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('manas-portfolio-theme', theme);
    }
  }, [theme, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('manas-portfolio-lang', lang);
    }
  }, [lang, mounted]);

  const t = translations[lang];
  const currentStyles = styles[theme];

  // Dynamic font assignments based on active language
  const fontSerif = lang === 'en' ? 'font-serif' : 'font-serif-hi';
  const fontSans = lang === 'en' ? 'font-sans' : 'font-sans-hi';

  return (
    <div className={`min-h-screen transition-colors duration-700 selection:bg-[#c8891e]/20 overflow-x-hidden relative ${currentStyles.bg} ${currentStyles.textPrimary} ${fontSans}`}>
      
      {/* Soft grain overlay for a tactile paper-like feel */}
      <div 
        className={`fixed inset-0 pointer-events-none z-50 bg-repeat transition-opacity duration-700 ${currentStyles.grainOpacity}`} 
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&q=80')` }}
      />

      {/* Aesthetic Background Texture Overlay (Ethereal fluid ripples) */}
      <div 
        className={`absolute inset-0 bg-cover bg-center bg-fixed pointer-events-none transition-opacity duration-700 -z-20 ${currentStyles.fluidOpacity}`} 
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1600&q=80')` }}
      />

      {/* Drifting Cinematic Auroras (Gold & Deep Violet) */}
      <div className={`absolute top-[-10%] left-[-20%] w-[80vw] h-[80vw] rounded-full blur-[180px] pointer-events-none -z-10 animate-drift-slow transition-all duration-700 ${currentStyles.aurora1}`} />
      <div className={`absolute top-[30%] right-[-25%] w-[80vw] h-[80vw] rounded-full blur-[200px] pointer-events-none -z-10 animate-drift-delayed transition-all duration-700 ${currentStyles.aurora2}`} />
      <div className={`absolute bottom-[-10%] left-[10%] w-[70vw] h-[70vw] rounded-full blur-[150px] pointer-events-none -z-10 animate-drift-slow transition-all duration-700 ${currentStyles.aurora3}`} />

      {/* Thin Editorial Structural Rules (Architectural margin lines visible on large screens) */}
      <div className={`hidden lg:block fixed left-16 top-0 bottom-0 w-px transition-colors duration-700 ${currentStyles.ruleBg} pointer-events-none z-40`} />
      <div className={`hidden lg:block fixed right-16 top-0 bottom-0 w-px transition-colors duration-700 ${currentStyles.ruleBg} pointer-events-none z-40`} />

      {/* Ultra-Minimalist Header */}
      <header className={`py-8 border-b transition-colors duration-700 ${currentStyles.borderThin} relative z-30`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 flex flex-row flex-nowrap items-center justify-between w-full">
          <Link href="/" className={`text-lg md:text-xl ${fontSerif} tracking-[0.35em] uppercase transition-colors duration-500 ${currentStyles.logoColor} whitespace-nowrap shrink-0`}>
            {t.navLogo}
          </Link>
          
          <div className="hidden md:flex flex-row flex-nowrap items-center gap-4 lg:gap-6 xl:gap-8 text-xs md:text-[13px] tracking-[0.25em] uppercase text-zinc-500 font-bold whitespace-nowrap mx-4">
            <a href="#philosophy" className={`transition-colors duration-300 ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'} whitespace-nowrap`}>{t.navPhilosophy}</a>
            <a href="#works" className={`transition-colors duration-300 ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'} whitespace-nowrap`}>{t.navCatalogues}</a>
            <a href="#craft" className={`transition-colors duration-300 ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'} whitespace-nowrap`}>{t.navCraft}</a>
          </div>

          <div className="flex flex-row flex-nowrap items-center gap-3 sm:gap-4 md:gap-5 shrink-0">
            {/* Lang Switcher EN / HI */}
            <div className="flex flex-row flex-nowrap gap-1.5 sm:gap-2.5 text-xs md:text-sm tracking-[0.18em] font-sans font-bold text-zinc-500 uppercase whitespace-nowrap">
              <button 
                onClick={() => setLang('en')} 
                className={`transition-colors duration-300 cursor-pointer ${lang === 'en' ? (theme === 'dark' ? 'text-white' : 'text-[#1c1a17]') : 'hover:text-zinc-300'} whitespace-nowrap`}
              >
                EN
              </button>
              <span className="opacity-40 select-none">/</span>
              <button 
                onClick={() => setLang('hi')} 
                className={`transition-colors duration-300 cursor-pointer ${lang === 'hi' ? (theme === 'dark' ? 'text-white' : 'text-[#1c1a17]') : 'hover:text-zinc-300'} whitespace-nowrap`}
              >
                HI
              </button>
            </div>

            {/* Theme Switcher NOIR / CLAIR */}
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`text-xs md:text-sm tracking-[0.18em] font-sans font-bold text-zinc-500 cursor-pointer uppercase transition-colors duration-300 ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'} whitespace-nowrap`}
            >
              {theme === 'dark' ? 'NOIR' : 'CLAIR'}
            </button>

            <a
              href="#inquire"
              className={`text-xs md:text-sm font-sans font-bold tracking-[0.25em] uppercase transition-all duration-300 px-5 sm:px-7 py-2.5 md:py-3 border ${theme === 'dark' ? 'text-[#c8891e] border-[#c8891e]/20 hover:border-white hover:text-white bg-[#060608]/50' : 'text-[#b07b22] border-[#b07b22]/35 hover:border-black hover:text-black bg-[#faf9f6]/50'} backdrop-blur-sm whitespace-nowrap`}
            >
              {t.navInquire}
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section - High-Fashion Magazine Layout */}
      <section className="max-w-7xl mx-auto px-8 lg:px-20 pt-20 pb-28 md:pt-28 md:pb-40 relative z-10">
        {/* Soft geometric circle overlay in background */}
        <div className="absolute top-[10%] right-[10%] w-[350px] h-[350px] opacity-10 pointer-events-none -z-10">
          <svg viewBox="0 0 500 500" fill="none" className="w-full h-full animate-[spin_180s_linear_infinite]">
            <circle cx="250" cy="250" r="240" stroke={currentStyles.mandalaStroke} strokeWidth="0.5" strokeDasharray="1 8" />
            <circle cx="250" cy="250" r="190" stroke={currentStyles.mandalaStroke} strokeWidth="0.5" />
            <circle cx="250" cy="250" r="140" stroke={currentStyles.mandalaStroke} strokeWidth="0.5" strokeDasharray="4 4" />
            <line x1="250" y1="10" x2="250" y2="490" stroke={currentStyles.mandalaStroke} strokeWidth="0.25" />
            <line x1="10" y1="250" x2="490" y2="250" stroke={currentStyles.mandalaStroke} strokeWidth="0.25" />
          </svg>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Typography statement */}
          <div className="lg:col-span-7 space-y-12">
            <p className={`text-xs md:text-sm font-sans font-bold tracking-[0.3em] uppercase transition-colors duration-700 ${currentStyles.goldText}`}>
              {t.atelierLabel}
            </p>
            <h1 className={`text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[7.75rem] ${fontSerif} font-light tracking-tight leading-[0.92] max-w-4xl transition-colors duration-700 ${currentStyles.whiteText}`}>
              {theme === 'dark' ? t.heroHeading : t.heroHeadingLight}
            </h1>
            <div className={`h-px transition-colors duration-700 ${currentStyles.borderThin} w-24`} />
          </div>

          {/* Right Side: Large vertical image for editorial balance */}
          <div className="lg:col-span-5 mt-8 lg:mt-0 flex justify-end w-full">
            <div className="w-full max-w-[420px] space-y-4">
              <div className={`aspect-[3/4] w-full rounded-sm bg-cover bg-center border transition-all duration-700 ${currentStyles.borderThin} shadow-2xl relative overflow-hidden group/hero`} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80')" }}>
                <div className={`absolute inset-0 transition-opacity duration-700 ${theme === 'dark' ? 'bg-[#060608] opacity-15' : 'bg-[#faf9f6] opacity-10'} group-hover/hero:opacity-0`} />
              </div>
              <p className={`text-[10px] md:text-xs tracking-[0.2em] uppercase font-mono text-right transition-colors duration-700 ${currentStyles.textTertiary}`}>
                {t.studioRef}
              </p>
            </div>
          </div>

        </div>

        {/* Hero Bottom - Horizontal separator & description grid */}
        <div className={`mt-16 pt-10 border-t transition-colors duration-700 ${currentStyles.borderThin} grid md:grid-cols-12 gap-8 items-start`}>
          <div className="md:col-span-6 lg:col-span-7">
            <p className={`transition-colors duration-700 ${currentStyles.textSecondary} text-xs md:text-sm font-light leading-relaxed max-w-md tracking-wider`}>
              {t.heroDesc}
            </p>
          </div>
          <div className="md:col-span-6 lg:col-span-5 flex md:justify-end gap-10 text-xs md:text-sm tracking-[0.2em] uppercase font-bold pt-2">
            <a
              href="#works"
              className={`transition-colors duration-300 border-b ${theme === 'dark' ? 'text-white hover:text-[#c8891e] border-white hover:border-[#c8891e]' : 'text-black hover:text-[#b07b22] border-black hover:border-[#b07b22]'} pb-1`}
            >
              {t.viewCatalogues}
            </a>
            <a
              href="#inquire"
              className={`transition-colors duration-300 pb-1 ${currentStyles.textTertiary} ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'}`}
            >
              {t.inquireDetails}
            </a>
          </div>
        </div>
      </section>

      {/* Philosophy Section - High End Editorial Page */}
      <section id="philosophy" className={`border-t transition-colors duration-700 ${currentStyles.borderThin} ${currentStyles.bgSection} py-28 relative overflow-hidden`}>
        {/* Subtle grid line running through philosophy */}
        <div className={`absolute left-[8%] right-[8%] top-0 h-px transition-colors duration-700 ${currentStyles.borderThin}`} />
        
        <div className="max-w-7xl mx-auto px-8 lg:px-20">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Title Column */}
            <div className="lg:col-span-4 space-y-4">
              <span className={`text-xs md:text-sm font-sans font-bold tracking-[0.25em] uppercase block transition-colors duration-700 ${currentStyles.goldText}`}>
                {t.philosophyLabel}
              </span>
              <h2 className={`text-3xl md:text-4xl ${fontSerif} font-light tracking-tight leading-snug transition-colors duration-700 ${currentStyles.whiteText}`}>
                {t.philosophyHeading}
              </h2>
            </div>
            
            {/* Content Column */}
            <div className="lg:col-span-8 space-y-12">
              <blockquote className={`font-serif italic font-light text-2xl md:text-3xl lg:text-4xl text-[#ebdcc5] leading-relaxed max-w-2xl border-l-2 border-[#c8891e]/30 pl-8`} style={{ color: theme === 'light' ? '#3a3832' : undefined }}>
                {t.philosophyQuote}
              </blockquote>
              
              <div className={`grid sm:grid-cols-2 gap-10 transition-colors duration-700 ${currentStyles.textSecondary} text-xs md:text-sm font-light leading-relaxed tracking-wider max-w-2xl`}>
                <p>{t.philosophyDesc1}</p>
                <p>{t.philosophyDesc2}</p>
              </div>

              {/* Stats Grid */}
              <div className={`flex gap-16 pt-6 border-t transition-colors duration-700 ${currentStyles.borderThin} max-w-2xl`}>
                <div>
                  <p className={`text-4xl font-display font-light mb-1 tracking-tight transition-colors duration-700 ${currentStyles.whiteText}`}>
                    98+
                  </p>
                  <p className={`text-[10px] md:text-xs uppercase tracking-widest font-mono transition-colors duration-700 ${currentStyles.textTertiary}`}>{t.mobilePerf}</p>
                </div>
                <div>
                  <p className={`text-4xl font-display font-light mb-1 tracking-tight transition-colors duration-700 ${currentStyles.whiteText}`}>
                    100%
                  </p>
                  <p className={`text-[10px] md:text-xs uppercase tracking-widest font-mono transition-colors duration-700 ${currentStyles.textTertiary}`}>{t.visualLock}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Selected Works Section - Asymmetrical Magazine Spread */}
      <section id="works" className={`border-t transition-colors duration-700 ${currentStyles.borderThin} py-28 relative`}>
        <div className="max-w-7xl mx-auto px-8 lg:px-20">
          
          {/* Section Header */}
          <div className="mb-28 text-center md:text-left">
            <span className={`text-xs md:text-sm font-sans font-bold tracking-[0.25em] uppercase block transition-colors duration-700 ${currentStyles.goldText}`}>
              {t.worksLabel}
            </span>
            <h2 className={`text-4xl md:text-5xl ${fontSerif} font-light tracking-tight mt-2 transition-colors duration-700 ${currentStyles.whiteText}`}>
              {t.worksHeading}
            </h2>
            <div className={`h-px transition-colors duration-700 ${currentStyles.borderThin} w-12 mt-6`} />
          </div>

          {/* Asymmetrical Grid Spread */}
          <div className="grid lg:grid-cols-12 gap-y-36 lg:gap-x-16 items-start">
            
            {/* WORK 01: Vows & Vistas (Left Column, Span 7) */}
            <div className="lg:col-span-7 space-y-8 group">
              <div className={`aspect-[4/5] w-full rounded-sm bg-cover bg-center border transition-all duration-700 ${currentStyles.borderThin} relative overflow-hidden shadow-2xl`}>
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] ease-out scale-100 group-hover:scale-105"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&q=80')" }}
                />
                <div className={`absolute inset-0 transition-colors duration-700 ${theme === 'dark' ? 'bg-[#060608]/50 group-hover:bg-[#060608]/15' : 'bg-[#fbfaf7]/40 group-hover:bg-[#fbfaf7]/10'} flex items-end p-8`}>
                  <div className="space-y-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[10px] md:text-xs tracking-[0.25em] font-mono uppercase text-[#c8891e] bg-black/60 px-3 py-1.5 backdrop-blur-sm rounded-sm">
                      Interactive Template
                    </span>
                  </div>
                </div>
                <div className={`absolute top-6 right-6 ${theme === 'dark' ? 'text-white/10' : 'text-black/5'} text-6xl font-serif select-none`}>01</div>
              </div>
              
              <div className="space-y-4 max-w-xl">
                <span className={`text-xs md:text-sm font-mono tracking-[0.2em] uppercase block transition-colors duration-700 ${currentStyles.goldText}`}>
                  {t.atelier01Label}
                </span>
                <h3 className={`font-serif text-3xl font-light tracking-tight transition-colors duration-700 ${currentStyles.whiteText}`}>
                  {t.work1Title}
                </h3>
                <p className={`transition-colors duration-700 ${currentStyles.textSecondary} text-xs md:text-sm font-light leading-relaxed tracking-wide`}>
                  {t.work1Desc}
                </p>
                <div className="flex gap-6 pt-2 items-center">
                  <Link
                    href="/wedding-planner"
                    className={`text-xs md:text-sm tracking-[0.25em] uppercase font-bold border-b transition-all duration-300 ${theme === 'dark' ? 'text-white border-white hover:border-[#c8891e] hover:text-[#c8891e]' : 'text-black border-black hover:border-[#b07b22] hover:text-[#b07b22]'} pb-1`}
                  >
                    {t.openLiveSandbox}
                  </Link>
                  <a
                    href="file:///D:/Wedding%20business/manas-portfolio/src/app/wedding-planner/page.tsx"
                    className={`transition-colors duration-300 text-[10px] md:text-xs tracking-[0.2em] uppercase font-mono ${currentStyles.textTertiary} ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'}`}
                  >
                    {t.inspectCode}
                  </a>
                </div>
              </div>
            </div>

            {/* WORK 02: WeddingCanvas (Right Column, Span 5, Offset Vertically) */}
            <div className="lg:col-span-5 lg:mt-32 space-y-8 group">
              <div className={`aspect-[3/4] w-full rounded-sm bg-cover bg-center border transition-all duration-700 ${currentStyles.borderThin} relative overflow-hidden shadow-2xl`}>
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] ease-out scale-100 group-hover:scale-105"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1000&q=80')" }}
                />
                <div className={`absolute inset-0 transition-colors duration-700 ${theme === 'dark' ? 'bg-[#060608]/50 group-hover:bg-[#060608]/15' : 'bg-[#fbfaf7]/40 group-hover:bg-[#fbfaf7]/10'} flex items-end p-8`}>
                  <div className="space-y-2">
                    <span className="text-[10px] md:text-xs tracking-[0.25em] font-mono uppercase text-[#c8891e] bg-black/60 px-3 py-1.5 backdrop-blur-sm rounded-sm">
                      Standalone Builder
                    </span>
                  </div>
                </div>
                <div className={`absolute top-6 right-6 ${theme === 'dark' ? 'text-white/10' : 'text-black/5'} text-6xl font-serif select-none`}>02</div>
              </div>

              <div className="space-y-4">
                <span className={`text-xs md:text-sm font-mono tracking-[0.2em] uppercase block transition-colors duration-700 ${currentStyles.goldText}`}>
                  {t.atelier02Label}
                </span>
                <h3 className={`font-serif text-3xl font-light tracking-tight transition-colors duration-700 ${currentStyles.whiteText}`}>
                  {t.work2Title}
                </h3>
                <p className={`transition-colors duration-700 ${currentStyles.textSecondary} text-xs md:text-sm font-light leading-relaxed tracking-wide`}>
                  {t.work2Desc}
                </p>
                <div className="flex gap-6 pt-2 items-center">
                  <Link
                    href="/weddingcanvas/index.html"
                    className={`text-xs md:text-sm tracking-[0.25em] uppercase font-bold border-b transition-all duration-300 ${theme === 'dark' ? 'text-white border-white hover:border-[#c8891e] hover:text-[#c8891e]' : 'text-black border-black hover:border-[#b07b22] hover:text-[#b07b22]'} pb-1`}
                  >
                    {t.openCompilerApp}
                  </Link>
                  <a
                    href="file:///D:/Wedding%20business/weddingcanvas/index.html"
                    className={`transition-colors duration-300 text-[10px] md:text-xs tracking-[0.2em] uppercase font-mono ${currentStyles.textTertiary} ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'}`}
                  >
                    {t.inspectCode}
                  </a>
                </div>
              </div>
            </div>

            {/* WORK 03: Zenith Workspace (Left Column, Span 5, Offset Upward) */}
            <div className="lg:col-span-5 lg:-mt-24 space-y-8 group">
              <div className={`aspect-[3/4] w-full rounded-sm bg-cover bg-center border transition-all duration-700 ${currentStyles.borderThin} relative overflow-hidden shadow-2xl`}>
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] ease-out scale-100 group-hover:scale-105"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80')" }}
                />
                <div className={`absolute inset-0 transition-all duration-700 ${theme === 'dark' ? 'bg-[#060608]/85' : 'bg-[#fbfaf7]/85'} backdrop-blur-[2px] flex items-center justify-center p-8`}>
                  <span className={`px-4 py-2 border text-[10px] md:text-xs tracking-[0.25em] uppercase font-mono transition-colors duration-700 ${theme === 'dark' ? 'text-[#ebdcc5] border-[#c8891e]/15 bg-black/45' : 'text-[#b07b22] border-[#b07b22]/20 bg-white/45'}`}>
                    {t.architecturalPhase}
                  </span>
                </div>
                <div className={`absolute top-6 right-6 ${theme === 'dark' ? 'text-white/10' : 'text-black/5'} text-6xl font-serif select-none`}>03</div>
              </div>

              <div className="space-y-4">
                <span className={`text-xs md:text-sm font-mono tracking-[0.2em] uppercase block transition-colors duration-700 ${currentStyles.goldText}`}>
                  {t.atelier03Label}
                </span>
                <h3 className={`font-serif text-3xl font-light tracking-tight transition-colors duration-700 ${currentStyles.whiteText}`}>
                  {t.work3Title}
                </h3>
                <p className={`transition-colors duration-700 ${currentStyles.textSecondary} text-xs md:text-sm font-light leading-relaxed tracking-wide`}>
                  {t.work3Desc}
                </p>
                <div className="pt-2">
                  <span className={`inline-block text-[10px] md:text-xs tracking-[0.18em] font-mono uppercase transition-all duration-700 border ${theme === 'dark' ? 'text-zinc-550 border-white/5 bg-black/20' : 'text-zinc-400 border-black/5 bg-white/20'} px-3 py-1.5 rounded-sm`}>
                    {t.designBlueprintCompleted}
                  </span>
                </div>
              </div>
            </div>

            {/* WORK 04: Aether Studio (Right Column, Span 7, Offset Downward) */}
            <div className="lg:col-span-7 lg:mt-12 space-y-8 group">
              <div className={`aspect-[16/10] w-full rounded-sm bg-cover bg-center border transition-all duration-700 ${currentStyles.borderThin} relative overflow-hidden shadow-2xl`}>
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] ease-out scale-100 group-hover:scale-105"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1000&q=80')" }}
                />
                <div className={`absolute inset-0 transition-all duration-700 ${theme === 'dark' ? 'bg-[#060608]/85' : 'bg-[#fbfaf7]/85'} backdrop-blur-[2px] flex items-center justify-center p-8`}>
                  <span className={`px-4 py-2 border text-[10px] md:text-xs tracking-[0.25em] uppercase font-mono transition-colors duration-700 ${theme === 'dark' ? 'text-[#ebdcc5] border-[#c8891e]/15 bg-black/45' : 'text-[#b07b22] border-[#b07b22]/20 bg-white/45'}`}>
                    {t.creativePhase}
                  </span>
                </div>
                <div className={`absolute top-6 right-6 ${theme === 'dark' ? 'text-white/10' : 'text-black/5'} text-6xl font-serif select-none`}>04</div>
              </div>

              <div className="space-y-4 max-w-xl">
                <span className={`text-xs md:text-sm font-mono tracking-[0.2em] uppercase block transition-colors duration-700 ${currentStyles.goldText}`}>
                  {t.atelier04Label}
                </span>
                <h3 className={`font-serif text-3xl font-light tracking-tight transition-colors duration-700 ${currentStyles.whiteText}`}>
                  {t.work4Title}
                </h3>
                <p className={`transition-colors duration-700 ${currentStyles.textSecondary} text-xs md:text-sm font-light leading-relaxed tracking-wide`}>
                  {t.work4Desc}
                </p>
                <div className="flex gap-6 pt-2">
                  <span className={`inline-block text-[10px] md:text-xs tracking-[0.18em] font-mono uppercase transition-all duration-700 border ${theme === 'dark' ? 'text-zinc-550 border-white/5 bg-black/20' : 'text-zinc-400 border-black/5 bg-white/20'} px-3 py-1.5 rounded-sm`}>
                    {t.typographySystemLocked}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* The Craft Section - Modernist Specification Grid */}
      <section id="craft" className={`border-t transition-colors duration-700 ${currentStyles.borderThin} ${currentStyles.bgSection} py-28 relative`}>
        <div className="max-w-7xl mx-auto px-8 lg:px-20">
          
          <div className="mb-24 space-y-4">
            <span className={`text-xs md:text-sm font-sans font-bold tracking-[0.25em] uppercase block transition-colors duration-700 ${currentStyles.goldText}`}>
              {t.craftLabel}
            </span>
            <h2 className={`text-4xl ${fontSerif} font-light tracking-tight transition-colors duration-700 ${currentStyles.whiteText}`}>
              {t.craftHeading}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-16 md:gap-8 lg:gap-16">
            {[
              { 
                num: "I", 
                title: t.craft1Title, 
                desc: t.craft1Desc 
              },
              { 
                num: "II", 
                title: t.craft2Title, 
                desc: t.craft2Desc 
              },
              { 
                num: "III", 
                title: t.craft3Title, 
                desc: t.craft3Desc 
              }
            ].map(item => (
              <div key={item.title} className={`space-y-6 md:px-4 lg:px-0 md:border-l transition-colors duration-700 ${currentStyles.borderThin} first:border-0`}>
                <span className={`font-serif italic text-4xl block transition-colors duration-700 ${currentStyles.goldText}`}>{item.num}</span>
                <h3 className={`text-lg font-serif font-light transition-colors duration-700 ${currentStyles.whiteText}`}>{item.title}</h3>
                <p className={`transition-colors duration-700 ${currentStyles.textSecondary} text-sm md:text-base font-light leading-relaxed tracking-wider`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Standards Section */}
      <section id="standards" className={`border-t transition-colors duration-700 ${currentStyles.borderThin} ${currentStyles.bgSection} py-28 relative`}>
        <div className="max-w-7xl mx-auto px-8 lg:px-20">
          
          <div className="mb-24 space-y-4">
            <span className={`text-xs md:text-sm font-sans font-bold tracking-[0.25em] uppercase block transition-colors duration-700 ${currentStyles.goldText}`}>
              {t.standardsLabel}
            </span>
            <h2 className={`text-4xl ${fontSerif} font-light tracking-tight transition-colors duration-700 ${currentStyles.whiteText}`}>
              {t.standardsHeading}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            {[
              { 
                num: "01", 
                title: t.standard1Title, 
                desc: t.standard1Desc 
              },
              { 
                num: "02", 
                title: t.standard2Title, 
                desc: t.standard2Desc 
              },
              { 
                num: "03", 
                title: t.standard3Title, 
                desc: t.standard3Desc 
              },
              { 
                num: "04", 
                title: t.standard4Title, 
                desc: t.standard4Desc 
              }
            ].map(item => (
              <div key={item.title} className={`space-y-6 md:border-l transition-colors duration-700 ${currentStyles.borderThin} first:border-0 md:pl-6 first:pl-0`}>
                <span className={`font-mono text-sm tracking-widest block transition-colors duration-700 ${currentStyles.goldText}`}>[ {item.num} ]</span>
                <h3 className={`text-lg font-serif font-light transition-colors duration-700 ${currentStyles.whiteText}`}>{item.title}</h3>
                <p className={`transition-colors duration-700 ${currentStyles.textSecondary} text-xs md:text-sm font-light leading-relaxed tracking-wider`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry / Letter Section */}
      <section id="inquire" className={`border-t transition-colors duration-700 ${currentStyles.borderThin} py-28`}>
        <div className="max-w-4xl mx-auto px-8">
          
          <div className="text-center mb-20 space-y-4">
            <span className={`text-xs md:text-sm font-sans font-bold tracking-[0.25em] uppercase block transition-colors duration-700 ${currentStyles.goldText}`}>
              {t.conversationLabel}
            </span>
            <h2 className={`text-3xl md:text-4xl ${fontSerif} font-light tracking-tight transition-colors duration-700 ${currentStyles.whiteText}`}>
              {t.conversationHeading}
            </h2>
          </div>

          {/* Conversational Letter Form */}
          <form className={`transition-all duration-700 ${currentStyles.formBg} p-8 md:p-16 rounded-sm shadow-2xl ${fontSerif} text-[#ebdcc5] text-xl md:text-2xl leading-[2.2] space-y-12`} style={{ color: theme === 'light' ? '#3a3832' : undefined }}>
            <div>
              {t.formIam}{" "}
              <input
                required
                type="text"
                placeholder={t.formNamePlaceholder}
                className={`bg-transparent border-b transition-colors duration-300 ${currentStyles.inputBorder} ${theme === 'dark' ? 'text-white focus:border-white' : 'text-black focus:border-black'} px-2 py-0.5 text-lg md:text-xl ${fontSans}`}
              />
              {t.formCollaborateText}
              <input
                required
                type="text"
                placeholder={t.formBusinessNichePlaceholder}
                className={`bg-transparent border-b transition-colors duration-300 ${currentStyles.inputBorder} ${theme === 'dark' ? 'text-white focus:border-white' : 'text-black focus:border-black'} px-2 py-0.5 text-lg md:text-xl ${fontSans} min-w-[200px]`}
              />
              .
            </div>

            <div>
              {t.formOperationsSuiteText}
              <select className={`${currentStyles.selectBg} border-b transition-colors duration-300 ${currentStyles.inputBorder} ${theme === 'dark' ? 'text-white focus:border-white' : 'text-black focus:border-black'} px-2 py-0.5 text-base md:text-lg ${fontSans} cursor-pointer`}>
                <option>{lang === 'en' ? 'Full Client CRM + Booking Payments' : 'Full Client CRM + Booking Payments'}</option>
                <option>{lang === 'en' ? 'Immersive WebGL Storytelling' : 'Immersive WebGL Storytelling'}</option>
                <option>{lang === 'en' ? 'AI Copywriters & Blogs Autopilot' : 'AI Copywriters & Blogs Autopilot'}</option>
                <option>{lang === 'en' ? 'Bespoke Creative Integrations' : 'Bespoke Creative Integrations'}</option>
              </select>
              {t.formLaunchAimText}
              <select className={`${currentStyles.selectBg} border-b transition-colors duration-300 ${currentStyles.inputBorder} ${theme === 'dark' ? 'text-white focus:border-white' : 'text-black focus:border-black'} px-2 py-0.5 text-base md:text-lg ${fontSans} cursor-pointer`}>
                <option>{lang === 'en' ? 'Immediate (1-2 weeks)' : 'Immediate (1-2 weeks)'}</option>
                <option>{lang === 'en' ? 'Short term (3-6 weeks)' : 'Short term (3-6 weeks)'}</option>
                <option>{lang === 'en' ? 'Planning phase (Next 3 months)' : 'Planning phase (Next 3 months)'}</option>
              </select>
              .
            </div>

            <div>
              {t.formContactText}
              <input
                required
                type="email"
                placeholder={t.formEmailPlaceholder}
                className={`bg-transparent border-b transition-colors duration-300 ${currentStyles.inputBorder} ${theme === 'dark' ? 'text-white focus:border-white' : 'text-black focus:border-black'} px-2 py-0.5 text-lg md:text-xl ${fontSans} min-w-[200px]`}
              />
              {t.formVisionText}
            </div>

            <textarea
              placeholder={t.formTextareaPlaceholder}
              rows={4}
              className={`w-full bg-transparent border rounded-sm p-6 text-sm transition-colors duration-300 ${theme === 'dark' ? 'border-white/5 text-zinc-400 focus:border-[#c8891e]/60' : 'border-black/5 text-zinc-650 focus:border-[#b07b22]/60'} resize-none leading-relaxed tracking-wider ${fontSans}`}
            />

            <div className="pt-6">
              <button
                type="submit"
                className={`w-full ${currentStyles.btnBg} ${fontSans} font-bold text-sm tracking-[0.25em] uppercase py-5 rounded-sm transition-all duration-300 cursor-pointer shadow-lg`}
              >
                {t.formSubmitButton}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t transition-colors duration-700 ${currentStyles.borderThin} ${currentStyles.bgFooter} py-16 text-zinc-600 text-xs font-semibold relative z-20`}>
        <div className="max-w-7xl mx-auto px-8 lg:px-20 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className={`font-serif tracking-[0.3em] font-normal text-base md:text-lg uppercase transition-colors duration-700 ${currentStyles.whiteText}`}>
              {t.navLogo}
            </span>
            <span className={`text-[10px] md:text-xs tracking-[0.2em] font-mono mt-2 uppercase transition-colors duration-700 ${currentStyles.textSecondary}`}>
              {t.footerLogoSub}{new Date().getFullYear()}
            </span>
          </div>
          <div className="flex gap-8 text-xs md:text-sm tracking-widest uppercase font-mono">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={`transition-colors duration-300 ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'}`}>LinkedIn</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={`transition-colors duration-300 ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'}`}>GitHub</a>
            <a href="https://upwork.com" target="_blank" rel="noopener noreferrer" className={`transition-colors duration-300 ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'}`}>Upwork</a>
            <a href="https://fiverr.com" target="_blank" rel="noopener noreferrer" className={`transition-colors duration-300 ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'}`}>Fiverr</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
