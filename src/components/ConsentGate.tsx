import { createSignal, Show } from 'solid-js';

type ConsentGateProps = {
  aiDisclosure?: string;
  privacyPolicyUrl?: string;
  termsUrl?: string;
  storageKey: string;
  onConsent: () => void;
};

export const ConsentGate = (props: ConsentGateProps) => {
  const [consented, setConsented] = createSignal(
    typeof localStorage !== 'undefined' && localStorage.getItem(props.storageKey) === '1'
  );

  // If already consented, immediately trigger and hide
  if (consented()) {
    props.onConsent();
    return null;
  }

  const handleConsent = () => {
    try {
      localStorage.setItem(props.storageKey, '1');
    } catch (_) { /* localStorage may be unavailable in some contexts */ }
    setConsented(true);
    props.onConsent();
  };

  return (
    <Show when={!consented()}>
      <div
        style={{
          display: 'flex',
          'flex-direction': 'column',
          'align-items': 'center',
          'justify-content': 'center',
          padding: '24px',
          height: '100%',
          'text-align': 'center',
          'font-family': 'inherit',
          gap: '16px',
        }}
      >
        <div
          style={{
            'font-size': '13px',
            color: '#6b7280',
            'line-height': '1.5',
            'max-width': '280px',
          }}
        >
          <div
            style={{
              'background-color': '#f3f4f6',
              'border-radius': '8px',
              padding: '10px 14px',
              'margin-bottom': '16px',
              'font-size': '12px',
              color: '#4b5563',
            }}
          >
            {props.aiDisclosure || 'You are chatting with an AI assistant'}
          </div>
          <p style={{ margin: '0 0 8px 0' }}>
            By continuing, you agree to the{' '}
            {props.privacyPolicyUrl ? (
              <a
                href={props.privacyPolicyUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#3b82f6', 'text-decoration': 'underline' }}
              >
                Privacy Policy
              </a>
            ) : (
              'Privacy Policy'
            )}
            {props.termsUrl && (
              <>
                {' '}and{' '}
                <a
                  href={props.termsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#3b82f6', 'text-decoration': 'underline' }}
                >
                  Terms of Service
                </a>
              </>
            )}
            .
          </p>
          <p style={{ margin: '0', 'font-size': '11px', color: '#9ca3af' }}>
            Your messages are processed by AI.
          </p>
        </div>
        <button
          onClick={handleConsent}
          style={{
            'background-color': '#3b82f6',
            color: 'white',
            border: 'none',
            'border-radius': '8px',
            padding: '10px 32px',
            'font-size': '14px',
            'font-weight': '500',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
        >
          Continue
        </button>
      </div>
    </Show>
  );
};
