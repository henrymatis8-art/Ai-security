import jsPDF from "jspdf";

interface LayerScore {
  id: string;
  label: string;
  percentage: number;
}

const layerRecommendations: Record<string, { low: string[]; mid: string[]; high: string[] }> = {
  "ai-behavior": {
    low: [
      "Define and document AI behavioral boundaries and guardrails immediately",
      "Implement basic prompt injection testing before any production deployment",
      "Establish an incident response plan for AI misbehavior scenarios",
    ],
    mid: [
      "Automate adversarial testing for prompt injection in your CI/CD pipeline",
      "Implement output filtering and content safety layers",
    ],
    high: [
      "Conduct regular red-team exercises against your AI guardrails",
      "Benchmark your controls against NIST AI RMF GOVERN function",
    ],
  },
  "status-badges": {
    low: [
      "Deploy real-time health monitoring for all AI systems immediately",
      "Define SLAs and uptime thresholds for AI-driven processes",
      "Create an on-call escalation process for AI system failures",
    ],
    mid: [
      "Implement automated alerting with defined severity tiers",
      "Add drift detection to monitor model performance degradation",
    ],
    high: [
      "Integrate AI health metrics into enterprise observability platforms",
      "Conduct chaos engineering tests on AI system dependencies",
    ],
  },
  "data-exposure": {
    low: [
      "Audit all data sources your AI can access and classify by sensitivity",
      "Implement role-based access controls (RBAC) for AI data access",
      "Create data retention and deletion policies for AI-processed data",
    ],
    mid: [
      "Add data masking and tokenization for sensitive fields",
      "Implement automated compliance auditing for data retention",
    ],
    high: [
      "Deploy data loss prevention (DLP) monitoring on AI outputs",
      "Align data governance with ISO 27001 and GDPR requirements",
    ],
  },
  "risk-indicators": {
    low: [
      "Establish a risk scoring methodology for AI decisions",
      "Map AI decision outputs to business impact categories",
      "Begin tracking AI incidents and near-misses systematically",
    ],
    mid: [
      "Build automated risk dashboards with trend analysis",
      "Calibrate risk thresholds quarterly based on incident data",
    ],
    high: [
      "Integrate AI risk metrics into enterprise risk management (ERM)",
      "Implement predictive risk modeling for AI failure scenarios",
    ],
  },
  "decision-boundaries": {
    low: [
      "Define clear thresholds for when AI decisions require human approval",
      "Document override authority and create an escalation matrix",
      "Implement basic audit trails for all AI-driven decisions",
    ],
    mid: [
      "Build approval workflows with full audit trails for high-impact decisions",
      "Establish designated override roles with accountability tracking",
    ],
    high: [
      "Conduct periodic reviews of decision boundary effectiveness",
      "Align human-in-the-loop processes with NIST AI RMF MAP function",
    ],
  },
  "system-integrations": {
    low: [
      "Create a complete registry of all systems your AI connects to",
      "Classify each integration by security risk and data sensitivity",
      "Implement failover plans for critical AI integration points",
    ],
    mid: [
      "Add health monitoring and automated alerts for integration failures",
      "Conduct security assessments on third-party AI service providers",
    ],
    high: [
      "Implement zero-trust architecture for AI-to-system communications",
      "Establish supply chain security reviews for AI model dependencies",
    ],
  },
};

const getRecommendations = (layerId: string, percentage: number): string[] => {
  const recs = layerRecommendations[layerId];
  if (!recs) return [];
  if (percentage <= 33) return recs.low;
  if (percentage <= 66) return recs.mid;
  return recs.high;
};

interface MaturityLevel {
  label: string;
  description: string;
  color: string;
}

const getColorRGB = (percentage: number): [number, number, number] => {
  if (percentage >= 76) return [52, 211, 153]; // green
  if (percentage >= 51) return [45, 212, 191]; // teal/primary
  if (percentage >= 26) return [234, 179, 8]; // amber
  return [239, 68, 68]; // red
};

