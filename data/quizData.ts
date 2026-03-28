export interface QuizQuestion {
  id: string;
  layerId: string;
  layerLabel: string;
  question: string;
  options: { label: string; score: number }[];
}

export const quizQuestions: QuizQuestion[] = [
  // AI Behavior
  {
    id: "ab-1",
    layerId: "ai-behavior",
    layerLabel: "AI Behavior",
    question: "How well-defined are your AI system's behavioral boundaries and guardrails?",
    options: [
      { label: "No defined boundaries — the AI operates freely", score: 0 },
      { label: "Some informal guidelines exist but aren't enforced", score: 1 },
      { label: "Documented behavioral rules with basic enforcement", score: 2 },
      { label: "Strict, tested guardrails with monitoring and audit trails", score: 3 },
    ],
  },
  {
    id: "ab-2",
    layerId: "ai-behavior",
    layerLabel: "AI Behavior",
    question: "Do you test for prompt injection vulnerabilities?",
    options: [
      { label: "We haven't considered prompt injection", score: 0 },
      { label: "Aware of the risk but no formal testing", score: 1 },
      { label: "Periodic manual testing for common attacks", score: 2 },
      { label: "Automated adversarial testing in CI/CD pipeline", score: 3 },
    ],
  },
  // Status Badges
  {
    id: "sb-1",
    layerId: "status-badges",
    layerLabel: "Status Badges",
    question: "How do you monitor the real-time health of your AI systems?",
    options: [
      { label: "No monitoring — we find out when users complain", score: 0 },
      { label: "Basic uptime checks only", score: 1 },
      { label: "Health dashboards with defined thresholds", score: 2 },
      { label: "Real-time monitoring with automated alerting and escalation", score: 3 },
    ],
  },
  // Data Exposure
  {
    id: "de-1",
    layerId: "data-exposure",
    layerLabel: "Data Exposure",
    question: "How do you control which data your AI can access?",
    options: [
      { label: "The AI has broad access to most company data", score: 0 },
      { label: "Some data sources are restricted informally", score: 1 },
      { label: "Role-based access controls are implemented", score: 2 },
      { label: "Full RBAC with data classification, masking, and audit logs", score: 3 },
    ],
  },
  {
    id: "de-2",
    layerId: "data-exposure",
    layerLabel: "Data Exposure",
    question: "Do you have data retention and deletion policies for AI-processed data?",
    options: [
      { label: "No policies in place", score: 0 },
      { label: "Informal guidelines but not enforced", score: 1 },
      { label: "Documented policies with manual enforcement", score: 2 },
      { label: "Automated retention policies with compliance auditing", score: 3 },
    ],
  },
  // Risk Indicators
  {
    id: "ri-1",
    layerId: "risk-indicators",
    layerLabel: "Risk Indicators",
    question: "How do you quantify the business impact of AI decisions?",
    options: [
      { label: "We don't measure AI decision impact", score: 0 },
      { label: "Anecdotal tracking of major incidents", score: 1 },
      { label: "Risk scoring methodology aligned to business metrics", score: 2 },
      { label: "Automated risk dashboards with trend analysis and calibration", score: 3 },
    ],
  },
  // Decision Boundaries
  {
    id: "db-1",
    layerId: "decision-boundaries",
    layerLabel: "Decision Boundaries",
    question: "Are there clear thresholds for when AI decisions require human approval?",
    options: [
      { label: "The AI makes all decisions autonomously", score: 0 },
      { label: "Ad-hoc human review for some decisions", score: 1 },
      { label: "Defined escalation criteria by impact level", score: 2 },
      { label: "Full approval workflows with audit trails and override mechanisms", score: 3 },
    ],
  },
  {
    id: "db-2",
    layerId: "decision-boundaries",
    layerLabel: "Decision Boundaries",
    question: "Who has authority to override an AI decision, and is it documented?",
    options: [
      { label: "No override process exists", score: 0 },
      { label: "Anyone can override but it's not tracked", score: 1 },
      { label: "Designated roles can override with basic logging", score: 2 },
      { label: "Formal override authority with full audit trails", score: 3 },
    ],
  },
  // System Integrations
  {
    id: "si-1",
    layerId: "system-integrations",
    layerLabel: "System Integrations",
    question: "Do you maintain a registry of all systems your AI connects to?",
    options: [
      { label: "No — we don't track AI integration points", score: 0 },
      { label: "Partial awareness of major integrations", score: 1 },
      { label: "Documented integration registry", score: 2 },
      { label: "Full registry with security classifications, health monitoring, and failover plans", score: 3 },
    ],
  },
];

export interface MaturityLevel {
  label: string;
  range: [number, number]; // percentage range
  description: string;
  color: string; // CSS variable name
}

export const maturityLevels: MaturityLevel[] = [
  {
    label: "Critical",
    range: [0, 25],
    description: "Your AI security posture has significant gaps. Immediate action is needed to establish foundational controls before scaling AI initiatives.",
    color: "risk-high",
  },
  {
    label: "Developing",
    range: [26, 50],
    description: "Some controls exist but are inconsistent. Focus on formalizing policies and implementing systematic monitoring across all layers.",
    color: "risk-medium",
  },
  {
    label: "Established",
    range: [51, 75],
    description: "Solid foundation with room to mature. Focus on automation, continuous testing, and closing gaps in your weaker layers.",
    color: "primary",
  },
  {
    label: "Advanced",
    range: [76, 100],
    description: "Strong security posture across layers. Continue refining with adversarial testing, trend analysis, and cross-layer integration.",
    color: "risk-low",
  },
];
