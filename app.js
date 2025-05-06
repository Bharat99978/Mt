import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const socialLinks = [
  { name: 'YouTube', url: 'https://youtube.com/@bharat_official3775', icon: 'mdi:youtube' },
  { name: 'Instagram', url: 'https://www.instagram.com/mrk_official_php', icon: 'mdi:instagram' },
  { name: 'WhatsApp', url: 'https://wa.me/+919322461670', icon: 'mdi:whatsapp', number: '+919322461670' },
  { name: 'Twitter', url: 'https://x.com/FireBharat', icon: 'mdi:twitter' },
  { name: 'BiliBili', url: 'https://bili.im/V7IJuVb', icon: 'mdi:bilibili' },
];

@customElement('social-hub')
export class SocialHub extends LitElement {
  @property({ type: String }) theme = 'light';

  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
    }
    .light {
      --background-color: white;
      --text-color: black;
      --card-bg: #f0f0f0;
    }
    .dark {
      --background-color: #121212;
      --text-color: white;
      --card-bg: #1e1e1e;
    }
    .social-hub {
      background-color: var(--background-color);
      color: var(--text-color);
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100vh;
      overflow-y: auto;
      scroll-snap-type: y mandatory;
    }
    .theme-toggle {
      margin-bottom: 20px;
      padding: 10px 20px;
      cursor: pointer;
    }
    .link-card {
      display: flex;
      align-items: center;
      background-color: var(--card-bg);
      padding: 15px;
      margin-bottom: 10px;
      border-radius: 8px;
      width: 100%;
      max-width: 400px;
      transition: transform 0.3s ease;
      perspective: 1000px;
      scroll-snap-align: start;
    }
    .link-card:hover {
      transform: rotateY(10deg) scale(1.05);
    }
    iconify-icon {
      margin-right: 10px;
      font-size: 24px;
    }
    a {
      color: var(--text-color);
      text-decoration: none;
      flex-grow: 1;
    }
    button {
      margin-left: 10px;
      padding: 5px 10px;
      cursor: pointer;
    }
    @layer base {
      :root {
        --gradient: linear-gradient(45deg, #ff6b6b, #4ecdc4);
      }
    }
    @layer components {
      .link-card {
        border: 2px solid transparent;
        background-image: var(--gradient);
        background-clip: padding-box;
      }
    }
  `;

  render() {
    return html`
      <div class="${this.theme} social-hub">
        <button class="theme-toggle" @click="${this.toggleTheme}">
          Switch to ${this.theme === 'light' ? 'Dark' : 'Light'} Theme
        </button>
        ${socialLinks.map(link => html`
          <div class="link-card">
            <iconify-icon icon="${link.icon}"></iconify-icon>
            <a href="${link.url}" target="_blank">${link.name}</a>
            ${link.name === 'WhatsApp' ? html`
              <button @click="${() => this.copyToClipboard(link.number)}">Copy Number</button>
            ` : ''}
          </div>
        `)}
      </div>
    `;
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);
    this.updateFavicon();
  }

  copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }

  updateFavicon() {
    let link = document.querySelector('link[rel="icon"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = this.theme === 'light' ? '/favicon-light.png' : '/favicon-dark.png';
  }

  connectedCallback() {
    super.connectedCallback();
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.theme = savedTheme;
      this.updateFavicon();
    }
  }
}