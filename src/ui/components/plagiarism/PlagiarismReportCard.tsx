import React, { useState } from 'react';
import { plagiarismClient } from '../../../modules/plagiarism/plagiarismClient';

export const PlagiarismReportCard: React.FC = () => {
  const [code, setCode] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleCheck = async () => {
    const data = await plagiarismClient.checkCode(code, 'candidate_' + Math.floor(Math.random() * 1000));
    setResult(data);
  };

  return (
    <div className="stat-card" style={{ gridColumn: 'span 2' }}>
      <h3>EN: Plagiarism Detection / FR: Détection de Plagiat</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
        <textarea 
          rows={4} 
          placeholder="Paste code here to check similarity against previous submissions..."
          value={code}
          onChange={e => setCode(e.target.value)}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
        <button onClick={handleCheck} style={{ padding: '8px 12px', cursor: 'pointer', alignSelf: 'flex-start' }}>
          Check Code
        </button>
        {result && (
          <div style={{ padding: '10px', background: result.isPlagiarized ? '#ffe6e6' : '#e6ffe6', borderRadius: '4px', color: 'black' }}>
            <strong>Highest Similarity:</strong> {result.similarityScore}% <br/>
            <strong>Status:</strong> {result.isPlagiarized ? 'FLAGGED' : 'CLEAR'} <br/>
            {result.matches && result.matches.length > 0 && (
              <div style={{ fontSize: '0.8em', marginTop: '5px' }}>
                Matches: {result.matches.map((m: any) => `${m.candidateId} (${m.similarity}%)`).join(', ')}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
