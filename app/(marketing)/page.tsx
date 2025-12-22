"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowRight, Check, Zap, Layout, LineChart, Shield, Code, Globe, Star, Copy, Terminal, Command, ChevronRight } from "lucide-react";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useAuth } from "@clerk/nextjs";

// Utility for Tailwind class merging
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Navbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl supports-[backdrop-filter]:bg-black/20"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            <Zap className="w-4 h-4 text-black fill-black" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            LogPulse
          </span>
        </div>
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
            <Link href="/docs" className="hover:text-white transition-colors">Documentation</Link>
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-white transition-colors">How it Works</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <Link
                href="/dashboard"
                className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="text-sm font-medium text-zinc-300 hover:text-white transition-colors hidden sm:block"
                >
                  Log in
                </Link>
                <Link
                  href="/sign-up"
                  className="group relative inline-flex h-9 items-center justify-center overflow-hidden rounded-full bg-white px-6 font-medium text-neutral-950 transition-all duration-300 hover:bg-white/90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                >
                  <span className="mr-2">Sign up free</span>
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const rotateX = useTransform(scrollY, [0, 500], [10, 0]);

  return (
    <section className="min-h-screen flex flex-col justify-center pt-32 pb-20 px-6 relative overflow-hidden bg-black selection:bg-white/30">
      {/* Premium Spotlight Background */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-white/0 to-transparent blur-[100px] -z-10 pointer-events-none" />

      {/* Grid Pattern with Fade */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-300 backdrop-blur-md shadow-[0_0_10px_rgba(255,255,255,0.05)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            v2.0 is now live
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95]"
          >
            <span className="text-white">Ship fast.</span> <br />
            <span className="animate-text-shimmer bg-clip-text text-transparent bg-[linear-gradient(110deg,#939393,45%,#1e2631,55%,#939393)] bg-[length:200%_100%]">
              Tell everyone.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-zinc-400 max-w-xl leading-relaxed"
          >
            The changelog widget for high-growth startups. Keep your users in the loop with a stunning, customizable widget that fits your brand perfectly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            {/* Shimmer Button */}
            <Link
              href="/sign-up"
              className="inline-flex h-12 animate-background-shine items-center justify-center rounded-full border border-white/10 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-8 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            >
              Start for free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

            <Link
              href="#features"
              className="px-8 py-3.5 rounded-full bg-white/5 text-white font-medium border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm flex items-center gap-2"
            >
              View Demo
            </Link>
          </motion.div>

          <div className="pt-8 flex items-center gap-4 text-sm text-zinc-500">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-black border-2 border-zinc-900 flex items-center justify-center text-xs text-white overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-b from-zinc-700 to-zinc-900" />
                </div>
              ))}
            </div>
            <p>Trusted by 100+ developers</p>
          </div>
        </div>

        {/* The "Crystal Dashboard" Mockup - Premium Glass Edition */}
        <motion.div
          style={{ y: y1, rotateX }}
          initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
          animate={{ opacity: 1, scale: 1, rotateX: 10 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative perspective-1000"
        >
          {/* Glass Slab Container */}
          <div className="relative z-10 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)] ring-1 ring-white/10 transform rotate-y-[-6deg] hover:rotate-y-0 transition-transform duration-700 ease-out group">

            {/* Crystal Sheen Effect */}
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-xl">
              <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-12deg] animate-sheen" />
            </div>

            {/* Dashboard Header */}
            <div className="h-10 border-b border-white/5 bg-white/[0.02] flex items-center px-4 gap-4">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              </div>
              <div className="h-4 w-32 bg-zinc-900 rounded-full opacity-50" />
            </div>

            {/* Dashboard Content Layout */}
            <div className="flex h-[340px]">
              {/* Sidebar */}
              <div className="w-48 border-r border-white/5 bg-white/[0.01] p-4 space-y-3 hidden sm:block">
                <div className="h-8 w-full bg-white/5 border border-white/10 rounded-md flex items-center px-3 gap-2">
                  <div className="w-4 h-4 rounded bg-white/20" />
                  <div className="w-16 h-2 bg-white/10 rounded" />
                </div>
                <div className="space-y-2 pt-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-6 w-full rounded flex items-center px-2 gap-2 opacity-40">
                      <div className="w-3 h-3 rounded bg-zinc-800" />
                      <div className="w-12 h-2 bg-zinc-900 rounded" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Area */}
              <div className="flex-1 p-6 bg-black/50">
                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { label: "Total Views", val: "12.5k", color: "text-white" },
                    { label: "Active Users", val: "1,204", color: "text-white" },
                    { label: "Engagement", val: "24%", color: "text-zinc-300" },
                  ].map((stat, i) => (
                    <div key={i} className="p-3 rounded-lg border border-white/5 bg-white/[0.02]">
                      <div className="text-[10px] text-zinc-500 mb-1">{stat.label}</div>
                      <div className={`text-lg font-semibold ${stat.color}`}>{stat.val}</div>
                    </div>
                  ))}
                </div>

                {/* Feed List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-medium text-zinc-400">Recent Updates</div>
                    <div className="text-[10px] text-white/50">View All</div>
                  </div>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
                      <div className="w-8 h-8 rounded bg-zinc-900 border border-white/10 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-zinc-500" />
                      </div>
                      <div className="flex-1">
                        <div className="h-2.5 w-24 bg-zinc-800 rounded mb-1.5" />
                        <div className="h-2 w-16 bg-zinc-900 rounded" />
                      </div>
                      <div className="w-12 h-6 rounded-full bg-white/5 border border-white/10" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements for Depth */}
          <div className="absolute -right-6 top-12 p-4 bg-black/90 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl shadow-black/80 z-30 animate-[float_6s_ease-in-out_infinite]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/5">
                <Check className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-zinc-400">Status</div>
                <div className="text-sm font-medium text-white">All Systems Operational</div>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

