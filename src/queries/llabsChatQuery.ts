import { sendRequest } from '@/utils/index';

// ── Types ──────────────────────────────────────────────────────────────

export type LLabsInitResponse = {
  session_id: string;
  stream_url: string;
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

export const getStoredSession = (agentType: string): StoredSession | null => {
  try {
    const raw = localStorage.getItem(`llabs_chat_${agentType}`);
    if (!raw) return null;
    const parsed: StoredSession = JSON.parse(raw);
    if (Date.now() - parsed.lastActiveAt > SESSION_TTL_MS) {
      localStorage.removeItem(`llabs_chat_${agentType}`);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
};

export const storeSession = (agentType: string, sessionId: string) => {
  const data: StoredSession = { sessionId, lastActiveAt: Date.now() };
  localStorage.setItem(`llabs_chat_${agentType}`, JSON.stringify(data));
};

export const touchSession = (agentType: string) => {
  try {
    const raw = localStorage.getItem(`llabs_chat_${agentType}`);
    if (!raw) return;
    const parsed: StoredSession = JSON.parse(raw);
    parsed.lastActiveAt = Date.now();
    localStorage.setItem(`llabs_chat_${agentType}`, JSON.stringify(parsed));
  } catch {
    // ignore
  }
};

export const clearStoredSession = (agentType: string) => {
  localStorage.removeItem(`llabs_chat_${agentType}`);
};

// ── API calls ──────────────────────────────────────────────────────────

export const initSession = (apiHost: string, agentType: string, apiKey: string) =>
  sendRequest<LLabsInitResponse>({
    method: 'POST',
    url: `${apiHost}/api/channels/web/init`,
    body: { agent_type: agentType } as any,
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

/**
 * Build the SSE stream URL for a given session.
 * The caller should use `new EventSource(url)` or `fetchEventSource` to connect.
 */
export const getStreamUrl = (apiHost: string, sessionId: string, apiKey: string) =>
  `${apiHost}/api/channels/web/${sessionId}/stream?api_key=${apiKey}`;
