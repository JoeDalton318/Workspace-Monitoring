import { Router } from 'express';

export const router = Router();

// In-memory store of submissions
const submissions: Array<{ id: string, candidateId: string, code: string, timestamp: number }> = [];

function calculateSimilarity(code1: string, code2: string): number {
  // Extremely naive Jaccard similarity based on words
  const words1 = new Set(code1.split(/\s+/));
  const words2 = new Set(code2.split(/\s+/));
  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);
  if (union.size === 0) return 0;
  return Math.round((intersection.size / union.size) * 100);
}

router.post('/check', (req, res) => {
  const { code, candidateId } = req.body;
  if (!code) return res.status(400).json({ error: 'Missing code' });

  let highestSimilarity = 0;
  let matches = [];

  for (const sub of submissions) {
    if (sub.candidateId === candidateId) continue; // Don't match against self
    const sim = calculateSimilarity(code, sub.code);
    if (sim > highestSimilarity) {
      highestSimilarity = sim;
    }
    if (sim > 60) {
      matches.push({ candidateId: sub.candidateId, similarity: sim });
    }
  }

  const submissionId = Date.now().toString();
  submissions.push({ id: submissionId, candidateId: candidateId || 'unknown', code, timestamp: Date.now() });

  res.json({
    similarityScore: highestSimilarity,
    isPlagiarized: highestSimilarity > 80,
    matches
  });
});