export const generateAssessmentPDF = (
  percentage: number,
  maturityLevel: MaturityLevel,
  layerScores: LayerScore[]
) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Background
  doc.setFillColor(17, 20, 28);
  doc.rect(0, 0, pageWidth, doc.internal.pageSize.getHeight(), "F");

  // Header line accent
  const [pr, pg, pb] = [45, 212, 191];
  doc.setDrawColor(pr, pg, pb);
  doc.setLineWidth(0.8);
  doc.line(margin, y, margin + 40, y);
  y += 10;

  // Title
  doc.setTextColor(230, 235, 245);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("AI Security Maturity Report", margin, y);
  y += 8;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(140, 150, 170);
  doc.text(`Myria Consulting — Generated ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`, margin, y);
  y += 16;

  // Divider
  doc.setDrawColor(40, 45, 60);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageWidth - margin, y);
  y += 14;

  // Overall Score Section
  doc.setFontSize(11);
  doc.setTextColor(140, 150, 170);
  doc.setFont("helvetica", "normal");
  doc.text("OVERALL MATURITY SCORE", margin, y);
  y += 20;

  // Score display
  const scoreColor = getColorRGB(percentage);
  doc.setFontSize(48);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...scoreColor);
  doc.text(`${percentage}%`, margin, y);

  // Maturity label next to score
  doc.setFontSize(16);
  doc.text(maturityLevel.label, margin + 55, y - 8);

  doc.setFontSize(10);
  doc.setTextColor(140, 150, 170);
  doc.setFont("helvetica", "normal");
  const descLines = doc.splitTextToSize(maturityLevel.description, contentWidth - 60);
  doc.text(descLines, margin + 55, y);
  y += 30;

  // Divider
  doc.setDrawColor(40, 45, 60);
  doc.line(margin, y, pageWidth - margin, y);
  y += 14;

  // Layer Breakdown
  doc.setFontSize(11);
  doc.setTextColor(140, 150, 170);
  doc.text("LAYER BREAKDOWN", margin, y);
  y += 12;

  layerScores.forEach((layer) => {
    const color = getColorRGB(layer.percentage);

    // Layer name and score
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(230, 235, 245);
    doc.text(layer.label, margin, y);

    doc.setTextColor(...color);
    doc.setFont("helvetica", "bold");
    doc.text(`${layer.percentage}%`, pageWidth - margin, y, { align: "right" });
    y += 5;

    // Progress bar background
    const barHeight = 6;
    doc.setFillColor(35, 40, 55);
    doc.roundedRect(margin, y, contentWidth, barHeight, 2, 2, "F");

    // Progress bar fill
    const fillWidth = (layer.percentage / 100) * contentWidth;
    if (fillWidth > 0) {
      doc.setFillColor(...color);
      doc.roundedRect(margin, y, Math.max(fillWidth, 4), barHeight, 2, 2, "F");
    }
    y += 16;
  });

  // Actionable Recommendations — new page
  doc.addPage();
  const pageHeight = doc.internal.pageSize.getHeight();
  y = margin;

  // Background for page 2
  doc.setFillColor(17, 20, 28);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Header accent
  doc.setDrawColor(pr, pg, pb);
  doc.setLineWidth(0.8);
  doc.line(margin, y, margin + 40, y);
  y += 10;

  doc.setTextColor(230, 235, 245);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Actionable Recommendations", margin, y);
  y += 6;

  doc.setFontSize(9);
  doc.setTextColor(140, 150, 170);
  doc.setFont("helvetica", "normal");
  doc.text("Prioritized next steps based on your assessment results", margin, y);
  y += 12;

  doc.setDrawColor(40, 45, 60);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  // Sort layers by percentage ascending (weakest first)
  const sorted = [...layerScores].sort((a, b) => a.percentage - b.percentage);

  sorted.forEach((layer) => {
    const recs = getRecommendations(layer.id, layer.percentage);
    if (recs.length === 0) return;

    // Check if we need a new page
    if (y + 10 + recs.length * 8 > pageHeight - 40) {
      doc.addPage();
      y = margin;
      doc.setFillColor(17, 20, 28);
      doc.rect(0, 0, pageWidth, pageHeight, "F");
    }

    const color = getColorRGB(layer.percentage);
    const priority = layer.percentage <= 33 ? "HIGH PRIORITY" : layer.percentage <= 66 ? "MEDIUM" : "MAINTENANCE";

    // Layer header
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...color);
    doc.text(`${layer.label}  —  ${layer.percentage}%  [${priority}]`, margin, y);
    y += 7;

    // Recommendations
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(200, 210, 225);

    recs.forEach((rec) => {
      const bulletText = "- " + rec;
      const lines = doc.splitTextToSize(bulletText, contentWidth - 10);
      lines.forEach((line: string) => {
        doc.text(line, margin + 6, y);
        y += 5;
      });
      y += 2;
    });

    y += 6;
  });

  // Footer on last page
  y = Math.max(y + 10, pageHeight - 30);
  doc.setDrawColor(40, 45, 60);
  doc.line(margin, pageHeight - 25, pageWidth - margin, pageHeight - 25);

  doc.setFontSize(8);
  doc.setTextColor(100, 110, 130);
  doc.text("This report was generated by the Myria Consulting AI Security Control Framework.", margin, pageHeight - 18);
  doc.text("For a comprehensive security review, contact us at hello@myriaconsulting.com", margin, pageHeight - 13);

  doc.save("ai-security-maturity-report.pdf");
};
