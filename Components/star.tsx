"use client";

import { motion } from "framer-motion";
import { Shield, ArrowRight, AlertTriangle, Map, Building, Compass } from "lucide-react";
import  Link  from "next/link";

const risks = [
  { icon: AlertTriangle, title: "Invisible Data Exposure", desc: "Your AI may be accessing sensitive data without proper controls — and you won't know until it's too late." },
  { icon: Map, title: "No Decision Boundaries", desc: "Without defined limits, AI systems make decisions beyond their intended scope, creating liability." },
  { icon: Building, title: "Silent Integration Failures", desc: "Third-party systems connected to your AI can fail quietly, cascading risk across your organization." },
];

const analogies = [
  { icon: Compass, text: "To find your way in a forest, you need a compass.", lesson: "To navigate AI, you need a security framework." },
  { icon: Building, text: "To build a skyscraper, you need blueprints.", lesson: "To deploy AI, you need architecture controls." },
  { icon: Map, text: "To sail the ocean, you need navigation charts.", lesson: "To scale AI, you need visibility into every decision." },
];

const Start = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, hsl(174 72% 52% / 0.4), transparent 70%)" }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border mb-6 surface-elevated"
          >
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-muted-foreground">Myria Consulting</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            Is Your AI a{" "}
            <span className="gradient-text">Strategic Asset</span>
            <br />
            or an{" "}
            <span className="text-destructive">Unmanaged Risk</span>?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Most organizations deploy AI without a security architecture.
            Take our 2-minute assessment to discover where your blind spots are — before they become breaches.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              href="/assessment"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              Take the Free Assessment
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground font-mono">No sign-up required · Get your score instantly</p>
          </motion.div>
        </div>
      </section>

      {/* Analogies */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-center mb-12"
          >
            You Wouldn't Navigate <span className="gradient-text">Without a Map</span>
          </motion.h2>

          <div className="space-y-6">
            {analogies.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex items-start gap-4 p-5 rounded-xl border border-border surface-elevated"
              >
                <div className="p-2.5 rounded-lg bg-primary/10 shrink-0">
                  <a.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-foreground font-medium">{a.text}</p>
                  <p className="text-primary font-semibold mt-1">{a.lesson}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Risk Cards */}
      <section className="py-20 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-center mb-4"
          >
            The Risks You <span className="text-destructive">Can't See</span>
          </motion.h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            Without a structured AI security framework, these threats grow silently inside your organization.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {risks.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="p-6 rounded-xl border border-border surface-elevated"
              >
                <div className="p-2.5 rounded-lg bg-destructive/10 inline-block mb-4">
                  <r.icon className="w-5 h-5 text-destructive" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{r.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Know Where You Stand in <span className="gradient-text">2 Minutes</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Get your AI Security Maturity Score and a personalized PDF report with actionable recommendations.
          </p>
          <Link
            href="/assessment"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            Start Your Assessment
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Start;
