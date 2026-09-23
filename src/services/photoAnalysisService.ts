/**
 * Photo Analysis Service Abstraction.
 * Analyzes user full-body photos to extract body metrics, skin tone, and age range.
 * Currently uses high-precision simulation with asynchronous timing;
 * ready for real computer vision / Gemini Vision API connection.
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
  async analyzePhoto(imageFileOrBase64: File | string): Promise<PhotoAnalysisResult> {
    // Simulated progressive scanning delay (realistic 3.5s timing for onboarding)
    await new Promise((resolve) => setTimeout(resolve, 3500));

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
