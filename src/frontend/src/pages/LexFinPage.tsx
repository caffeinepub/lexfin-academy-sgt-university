import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  BarChart3,
  BookOpen,
  Brain,
  CheckCircle,
  CheckCircle2,
  ChevronDown,
  Cpu,
  FileText,
  Globe,
  Lightbulb,
  Loader2,
  Menu,
  Monitor,
  Scale,
  Shield,
  TrendingUp,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Role } from "../backend";
import { useIsRegistered, useRegister } from "../hooks/useQueries";

// ─── Fade-in on scroll wrapper ───────────────────────────────────────────────
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionHeading({
  label,
  title,
  subtitle,
  light = false,
}: {
  label: string;
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <FadeIn className="text-center mb-14">
      <span
        className={`inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4 px-3 py-1 rounded-full border ${
          light
            ? "text-gold border-gold/40 bg-gold/10"
            : "text-primary border-primary/20 bg-primary/5"
        }`}
      >
        {label}
      </span>
      <h2
        className={`font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-4 ${
          light ? "text-white" : "text-primary"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`max-w-2xl mx-auto text-base md:text-lg leading-relaxed ${
            light ? "text-white/70" : "text-muted-foreground"
          }`}
        >
          {subtitle}
        </p>
      )}
    </FadeIn>
  );
}

// ─── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { id: "about", label: "About", ocid: "nav.about.link" },
    { id: "roadmap", label: "Roadmap", ocid: "nav.roadmap.link" },
    { id: "objectives", label: "Objectives", ocid: "nav.objectives.link" },
    { id: "timeline", label: "Timeline", ocid: "nav.timeline.link" },
    { id: "team", label: "Team", ocid: "nav.team.link" },
    { id: "register", label: "Register", ocid: "nav.register.link" },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-card border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-md">
              <span className="text-white font-display font-bold text-sm tracking-tight">
                LFA
              </span>
            </div>
            <span
              className={`font-display font-semibold text-lg transition-colors ${
                scrolled ? "text-primary" : "text-white"
              }`}
            >
              LexFin Academy
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <button
                type="button"
                key={link.id}
                data-ocid={link.ocid}
                onClick={() => scrollTo(link.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all hover:bg-primary/10 ${
                  scrolled
                    ? "text-foreground hover:text-primary"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                } ${
                  link.id === "register"
                    ? scrolled
                      ? "bg-primary text-white hover:bg-primary/90 hover:text-white ml-2"
                      : "bg-gold text-navy-deep hover:bg-gold/90 ml-2"
                    : ""
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className={`md:hidden p-2 rounded-lg ${
              scrolled ? "text-primary" : "text-white"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-white border-b border-border"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {links.map((link) => (
                <button
                  type="button"
                  key={link.id}
                  data-ocid={link.ocid}
                  onClick={() => scrollTo(link.id)}
                  className="text-left px-4 py-2.5 text-sm font-medium text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden hero-pattern"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.18_0.06_258/_0.92)] via-[oklch(0.22_0.07_265/_0.88)] to-[oklch(0.15_0.05_250/_0.95)]" />

      {/* Decorative gold lines */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-70" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-gold/10 rounded-full" />
      <div className="absolute bottom-32 right-16 w-48 h-48 border border-white/5 rounded-full" />
      <div className="absolute top-1/3 right-8 w-16 h-16 border border-gold/15 rotate-45" />
      <div className="absolute bottom-1/4 left-12 w-24 h-24 border border-white/5 rotate-12" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* University / event label */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-8"
        >
          <span className="text-xs font-semibold tracking-[0.18em] uppercase text-white/60 border border-white/15 rounded-full px-4 py-1.5">
            SGT University
          </span>
          <span className="text-white/30">·</span>
          <span className="text-xs font-semibold tracking-[0.18em] uppercase text-gold/80 border border-gold/20 rounded-full px-4 py-1.5">
            Synergy Gyanotsav 2026
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-white leading-[0.95] tracking-tight mb-6"
        >
          LexFin
          <span className="block text-gold">Academy</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="text-base sm:text-lg md:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed mb-4"
        >
          A Unified AI-Driven Framework for Regulatory-Mapped Financial Literacy
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="text-sm sm:text-base text-gold/80 font-medium tracking-wide mb-10"
        >
          Bridging Law, Finance &amp; Technology through AI
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-3 bg-gold text-navy-deep font-semibold text-sm rounded-lg hover:bg-gold-light transition-all shadow-gold hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            Explore Project
          </button>
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("register")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-3 border border-white/25 text-white font-medium text-sm rounded-lg hover:bg-white/10 transition-all"
          >
            Join the Initiative
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-white/30 tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.8,
              ease: "easeInOut",
            }}
            className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────
function AboutSection() {
  const badges = [
    { icon: Users, label: "Cross-Departmental", desc: "Law × Engineering" },
    { icon: Brain, label: "AI-Driven", desc: "NLP & ML powered" },
    { icon: Scale, label: "Regulatory-Mapped", desc: "SEBI, RBI compliance" },
    { icon: BarChart3, label: "2026 Initiative", desc: "Gyanotsav Project" },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="About the Project"
          title="A Vision for Financial Literacy"
          subtitle="Harnessing AI to democratize regulatory-mapped financial education across disciplines."
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Description */}
          <FadeIn delay={0.1}>
            <div className="space-y-5">
              <div className="accent-line" />
              <p className="text-foreground/80 leading-relaxed text-lg">
                <strong className="text-primary font-semibold">
                  LexFin Academy
                </strong>{" "}
                is a pioneering cross-departmental initiative at SGT University,
                uniting the Law Department and Engineering Department under a
                single vision: making financial literacy accessible,
                regulatory-aware, and AI-powered.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The project builds an intelligent framework that maps India's
                financial regulatory landscape — SEBI guidelines, RBI
                directives, and other compliance mandates — into digestible,
                interactive learning modules. Natural Language Processing (NLP)
                parses complex legal text into learner-friendly content.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                By bridging policy expertise (Law) and technical implementation
                (Engineering), LexFin Academy creates a sustainable model for
                financial education that equips students and faculty with
                21st-century regulatory intelligence.
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-xs font-medium">
                  Project Proposal 2026
                </Badge>
                <Badge variant="secondary" className="text-xs font-medium">
                  Synergy Gyanotsav
                </Badge>
                <Badge variant="secondary" className="text-xs font-medium">
                  Inter-Disciplinary
                </Badge>
              </div>
            </div>
          </FadeIn>

          {/* Right: Stat cards */}
          <div className="grid grid-cols-2 gap-4">
            {badges.map((b, i) => (
              <FadeIn key={b.label} delay={0.15 + i * 0.08}>
                <div className="group p-5 rounded-xl border border-border bg-card hover:border-primary/20 hover:shadow-card transition-all cursor-default">
                  <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center mb-3 group-hover:bg-primary/15 transition-colors">
                    <b.icon size={20} className="text-primary" />
                  </div>
                  <p className="font-display font-semibold text-primary text-base mb-0.5">
                    {b.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{b.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Three-Layer Roadmap Section ──────────────────────────────────────────────
const roadmapLayers = [
  {
    numeral: "I",
    title: "Text-Based Knowledge",
    subtitle: "Simplification",
    icon: BookOpen,
    accentColor: "text-primary",
    accentBg: "bg-primary/10",
    accentBorder: "border-primary/25",
    numeralColor: "text-primary/20",
    desc: "Regulatory-heavy financial texts are processed by NLP and simplified into clear, structured, learner-friendly knowledge modules. Complex SEBI/RBI directives are broken down into digestible reading material tailored to each learner's background.",
    tags: ["NLP Processing", "SEBI / RBI", "Structured Modules"],
  },
  {
    numeral: "II",
    title: "Audio-Visual Modules",
    subtitle: "Enhancement",
    icon: Monitor,
    accentColor: "text-amber-600",
    accentBg: "bg-amber-500/10",
    accentBorder: "border-amber-500/25",
    numeralColor: "text-amber-500/20",
    desc: "Simplified content is enriched with curated video explainers, infographics, and audio walkthroughs. Visual storytelling makes regulatory concepts memorable and easier to retain across diverse learning styles.",
    tags: ["Video Explainers", "Infographics", "Audio Walkthroughs"],
  },
  {
    numeral: "III",
    title: "Gamification",
    subtitle: "Validation",
    icon: Trophy,
    accentColor: "text-emerald-500",
    accentBg: "bg-emerald-500/10",
    accentBorder: "border-emerald-500/25",
    numeralColor: "text-emerald-500/20",
    desc: "Learners validate their understanding through quizzes, scenario-based challenges, leaderboards, and interactive assessments. Gamification drives engagement and provides measurable proof of competency.",
    tags: ["Quizzes", "Leaderboards", "Scenario Challenges"],
  },
];

function ThreeLayerRoadmapSection() {
  return (
    <section id="roadmap" className="py-20 md:py-28 section-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Learning Methodology"
          title="The Three-Layer Roadmap"
          subtitle="A structured approach to deep comprehension and long-term retention."
          light
        />

        {/* Cards + connectors */}
        <div className="relative flex flex-col md:flex-row items-stretch gap-0">
          {roadmapLayers.map((layer, i) => {
            const Icon = layer.icon;
            const isLast = i === roadmapLayers.length - 1;
            const ocid = `roadmap.layer.${i + 1}`;

            return (
              <div
                key={layer.numeral}
                className="flex flex-col md:flex-row items-center flex-1 min-w-0"
              >
                {/* Card */}
                <FadeIn delay={0.1 + i * 0.15} className="flex-1 w-full">
                  <motion.div
                    data-ocid={ocid}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className={`group relative h-full rounded-2xl border ${
                      layer.accentBorder
                    } bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all overflow-hidden cursor-default`}
                  >
                    {/* Large background numeral */}
                    <span
                      className={`absolute top-3 right-4 font-display font-bold text-[5rem] leading-none select-none pointer-events-none ${
                        layer.numeralColor
                      }`}
                    >
                      {layer.numeral}
                    </span>

                    <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
                      {/* Layer badge */}
                      <div className="flex items-center gap-3 mb-5">
                        <div
                          className={`w-11 h-11 rounded-xl ${layer.accentBg} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}
                        >
                          <Icon size={22} className={layer.accentColor} />
                        </div>
                        <div>
                          <span
                            className={`text-[10px] font-bold tracking-[0.18em] uppercase ${
                              layer.accentColor
                            } opacity-80`}
                          >
                            Layer {layer.numeral}
                          </span>
                          <p className="text-[11px] text-white/50 leading-tight">
                            {layer.subtitle}
                          </p>
                        </div>
                      </div>

                      <h3 className="font-display font-semibold text-white text-xl mb-3 leading-tight">
                        {layer.title}
                      </h3>

                      <p className="text-white/65 text-sm leading-relaxed flex-1 mb-5">
                        {layer.desc}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {layer.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`text-[10px] font-semibold tracking-wide px-2.5 py-0.5 rounded-full border ${
                              layer.accentBorder
                            } ${layer.accentColor} opacity-80`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </FadeIn>

                {/* Connector arrow — desktop: horizontal right arrow; mobile: down arrow */}
                {!isLast && (
                  <FadeIn delay={0.2 + i * 0.15}>
                    {/* Desktop horizontal arrow */}
                    <div className="hidden md:flex flex-col items-center justify-center px-3 flex-shrink-0">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-px h-6 bg-gradient-to-b from-white/10 to-white/30" />
                        <div className="relative">
                          <div className="w-8 h-px bg-gradient-to-r from-white/30 via-gold/60 to-white/30" />
                          <div
                            className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0"
                            style={{
                              borderTop: "4px solid transparent",
                              borderBottom: "4px solid transparent",
                              borderLeft: "6px solid oklch(0.78 0.14 85)",
                            }}
                          />
                        </div>
                        <div className="w-px h-6 bg-gradient-to-b from-white/30 to-white/10" />
                      </div>
                    </div>

                    {/* Mobile vertical arrow */}
                    <div className="md:hidden flex flex-col items-center py-3 w-full">
                      <div className="h-6 w-px bg-gradient-to-b from-white/30 via-gold/50 to-white/30" />
                      <ChevronDown size={18} className="text-gold/70 -mt-1" />
                    </div>
                  </FadeIn>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom flow label */}
        <FadeIn delay={0.55}>
          <div className="mt-10 flex items-center justify-center gap-3">
            <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-white/20" />
            <p className="text-xs text-white/40 font-medium tracking-widest uppercase">
              Progressive Learning Pipeline
            </p>
            <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-white/20" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Objectives Section ───────────────────────────────────────────────────────
const objectivesData = {
  academic: {
    icon: BookOpen,
    color: "text-primary",
    bg: "bg-primary/8",
    goals: [
      {
        icon: BookOpen,
        title: "Curriculum Integration",
        desc: "Embed financial literacy modules into existing Law and Engineering syllabi for holistic learning.",
      },
      {
        icon: FileText,
        title: "Learning Module Design",
        desc: "Develop structured, progressive modules covering personal finance, investment law, and compliance.",
      },
      {
        icon: Users,
        title: "Faculty Capacity Building",
        desc: "Train faculty across departments to deliver AI-assisted financial literacy sessions.",
      },
      {
        icon: CheckCircle,
        title: "Assessment Framework",
        desc: "Build competency assessments aligned with regulatory knowledge benchmarks.",
      },
    ],
  },
  regulatory: {
    icon: Scale,
    color: "text-amber-700",
    bg: "bg-amber-50",
    goals: [
      {
        icon: Scale,
        title: "SEBI Regulation Mapping",
        desc: "Systematically map SEBI guidelines into learner-readable frameworks with contextual explanations.",
      },
      {
        icon: Shield,
        title: "RBI Compliance Layer",
        desc: "Integrate RBI monetary policy and banking regulations as core knowledge pillars.",
      },
      {
        icon: Globe,
        title: "Cross-Regulatory Index",
        desc: "Build an indexed repository linking regulations to practical financial scenarios.",
      },
      {
        icon: FileText,
        title: "Legal Text Annotation",
        desc: "Annotate complex regulatory documents with layperson summaries and case references.",
      },
    ],
  },
  technology: {
    icon: Cpu,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    goals: [
      {
        icon: Brain,
        title: "AI Framework Development",
        desc: "Build a core AI engine that processes, categorizes, and serves financial regulatory content.",
      },
      {
        icon: Cpu,
        title: "NLP for Legal Text",
        desc: "Deploy NLP pipelines to parse dense regulatory language into structured, searchable knowledge.",
      },
      {
        icon: BarChart3,
        title: "Adaptive Learning Engine",
        desc: "Develop personalized learning paths based on user role, department, and knowledge gaps.",
      },
      {
        icon: Globe,
        title: "Platform Integration",
        desc: "Integrate the AI system into accessible web/mobile platforms for campus-wide deployment.",
      },
    ],
  },
  impact: {
    icon: TrendingUp,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    goals: [
      {
        icon: TrendingUp,
        title: "Student Empowerment",
        desc: "Equip students with practical financial skills applicable in law firms, banks, and startups.",
      },
      {
        icon: Users,
        title: "Industry Readiness",
        desc: "Bridge the gap between academic learning and industry expectations in finance and compliance.",
      },
      {
        icon: Lightbulb,
        title: "Policy Innovation",
        desc: "Generate research insights on AI-driven education models for adoption at national institutions.",
      },
      {
        icon: Globe,
        title: "Scalable Model",
        desc: "Create a replicable framework that other universities can adopt for financial literacy programs.",
      },
    ],
  },
};

function ObjectivesSection() {
  return (
    <section id="objectives" className="py-20 md:py-28 section-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Our Objectives"
          title="What LexFin Academy Achieves"
          subtitle="Four pillars driving regulatory-mapped financial literacy through AI."
          light
        />

        <FadeIn delay={0.15}>
          <Tabs defaultValue="academic" className="w-full">
            <TabsList className="flex w-full flex-wrap gap-1 bg-white/8 border border-white/12 p-1.5 rounded-xl mb-8 h-auto">
              {[
                {
                  value: "academic",
                  label: "Academic",
                  ocid: "objectives.academic.tab",
                },
                {
                  value: "regulatory",
                  label: "Regulatory",
                  ocid: "objectives.regulatory.tab",
                },
                {
                  value: "technology",
                  label: "Technology",
                  ocid: "objectives.technology.tab",
                },
                {
                  value: "impact",
                  label: "Impact",
                  ocid: "objectives.impact.tab",
                },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  data-ocid={tab.ocid}
                  className="flex-1 min-w-[100px] text-white/60 data-[state=active]:text-navy-deep data-[state=active]:bg-white rounded-lg font-medium transition-all"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(objectivesData).map(([key, data]) => (
              <TabsContent key={key} value={key}>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                  {data.goals.map((goal, i) => (
                    <motion.div
                      key={goal.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.07 }}
                    >
                      <Card className="h-full bg-white/95 border-0 shadow-card hover:shadow-gold hover:-translate-y-1 transition-all">
                        <CardHeader className="pb-2">
                          <div
                            className={`w-10 h-10 rounded-lg ${data.bg} flex items-center justify-center mb-1`}
                          >
                            <goal.icon size={18} className={data.color} />
                          </div>
                          <CardTitle className="text-sm font-semibold text-primary leading-tight">
                            {goal.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {goal.desc}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Timeline ─────────────────────────────────────────────────────────────────
const phases = [
  {
    phase: "Phase 1",
    date: "January 2026",
    title: "Project Kickoff & Team Formation",
    desc: "Formal launch of LexFin Academy. Cross-departmental team onboarding, role assignments, and initial stakeholder alignment meeting.",
    icon: Users,
    status: "completed",
  },
  {
    phase: "Phase 2",
    date: "February 2026",
    title: "Research & Framework Design",
    desc: "Deep-dive into SEBI, RBI, and financial regulation corpus. Design the AI framework architecture and define the regulatory mapping schema.",
    icon: FileText,
    status: "active",
  },
  {
    phase: "Phase 3",
    date: "March 2026",
    title: "AI Model Development",
    desc: "Build and train the NLP model for legal text parsing. Develop the adaptive learning engine and knowledge graph for regulatory content.",
    icon: Cpu,
    status: "upcoming",
  },
  {
    phase: "Phase 4",
    date: "April 2026",
    title: "Pilot Testing & Feedback",
    desc: "Deploy the platform to a pilot cohort of Law and Engineering students. Collect feedback, iterate on UX, and refine the AI model accuracy.",
    icon: BarChart3,
    status: "upcoming",
  },
  {
    phase: "Phase 5",
    date: "May 2026",
    title: "Launch & Presentation at Gyanotsav",
    desc: "Full launch of LexFin Academy. Presentation of the project at Synergy Gyanotsav 2026, showcasing outcomes, impact metrics, and future roadmap.",
    icon: TrendingUp,
    status: "upcoming",
  },
];

function TimelineSection() {
  return (
    <section id="timeline" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Project Roadmap"
          title="Our Journey to Launch"
          subtitle="Five strategic phases from inception to presentation at Synergy Gyanotsav 2026."
        />

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px timeline-line md:-translate-x-px" />

          <div className="space-y-8">
            {phases.map((phase, i) => (
              <FadeIn key={phase.phase} delay={i * 0.1}>
                <div
                  className={`relative flex gap-6 md:gap-0 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="flex-shrink-0 relative z-10 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-4">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all ${
                        phase.status === "completed"
                          ? "bg-primary border-primary milestone-dot"
                          : phase.status === "active"
                            ? "bg-gold border-gold milestone-dot"
                            : "bg-white border-border"
                      }`}
                    >
                      <phase.icon
                        size={22}
                        className={
                          phase.status === "upcoming"
                            ? "text-muted-foreground"
                            : "text-white"
                        }
                      />
                    </div>
                  </div>

                  {/* Content card */}
                  <div
                    className={`flex-1 md:w-[calc(50%-48px)] ${
                      i % 2 === 0
                        ? "md:mr-auto md:pr-12"
                        : "md:ml-auto md:pl-12"
                    }`}
                  >
                    <Card className="border-border hover:border-primary/20 hover:shadow-card transition-all">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              phase.status === "completed"
                                ? "border-primary/30 text-primary bg-primary/5"
                                : phase.status === "active"
                                  ? "border-gold/50 text-amber-700 bg-gold/10"
                                  : "border-border text-muted-foreground"
                            }`}
                          >
                            {phase.phase}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {phase.date}
                          </span>
                        </div>
                        <CardTitle className="text-base text-primary">
                          {phase.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {phase.desc}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Team Section ─────────────────────────────────────────────────────────────
const team = [
  {
    name: "Vaishali Sahu",
    role: "Project PI",
    department: "Law Department",
    initials: "VS",
    color: "bg-primary",
    bio: "Principal Investigator leading the LexFin Academy initiative, driving the vision for AI-powered regulatory financial literacy.",
  },
  {
    name: "Mr. Satyam Sinha",
    role: "Co-PI",
    department: "Law Department",
    initials: "SS",
    color: "bg-navy-mid",
    bio: "Co-Principal Investigator contributing expertise in financial law and regulatory compliance framework design.",
  },
  {
    name: "Ms. Rakhi",
    role: "Co-PI",
    department: "Law Department",
    initials: "RK",
    color: "bg-accent",
    bio: "Co-Principal Investigator specializing in legal research and curriculum integration for interdisciplinary financial education.",
  },
];

function TeamSection() {
  return (
    <section id="team" className="py-20 md:py-28 section-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Our Team"
          title="The Minds Behind LexFin"
          subtitle="Cross-departmental expertise driving this transformative initiative."
          light
        />

        {/* PI Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {team.map((member, i) => (
            <FadeIn key={member.name} delay={i * 0.1}>
              <Card className="bg-white/95 border-0 shadow-card hover:shadow-gold hover:-translate-y-1 transition-all text-center h-full">
                <CardContent className="pt-8 pb-6">
                  <div
                    className={`w-16 h-16 ${member.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <span className="text-white font-display font-bold text-lg">
                      {member.initials}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-primary text-lg mb-0.5">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-gold mb-1 uppercase tracking-wider">
                    {member.role}
                  </p>
                  <Badge variant="secondary" className="text-xs mb-3">
                    {member.department}
                  </Badge>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>

        {/* Student Team Banner */}
        <FadeIn delay={0.35}>
          <div className="rounded-2xl border border-gold/25 bg-white/5 backdrop-blur-sm p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 flex-shrink-0 rounded-2xl bg-gold/20 flex items-center justify-center">
              <Users size={28} className="text-gold" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="font-display font-semibold text-white text-xl mb-2">
                Student Execution Team
              </h3>
              <p className="text-white/70 leading-relaxed">
                A synergistic collaboration between students of the{" "}
                <strong className="text-gold">Law Department</strong> and the{" "}
                <strong className="text-gold">Engineering Department</strong> to
                bridge policy and technology. This cross-disciplinary team
                serves as the implementation backbone of LexFin Academy —
                combining legal acumen with technical innovation.
              </p>
            </div>
            <div className="flex-shrink-0 flex flex-wrap gap-2 justify-center">
              <Badge className="bg-primary/30 text-white border-0">
                Law Students
              </Badge>
              <Badge className="bg-gold/20 text-gold border-0">
                Engg. Students
              </Badge>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Registration Section ─────────────────────────────────────────────────────
function RegistrationSection() {
  const { data: isRegistered, isLoading: checkingRegistration } =
    useIsRegistered();
  const {
    mutateAsync: register,
    isPending,
    isError,
    isSuccess,
  } = useRegister();

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    role: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.department || !form.role) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await register({
        name: form.name,
        email: form.email,
        department: form.department,
        role: form.role as Role,
      });
      toast.success("Successfully registered for LexFin Academy!");
    } catch {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <section id="register" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Get Involved"
          title="Join the Initiative"
          subtitle="Faculty, administration, and students are all welcome to be part of this transformative project."
        />

        <div className="max-w-xl mx-auto">
          {checkingRegistration ? (
            <div
              data-ocid="registration.loading_state"
              className="flex flex-col items-center justify-center py-16 gap-4"
            >
              <Loader2 size={32} className="text-primary animate-spin" />
              <p className="text-muted-foreground text-sm">
                Checking registration status…
              </p>
            </div>
          ) : isRegistered || isSuccess ? (
            <FadeIn>
              <div
                data-ocid="registration.success_state"
                className="flex flex-col items-center justify-center py-16 gap-4 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
                  <CheckCircle2 size={32} className="text-emerald-600" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-primary">
                  {isRegistered
                    ? "You're Already Registered"
                    : "Registration Successful!"}
                </h3>
                <p className="text-muted-foreground max-w-sm leading-relaxed">
                  {isRegistered
                    ? "You have already joined the LexFin Academy initiative. We look forward to your participation!"
                    : "Welcome aboard! You have successfully joined the LexFin Academy initiative. Watch for updates about Synergy Gyanotsav 2026."}
                </p>
                <Badge variant="secondary" className="text-xs">
                  Synergy Gyanotsav 2026
                </Badge>
              </div>
            </FadeIn>
          ) : (
            <FadeIn>
              <Card className="border-border shadow-card">
                <CardContent className="pt-8 pb-8">
                  {isError && (
                    <div
                      data-ocid="registration.error_state"
                      className="flex items-center gap-3 p-3 rounded-lg bg-destructive/8 border border-destructive/15 mb-6"
                    >
                      <AlertCircle
                        size={16}
                        className="text-destructive flex-shrink-0"
                      />
                      <p className="text-sm text-destructive">
                        Registration failed. Please try again.
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="reg-name" className="text-sm font-medium">
                        Full Name
                      </Label>
                      <Input
                        id="reg-name"
                        data-ocid="registration.name.input"
                        placeholder="e.g. Priya Sharma"
                        value={form.name}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, name: e.target.value }))
                        }
                        disabled={isPending}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label
                        htmlFor="reg-email"
                        className="text-sm font-medium"
                      >
                        Email Address
                      </Label>
                      <Input
                        id="reg-email"
                        data-ocid="registration.email.input"
                        type="email"
                        placeholder="you@sgtuniversity.ac.in"
                        value={form.email}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, email: e.target.value }))
                        }
                        disabled={isPending}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label
                        htmlFor="reg-department"
                        className="text-sm font-medium"
                      >
                        Department
                      </Label>
                      <Input
                        id="reg-department"
                        data-ocid="registration.department.input"
                        placeholder="e.g. Law, Computer Engineering, MBA…"
                        value={form.department}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, department: e.target.value }))
                        }
                        disabled={isPending}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium">Role</Label>
                      <Select
                        value={form.role}
                        onValueChange={(v) =>
                          setForm((p) => ({ ...p, role: v }))
                        }
                        disabled={isPending}
                      >
                        <SelectTrigger data-ocid="registration.role.select">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={Role.faculty}>
                            Faculty / Administration
                          </SelectItem>
                          <SelectItem value={Role.student}>Student</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      type="submit"
                      data-ocid="registration.submit_button"
                      disabled={isPending}
                      className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 mt-2"
                    >
                      {isPending ? (
                        <>
                          <Loader2 size={16} className="mr-2 animate-spin" />
                          Registering…
                        </>
                      ) : (
                        "Register for LexFin Academy"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-[oklch(0.16_0.05_258)] text-white/60 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-display font-bold text-xs">
                  LFA
                </span>
              </div>
              <span className="font-display font-semibold text-white text-base">
                LexFin Academy
              </span>
            </div>
            <p className="text-xs">
              Shree Guru Gobind Singh Tricentenary University
            </p>
            <p className="text-xs mt-0.5">
              Synergy Gyanotsav 2026 Project Proposal
            </p>
          </div>

          <div className="text-center">
            <p className="text-xs">LexFin Academy © {year} · SGT University</p>
            <p className="text-xs mt-1">
              Built with ❤️ using{" "}
              <a
                href={utmLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold/70 hover:text-gold transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            <Badge
              variant="outline"
              className="text-xs border-white/15 text-white/50"
            >
              Law Department
            </Badge>
            <Badge
              variant="outline"
              className="text-xs border-white/15 text-white/50"
            >
              Engineering Department
            </Badge>
            <Badge
              variant="outline"
              className="text-xs border-gold/25 text-gold/70"
            >
              AI-Driven
            </Badge>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function LexFinPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ThreeLayerRoadmapSection />
        <ObjectivesSection />
        <TimelineSection />
        <TeamSection />
        <RegistrationSection />
      </main>
      <Footer />
    </div>
  );
}
