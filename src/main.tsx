import React from "react";
import ReactDOM from "react-dom/client";
import { Film, Check } from "lucide-react";
import {
  SiClaude,
  SiGooglegemini,
  SiFigma,
} from "react-icons/si";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { Typewriter } from "@/components/ui/typewriter";
import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import "./globals.css";

/* ─── BRAND LOGO COMPONENTS (Apify + Clay are not in simple-icons) ─── */

const ApifyIcon = ({ size = 16 }: { size?: number | string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Apify"
  >
    <path
      d="M57.348 0H98.485C99.322 0 100 0.678 100 1.515V64.383C100 65.889 98.041 66.473 97.217 65.213L56.08 2.345C55.42 1.337 56.143 0 57.348 0Z"
      fill="currentColor"
    />
    <path
      d="M42.652 0H1.515C0.678 0 0 0.678 0 1.515V64.383C0 65.889 1.958 66.473 2.783 65.213L43.92 2.345C44.58 1.337 43.857 0 42.652 0Z"
      fill="currentColor"
      opacity="0.7"
    />
    <path
      d="M49.295 50.334L2.563 97.418C1.614 98.374 2.291 100 3.639 100H96.4C97.741 100 98.421 98.385 97.483 97.426L51.454 50.342C50.863 49.738 49.891 49.734 49.295 50.334Z"
      fill="currentColor"
      opacity="0.85"
    />
  </svg>
);

const ClayIcon = ({ size = 16 }: { size?: number | string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Clay"
  >
    <path
      d="M50 6c24.3 0 44 19.7 44 44s-19.7 44-44 44S6 74.3 6 50 25.7 6 50 6zm0 18c-14.4 0-26 11.6-26 26s11.6 26 26 26c8 0 15.2-3.6 20-9.3l-12-9c-2 2.3-4.8 3.7-8 3.7-5.8 0-10.5-4.7-10.5-10.5S44.2 39.4 50 39.4c3.2 0 6 1.4 8 3.7l12-9C65.2 27.6 58 24 50 24z"
      fill="currentColor"
    />
  </svg>
);

/* ─── AI STACK ORBITAL ─── */

const aiStackData = [
  {
    id: 1,
    title: "Claude",
    date: "Writing layer",
    content:
      "Drafts, hooks, voice. Every other layer is downstream of its judgment.",
    category: "Writing",
    icon: SiClaude,
    relatedIds: [2, 3, 5, 6],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Claude + Gemini MCP",
    date: "Photoreal layer",
    content:
      "Photoreal images where posts demand realism: ads, product shots, lifestyle scenes. Claude handles infographics natively (sharp). Gemini steps in for the photoreal.",
    category: "Photoreal",
    icon: SiGooglegemini,
    relatedIds: [1, 3, 4],
    status: "completed" as const,
    energy: 80,
  },
  {
    id: 3,
    title: "Figma",
    date: "Design refinement",
    content:
      "Polish layer for DIY, or the handoff point if you have a designer.",
    category: "Design",
    icon: SiFigma,
    relatedIds: [1, 2, 4],
    status: "completed" as const,
    energy: 70,
  },
  {
    id: 4,
    title: "Animation",
    date: "Motion layer",
    content: "For posts that earn the production cost.",
    category: "Motion",
    icon: Film,
    relatedIds: [2, 3],
    status: "in-progress" as const,
    energy: 60,
  },
  {
    id: 5,
    title: "Apify",
    date: "Signal layer",
    content: "Pulls every post engager off LinkedIn into the pipeline.",
    category: "Signal",
    icon: ApifyIcon,
    relatedIds: [1, 6],
    status: "completed" as const,
    energy: 75,
  },
  {
    id: 6,
    title: "Clay",
    date: "Outbound layer",
    content:
      "Enriches signals. Tiers accounts. First message references the exact post they engaged with.",
    category: "Outbound",
    icon: ClayIcon,
    relatedIds: [1, 5],
    status: "completed" as const,
    energy: 90,
  },
];

const orbitalRoot = document.getElementById("ai-stack-orbital");
if (orbitalRoot) {
  ReactDOM.createRoot(orbitalRoot).render(
    <React.StrictMode>
      <RadialOrbitalTimeline timelineData={aiStackData} />
    </React.StrictMode>,
  );
}

/* ─── HERO TYPEWRITER ─── */

function HeroTypewriter() {
  return (
    <Typewriter
      text={[
        "AI engine that turns posts into pipeline.",
        "stack pulling inbound off every post.",
        "playbook successful B2B teams quietly run.",
        "AI engine that books your calendar.",
      ]}
      speed={50}
      waitTime={2200}
      deleteSpeed={26}
      cursorChar="_"
      className="text-[#1F4DFF]"
      cursorClassName="ml-1 text-[#1F4DFF]"
    />
  );
}

const typewriterRoot = document.getElementById("hero-typewriter");
if (typewriterRoot) {
  ReactDOM.createRoot(typewriterRoot).render(
    <React.StrictMode>
      <HeroTypewriter />
    </React.StrictMode>,
  );
}

/* ─── 12-WEEK STEPPER ─── */

type WeekStep = {
  step: number;
  weekLabel: string;
  weekShort: string;
  title: string;
  phase: string;
  phaseColor: string;
  body: string;
  skills: string[];
};

const weekSteps: WeekStep[] = [
  {
    step: 1,
    weekLabel: "Pre-program",
    weekShort: "PRE",
    title: "Foundation delivered",
    phase: "Setup",
    phaseColor: "#9C9CA0",
    body: "Voice, ICP, and pillars built and delivered before Week 1. You arrive with the foundation in hand. No intake calls spent figuring out who you are.",
    skills: ["voice-profile", "icp-doc", "content-pillars"],
  },
  {
    step: 2,
    weekLabel: "Week 1",
    weekShort: "W1",
    title: "Foundation walkthrough · drafts start",
    phase: "Phase 1",
    phaseColor: "#1F4DFF",
    body: "Live walkthrough of every foundation doc. You see how voice, ICP, and pillars run as the rails behind every post. Drafts and posts start this week. The goal is not perfection on the first shot, but building the writing muscle from day one. Quality sharpens every week from here, with feedback at every loop.",
    skills: ["copy-developer"],
  },
  {
    step: 3,
    weekLabel: "Week 2",
    weekShort: "W2",
    title: "Hook judgment",
    phase: "Phase 1",
    phaseColor: "#1F4DFF",
    body: "Sixty viral templates studied. Hook generator trained on your voice. You can tell at a glance which drafts will move on LinkedIn, and which won't move at all.",
    skills: ["hook-generator"],
  },
  {
    step: 4,
    weekLabel: "Week 3",
    weekShort: "W3",
    title: "Post templates",
    phase: "Phase 1",
    phaseColor: "#1F4DFF",
    body: "Twenty post archetypes installed. Every idea has a template waiting for it the moment you open the doc. You're shipping posts each week now.",
    skills: ["post-templates", "format-library"],
  },
  {
    step: 5,
    weekLabel: "Week 4",
    weekShort: "W4",
    title: "Quality loop live",
    phase: "Phase 1",
    phaseColor: "#1F4DFF",
    body: "Quality loop becomes the gate. Every draft scored against the rubric, with structured feedback before it ships. By now, you've been shipping posts every week since Week 1. The muscle is forming.",
    skills: ["post-grader", "quality-rubric"],
  },
  {
    step: 6,
    weekLabel: "Week 5",
    weekShort: "W5",
    title: "Idea pipeline",
    phase: "Phase 2",
    phaseColor: "#FF5A1F",
    body: "Three live sources feed the idea pipeline: Reddit for pain, YouTube for frameworks, X and LinkedIn for live signal. Plus mining of any text source you already own. Never run out of ideas.",
    skills: ["reddit-miner", "youtube-extractor", "x-signal"],
  },
  {
    step: 7,
    weekLabel: "Week 6",
    weekShort: "W6",
    title: "Visual production",
    phase: "Phase 2",
    phaseColor: "#FF5A1F",
    body: "Brand spec built once. DIY mode (Claude + Gemini) and Expert mode (Figma + animation) run off the same spec. Never run out of visuals.",
    skills: ["brand-spec", "visual-generator"],
  },
  {
    step: 8,
    weekLabel: "Week 7",
    weekShort: "W7",
    title: "Daily engagement",
    phase: "Phase 3",
    phaseColor: "#2E8A5A",
    body: "One-hour daily playbook: strategic comments, network expansion, DMs, post and monitor, metrics review. Posts alone will not grow brands. Daily habits do the rest.",
    skills: ["daily-engagement", "comment-strategist"],
  },
  {
    step: 9,
    weekLabel: "Week 8",
    weekShort: "W8",
    title: "Lead magnets",
    phase: "Phase 3",
    phaseColor: "#2E8A5A",
    body: "Ten proven post templates plus six magnet formats: playbook, guide, template, checklist, swipe file, system blueprint. Engagement turns into a list.",
    skills: ["lead-magnet-builder", "dm-cadence"],
  },
  {
    step: 10,
    weekLabel: "Week 9",
    weekShort: "W9",
    title: "Repurpose engine (optional)",
    phase: "Phase 4",
    phaseColor: "#6B4FE0",
    body: "Optional channel multiplier for anyone running content across LinkedIn, X, newsletter, and beyond. Top performers get repurposed into five platform-native formats. Pattern recognition runs across the full log: what's working, what to drop.",
    skills: ["repurpose-engine", "pattern-detector"],
  },
  {
    step: 11,
    weekLabel: "Week 10",
    weekShort: "W10",
    title: "ABM tiering",
    phase: "Phase 5",
    phaseColor: "#0B0B0C",
    body: "Engagement signal flows into Clay. Accounts get tiered. Tier 1 personalized by your SDR, Tier 2 automated. The first message references the exact post they engaged with.",
    skills: ["apify-engagement-pull", "abm-tiering"],
  },
  {
    step: 12,
    weekLabel: "Week 11",
    weekShort: "W11",
    title: "Clay integration",
    phase: "Phase 5",
    phaseColor: "#0B0B0C",
    body: "Full enrichment live: firmographic, technographic, intent. Outbound cadence triggers off post engagement, sequenced across LinkedIn DM, connection, and email.",
    skills: ["clay-enrichment", "cadence-personalizer"],
  },
  {
    step: 13,
    weekLabel: "Week 12",
    weekShort: "W12",
    title: "Graduate · own it",
    phase: "Phase 5",
    phaseColor: "#0B0B0C",
    body: "You own the system. Voice, skills, brand spec, ABM integration. All of it sitting in your drive, runnable by you or anyone you onboard.",
    skills: ["graduation-pack", "team-onboarding-guide"],
  },
];

function TwelveWeekStepper() {
  return (
    <Stepper
      defaultValue={1}
      indicators={{
        completed: <Check className="size-3.5" />,
      }}
      className="space-y-10"
    >
      <StepperNav className="flex-wrap gap-y-3">
        {weekSteps.map((step, index) => (
          <StepperItem key={step.step} step={step.step} className="relative">
            <StepperTrigger className="flex flex-col gap-1.5 items-center">
              <StepperIndicator
                className="size-7 text-[10px] font-medium"
                style={{
                  ["--phase-color" as string]: step.phaseColor,
                }}
              >
                {step.step}
              </StepperIndicator>
              <StepperTitle className="text-[10px] uppercase tracking-wider font-mono whitespace-nowrap text-neutral-500 group-data-[state=active]/step:text-black group-data-[state=completed]/step:text-black">
                {step.weekShort}
              </StepperTitle>
            </StepperTrigger>
            {weekSteps.length > index + 1 && (
              <StepperSeparator className="mx-1 mt-[-22px] !bg-neutral-300 group-data-[state=completed]/step:!bg-black" />
            )}
          </StepperItem>
        ))}
      </StepperNav>

      <StepperPanel>
        {weekSteps.map((step) => (
          <StepperContent key={step.step} value={step.step}>
            <div className="rounded-xl border border-neutral-200 bg-white p-8 md:p-10 grid md:grid-cols-[260px_1fr] gap-8 items-start">
              <div className="flex flex-col gap-3">
                <div
                  className="inline-flex items-center gap-2 self-start rounded-full px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-white"
                  style={{ backgroundColor: step.phaseColor }}
                >
                  <span>{step.phase}</span>
                  <span className="text-white/70">·</span>
                  <span>{step.weekLabel}</span>
                </div>
                <h3 className="text-2xl font-medium tracking-tight text-black leading-tight">
                  {step.title}
                </h3>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {step.skills.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[11px] text-neutral-600 border border-neutral-200 rounded-md px-2 py-0.5"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-base leading-relaxed text-neutral-700">{step.body}</p>
            </div>
          </StepperContent>
        ))}
      </StepperPanel>
    </Stepper>
  );
}

const stepperRoot = document.getElementById("twelve-week-stepper");
if (stepperRoot) {
  ReactDOM.createRoot(stepperRoot).render(
    <React.StrictMode>
      <TwelveWeekStepper />
    </React.StrictMode>,
  );
}
