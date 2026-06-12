import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { identityClient } from '../../src/modules/identity/identityClient';
import { networkClient } from '../../src/modules/network/networkClient';
import { plagiarismClient } from '../../src/modules/plagiarism/plagiarismClient';
import { proctoringClient } from '../../src/modules/proctoring/proctoringClient';
import { desktopAppClient } from '../../src/modules/desktopApp/desktopAppClient';
import { eventBus } from '../../src/monitoring/eventBus';

// Mock fetch globally
const globalFetch = vi.fn();
vi.stubGlobal('fetch', globalFetch);

describe('Integrity Platform Modules', () => {
  let events: any[] = [];
  let unsubscribe: () => void;

  beforeEach(() => {
    vi.clearAllMocks();
    events = [];
    unsubscribe = eventBus.subscribe(e => events.push(e));
  });

  afterEach(() => {
    unsubscribe();
  });

  it('Identity Module verifies identity', async () => {
    globalFetch.mockResolvedValueOnce({
      json: async () => ({ status: 'success', matchScore: 98, message: 'Identity verified successfully' })
    });

    const res = await identityClient.verifyIdentity('a', 'b');
    
    expect(res.status).toBe('success');
    expect(events.some(e => e.eventType === 'identity_verification_start')).toBe(true);
    expect(events.some(e => e.eventType === 'identity_verification_success')).toBe(true);
  });

  it('Network Module captures location', async () => {
    globalFetch.mockResolvedValueOnce({
      json: async () => ({ ip: '8.8.8.8', country: 'US', city: 'Mountain View' })
    });

    const res = await networkClient.captureLocation();
    
    expect(res?.ip).toBe('8.8.8.8');
    expect(events.some(e => e.eventType === 'network_ip_capture')).toBe(true);
    expect(events.some(e => e.eventType === 'location_capture')).toBe(true);
  });

  it('Plagiarism Module detects cheating', async () => {
    globalFetch.mockResolvedValueOnce({
      json: async () => ({ similarityScore: 90, isPlagiarized: true, matches: [] })
    });

    const res = await plagiarismClient.checkCode('foo');
    
    expect(res?.isPlagiarized).toBe(true);
    expect(events.some(e => e.eventType === 'plagiarism_check_start')).toBe(true);
    expect(events.some(e => e.eventType === 'plagiarism_detected')).toBe(true);
  });

  it('Desktop App Module detects invisible apps', async () => {
    globalFetch.mockResolvedValueOnce({
      json: async () => ({ status: 'warning', detectedApps: [{ name: 'ChatGPT' }] })
    });

    const res = await desktopAppClient.scanForInvisibleApps();
    
    expect(res?.status).toBe('warning');
    expect(events.some(e => e.eventType === 'invisible_ai_app_detected')).toBe(true);
  });
});