// Spotlight Card Component (Updated for Monochrome Glow)
const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "group relative border border-white/10 bg-zinc-900/30 overflow-hidden rounded-xl",
        className
      )}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.08),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
            Everything you need to <br />
            <span className="text-zinc-500">keep users updated.</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            LogPulse gives you a powerful widget that fits perfectly into your product, without the engineering overhead.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <SpotlightCard className="md:col-span-2 p-8 glass-gradient">
            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4 border border-white/5">
              <Layout className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Beautiful Widget</h3>
            <p className="text-zinc-400 leading-relaxed">
              A stunning, responsive widget that looks great on any site. Fully customizable to match your brand colors, icons, and positioning.
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-8 glass-gradient">
            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4 border border-white/5">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
            <p className="text-zinc-400 leading-relaxed">
              Optimized for performance. Zero layout shift. Loads in milliseconds.
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-8 glass-gradient">
            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4 border border-white/5">
              <Code className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Developer First</h3>
            <p className="text-zinc-400 leading-relaxed">
              Simple API, React components, and web components. Drop it in and it works.
            </p>
          </SpotlightCard>

          <SpotlightCard className="md:col-span-2 p-8 glass-gradient">
            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4 border border-white/5">
              <LineChart className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Analytics 2.0</h3>
            <p className="text-zinc-400 leading-relaxed">
              Track views, clicks, and engagement. Know exactly who is reading your updates and what they care about.
            </p>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-32 bg-black relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
            Setup in seconds.
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl">
            No complex integrations. Just copy, paste, and ship.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-white/0 via-white/20 to-white/0" />

          {[
            {
              step: "01",
              title: "Install Script",
              description: "Add a single line of code to your website or app.",
              icon: Terminal,
            },
            {
              step: "02",
              title: "Push Updates",
              description: "Write your changelog updates in our beautiful dashboard.",
              icon: Zap,
            },
            {
              step: "03",
              title: "Engage Users",
              description: "Users see the widget and stay informed instantly.",
              icon: Globe,
            },
          ].map((item, i) => (
            <div key={i} className="relative">
              <div className="w-24 h-24 rounded-2xl bg-zinc-900/50 backdrop-blur-sm border border-white/10 flex items-center justify-center mb-8 relative z-10 shadow-xl">
                <item.icon className="w-10 h-10 text-white" />
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center text-black font-bold text-sm border-4 border-black">
                  {item.step}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  return (
    <section id="pricing" className="py-32 bg-black relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
            Simple, transparent pricing.
          </h2>
          <p className="text-zinc-400 text-lg">
            Start for free, scale when you need to.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Starter Plan */}
          <div className="p-8 rounded-3xl bg-zinc-900/30 border border-white/5 hover:border-white/10 transition-colors glass-gradient flex flex-col">
            <h3 className="text-xl font-semibold text-white mb-2">Hobby</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-white">$0</span>
              <span className="text-zinc-500">/month</span>
            </div>
            <p className="text-zinc-400 mb-8 flex-1">Perfect for side projects and indie hackers.</p>
            <ul className="space-y-4 mb-8">
              {[
                "1 Project",
                "Last 10 Posts History",
                "Basic Analytics (Views)",
                "Community Support",
                "Powered by LogPulse Branding"
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-zinc-300">
                  <Check className="w-5 h-5 text-zinc-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href="/sign-up"
              className="block w-full py-3 rounded-xl bg-white/5 text-white font-medium text-center hover:bg-white/10 transition-colors border border-white/5"
            >
              Get Started
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="relative p-8 rounded-3xl bg-zinc-900/80 border border-indigo-500/30 shadow-2xl shadow-indigo-500/10 glass-gradient flex flex-col transform md:-translate-y-4">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-indigo-500/20">
              Most Popular
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Pro</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-white">$12</span>
              <span className="text-zinc-500">/month</span>
            </div>
            <p className="text-zinc-400 mb-8 flex-1">For growing startups and teams.</p>
            <ul className="space-y-4 mb-8">
              {[
                "5 Projects",
                "Unlimited Post History",
                "Remove Branding",
                "Custom CSS Injection",
                "Scheduled Posts",
                "Email Newsletter",
                "Advanced Analytics (Reactions)",
                "Priority Email Support"
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-white">
                  <Check className="w-5 h-5 text-indigo-400" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href="/sign-up"
              className="block w-full py-3 rounded-xl bg-white text-black font-bold text-center hover:bg-zinc-200 transition-colors"
            >
              Start Free Trial
            </Link>
          </div>

          {/* Business Plan */}
          <div className="p-8 rounded-3xl bg-zinc-900/30 border border-white/5 hover:border-white/10 transition-colors glass-gradient flex flex-col">
            <h3 className="text-xl font-semibold text-white mb-2">Business</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-white">$30</span>
              <span className="text-zinc-500">/month</span>
            </div>
            <p className="text-zinc-400 mb-8 flex-1">For large scale applications.</p>
            <ul className="space-y-4 mb-8">
              {[
                "Unlimited Projects",
                "Everything in Pro",
                "Newsletter with Webhooks",
                "Dedicated 24/7 Support",
                "SSO (Coming Soon)",
                "Role Based Access (Coming Soon)"
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-zinc-300">
                  <Check className="w-5 h-5 text-emerald-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href="/sign-up"
              className="block w-full py-3 rounded-xl bg-white/5 text-white font-medium text-center hover:bg-white/10 transition-colors border border-white/5"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/20 to-black" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl sm:text-6xl font-bold text-white mb-8 tracking-tight">
          Ready to ship?
        </h2>
        <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
          Join hundreds of developers who use LogPulse to communicate with their users.
        </p>
        <Link
          href="/sign-up"
          className="inline-flex h-12 animate-background-shine items-center justify-center rounded-full border border-white/10 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-8 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
        >
          Get Started for Free
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
            <Zap className="w-3 h-3 text-black fill-black" />
          </div>
          <span className="text-zinc-400 font-medium">LogPulse</span>
        </div>
        <div className="flex gap-8 text-sm text-zinc-500">
          <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms</Link>
          <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
          <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
        </div>
        <div className="text-zinc-600 text-sm">
          © 2024 LogPulse. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white/30">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
