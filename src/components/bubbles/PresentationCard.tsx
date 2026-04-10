import { For, Show } from 'solid-js';

export type PresentationAgent = {
  name: string;
  description: string;
};

export type PresentationInvestment = {
  range: string;
  variance_reason?: string;
  roi_ratio?: string;
};

export type PresentationBooking = {
  host: string;
  calendly_url: string;
  duration_min?: number;
  description?: string;
};

export type PresentationData = {
  company: string;
  visitor_name?: string;
  prepared_date?: string;
  what_we_heard: string;
  goal: string;
  agents: PresentationAgent[];
  why_different: string;
  what_unlocks: string;
  connects_to: string[];
  investment: PresentationInvestment;
  booking?: PresentationBooking;
};

type Props = {
  data: PresentationData;
  backgroundColor?: string;
  textColor?: string;
};

const ACCENT = '#7b61ff';
const DIVIDER = '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━';

/**
 * Escape regex metacharacters in a string so it can be used safely inside `new RegExp(...)`.
 */
const escapeRegex = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Split `text` around case-insensitive occurrences of `company` and return an array of
 * text and <strong> JSX nodes so the first mention in each section appears bold.
 * Only the FIRST occurrence is bolded — matches Aaron's spec ("bold company name on
 * first use in each section").
 */
const HighlightCompany = (props: { text: string; company: string }) => {
  const company = props.company?.trim();
  if (!company) return <>{props.text}</>;
  const re = new RegExp(escapeRegex(company), 'i');
  const match = props.text.match(re);
  if (!match || match.index === undefined) return <>{props.text}</>;
  const before = props.text.slice(0, match.index);
  const hit = props.text.slice(match.index, match.index + match[0].length);
  const after = props.text.slice(match.index + match[0].length);
  return (
    <>
      {before}
      <strong style={{ 'font-weight': '700' }}>{hit}</strong>
      {after}
    </>
  );
};

const Section = (props: { emoji: string; title: string; textColor: string; children: any }) => (
  <div style={{ 'margin-bottom': '16px' }}>
    <div
      style={{
        display: 'flex',
        'align-items': 'center',
        gap: '8px',
        'margin-bottom': '6px',
        'font-size': '0.95rem',
        'font-weight': '600',
        color: props.textColor,
      }}
    >
      <span style={{ 'font-size': '1.1rem' }}>{props.emoji}</span>
      <span>{props.title}</span>
    </div>
    <div
      style={{
        'font-size': '0.9rem',
        'line-height': '1.55',
        color: props.textColor,
        opacity: '0.9',
      }}
    >
      {props.children}
    </div>
  </div>
);

