

export enum RiskLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  CRITICAL = 'Critical'
}

export interface LoanApplicant {
  id: string;
  companyName: string;
  sector: string;
  requestAmount: number;
  applicationDate: string;
  riskScore: number; // 0-100
  riskLevel: RiskLevel;
  status: 'Underwriting' | 'Approved' | 'Rejected' | 'Tradable';
  // Financials
  ebitda: number;
  dscr: number; // Debt Service Coverage Ratio
  leverageRatio: number;
  tenureMonths: number;
}

export interface DecisionDriver {
  factor: string;
  impact: 'positive' | 'negative';
  weight: number; // 0-100 impact
  description: string;
}

export interface RiskPassportData {
  loanId: string;
  generatedAt: string;
  drivers: DecisionDriver[];
  earlyWarnings: string[];
  esgScore: number; // 0-10
  stressTest: {
    scenario: string;
    survivalProbability: number;
  }[];
}

export interface TradeSlice {
  id: string;
  loanId: string;
  percentage: number;
  price: number;
  yield: number;
}

export interface DocumentFile {
  id: string;
  name: string;
  type: string;
  size: string;
  status: 'pending' | 'analyzing' | 'complete';
  contentSummary?: string;
  citations?: {
    text: string;
    sourcePage: number;
    confidence: number;
  }[];
}

// Global window type definitions for the AI Studio key selection handshake
declare global {
  // Fix: Declare AIStudio as a global interface to allow proper type merging with the environment.
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    // Fix: Use the named AIStudio interface and add readonly modifier to satisfy identical modifier requirements.
    readonly aistudio: AIStudio;
  }
}