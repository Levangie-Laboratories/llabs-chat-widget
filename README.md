# LLabs Chat Widget

Embeddable chat widget that connects website visitors to [LLabs](https://levangielaboratories.com) AI agents. Drop a single `<script>` tag on any website (WordPress, Squarespace, Shopify, static HTML, etc.) and your visitors can chat with an AI agent in real-time.

Forked from [FlowiseChatEmbed](https://github.com/FlowiseAI/FlowiseChatEmbed) (MIT License).

## Quick Start

### 1. Get your API key

Log into the LLabs platform and go to **Settings > API Keys**. Copy your `ub_` key.

### 2. Add the widget to your website

```html
<script type="module">
  import Chatbot from 'https://your-hosting-url/dist/web.js';

  Chatbot.init({
    apiHost: 'https://dev.levangielaboratories.com', // LLabs backend URL
    agentType: 'coding',                              // Which agent to chat with
    apiKey: 'ub_xxxxx',                               // Your LLabs API key
    theme: {
      chatWindow: {
        showTitle: true,
        title: 'Chat with us',                        // Header title
        titleAvatarSrc: 'https://...',                // Logo in header (optional)
        titleBackgroundColor: '#6366f1',              // Header bar color
        titleTextColor: '#ffffff',                    // Header text color
        welcomeMessage: 'Hi! How can I help you today?',
        backgroundColor: '#ffffff',
        clearChatOnReload: false,                     // Keep chat on page refresh
        starterPrompts: [                             // Suggested questions (optional)
          'What do you do?',
          'How can you help me?',
        ],
        botMessage: {
          backgroundColor: '#f0f0f0',
          textColor: '#303235',
          showAvatar: true,
          avatarSrc: 'https://...',                   // Bot avatar image (optional)
        },
        userMessage: {
          backgroundColor: '#6366f1',
          textColor: '#ffffff',
        },
        textInput: {
          placeholder: 'Type your message...',
          sendButtonColor: '#6366f1',
        },
        footer: {
          showFooter: false,
        },
      },
      tooltip: {
        showTooltip: true,                            // Hover tooltip on bubble
        tooltipMessage: 'Need help? Chat with us!',
        tooltipBackgroundColor: 'black',
        tooltipTextColor: 'white',
      },
      button: {
        backgroundColor: '#6366f1',
        size: 'large',                                // 'small' | 'medium' | 'large' | number
        bottom: 24,
        right: 24,
        customIconSrc: 'https://...',                 // Custom bubble icon (optional)
        autoWindowOpen: {
          autoOpen: false,                            // Auto-open chat on page load
          openDelay: 2,                               // Delay in seconds
          autoOpenOnMobile: false,
        },
      },
    },
  });
</script>
```

That's it. A chat bubble appears in the bottom-right corner of your page. Visitors click it to open the chat panel and talk to your agent.

### 3. Full-page mode (optional)

```html
<body style="margin: 0">
  <script type="module">
    import Chatbot from 'https://your-hosting-url/dist/web.js';

    Chatbot.initFull({
      apiHost: 'https://dev.levangielaboratories.com',
      agentType: 'coding',
      apiKey: 'ub_xxxxx',
      theme: {
        chatWindow: {
          showTitle: true,
          title: 'LLabs Assistant',
          welcomeMessage: 'Hi! How can I help you today?',
        },
      },
    });
  </script>
</body>
```

## Configuration

### Required Props

| Prop        | Description                                                           |
| ----------- | --------------------------------------------------------------------- |
| `apiHost`   | Your LLabs backend URL (e.g., `https://dev.levangielaboratories.com`) |
| `agentType` | Which agent handles conversations (e.g., `coding`, `graywhale`)       |
| `apiKey`    | Your LLabs API key (`ub_xxxxx`)                                       |

### Theme Options

```javascript
Chatbot.init({
  apiHost: '...',
  agentType: '...',
  apiKey: '...',
  theme: {
    button: {
      backgroundColor: '#3B81F6', // Bubble button color
      right: 20, // Distance from right edge (px)
      bottom: 20, // Distance from bottom edge (px)
      size: 48, // Button size: 'small' | 'medium' | 'large' | number
      iconColor: 'white',
      customIconSrc: 'https://...', // Custom icon URL (optional)
      dragAndDrop: true, // Allow dragging the button
      autoWindowOpen: {
        autoOpen: true, // Auto-open chat on page load
        openDelay: 2, // Delay in seconds
        autoOpenOnMobile: false,
      },
    },
    tooltip: {
      showTooltip: true,
      tooltipMessage: 'Hi there!',
      tooltipBackgroundColor: 'black',
      tooltipTextColor: 'white',
      tooltipFontSize: 16,
    },
    chatWindow: {
      showTitle: true,
      title: 'Chat with us',
      welcomeMessage: 'Hello! How can I help?',
      errorMessage: 'Something went wrong. Please try again.',
      backgroundColor: '#ffffff',
      height: 700,
      width: 400,
      fontSize: 16,
      renderHTML: true,
      botMessage: {
        backgroundColor: '#f7f8ff',
        textColor: '#303235',
        showAvatar: true,
        avatarSrc: 'https://...',
      },
      userMessage: {
        backgroundColor: '#3B81F6',
        textColor: '#ffffff',
        showAvatar: true,
        avatarSrc: 'https://...',
      },
      textInput: {
        placeholder: 'Type your question',
        backgroundColor: '#ffffff',
        textColor: '#303235',
        sendButtonColor: '#3B81F6',
        maxChars: 500,
        autoFocus: true,
        sendMessageSound: true,
        receiveMessageSound: true,
      },
      footer: {
        showFooter: false, // Hide "Powered by" footer
        textColor: '#303235',
        text: 'Powered by',
        company: 'LLabs',
        companyLink: 'https://levangielaboratories.com',
      },
    },
  },
});
```

### Additional Options Not Shown Above

These options are available but not included in the default snippet:

| Option | Location | Description |
|--------|----------|-------------|
| `height` / `width` | `chatWindow` | Resize the chat panel (default: 700x400) |
| `backgroundImage` | `chatWindow` | Background image URL for the chat panel |
| `renderHTML` | `chatWindow` | Allow HTML rendering in messages (default: true) |
| `maxChars` | `textInput` | Character limit on input (shows warning) |
| `autoFocus` | `textInput` | Auto-focus the input when chat opens |
| `sendMessageSound` | `textInput` | Play sound on message send |
| `receiveMessageSound` | `textInput` | Play sound on message receive |
| `showAvatar` | `userMessage` | Show avatar next to user messages |
| `avatarSrc` | `userMessage` | Custom avatar image for user messages |
| `dragAndDrop` | `button` | Allow visitor to drag the chat bubble |
| `iconColor` | `button` | Color of the default chat icon |
| `starterPromptFontSize` | `chatWindow` | Font size for starter prompt buttons |
| `dateTimeToggle` | `chatWindow` | Show date/time on messages (`{date: true, time: true}`) |
| `fontSize` | `chatWindow` | Base font size for chat text |
| `customCSS` | `theme` | Inject custom CSS (use `!important` to override defaults) |
| `disclaimer` | `theme` | Show a disclaimer popup before chat starts |

See the full [Theme Options](#theme-options) section for complete configuration reference.

## How It Works

1. **Visitor opens chat** -- clicks the bubble, chat panel slides open
2. **First message** -- widget calls `POST /api/channels/web/init` to create a session and spawn an agent
3. **Conversation** -- messages sent via `POST /api/channels/web/{session_id}/message`, responses streamed back via SSE (Server-Sent Events)
4. **Session persistence** -- session ID stored in `localStorage` with a 24-hour TTL. If the visitor returns within 24 hours, the conversation resumes. After 24 hours, a fresh session starts.
5. **Refresh button** -- the refresh icon in the chat header clears the session and starts a new conversation

### Backend Endpoints Used

| Endpoint                         | Method | Purpose                             |
| -------------------------------- | ------ | ----------------------------------- |
| `/api/channels/web/init`         | POST   | Create session + spawn agent        |
| `/api/channels/web/{id}/message` | POST   | Send visitor message                |
| `/api/channels/web/{id}/stream`  | GET    | SSE stream of agent responses       |
| `/api/channels/web/{id}/history` | GET    | Load conversation history on resume |

## Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
git clone git@github.com:Levangie-Laboratories/llabs-chat-widget.git
cd llabs-chat-widget
npm install --legacy-peer-deps
```

### Local Development

1. Copy the environment template:

```bash
cp .env.example .env
```

2. Edit `.env` with your LLabs API key:

```
API_HOST=https://dev.levangielaboratories.com
API_KEY=ub_your_key_here
AGENT_TYPE=coding
```

3. Create a local demo page (gitignored):

```bash
cp demo.html demo.local.html
```

Edit `demo.local.html` and fill in your `apiKey` value.

4. Build and serve:

```bash
npm run build
npx serve -l 5678 .
```

5. Open `http://localhost:5678/demo.local.html`

### Build

```bash
npm run build
```

Outputs:

- `dist/web.js` -- ES Module (for `import`)
- `dist/web.umd.js` -- UMD (for `<script>` tag)

### Project Structure

```
src/
├── components/
│   ├── Bot.tsx              # Main chat component (LLabs mode + legacy Flowise mode)
│   ├── bubbles/             # Message bubble components
│   ├── buttons/             # Action buttons
│   ├── inputs/              # Text input
│   └── icons/               # SVG icons
├── features/
│   ├── bubble/              # Floating bubble widget mode
│   └── full/                # Full-page widget mode
├── queries/
│   ├── llabsChatQuery.ts    # LLabs API client + session persistence
│   └── sendMessageQuery.ts  # Legacy Flowise API (unused in LLabs mode)
├── register.tsx             # Web component registration (<llabs-chat-widget>)
├── window.ts                # window.Chatbot.init() / .initFull() / .destroy()
├── constants.ts             # Default props
└── web.ts                   # Entry point
```

### Web Component

The widget registers as a custom element `<llabs-chat-widget>`. You can also use it declaratively:

```html
<llabs-chat-widget apiHost="https://dev.levangielaboratories.com" agentType="coding" apiKey="ub_xxxxx"></llabs-chat-widget>
<script src="dist/web.umd.js"></script>
```

## Roadmap

- [ ] Widget keys (`wk_xxxxx`) -- dedicated public keys instead of API keys
- [ ] Settings UI in LLabs platform to generate embed codes
- [ ] CDN hosting (`cdn.llabs.app/chat-widget.js`)
- [ ] Anonymous visitor sessions with no memory carry-over
- [ ] Rate limiting per widget key
- [ ] File upload support
- [ ] Mobile full-screen mode

## License

[MIT License](https://github.com/FlowiseAI/Flowise/blob/master/LICENSE.md) (inherited from FlowiseChatEmbed).