export const PresentationCard = (props: Props) => {
  const textColor = () => props.textColor || '#303235';
  const bg = () => props.backgroundColor || '#f7f8ff';

  const handleBooking = () => {
    const url = props.data.booking?.calendly_url;
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      class="llabs-presentation-card"
      style={{
        width: '100%',
        'border-radius': '12px',
        border: `1px solid ${ACCENT}33`,
        background: bg(),
        'margin-top': '8px',
        'margin-bottom': '8px',
        overflow: 'hidden',
        'box-shadow': '0 2px 8px rgba(123, 97, 255, 0.08)',
      }}
    >
      {/* Top divider band */}
      <div
        style={{
          padding: '10px 16px 8px 16px',
          'border-bottom': `1px solid ${ACCENT}22`,
          background: `${ACCENT}08`,
        }}
      >
        <div
          style={{
            'font-size': '0.7rem',
            color: ACCENT,
            'letter-spacing': '0.08em',
            'text-transform': 'uppercase',
            'font-weight': '600',
          }}
        >
          {DIVIDER}
        </div>
        <div
          style={{
            'font-size': '0.95rem',
            'font-weight': '700',
            color: textColor(),
            'margin-top': '6px',
            'letter-spacing': '0.02em',
          }}
        >
          LEVANGIE LABS — PREPARED FOR{' '}
          <Show when={props.data.visitor_name} fallback={<>{props.data.company.toUpperCase()}</>}>
            {props.data.visitor_name!.toUpperCase()} AT {props.data.company.toUpperCase()}
          </Show>
        </div>
        <Show when={props.data.prepared_date}>
          <div
            style={{
              'font-size': '0.75rem',
              color: textColor(),
              opacity: '0.55',
              'margin-top': '2px',
            }}
          >
            {props.data.prepared_date}
          </div>
        </Show>
      </div>

      {/* Body */}
      <div style={{ padding: '16px' }}>
        <Section emoji="📍" title="What We Heard" textColor={textColor()}>
          <HighlightCompany text={props.data.what_we_heard} company={props.data.company} />
        </Section>

        <Section emoji="🎯" title="Your 12-Month Goal" textColor={textColor()}>
          <div
            style={{
              'font-style': 'italic',
              padding: '8px 12px',
              'border-left': `3px solid ${ACCENT}`,
              background: `${ACCENT}0a`,
              'border-radius': '0 4px 4px 0',
            }}
          >
            "{props.data.goal}"
          </div>
        </Section>

        <Section emoji="🤖" title={`What We'd Build For ${props.data.company}`} textColor={textColor()}>
          <div style={{ display: 'flex', 'flex-direction': 'column', gap: '10px' }}>
            <For each={props.data.agents}>
              {(agent) => (
                <div
                  style={{
                    padding: '10px 12px',
                    'border-radius': '8px',
                    background: 'rgba(0, 0, 0, 0.03)',
                    border: '1px solid rgba(0, 0, 0, 0.06)',
                  }}
                >
                  <div
                    style={{
                      'font-weight': '600',
                      'font-size': '0.9rem',
                      color: ACCENT,
                      'margin-bottom': '4px',
                    }}
                  >
                    {agent.name}
                  </div>
                  <div style={{ 'font-size': '0.85rem', 'line-height': '1.5' }}>{agent.description}</div>
                </div>
              )}
            </For>
          </div>
        </Section>

        <Section emoji="⚙️" title="Why This Is Different" textColor={textColor()}>
          <HighlightCompany text={props.data.why_different} company={props.data.company} />
        </Section>

        <Section emoji="📈" title={`What This Unlocks For ${props.data.company}`} textColor={textColor()}>
          <HighlightCompany text={props.data.what_unlocks} company={props.data.company} />
        </Section>

        <Section emoji="🔗" title="What It Connects To" textColor={textColor()}>
          <div style={{ display: 'flex', 'flex-wrap': 'wrap', gap: '6px' }}>
            <For each={props.data.connects_to}>
              {(tool) => (
                <span
                  style={{
                    padding: '4px 10px',
                    'border-radius': '999px',
                    background: `${ACCENT}14`,
                    color: ACCENT,
                    'font-size': '0.8rem',
                    'font-weight': '500',
                  }}
                >
                  {tool}
                </span>
              )}
            </For>
          </div>
          <div
            style={{
              'margin-top': '8px',
              'font-size': '0.8rem',
              opacity: '0.65',
              'font-style': 'italic',
            }}
          >
            No rip-and-replace — we integrate with what you already use.
          </div>
        </Section>

        <Section emoji="💰" title="Investment" textColor={textColor()}>
          <div
            style={{
              'font-size': '1.05rem',
              'font-weight': '700',
              color: textColor(),
            }}
          >
            {props.data.investment.range}
          </div>
          <Show when={props.data.investment.variance_reason}>
            <div style={{ 'font-size': '0.8rem', opacity: '0.7', 'margin-top': '4px' }}>
              Range depends on: {props.data.investment.variance_reason}
            </div>
          </Show>
          <Show when={props.data.investment.roi_ratio}>
            <div
              style={{
                'margin-top': '6px',
                display: 'inline-block',
                padding: '3px 10px',
                'border-radius': '6px',
                background: '#10b98114',
                color: '#059669',
                'font-size': '0.8rem',
                'font-weight': '600',
              }}
            >
              {props.data.investment.roi_ratio} ROI
            </div>
          </Show>
        </Section>
      </div>

      {/* Booking footer */}
      <Show when={props.data.booking?.calendly_url}>
        <div
          style={{
            padding: '14px 16px',
            'border-top': `1px solid ${ACCENT}22`,
            background: `${ACCENT}08`,
          }}
        >
          <div
            style={{
              'font-size': '0.85rem',
              color: textColor(),
              'margin-bottom': '10px',
            }}
          >
            Next step: a{' '}
            <strong>
              {props.data.booking?.duration_min || 15}-minute {props.data.booking?.description || 'demo account setup call'}
            </strong>{' '}
            with <strong>{props.data.booking?.host || 'Edward West'}</strong>.
          </div>
          <button
            type="button"
            onClick={handleBooking}
            style={{
              padding: '10px 20px',
              'font-size': '0.9rem',
              'font-weight': '600',
              color: '#ffffff',
              background: ACCENT,
              border: 'none',
              'border-radius': '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              'box-shadow': '0 2px 6px rgba(123, 97, 255, 0.25)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#6a50e0';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = ACCENT;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Book with {props.data.booking?.host || 'Edward West'} ({props.data.booking?.duration_min || 15} min)
          </button>
        </div>
      </Show>

      {/* Bottom divider band */}
      <div
        style={{
          padding: '6px 16px 10px 16px',
          'font-size': '0.7rem',
          color: ACCENT,
          'letter-spacing': '0.08em',
          'text-transform': 'uppercase',
          'font-weight': '600',
          'text-align': 'center',
          opacity: '0.6',
        }}
      >
        {DIVIDER}
      </div>
    </div>
  );
};
