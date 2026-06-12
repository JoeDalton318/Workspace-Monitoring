import express from 'express';
import cors from 'cors';
import { router as identityRouter } from './routes/identity.js';
import { router as networkRouter } from './routes/network.js';
import { router as plagiarismRouter } from './routes/plagiarism.js';
import { router as proctoringRouter } from './routes/proctoring.js';
import { router as activityRouter } from './routes/activity.js';
import { router as desktopAppRouter } from './routes/desktopApp.js';
import { router as riskRouter } from './routes/risk.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' })); // Allow large payloads for mock images

app.use('/api/identity', identityRouter);
app.use('/api/network', networkRouter);
app.use('/api/plagiarism', plagiarismRouter);
app.use('/api/proctoring', proctoringRouter);
app.use('/api/activity', activityRouter);
app.use('/api/desktopApp', desktopAppRouter);
app.use('/api/risk', riskRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Integrity Platform Backend Running' });
});

app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});
