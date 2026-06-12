import React, { useState } from 'react';
import { identityClient, VerificationResult } from '../../../modules/identity/identityClient';

export const IdentityStatusCard: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'checking' | 'verified' | 'failed'>('idle');
  const [result, setResult] = useState<VerificationResult | null>(null);

  const handleVerify = async () => {
    setStatus('checking');
    const res = await identityClient.verifyIdentity('mock_id_base64', 'mock_selfie_base64');
    setStatus(res.status === 'success' ? 'verified' : 'failed');
    setResult(res);
  };

  const handleThirdParty = async () => {
    await identityClient.runThirdPartyCheck();
    alert('Third-party check simulated. Event logged.');
  };

  return (
    <div className="stat-card" style={{ gridColumn: 'span 2' }}>
      <h3>EN: Identity Verification / FR: Vérification d'identité</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={handleVerify} disabled={status === 'checking'} style={{ padding: '8px 12px', cursor: 'pointer' }}>
            {status === 'checking' ? 'Verifying...' : 'Verify ID & Selfie'}
          </button>
          <button onClick={handleThirdParty} style={{ padding: '8px 12px', cursor: 'pointer' }}>
            Third-Party Check
          </button>
        </div>
        {result && (
          <div style={{ padding: '10px', background: result.status === 'success' ? '#e6ffe6' : '#ffe6e6', borderRadius: '4px', color: 'black' }}>
            <strong>Status:</strong> {result.status.toUpperCase()} <br/>
            <strong>Score:</strong> {result.matchScore}% <br/>
            <strong>Message:</strong> {result.message}
          </div>
        )}
      </div>
    </div>
  );
};
