import { eventBus } from '../../monitoring/eventBus';

const API_BASE = 'http://localhost:3001/api/identity';

export interface VerificationResult {
  status: 'success' | 'failed';
  matchScore: number;
  message: string;
}

export class IdentityClient {
  async verifyIdentity(idImage: string, selfieImage: string): Promise<VerificationResult> {
    eventBus.publish({
      eventId: crypto.randomUUID(),
      sessionId: 'global',
      timestamp: Date.now(),
      eventType: 'identity_verification_start',
      visibilityState: 'visible',
      hidden: false,
      hasFocus: true,
      isIdle: false,
      isOnline: navigator.onLine,
      source: 'system',
      durationSincePreviousMs: null,
      metadata: null,
      createdAt: Date.now()
    });

    try {
      const response = await fetch(`${API_BASE}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idImage, selfieImage })
      });
      const data = await response.json();

      const eventType = data.status === 'success' ? 'identity_verification_success' : 'identity_verification_failed';
      
      eventBus.publish({
        eventId: crypto.randomUUID(),
        sessionId: 'global',
        timestamp: Date.now(),
        eventType: eventType,
        visibilityState: 'visible',
        hidden: false,
        hasFocus: true,
        isIdle: false,
        isOnline: navigator.onLine,
        source: 'system',
        durationSincePreviousMs: null,
        metadata: { matchScore: data.matchScore, message: data.message },
        createdAt: Date.now()
      });

      return data;
    } catch (e: any) {
      eventBus.publish({
        eventId: crypto.randomUUID(),
        sessionId: 'global',
        timestamp: Date.now(),
        eventType: 'identity_verification_failed',
        visibilityState: 'visible',
        hidden: false,
        hasFocus: true,
        isIdle: false,
        isOnline: navigator.onLine,
        source: 'system',
        durationSincePreviousMs: null,
        metadata: { error: e.message },
        createdAt: Date.now()
      });
      return { status: 'failed', matchScore: 0, message: e.message };
    }
  }

  async runThirdPartyCheck(): Promise<any> {
    const response = await fetch(`${API_BASE}/third-party`, { method: 'POST' });
    const data = await response.json();
    
    eventBus.publish({
      eventId: crypto.randomUUID(),
      sessionId: 'global',
      timestamp: Date.now(),
      eventType: 'third_party_identity_check',
      visibilityState: 'visible',
      hidden: false,
      hasFocus: true,
      isIdle: false,
      isOnline: navigator.onLine,
      source: 'system',
      durationSincePreviousMs: null,
      metadata: data,
      createdAt: Date.now()
    });
    
    return data;
  }
}

export const identityClient = new IdentityClient();
