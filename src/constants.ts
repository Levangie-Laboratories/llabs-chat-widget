import type { BubbleProps } from './features/bubble';

export const defaultBotProps: BubbleProps = {
  chatflowid: '',
  apiHost: undefined,
  agentType: undefined,
  apiKey: undefined,
  onRequest: undefined,
  chatflowConfig: undefined,
  theme: undefined,
  observersConfig: undefined,
  aiDisclosure: 'You are chatting with an AI assistant',
  privacyPolicyUrl: undefined,
  termsUrl: undefined,
  consentRequired: true,
  humanEscalation: undefined,
};

export const CHAT_HEADER_HEIGHT = 50;
