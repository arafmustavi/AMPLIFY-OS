
import { GoogleGenAI, Type } from "@google/genai";
import { LoanApplicant, DecisionDriver } from "../types";

/**
 * PRODUCTION SERVICE
 * This service leverages Google Gemini models for institutional-grade credit risk analysis.
 */

// Helper to initialize the Gemini client.
// Following guidelines: Create a new instance right before API calls to ensure current API key usage.
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCreditMemo = async (docName: string, docContent: string): Promise<string> => {
  // Fix: Use ai.models.generateContent with gemini-3-flash-preview for extraction/summarization
  const ai = getAI();
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the following document for a company named ${docName} and generate a structured internal credit memo in Markdown format.
      
      Document Content:
      ${docContent}`,
      config: {
        systemInstruction: "You are a senior institutional credit analyst. Produce professional Markdown credit memos with sections for Executive Summary, Key Risk Factors, and Financial Highlights.",
      },
    });

    return response.text || "Failed to generate memo content.";
  } catch (error: any) {
    console.error("Credit Memo Generation Error:", error);
    
    // Fix: If the request fails due to invalid/non-billing key, prompt for key selection
    if (error?.message?.includes('Requested entity was not found.')) {
      if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
        window.aistudio.openSelectKey();
      }
    }

    return "Error: Unable to generate credit memo at this time.";
  }
};

export const explainRiskScore = async (loan: LoanApplicant, modifiers: { income: number; tenure: number }): Promise<{ analysis: string; drivers: DecisionDriver[]; error?: string }> => {
  // Fix: Use gemini-3-pro-preview for complex reasoning tasks
  const ai = getAI();

  const prompt = `Perform a deep-dive risk analysis for ${loan.companyName} in the ${loan.sector} sector.
  Financial Parameters: EBITDA $${loan.ebitda}, DSCR ${loan.dscr}, Leverage ${loan.leverageRatio}, Tenure ${loan.tenureMonths} months.
  Scenario Overrides: Revenue Change ${modifiers.income}%, Tenure Adjustment ${modifiers.tenure} months.
  
  Provide a professional risk rationale and a list of exactly 3 decision drivers.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a senior credit risk officer. Respond strictly in JSON format.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: { 
              type: Type.STRING,
              description: "A summary explaining the risk profile changes under stress test conditions."
            },
            drivers: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  factor: { type: Type.STRING },
                  impact: { type: Type.STRING, description: "Must be 'positive' or 'negative'" },
                  weight: { type: Type.NUMBER, description: "Importance score from 0 to 100" },
                  description: { type: Type.STRING }
                },
                required: ["factor", "impact", "weight", "description"]
              },
              minItems: 3,
              maxItems: 3
            }
          },
          required: ["analysis", "drivers"]
        },
      },
    });

    const data = JSON.parse(response.text || "{}");
    return {
      analysis: data.analysis || "Risk analysis completed with no summary.",
      drivers: data.drivers || []
    };
  } catch (error: any) {
    console.error("Risk Analysis Error:", error);
    
    // Fix: If the request fails due to invalid/non-billing key, prompt for key selection
    if (error?.message?.includes('Requested entity was not found.')) {
      if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
        window.aistudio.openSelectKey();
      }
    }

    // Check for quota or API specific errors
    if (error?.message?.includes('quota') || error?.message?.includes('429')) {
      return {
        analysis: "Simulation limit reached for this API key. Please check billing or wait for reset.",
        drivers: [],
        error: "QUOTA_EXHAUSTED"
      };
    }

    return {
      analysis: "Simulation failure: The AI engine encountered a technical error processing this request.",
      drivers: [],
      error: "API_ERROR"
    };
  }
};