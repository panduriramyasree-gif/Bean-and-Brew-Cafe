/**
 * @file src/components/N8nChatWidget.tsx
 * Embedded n8n Chat Widget for Bean & Brew Café.
 * 
 * Embeds official @n8n/chat directly via the client bundle / cdn styles,
 * targeting the user's specific n8n webhook:
 * "https://panduri.app.n8n.cloud/webhook/6dbca8bd-f4b0-4684-a306-8475ad9be6e1/chat"
 * 
 * Styled as a modern, elegant floating button in the bottom-right corner
 * that coordinates with Bean & Brew's warm cafe palette.
 */

import React, { useEffect } from 'react';

const WEBHOOK_URL = 'https://panduri.app.n8n.cloud/webhook/6dbca8bd-f4b0-4684-a306-8475ad9be6e1/chat';

declare global {
  interface Window {
    createChat?: (config: any) => void;
  }
}

export const N8nChatWidget: React.FC = () => {
  useEffect(() => {
    // 1. Inject @n8n/chat official CSS stylesheet
    const cssId = 'n8n-chat-stylesheet';
    if (!document.getElementById(cssId)) {
      const link = document.createElement('link');
      link.id = cssId;
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat@latest/dist/style.css';
      document.head.appendChild(link);
    }

    // 2. Load @n8n/chat library bundle dynamically
    let isMounted = true;

    const initChat = (createChatFn: (config: any) => void) => {
      if (!isMounted) return;
      try {
        createChatFn({
          webhookUrl: WEBHOOK_URL,
          webhookConfig: {
            method: 'POST',
            headers: {},
          },
          target: '#n8n-chat-root',
          mode: 'window',
          chatInputKey: 'chatInput',
          chatSessionKey: 'sessionId',
          metadata: {
            cafe: 'Bean & Brew Café',
            location: 'Indiranagar, Bengaluru',
          },
          showWelcomeScreen: false,
          defaultLanguage: 'en',
          initialMessages: [
            'Hello! ☕ Welcome to Bean & Brew Café.',
            'How can I help you today? Ask about our specialty coffees, fresh bakery menu, custom drink builder, loyalty rewards, or order tracking!',
          ],
          i18n: {
            en: {
              title: 'Bean & Brew Concierge',
              subtitle: 'Online • Freshly Brewed. Made With Love.',
              footer: 'Powered by Bean & Brew & n8n',
              getStarted: 'Start conversation',
              inputPlaceholder: 'Ask about coffees, snacks, orders...',
              closeButtonTooltip: 'Close Concierge',
            },
          },
        });
      } catch (err) {
        console.warn('n8n Chat initialized or already loaded:', err);
      }
    };

    // Attempt ESM import from CDN for @n8n/chat
    const loadN8nChat = async () => {
      try {
        // @ts-ignore
        const n8nModule = await import(/* @vite-ignore */ 'https://cdn.jsdelivr.net/npm/@n8n/chat@latest/dist/chat.bundle.es.js');
        if (n8nModule && typeof n8nModule.createChat === 'function') {
          initChat(n8nModule.createChat);
          return;
        }
      } catch (esmError) {
        console.warn('CDN ESM import fallback:', esmError);
      }

      // Fallback: inject UMD script if ESM is unavailable
      const scriptId = 'n8n-chat-umd-script';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://cdn.jsdelivr.net/npm/@n8n/chat@latest/dist/chat.bundle.umd.js';
        script.async = true;
        script.onload = () => {
          if (window.createChat) {
            initChat(window.createChat);
          }
        };
        document.body.appendChild(script);
      } else if (window.createChat) {
        initChat(window.createChat);
      }
    };

    loadN8nChat();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {/* Target anchor container for n8n embedded chat */}
      <div id="n8n-chat-root" className="relative z-50" />

      {/* Embedded styling to harmonize the n8n chat window & floating launcher button */}
      <style>{`
        :root {
          --chat--color-primary: #3E2312;
          --chat--color-primary-shade-50: #2C1810;
          --chat--color-primary-shade-100: #1F0F08;
          --chat--color-secondary: #E0A96D;
          --chat--color-light: #FAF7F2;
          --chat--color-light-shade-50: #F4ECE1;
          --chat--color-light-shade-100: #EADCC9;
          --chat--color-dark: #2C1810;
          --chat--color-disabled: #8C6D56;
          --chat--color-typing: #3E2312;
          --chat--border-radius: 1.25rem;
          --chat--window--width: 380px;
          --chat--window--height: 580px;
          --chat--header--background: #3E2312;
          --chat--header--color: #FFF8F0;
          --chat--toggle--background: #3E2312;
          --chat--toggle--hover--background: #2C1810;
          --chat--toggle--active--background: #1F0F08;
          --chat--toggle--color: #E0A96D;
        }

        /* Ensure floating toggle button stays beautifully anchored at bottom-right */
        .chat-toggle {
          position: fixed !important;
          bottom: 24px !important;
          right: 24px !important;
          z-index: 49 !important;
          width: 58px !important;
          height: 58px !important;
          border-radius: 50% !important;
          background: #3E2312 !important;
          color: #E0A96D !important;
          box-shadow: 0 10px 25px -5px rgba(44, 24, 16, 0.4), 0 8px 10px -6px rgba(44, 24, 16, 0.3) !important;
          border: 2px solid #E0A96D !important;
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease !important;
        }

        .chat-toggle:hover {
          transform: scale(1.08) !important;
          box-shadow: 0 14px 28px -4px rgba(44, 24, 16, 0.5) !important;
        }

        /* Position the chat window right above the button */
        .chat-window {
          position: fixed !important;
          bottom: 92px !important;
          right: 24px !important;
          z-index: 50 !important;
          box-shadow: 0 20px 40px -15px rgba(44, 24, 16, 0.35), 0 0 0 1px #EADCC9 !important;
          border-radius: 20px !important;
          overflow: hidden !important;
        }

        @media (max-width: 640px) {
          .chat-window {
            right: 12px !important;
            left: 12px !important;
            bottom: 84px !important;
            width: calc(100% - 24px) !important;
            max-height: 75vh !important;
          }
          .chat-toggle {
            bottom: 18px !important;
            right: 18px !important;
          }
        }
      `}</style>
    </>
  );
};
