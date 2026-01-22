
export interface ReadinessScore {
  category: string;
  score: number;
  explanation: string;
}

export interface ToolRecommendation {
  name: string;
  description: string;
  bestFor: string;
  integration: string;
  difficulty: 'Low' | 'Medium' | 'High';
  hipaaNote: string;
}

export interface RoadmapStep {
  phase: string;
  steps: string[];
  roles: string[];
}

export interface AnalysisReport {
  executiveSummary: string[];
  painPoints: string[];
  readinessScores: ReadinessScore[];
  quickWins: string[];
  toolStack: ToolRecommendation[];
  roadmap: RoadmapStep[];
  trainingPlan: {
    modules: string[];
    microlearning: string;
    policy: string;
    measurement: string;
  };
  governanceChecklist: string[];
  deliverables: string[];
  consultantBrief: string;
}

export type InputMode = 'voice' | 'text' | 'upload' | 'video';
