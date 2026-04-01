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
export type LLabsSSEEvent = {
    event: 'message';
    data: {
        content: string;
        role: string;
        message_id: string;
        timestamp: number;
    };
} | {
    event: 'status';
    data: {
        status: 'thinking' | 'idle';
        session_id: string;
    };
} | {
    event: 'heartbeat';
    data: {
        timestamp: number;
    };
} | {
    event: 'action';
    data: any;
};
type StoredSession = {
    sessionId: string;
    lastActiveAt: number;
};
export declare const getStoredSession: (apiKey: string) => StoredSession | null;
export declare const storeSession: (apiKey: string, sessionId: string) => void;
export declare const touchSession: (apiKey: string) => void;
export declare const clearStoredSession: (apiKey: string) => void;
export declare const getStoredVisitorId: (apiKey: string) => string | null;
export declare const storeVisitorId: (apiKey: string, visitorId: string) => void;
export declare const initSession: (apiHost: string, agentType: string, apiKey: string, visitorId?: string | null) => Promise<{
    data?: LLabsInitResponse | undefined;
    error?: Error | undefined;
}>;
export declare const sendLLabsMessage: (apiHost: string, sessionId: string, message: string, apiKey: string) => Promise<{
    data?: LLabsMessageResponse | undefined;
    error?: Error | undefined;
}>;
export declare const getChatHistory: (apiHost: string, sessionId: string, apiKey: string, limit?: number) => Promise<{
    data?: LLabsHistoryResponse | undefined;
    error?: Error | undefined;
}>;
export declare const stopSession: (apiHost: string, sessionId: string, apiKey: string) => Promise<{
    data?: {
        status: string;
    } | undefined;
    error?: Error | undefined;
}>;
/**
 * Build the SSE stream URL for a given session.
 * The caller should use `new EventSource(url)` or `fetchEventSource` to connect.
 */
export declare const getStreamUrl: (apiHost: string, sessionId: string, apiKey: string) => string;
export {};
//# sourceMappingURL=llabsChatQuery.d.ts.map