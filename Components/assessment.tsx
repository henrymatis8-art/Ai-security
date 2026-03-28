"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { quizQuestions, maturityLevels } from "@/data/quizData";
import { Button } from "@/Components/ui/button";
import { Progress } from "@/Components/ui/progress";
import { Input } from "@/Components/ui/input";
import { ArrowLeft, ArrowRight, Shield, RotateCcw, Home, CheckCircle2, Download, Mail, CheckCheck, Loader2, BarChart3 } from "lucide-react";
import { generateAssessmentPDF } from "@/lib/generatePDF";
import { toast } from "sonner";

// Helper: map color key to CSS variable string
function colorVar(key: string): string {
  const map: Record<string, string> = {
    "risk-low": "var(--risk-low)",
    "risk-medium": "var(--risk-medium)",
    "risk-high": "var(--risk-high)",
    "primary": "var(--primary)",
  };
  return map[key] ?? "var(--primary)";
}

// Helper: get color key based on percentage
function getColorKey(pct: number): string {
  if (pct >= 76) return "risk-low";
  if (pct >= 51) return "primary";
  if (pct >= 26) return "risk-medium";
  return "risk-high";
}

const Assessment = () => {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const question = quizQuestions[currentIndex];
  const progress = ((currentIndex + (answers[question?.id] !== undefined ? 1 : 0)) / quizQuestions.length) * 100;

  const handleSelect = (score: number) => {
    setAnswers((prev) => ({ ...prev, [question.id]: score }));
  };

  const handleNext = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentIndex(0);
    setShowResults(false);
  };

  const totalScore = useMemo(() => Object.values(answers).reduce((a, b) => a + b, 0), [answers]);
  const maxScore = quizQuestions.length * 3;
  const percentage = Math.round((totalScore / maxScore) * 100);

  const maturityLevel = useMemo(
    () => maturityLevels.find((l) => percentage >= l.range[0] && percentage <= l.range[1]) ?? maturityLevels[0],
    [percentage]
  );

  const layerScores = useMemo(() => {
    const layers: Record<string, { total: number; max: number; label: string }> = {};
    quizQuestions.forEach((q) => {
      if (!layers[q.layerId]) layers[q.layerId] = { total: 0, max: 0, label: q.layerLabel };
      layers[q.layerId].max += 3;
      if (answers[q.id] !== undefined) layers[q.layerId].total += answers[q.id];
    });
    return Object.entries(layers).map(([id, data]) => ({
      id,
      label: data.label,
      percentage: Math.round((data.total / data.max) * 100),
    }));
  }, [answers]);

  const circumference = 2 * Math.PI * 52;

  if (showResults) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-6 py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">

            {/* Header */}
            <div>
              <div className="assessment-header">
                <Shield className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-mono text-muted-foreground">Assessment Complete</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Security Maturity Score</h1>
            </div>

            {/* Score Circle */}
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="relative w-48 h-48 flex items-center justify-center">
                <svg
                  className="absolute inset-0 w-full h-full -rotate-90"
                  viewBox="0 0 120 120"
                >
                  {/* Background track */}
                  <circle
                    cx="60" cy="60" r="52"
                    fill="none"
                    stroke="var(--border)"
                    strokeWidth="8"
                  />
                  {/* Progress arc */}
                  <circle
                    cx="60" cy="60" r="52"
                    fill="none"
                    stroke={colorVar(getColorKey(percentage))}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference * (1 - percentage / 100)}
                    style={{ transition: "stroke-dashoffset 1s ease, stroke 0.5s ease" }}
                  />
                </svg>
                <span className="text-4xl font-bold" style={{ color: colorVar(getColorKey(percentage)) }}>
                  {percentage}%
                </span>
              </div>

              <div className="text-center">
                <span
                  className="text-lg font-semibold"
                  style={{ color: colorVar(maturityLevel.color) }}
                >
                  {maturityLevel.label}
                </span>
                <p className="text-muted-foreground mt-2 max-w-md text-sm leading-relaxed">
                  {maturityLevel.description}
                </p>
              </div>
            </div>

            {/* Layer Breakdown */}
            <div className="space-y-4">
              <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
                Layer Breakdown
              </h3>
              {layerScores.map((layer) => {
                const key = getColorKey(layer.percentage);
                const color = colorVar(key);
                return (
                  <div key={layer.id} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground">{layer.label}</span>
                      <span className="font-mono" style={{ color }}>
                        {layer.percentage}%
                      </span>
                    </div>
                    {/* Progress bar track */}
                    <div className="w-full h-2 rounded-full" style={{ backgroundColor: "var(--border)" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${layer.percentage}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="space-y-4 pt-4">
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => generateAssessmentPDF(percentage, maturityLevel, layerScores)}
                  className="gap-2"
                >
                  <Download className="w-4 h-4" /> Download PDF
                </Button>
                
              </div>

              {showEmailForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="flex gap-2"
                >
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="bg-secondary border-border"
                  />
                 
                </motion.div>
              )}

              <div className="flex flex-wrap gap-3">
                <Button variant="outline" onClick={handleRestart} className="gap-2">
                  <RotateCcw className="w-4 h-4" /> Retake
                </Button>
                
                
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" size="sm" onClick={() => router.push("/")} className="gap-2 mb-6 text-muted-foreground">
            <ArrowLeft className="w-4 h-4" /> Back to Framework
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">AI Security Self-Assessment</h1>
          <p className="text-muted-foreground text-sm">
            Answer {quizQuestions.length} questions across 6 security layers to get your maturity score.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-10 space-y-2">
          <div className="flex justify-between text-xs font-mono text-muted-foreground">
            <span>Question {currentIndex + 1} of {quizQuestions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div>
              <span className="text-xs font-mono px-2 py-1 rounded border border-border text-primary">
                {question.layerLabel}
              </span>
              <h2 className="text-xl font-semibold mt-4 leading-relaxed">{question.question}</h2>
            </div>

            <div className="space-y-3">
              {question.options.map((opt, idx) => {
                const selected = answers[question.id] === opt.score;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(opt.score)}
                    className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                      selected
                        ? "border-primary bg-primary/10 glow-primary"
                        : "border-border surface-elevated hover:border-muted-foreground/30"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        selected ? "border-primary bg-primary" : "border-muted-foreground/40"
                      }`}>
                        {selected && <CheckCircle2 className="w-3.5 h-3.5 text-primary-foreground" />}
                      </div>
                      <span className="text-sm leading-relaxed">{opt.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-10">
          <Button variant="outline" onClick={handlePrev} disabled={currentIndex === 0} className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={answers[question.id] === undefined}
            className="gap-2"
          >
            {currentIndex === quizQuestions.length - 1 ? "See Results" : "Next"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
