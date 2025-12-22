(function () {
  'use strict';

  // Configuration
  const API_BASE_URL = "http://localhost:3000/api/widget";
  const HOST_ID = "logpulse-widget";

  // Styles - PREMIUM EDITION with WOW Factor
  const STYLES = `
    :host{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";--brand-color:#2563eb;--ease-spring:cubic-bezier(0.34,1.56,0.64,1);--ease-smooth:cubic-bezier(0.4,0,0.2,1);--bg-primary:#18181b;--bg-secondary:#09090b;--text-primary:#f4f4f5;--text-secondary:#a1a1aa;--border-color:rgba(255,255,255,0.1);--card-bg:#27272a;--card-border:rgba(255,255,255,0.05);--card-hover-shadow:rgba(0,0,0,0.3);--header-bg:rgba(24,24,27,0.8);--footer-bg:rgba(24,24,27,0.8);--skeleton-start:#27272a;--skeleton-mid:#3f3f46;--skeleton-end:#27272a;--deck-shadow:0 24px 64px rgba(0,0,0,0.4),0 8px 24px rgba(0,0,0,0.2)}:host(.light-theme){--bg-primary:#ffffff;--bg-secondary:#f9fafb;--text-primary:#111827;--text-secondary:#6b7280;--border-color:rgba(0,0,0,0.06);--card-bg:#ffffff;--card-border:rgba(0,0,0,0.06);--card-hover-shadow:rgba(0,0,0,0.08);--header-bg:rgba(255,255,255,0.8);--footer-bg:rgba(255,255,255,0.8);--skeleton-start:#f3f4f6;--skeleton-mid:#e5e7eb;--skeleton-end:#f3f4f6;--deck-shadow:0 24px 64px rgba(0,0,0,0.18),0 8px 24px rgba(0,0,0,0.12)}*{box-sizing:border-box;margin:0;padding:0}.trigger-wrapper{position:fixed;bottom:24px;right:24px;z-index:2147483647}.trigger{height:56px;width:56px;border-radius:28px;background:#000;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 30px rgba(0,0,0,0.3),0 4px 10px rgba(0,0,0,0.2);transition:all 0.4s var(--ease-spring);position:relative;overflow:hidden;padding:0}.trigger:hover{width:140px;box-shadow:0 15px 40px rgba(0,0,0,0.4),0 8px 20px rgba(0,0,0,0.3)}.trigger:active{transform:scale(0.95)}.trigger::before{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:conic-gradient(from 0deg,transparent 0%,transparent 60%,var(--brand-color) 75%,var(--brand-color) 85%,#ffffff 92%,transparent 100%);opacity:0;z-index:0;transition:opacity 0.3s ease;animation:rotate 2s linear infinite;will-change:transform}.trigger:hover::before{opacity:1}.trigger.animating::before{opacity:1;animation:rotate 1s linear infinite}.trigger::after{content:'';position:absolute;inset:3px;background:var(--brand-color);border-radius:28px;z-index:1;box-shadow:inset 0 2px 4px rgba(255,255,255,0.2)}.trigger-content{position:relative;z-index:2;display:flex;align-items:center;justify-content:center;height:100%}.trigger-icon{width:24px;height:24px;transition:transform 0.6s var(--ease-spring);filter:drop-shadow(0 2px 4px rgba(0,0,0,0.5));flex-shrink:0}.trigger:hover .trigger-icon{transform:rotate(15deg)}.trigger-text{font-size:15px;font-weight:600;color:white;max-width:0;opacity:0;overflow:hidden;white-space:nowrap;margin-left:0;transition:all 0.4s var(--ease-spring)}.trigger:hover .trigger-text{max-width:100px;opacity:1;margin-left:10px}@keyframes rotate{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}.notification-dot{position:absolute;top:12px;right:14px;width:10px;height:10px;background:#ef4444;border:2px solid #1a1a1a;border-radius:50%;z-index:3;box-shadow:0 0 8px rgba(239, 68, 68, 0.6);animation:pulse-dot 2s infinite;transition:all 0.3s}.trigger:hover .notification-dot{right:18px}.deck{position:fixed;bottom:90px;right:20px;width:420px;max-height:min(680px,calc(100vh - 120px));background:var(--bg-primary);color:var(--text-primary);border-radius:20px;box-shadow:var(--deck-shadow);border:1px solid var(--border-color);display:flex;flex-direction:column;overflow:hidden;z-index:2147483646;opacity:0;transform:scale(0.92) translateY(10px);transform-origin:bottom right;transition:all 0.35s var(--ease-spring);pointer-events:none}.deck.open{opacity:1;transform:scale(1) translateY(0);pointer-events:all}    .deck-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 24px;
        border-bottom: 1px solid var(--border-color);
        background: var(--header-bg);
        backdrop-filter: blur(12px);
    }
    .deck-title {
        font-size: 14px;
        font-weight: 700;
        color: var(--text-primary);
        letter-spacing: 0.08em;
        text-transform: uppercase;
        opacity: 0.9;
    }.close-btn{width:32px;height:32px;border-radius:8px;border:none;background:rgba(128,128,128,0.1);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s var(--ease-smooth);color:var(--text-secondary)}.close-btn:hover{background:rgba(128,128,128,0.2);color:var(--text-primary);transform:rotate(90deg)}.deck-content{flex:1;overflow-y:auto;padding:16px 24px 120px;position:relative;background:var(--bg-secondary)}.deck-content::-webkit-scrollbar{width:6px}.deck-content::-webkit-scrollbar-track{background:transparent}.deck-content::-webkit-scrollbar-thumb{background:rgba(128,128,128,0.2);border-radius:3px}.deck-content::-webkit-scrollbar-thumb:hover{background:rgba(128,128,128,0.3)}.deck-content::before{content:'';position:sticky;top:0;left:0;right:0;height:24px;background:linear-gradient(to bottom,var(--bg-secondary),transparent);pointer-events:none;z-index:1}.deck-content::after{content:'';position:sticky;bottom:0;left:0;right:0;height:32px;background:linear-gradient(to top,var(--bg-secondary),transparent);pointer-events:none;margin-top:-32px;z-index:1}.post-card{background:var(--card-bg);border-radius:12px;padding:18px;margin-bottom:12px;border:1px solid var(--card-border);transition:all 0.3s var(--ease-smooth);cursor:pointer;opacity:0;transform:translateY(8px);animation:fadeInUp 0.4s var(--ease-smooth) forwards}.post-card:hover{transform:translateY(-2px);box-shadow:var(--card-hover-shadow);border-color:var(--border-color)}@keyframes fadeInUp{to{opacity:1;transform:translateY(0)}}.post-card:nth-child(1){animation-delay:0s}.post-card:nth-child(2){animation-delay:0.05s}.post-card:nth-child(3){animation-delay:0.1s}.post-card:nth-child(4){animation-delay:0.15s}.post-card:nth-child(5){animation-delay:0.2s}.post-card:nth-child(n+6){animation-delay:0.25s}.post-header{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:10px}.post-title{font-size:15px;font-weight:600;color:var(--text-primary);line-height:1.4;letter-spacing:-0.01em;flex:1}.post-date{font-size:12px;color:var(--text-secondary);white-space:nowrap;font-weight:500}.post-content{font-size:14px;color:var(--text-secondary);line-height:1.6;margin-bottom:12px;transition:all 0.3s ease}.post-content.truncated{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}.read-more-btn{color:var(--brand-color);font-weight:600;font-size:13px;cursor:pointer;display:inline;margin-left:4px;transition:opacity 0.2s;user-select:none}.read-more-btn:hover{opacity:0.8;text-decoration:underline}.category-badge{display:inline-flex;align-items:center;gap:5px;padding:5px 11px;border-radius:20px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.03em;transition:all 0.2s var(--ease-smooth)}.category-badge.new{background:rgba(22, 163, 74, 0.1);color:#22c55e;border:1px solid rgba(22, 163, 74, 0.2)}.category-badge.improved{background:rgba(37, 99, 235, 0.1);color:#60a5fa;border:1px solid rgba(37, 99, 235, 0.2)}.category-badge.fixed{background:rgba(234, 88, 12, 0.1);color:#fb923c;border:1px solid rgba(234, 88, 12, 0.2)}.deck-footer{position:absolute;bottom:0;left:0;right:0;padding:16px 24px;border-top:1px solid var(--border-color);background:var(--footer-bg);backdrop-filter:blur(8px);text-align:center}.powered-by{font-size:12px;color:var(--text-secondary);font-weight:500}.powered-by-link{color:var(--text-primary);text-decoration:none;font-weight:600;transition:color 0.2s}.powered-by-link:hover{color:var(--brand-color)}.loading-skeleton{background:linear-gradient(90deg,var(--skeleton-start) 25%,var(--skeleton-mid) 50%,var(--skeleton-end) 75%);background-size:200% 100%;animation:shimmer 1.5s infinite;border-radius:8px;height:120px;margin-bottom:12px}@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}.empty-state{text-align:center;padding:48px 24px;color:var(--text-secondary)}.empty-state-icon{font-size:48px;margin-bottom:16px;opacity:0.5}.empty-state-text{font-size:15px;font-weight:500}@media(max-width:480px){.deck{width:calc(100vw - 40px);bottom:80px;right:20px;max-height:calc(100vh - 120px)}}
    .post-content ul{list-style:disc;padding-left:1.5em;margin:0.5em 0}.post-content ol{list-style:decimal;padding-left:1.5em;margin:0.5em 0}.post-content strong{font-weight:700;color:var(--text-primary)}.post-content em{font-style:italic}.post-content a{color:var(--brand-color);text-decoration:underline}.post-content img{max-width:100%;height:auto;border-radius:8px;margin:12px 0;display:block;border:1px solid var(--border-color)}.post-content.collapsed{max-height:80px;overflow:hidden;position:relative;-webkit-mask-image:linear-gradient(180deg,#000 60%,transparent)}
    .view-image-btn{display:inline-flex;align-items:center;gap:6px;padding:8px 12px;background:var(--card-bg);border:1px solid var(--border-color);border-radius:8px;color:var(--text-primary);font-size:13px;font-weight:500;cursor:pointer;margin-top:8px;transition:all 0.2s ease}.view-image-btn:hover{background:var(--brand-color);border-color:var(--brand-color);color:white}.view-image-btn svg{width:14px;height:14px}

    /* Footer Layout - Force Override */
    .deck-footer {
        display: flex !important;
        flex-direction: column !important;
        gap: 0 !important;
        padding: 0 !important;
        overflow: hidden;
    }
    
    .footer-content {
        display: flex;
        flex-direction: column;
        padding: 16px 24px 12px; /* Slightly reduced bottom padding */
        background: var(--footer-bg);
        backdrop-filter: blur(8px);
        border-top: 1px solid var(--border-color);
        transition: all 0.5s var(--ease-spring);
    }

    /* Subscription Wrapper */
    #subscription-wrapper {
        max-height: 100px;
        opacity: 1;
        overflow: hidden;
        transition: max-height 0.6s var(--ease-spring), opacity 0.4s ease-out, margin-bottom 0.4s ease;
        margin-bottom: 12px;
        width: 100%;
    }

    #subscription-wrapper.dismissed {
        max-height: 0;
        opacity: 0;
        margin-bottom: 0;
    }

    /* Footer Bottom Row Container */
    .footer-bottom-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        position: relative;
    }

    /* Powered By Wrapper - Initially Centered */
    .powered-by-wrapper {
        display: flex;
        align-items: center;
        /* Center Trick: margin-left 50% centers the left edge, translateX(-50%) centers the element */
        margin-left: 50%;
        transform: translateX(-50%);
        transition: margin-left 0.6s var(--ease-spring), transform 0.6s var(--ease-spring);
        white-space: nowrap;
    }

    .powered-by {
        font-size: 10px;
        color: var(--text-secondary);
        font-weight: 500;
        opacity: 0.6;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin: 0;
        padding: 0;
    }
    .powered-by-link { color: var(--text-primary); text-decoration: none; font-weight: 600;  }
    .powered-by-link:hover { color: var(--brand-color); }

    /* Success Badge Wrapper - Initially Hidden */
    .success-badge-wrapper {
        max-width: 0;
        opacity: 0;
        overflow: hidden;
        transition: max-width 0.6s var(--ease-spring), opacity 0.4s ease-in 0.2s; /* Delay opacity slightly */
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    /* --- SUCCESS STATE ACTIVATION --- */
    .footer-content.active-success #subscription-wrapper {
        max-height: 0;
        opacity: 0;
        margin-bottom: 0;
    }

    .footer-content.active-success .powered-by-wrapper {
        margin-left: 0;
        transform: translateX(0);
    }
    
    .footer-content.active-success .success-badge-wrapper {
        max-width: 200px; /* Allow enough space */
        opacity: 1;
    }
    
    /* Static Success State (Pre-rendered for already subscribed) */
    .footer-bottom-row.success-static .powered-by-wrapper {
        margin-left: 0;
        transform: translateX(0);
    }
    .footer-bottom-row.success-static .success-badge-wrapper {
        max-width: 200px;
        opacity: 1;
    }

    /* Premium Subscription UI */
    .subscribe-container { width: 100%; box-sizing: border-box; }
    
    .input-group {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        padding: 4px 4px 4px 12px;
        transition: all 0.3s ease;
        box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    }
    
    .input-group:focus-within {
        border-color: var(--brand-color);
        box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15), 0 4px 12px rgba(0,0,0,0.1);
    }

    .subscribe-input {
        flex: 1;
        background: transparent;
        border: none;
        color: var(--text-primary);
        font-size: 14px;
        padding: 8px 0;
        outline: none;
        width: 100%;
        margin-right: 8px;
        -webkit-text-fill-color: var(--text-primary);
    }

    /* Fix for Autofill */
    .subscribe-input:-webkit-autofill,
    .subscribe-input:-webkit-autofill:hover, 
    .subscribe-input:-webkit-autofill:focus {
        -webkit-box-shadow: 0 0 0px 1000px var(--bg-secondary) inset;
        -webkit-text-fill-color: var(--text-primary);
        transition: background-color 5000s ease-in-out 0s;
        caret-color: var(--text-primary);
    }

    .subscribe-btn {
        background: var(--brand-color);
        color: white;
        border: none;
        border-radius: 8px;
        padding: 8px 16px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        gap: 6px;
        white-space: nowrap;
        flex-shrink: 0;
    }
    
    .subscribe-btn:hover { opacity: 0.9; transform: translateY(-1px); }
    .subscribe-btn svg { width: 14px; height: 14px; }

    /* Minimal Success Badge */
    .subscribed-state {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 12px;
        background: rgba(20, 83, 45, 0.2);
        border: 1px solid rgba(34, 197, 94, 0.3);
        border-radius: 20px;
        /* Animation is handled by wrapper mostly, but we can keep pulse */
    }
    
    .subscribed-icon-circle {
        width: 16px; height: 16px;
        background: linear-gradient(135deg, #4ade80, #16a34a);
        border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 0 8px rgba(34, 197, 94, 0.4);
        flex-shrink: 0;
    }
    .subscribed-icon-circle svg { width: 9px; height: 9px; stroke: white; stroke-width: 3; }
    .subscribed-text { font-size: 11px; font-weight: 600; color: #dcfce7; white-space: nowrap; }

    @keyframes activeScale {
        0% { opacity: 0; transform: scale(0.9); }
        60% { transform: scale(1.05); }
        100% { opacity: 1; transform: scale(1); }
    }
    
    @keyframes successShine {
        0% { left: -100%; }
        20% { left: 100%; }
        100% { left: 100%; }
    }
  `;

  // Icons (SVG)
  const SPARKLE_ICON = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sparkle-gradient" x1="2" y1="2" x2="22" y2="22">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="100%" stop-color="#94a3b8" />
        </linearGradient>
      </defs>
      <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" 
            fill="url(#sparkle-gradient)" 
            stroke="rgba(255,255,255,0.3)" 
            stroke-width="0.5"/>
    </svg>
  `;

  const BELL_ICON = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
  `;
  
  const ARROW_RIGHT = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  `;
  
  const CHECK_ICON = `
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  `;

  const MEGAPHONE_ICON = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>
  `;

  const ZAP_ICON = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  `;

  const IMAGE_ICON = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
  `;

  const ICONS = {
    sparkles: SPARKLE_ICON,
    bell: BELL_ICON,
    megaphone: MEGAPHONE_ICON,
    zap: ZAP_ICON,
    image: IMAGE_ICON
  };


  const CLOSE_ICON = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  `;

  // Category icons
  const CATEGORY_ICONS = {
    NEW: '✨',
    IMPROVED: '🔧',
    FIXED: '🐛'
  };

  // Security: Freeze Configuration
  Object.freeze(ICONS);
  Object.freeze(CATEGORY_ICONS);

  // Utility: Relative time
  function getRelativeTime(date) {
    const now = new Date();
    const diff = now - new Date(date);
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 30) return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (days > 0) return days === 1 ? '1 day ago' : `${days} days ago`;
    if (hours > 0) return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    if (minutes > 0) return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
    return 'Just now';
  }

  // Utility: Smart text truncation at word boundaries
  function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    
    // Find the last space before maxLength
    let truncated = text.substring(0, maxLength);
    const lastSpaceIndex = truncated.lastIndexOf(' ');
    
    // If we found a space, cut at that word boundary
    if (lastSpaceIndex > 0) {
      truncated = truncated.substring(0, lastSpaceIndex);
    }
    
    return truncated + '...';
  }

  function init() {
    const script = document.currentScript || document.querySelector(`script[src*="widget.js"]`);
    const projectId = script?.getAttribute("data-project-id");

    if (!projectId) {
      console.error("[LogPulse Widget] Missing data-project-id attribute");
      return;
    }

    const host = document.createElement("div");
    host.id = HOST_ID;
    document.body.appendChild(host);

    // SECURITY: Closed Shadow DOM to prevent external JS access
    const shadow = host.attachShadow({ mode: "closed" });
    const style = document.createElement("style");
    style.textContent = STYLES;
    shadow.appendChild(style);

    const container = document.createElement("div");
    shadow.appendChild(container);

    // State
    let isOpen = false;
    let hasNewPosts = true;
    let cachedData = null;
    let isLoading = false;
    let isSubscribed = localStorage.getItem('logpulse_sub_' + projectId) === 'true';
    let dismissTimer = null;
    let isUserInteracting = false;

    // 1. Initial Static Render (Rendered Once)
    const subscribeSectionHTML = isSubscribed ? renderSubscribedState() : renderSubscribeForm();

    container.innerHTML = `
      <div class="trigger-wrapper" style="opacity: 0; pointer-events: none; transition: opacity 0.3s ease;">
        <div class="trigger">
          <div class="trigger-content">
            <div class="trigger-icon">${ICONS.sparkles}</div>
            <span class="trigger-text">Updates</span>
          </div>
          <div class="notification-dot"></div>
        </div>
      </div>

      <div class="deck">
        <div class="deck-header">
          <h2 class="deck-title">WHAT'S NEW</h2>
          <button class="close-btn" aria-label="Close">${CLOSE_ICON}</button>
        </div>
        
        <div class="deck-content">
          ${renderLoading()}
        </div>

        <div class="deck-footer">
          <div class="footer-content">
           <div id="subscription-wrapper" style="${isSubscribed ? 'display: none;' : ''}">
              <div class="subscribe-container">
                 ${renderSubscribeForm()}
              </div>
           </div>
           
           <div class="footer-bottom-row ${isSubscribed ? 'success-static' : ''}">
               <div class="powered-by-wrapper">
                   <p class="powered-by">
                     Powered by <a href="https://logpulse.dev" target="_blank" class="powered-by-link">LogPulse</a>
                   </p>
               </div>
               <div class="success-badge-wrapper">
                   ${renderSubscribedState()}
               </div>
           </div>
          </div>
        </div>
      </div>
    `;

    // Elements
    const trigger = shadow.querySelector(".trigger");
    const deck = shadow.querySelector(".deck");
    const deckContent = shadow.querySelector(".deck-content");
    const deckFooter = shadow.querySelector(".deck-footer"); // Get footer for updates
    const closeBtn = shadow.querySelector(".close-btn");
    const notifDot = shadow.querySelector(".notification-dot");
    const triggerWrapper = shadow.querySelector(".trigger-wrapper");
    const triggerIcon = shadow.querySelector(".trigger-icon");
    const subscribeContainer = shadow.querySelector(".subscribe-container");

    function renderSubscribeForm() {
        return `
              <p class="subscribe-message"></p>
              <form class="subscribe-form">
                <div class="input-group">
                    <input type="email" class="subscribe-input" placeholder="Email for updates..." required />
                    <button type="submit" class="subscribe-btn">
                        Subscribe ${ARROW_RIGHT}
                    </button>
                </div>
              </form>
        `;
    }

    function renderSubscribedState() {
        return `
            <div class="subscribed-state">
                <div class="subscribed-icon-circle">
                    ${CHECK_ICON}
                </div>
                <span class="subscribed-text">You're on the list!</span>
            </div>
        `;
    }

    function applyCustomization(project) {
        if (!project) return;

        // 1. Brand Color
        if (project.brandColor) {
            host.style.setProperty('--brand-color', project.brandColor);
        }

        // 2. Icon
        const iconKey = project.widgetIcon || 'sparkles';
        triggerIcon.innerHTML = ICONS[iconKey] || ICONS.sparkles;

        // 3. Position
        const pos = project.widgetPosition || 'bottom-right';
        
        // Reset
        triggerWrapper.style.bottom = 'auto';
        triggerWrapper.style.top = 'auto';
        triggerWrapper.style.left = 'auto';
        triggerWrapper.style.right = 'auto';
        
        deck.style.bottom = 'auto';
        deck.style.top = 'auto';
        deck.style.left = 'auto';
        deck.style.right = 'auto';

        // Defaults
        const margin = '24px';
        const deckMargin = '20px';
        const deckBottom = '90px';
        const deckTop = '90px';

        if (pos === 'bottom-right') {
            triggerWrapper.style.bottom = margin;
            triggerWrapper.style.right = margin;
            deck.style.bottom = deckBottom;
            deck.style.right = deckMargin;
            deck.style.transformOrigin = 'bottom right';
        } else if (pos === 'bottom-left') {
            triggerWrapper.style.bottom = margin;
            triggerWrapper.style.left = margin;
            deck.style.bottom = deckBottom;
            deck.style.left = deckMargin;
            deck.style.transformOrigin = 'bottom left';
        } else if (pos === 'top-left') {
            triggerWrapper.style.top = margin;
            triggerWrapper.style.left = margin;
            deck.style.top = deckTop;
            deck.style.left = deckMargin;
            deck.style.transformOrigin = 'top left';
        }

        // 4. Theme
        const theme = project.widgetTheme || 'dark';
        if (theme === 'light') {
            host.classList.add('light-theme');
        } else if (theme === 'system') {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                host.classList.add('light-theme');
            }
        } else {
            host.classList.remove('light-theme');
        }

        // 5. Remove Branding (Pro Feature)
        const poweredByWrapper = shadow.querySelector('.powered-by-wrapper');
        // API ensures removeBranding is false if not Pro, but we double check logic here
        if (project.removeBranding && project.isPro) {
            if (poweredByWrapper) poweredByWrapper.style.display = 'none';
        } else {
            if (poweredByWrapper) poweredByWrapper.style.display = 'flex';
        }

        // 6. Custom CSS (Pro Feature)
        const customStyleId = 'logpulse-custom-css';
        let customStyle = shadow.getElementById(customStyleId);
        
        if (project.customCSS && project.isPro) {
            if (!customStyle) {
                customStyle = document.createElement('style');
                customStyle.id = customStyleId;
                shadow.appendChild(customStyle);
            }
            customStyle.textContent = project.customCSS;
        } else if (customStyle) {
            customStyle.remove();
        }

        // 7. ENFORCE SECURITY (Anti-Tamper)
        enforceSecurity(shadow, project.isPro);
    }

    // --- SECURITY: ANTI-TAMPER SYSTEM ---
    function enforceSecurity(shadow, isPro) {
        if (isPro) return; // Pro users are allowed to modify/hide branding

        let tamperAttempts = 0;
        const MAX_ATTEMPTS = 3;

        const observer = new MutationObserver((mutations) => {
            const wrapper = shadow.querySelector('.powered-by-wrapper');
            const footer = shadow.querySelector('.deck-footer');
            
            // check if critical elements are removed or hidden
            const isCompromised = !wrapper || !footer || 
                                  getComputedStyle(wrapper).display === 'none' || 
                                  getComputedStyle(wrapper).visibility === 'hidden' ||
                                  getComputedStyle(wrapper).opacity === '0';

            if (isCompromised) {
                tamperAttempts++;
                console.warn(`[LogPulse Security] Tampering detected! Attempt ${tamperAttempts}/${MAX_ATTEMPTS}`);

                if (tamperAttempts >= MAX_ATTEMPTS) {
                    console.error("[LogPulse Security] Security Violation. Widget Self-Destruct Initiated.");
                    host.remove(); // SELF DESTRUCT
                    return;
                }

                // Restore
                if (footer && !wrapper) {
                    // Re-inject wrapper if deleted
                   // Complex to reconstruct exactly, so we force a re-render or hard reload of widget
                   // For now, simpler: just force visibility if hidden
                }
                
                if (wrapper) {
                    wrapper.setAttribute('style', 'display: flex !important; visibility: visible !important; opacity: 1 !important; margin-left: 0 !important; transform: none !important;');
                }
            }
        });

        // Observe the deck for child list changes (deletions) and subtree attributes (style hacks)
        const deck = shadow.querySelector('.deck');
        if (deck) {
            observer.observe(deck, { 
                childList: true, 
                subtree: true, 
                attributes: true, 
                attributeFilter: ['style', 'class'] 
            });
        }
    }

    function startDismissTimer() {
        if (isSubscribed || isUserInteracting) return;
        if (dismissTimer) clearTimeout(dismissTimer);

        console.log("[LogPulse] Starting auto-dismiss timer (7s)...");
        dismissTimer = setTimeout(() => {
            if (!isUserInteracting && !isSubscribed) {
                // console.log("[LogPulse] Auto-dismissing subscription form"); 
                const wrapper = shadow.querySelector('#subscription-wrapper');
                if (wrapper) wrapper.classList.add('dismissed');
            }
        }, 7000);
    }

    function stopDismissTimer() {
        if (dismissTimer) {
            console.log("[LogPulse] Stopping auto-dismiss timer (User Interaction)");
            clearTimeout(dismissTimer);
            dismissTimer = null;
        }
        isUserInteracting = true;
        const wrapper = shadow.querySelector('#subscription-wrapper');
        if (wrapper) wrapper.classList.remove('dismissed');
    }

    function updateUI() {
      if (isOpen) {
        deck.classList.add("open");
        trigger.classList.add("active");
        
        // Reset dismissed state on open (Logic Fix 1)
        if (!isSubscribed) {
             const wrapper = shadow.querySelector('#subscription-wrapper');
             if (wrapper) wrapper.classList.remove('dismissed');
             startDismissTimer();
        }

        if (isLoading) {
          deckContent.innerHTML = renderLoading();
        } else if (cachedData) {
          deckContent.innerHTML = renderPosts(cachedData.posts);
          
          // Add event listeners for reactions
          const reactionBtns = deckContent.querySelectorAll('.reaction-btn');
          reactionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
              e.stopPropagation();
              const postId = btn.dataset.postid;
              toggleReaction(postId, btn);
            });
          });

          // Add event listeners for read more
          const readMoreBtns = deckContent.querySelectorAll('.read-more-btn');
          readMoreBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
              e.stopPropagation();
              const card = btn.closest('.post-card');
              const contentDiv = card.querySelector('.post-content');
              const isCollapsed = contentDiv.classList.contains('collapsed');
              
              if (isCollapsed) {
                 // Expand
                 contentDiv.classList.remove('collapsed');
                 btn.textContent = 'Show less';
              } else {
                 // Collapse
                 contentDiv.classList.add('collapsed');
                 btn.textContent = 'Read more';
              }
            });
          });

           // Add event listeners for images
           const imageBtns = deckContent.querySelectorAll('.view-image-btn');
           imageBtns.forEach(btn => {
               btn.addEventListener('click', (e) => {
                   e.stopPropagation();
                   createLightbox(btn.dataset.src);
               });
           });

        }
      } else {
        deck.classList.remove("open");
        trigger.classList.remove("active");
        // Reset interaction? ensuring timer stops if closed
        if (dismissTimer) {
            clearTimeout(dismissTimer);
            dismissTimer = null;
        }
      }

      // Notification Dot
      if (hasNewPosts && !isOpen) {
        notifDot.style.display = "block";
      } else {
        notifDot.style.display = "none";
      }
    }

    function getLikedPosts() {
        try {
            const stored = localStorage.getItem('logpulse_liked_posts');
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            return [];
        }
    }

    async function toggleReaction(postId, btn) {
        const isLiked = btn.classList.contains('active');
        const action = isLiked ? 'unlike' : 'like';
        const emoji = '❤️';

        // Optimistic UI Update
        const countSpan = btn.querySelector('.reaction-count');
        let currentCount = parseInt(countSpan.textContent) || 0;
        
        if (action === 'like') {
            btn.classList.add('active');
            btn.style.background = "rgba(239, 68, 68, 0.1)";
            btn.style.border = "1px solid rgba(239, 68, 68, 0.2)";
            btn.style.color = "#ef4444";
            countSpan.textContent = currentCount + 1;
            
            // Save to local storage
            const liked = getLikedPosts();
            if (!liked.includes(postId)) {
                liked.push(postId);
                localStorage.setItem('logpulse_liked_posts', JSON.stringify(liked));
            }
        } else {
            btn.classList.remove('active');
            btn.style.background = "rgba(0,0,0,0.03)";
            btn.style.border = "1px solid rgba(0,0,0,0.05)";
            btn.style.color = "#4b5563";
            countSpan.textContent = Math.max(0, currentCount - 1);
            
            // Remove from local storage
            const liked = getLikedPosts();
            const newLiked = liked.filter(id => id !== postId);
            localStorage.setItem('logpulse_liked_posts', JSON.stringify(newLiked));
        }

        try {
            await fetch(`${API_BASE_URL}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ postId, emoji, action })
            });
            
        } catch (error) {
            console.error("Failed to toggle reaction:", error);
            // Revert on error (optional, but good UX)
        }
    }

    function escapeHtml(text) {
      const div = document.createElement("div");
      div.textContent = text;
      return div.innerHTML;
    }

    function renderLoading() {
      return `
        <div class="loading-skeleton"></div>
        <div class="loading-skeleton"></div>
        <div class="loading-skeleton"></div>
      `;
    }

    function renderPosts(posts) {
      if (!posts || posts.length === 0) {
        return `
          <div class="empty-state">
            <div class="empty-state-icon">📭</div>
            <p class="empty-state-text">No updates yet</p>
          </div>
        `;
      }

      const likedPosts = getLikedPosts();

      return posts.map((post, index) => {
        const rawContent = post.content || '';
        
        // --- TEXT TRUNCATION & IMAGE EXTRACTION LOGIC (SECURE) ---
        const parser = new DOMParser();
        const doc = parser.parseFromString(rawContent, 'text/html');
        
        // Remove scripts directly to be safe (DOMParser does not execute them, but good practice)
        const scripts = doc.querySelectorAll('script');
        scripts.forEach(s => s.remove());

        const img = doc.querySelector('img');
        const imgSrc = img ? img.src : null;
        if (img) img.remove(); // Remove image from inline content
        
        const processedContent = doc.body.innerHTML; // Safe processed HTML
        const textLength = doc.body.textContent.length;
        const needsTruncation = textLength > 150;
        
        const fullEscaped = escapeHtml(post.title); // Title is still text
        
        const reactions = post.reactions || [];
        const heartCount = reactions.find(r => r.emoji === '❤️')?.count || 0;
        const isLiked = likedPosts.includes(post.id);
        
        const btnStyle = isLiked 
            ? "background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); color: #ef4444;" 
            : "background: rgba(128,128,128,0.1); border: 1px solid rgba(128,128,128,0.2); color: var(--text-secondary);";

        return `
          <div class="post-card" data-index="${index}">
            <div class="post-header">
              <h3 class="post-title">${fullEscaped}</h3>
              <span class="post-date">${getRelativeTime(post.createdAt)}</span>
            </div>
            <div class="post-content ${needsTruncation ? 'collapsed' : ''}">
              ${processedContent}
            </div>
            ${needsTruncation ? '<span class="read-more-btn">Read more</span>' : ''}
            
            ${imgSrc ? `
                <button class="view-image-btn" data-src="${imgSrc}">
                    ${ICONS.image} View Attached Image
                </button>
            ` : ''}

            <div class="post-footer" style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px;">
              <div class="footer-left" style="display: flex; align-items: center; gap: 8px;">
                  <span class="category-badge ${post.category.toLowerCase()}">
                    ${CATEGORY_ICONS[post.category] || ''} ${post.category}
                  </span>
                  <span class="views-count" style="font-size: 11px; color: var(--text-secondary); display: flex; align-items: center; gap: 4px;">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    ${post.views || 0}
                  </span>
              </div>
              <div class="reactions">
                  <button class="reaction-btn ${isLiked ? 'active' : ''}" data-postid="${post.id}" style="
                    border-radius: 12px; 
                    padding: 4px 8px; 
                    font-size: 12px; 
                    cursor: pointer; 
                    display: flex; 
                    align-items: center; 
                    gap: 4px; 
                    transition: all 0.2s;
                    ${btnStyle}
                  ">
                    <span>❤️</span>
                    <span class="reaction-count" style="font-weight: 600;">${heartCount}</span>
                  </button>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }


    // Lightbox Logic
    function createLightbox(src) {
        console.log("[LogPulse] Opening Lightbox for:", src);
        if (!src) {
            console.error("[LogPulse] No image source found");
            return;
        }
        
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.innerHTML = `
            <button class="lightbox-close">${CLOSE_ICON}</button>
            <img src="${src}" class="lightbox-img" alt="Attached Image">
        `;
        
        try {
            shadow.appendChild(overlay);
            console.log("[LogPulse] Overlay appended to shadow root");
        } catch (e) {
            console.error("[LogPulse] Failed to append overlay:", e);
        }
        
        // Trigger reflow for transition
        requestAnimationFrame(() => overlay.classList.add('open'));
        
        const close = () => {
            overlay.classList.remove('open');
            setTimeout(() => overlay.remove(), 300);
        };
        
        overlay.querySelector('.lightbox-close').addEventListener('click', close);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) close();
        });
    }

    // Event Listeners
    trigger.addEventListener("click", () => {
      if (!isOpen) trackEvent('click'); // Only track open
      isOpen = !isOpen;
      updateUI();
    });

    closeBtn.addEventListener("click", () => {
      isOpen = false;
      updateUI();
    });

    // Subscription Logic - with Interaction Listeners
    if (!isSubscribed) {
        // Attach interaction listeners to stop auto-dismiss
        const subInput = shadow.querySelector('.subscribe-input');
        if (subInput) {
            const stopTimer = () => stopDismissTimer();
            subInput.addEventListener('focus', stopTimer);
            subInput.addEventListener('click', stopTimer);
            subInput.addEventListener('keydown', stopTimer);
        }
    }

    const subForm = shadow.querySelector('.subscribe-form');
    if (subForm) {
        subForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const input = subForm.querySelector('.subscribe-input');
            const btn = subForm.querySelector('.subscribe-btn');
            const msg = shadow.querySelector('.subscribe-message');
            const email = input.value;
            const subWrapper = shadow.querySelector('#subscription-wrapper');
            const subContainer = shadow.querySelector('.subscribe-container');

            if (!email) return;

            btn.disabled = true;
            btn.textContent = '...';
            // msg.className = 'subscribe-message'; // logic removed as message handling is simplified

            try {
                const res = await fetch('http://localhost:3000/api/widget/subscribe', {
                   method: 'POST',
                   headers: { 'Content-Type': 'application/json' },
                   body: JSON.stringify({ email, projectId }) 
                });
                
                const data = await res.json();
                
                if (res.ok) {
                    // Success State - Permanent
                    localStorage.setItem('logpulse_sub_' + projectId, 'true');
                    isSubscribed = true;
                    
                    // Stop any pending dismiss timer
                    if (dismissTimer) clearTimeout(dismissTimer);
                    
                    // Trigger Smooth CSS Animation
                    const footerContent = shadow.querySelector('.footer-content');
                    if (footerContent) {
                        // Force reflow
                        void footerContent.offsetWidth; 
                        footerContent.classList.add('active-success');
                    }

                } else {
                    // Use a temporary error styling on the input or button as message element might be complex to manage in this layout
                     btn.style.background = "#ef4444";
                     btn.textContent = "Error";
                     setTimeout(() => {
                         btn.style.background = "";
                         btn.textContent = `Subscribe ${ARROW_RIGHT}`; // Reset content
                         // We need to re-insert the arrow SVG if we just set textContent. 
                         // Better to just set innerHTML
                         btn.innerHTML = `Subscribe ${ARROW_RIGHT}`;
                         btn.disabled = false;
                     }, 2000);
                     console.error(data.error);
                }
            } catch (err) {
                console.error("Subscription failed:", err);
                 btn.style.background = "#ef4444";
                 btn.textContent = "Error";
                 setTimeout(() => {
                     btn.style.background = "";
                     btn.innerHTML = `Subscribe ${ARROW_RIGHT}`;
                     btn.disabled = false;
                 }, 2000);
            }
        });
    }

    async function fetchData() {
      isLoading = true;
      updateUI();
      
      try {
        const res = await fetch(`${API_BASE_URL}?projectId=${projectId}`);
        if (!res.ok) throw new Error("Failed to fetch updates");
        
        const data = await res.json();
        cachedData = data;
        
        // Apply customizations
        if (data.project) {
            applyCustomization(data.project);
             // Reveal widget after customization
            triggerWrapper.style.opacity = '1';
            triggerWrapper.style.pointerEvents = 'all';
        }

        hasNewPosts = data.posts.length > 0;
      } catch (err) {
        console.error("[LogPulse Widget] Error:", err);
        deckContent.innerHTML = `
          <div class="empty-state">
            <p class="empty-state-text" style="color: #ef4444;">Failed to load updates</p>
          </div>
        `;
      } finally {
        isLoading = false;
        updateUI();
      }
    }

    // Initialize Fetch
    console.log("[LogPulse Widget] Initializing...");
    
    // Analytics: Track View
    async function trackEvent(event) {
        try {
            const trackUrl = API_BASE_URL.replace("/widget", "/analytics/track");
            await fetch(trackUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ projectId, event })
            });
        } catch (e) {
            console.error("[LogPulse] Analytics Error:", e);
        }
    }
    
    // Capture View (Once per load)
    trackEvent('view');

    fetchData();
  }

  // Auto-init when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
