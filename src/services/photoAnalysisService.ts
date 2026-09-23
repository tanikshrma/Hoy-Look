/**
 * Photo Analysis Service Abstraction.
 * Analyzes user full-body photos to extract body metrics, skin tone, and age range.
 */

export interface PhotoAnalysisResult {
  estimatedAgeRange: string;
  estimatedHeightCm: number;
  bodyShape: 'Rectangle' | 'Hourglass' | 'Pear' | 'Inverted Triangle' | 'Athletic';
  skinTone: string;
  skinToneIndex: number;
  confidenceScore: number;
}

export const photoAnalysisService = {
  async analyzePhoto(_imageFileOrBase64: File | string): Promise<PhotoAnalysisResult> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      estimatedAgeRange: '18-24',
      estimatedHeightCm: 163,
      bodyShape: 'Rectangle',
      skinTone: 'fair',
      skinToneIndex: 1,
      confidenceScore: 0.96,
    };
  },
};
