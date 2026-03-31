import { sendRequest } from '@/utils/index';

// ── Types ──────────────────────────────────────────────────────────────

export type LLabsInitResponse = {
  session_id: string;
  stream_url: string;
  visitor_id?: string;
};

export type LLabsMessageResponse = {
  status: string;
};

export type LLabsHistoryMessage = {
  role: string;
  content: string;
  timestamp: number;
};

export type LLabsHistoryResponse = {
  messages: LLabsHistoryMessage[];
};

export type LLabsSSEEvent =
  | { event: 'message'; data: { content: string; role: string; message_id: string; timestamp: number } }
  | { event: 'status'; data: { status: 'thinking' | 'idle'; session_id: string } }
  | { event: 'heartbeat'; data: { timestamp: number } }
  | { event: 'action'; data: any };

// ── Session persistence ────────────────────────────────────────────────

type StoredSession = { sessionId: string; lastActiveAt: number };

const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

/** Build a unique storage key from the API key (uses first 12 chars as fingerprint). */
const storageKey = (apiKey: string): string => {
  const fingerprint = apiKey.slice(0, 12).replace(/[^a-zA-Z0-9_-]/g, '');
  return `llabs_chat_${fingerprint}`;
};

export const getStoredSession = (apiKey: string): StoredSession | null => {
  try {
    const raw = localStorage.getItem(storageKey(apiKey));
    if (!raw) return null;
    const parsed: StoredSession = JSON.parse(raw);
    if (Date.now() - parsed.lastActiveAt > SESSION_TTL_MS) {
      localStorage.removeItem(storageKey(apiKey));
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
};

export const storeSession = (apiKey: string, sessionId: string) => {
  const data: StoredSession = { sessionId, lastActiveAt: Date.now() };
  localStorage.setItem(storageKey(apiKey), JSON.stringify(data));
};

export const touchSession = (apiKey: string) => {
  try {
    const raw = localStorage.getItem(storageKey(apiKey));
    if (!raw) return;
    const parsed: StoredSession = JSON.parse(raw);
    parsed.lastActiveAt = Date.now();
    localStorage.setItem(storageKey(apiKey), JSON.stringify(parsed));
  } catch {
    // ignore
  }
};

export const clearStoredSession = (apiKey: string) => {
  localStorage.removeItem(storageKey(apiKey));
};

// ── Visitor persistence (long-lived, no client-side expiry) ───────────

/** Storage key for the long-lived visitor token (separate from session). */
const visitorStorageKey = (apiKey: string): string => {
  const fingerprint = apiKey.slice(0, 12).replace(/[^a-zA-Z0-9_-]/g, '');
  return `llabs_visitor_${fingerprint}`;
};

export const getStoredVisitorId = (apiKey: string): string | null => {
  try {
    return localStorage.getItem(visitorStorageKey(apiKey));
  } catch {
    return null;
  }
};

export const storeVisitorId = (apiKey: string, visitorId: string): void => {
  try {
    localStorage.setItem(visitorStorageKey(apiKey), visitorId);
  } catch {
    // localStorage unavailable — visitor treated as new next time
  }
};

// ── API calls ──────────────────────────────────────────────────────────

export const initSession = (apiHost: string, agentType: string, apiKey: string, visitorId?: string | null) =>
  sendRequest<LLabsInitResponse>({
    method: 'POST',
    url: `${apiHost}/api/channels/web/init`,
    body: {
      agent_type: agentType,
      ...(visitorId ? { visitor_id: visitorId } : {}),
    } as any,
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

export const sendLLabsMessage = (apiHost: string, sessionId: string, message: string, apiKey: string) =>
  sendRequest<LLabsMessageResponse>({
    method: 'POST',
    url: `${apiHost}/api/channels/web/${sessionId}/message`,
    body: { message } as any,
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

export const getChatHistory = (apiHost: string, sessionId: string, apiKey: string, limit = 50) =>
  sendRequest<LLabsHistoryResponse>({
    method: 'GET',
    url: `${apiHost}/api/channels/web/${sessionId}/history?limit=${limit}&api_key=${apiKey}`,
  });

export const stopSession = (apiHost: string, sessionId: string, apiKey: string) =>
  sendRequest<{ status: string }>({
    method: 'POST',
    url: `${apiHost}/api/channels/web/${sessionId}/stop`,
    body: {} as any,
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

/**
 * Build the SSE stream URL for a given session.
 * The caller should use `new EventSource(url)` or `fetchEventSource` to connect.
 */
export const getStreamUrl = (apiHost: string, sessionId: string, apiKey: string) =>
  `${apiHost}/api/channels/web/${sessionId}/stream?api_key=${apiKey}`;
