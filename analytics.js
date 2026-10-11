'use strict';

(() => {
  const id = document.querySelector('meta[name="ga-measurement-id"]')?.content;
  if (!/^G-[A-Z0-9]+$/.test(id || '')) return;

  const preferenceKey = 'dp-analytics-consent';
  const preferenceLifetime = 180 * 24 * 60 * 60 * 1000;
  let consent = null;
  let loaded = false;
  let startedForm = false;
  let preferenceTrigger = null;
  try {
    const saved = JSON.parse(localStorage.getItem(preferenceKey));
    if (saved && Date.now() - saved.time < preferenceLifetime && ['granted', 'denied'].includes(saved.choice)) consent = saved.choice;
  } catch { /* A visitor can choose for this page if storage is unavailable. */ }

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });

  const cleanUrl = (value) => {
    try { const url = new URL(value); return url.origin + url.pathname; } catch { return ''; }
  };
  const send = (name, params = {}) => {
    if (consent === 'granted' && loaded) window.gtag('event', name, { send_to: id, ...params });
  };

  function start() {
    if (loaded || consent !== 'granted') return;
    window['ga-disable-' + id] = false;
    loaded = true;
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    window.gtag('js', new Date());
    window.gtag('config', id, {
      page_location: cleanUrl(location.href),
      page_referrer: cleanUrl(document.referrer),
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_expires: 180 * 24 * 60 * 60
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(script);
  }

  function clearAnalyticsCookies() {
    const names = document.cookie.split(';').map(cookie => cookie.split('=')[0].trim()).filter(name => /^_ga(?:_|$)/.test(name));
    const host = location.hostname;
    const domains = ['', host, '.' + host, '.dachiperadze.com'];
    for (const name of names) for (const domain of domains) {
      document.cookie = name + '=; Max-Age=0; Path=/' + (domain ? '; Domain=' + domain : '') + '; SameSite=Lax';
    }
  }

  const notice = document.createElement('section');
  notice.className = 'analytics-notice';
  notice.setAttribute('aria-labelledby', 'analytics-notice-title');
  notice.innerHTML = '<div><h2 id="analytics-notice-title">Website analytics</h2><p>May I use Google Analytics to understand visits and enquiry engagement? Analytics uses cookies and sends usage information to Google. Your enquiry text and contact details are not included in these analytics events. <a href="https://policies.google.com/privacy">Google’s privacy policy</a>.</p></div><div class="analytics-choices"><button type="button" data-choice="denied">Decline analytics</button><button type="button" data-choice="granted">Allow analytics</button></div>';
  notice.hidden = consent !== null;
  document.body.appendChild(notice);

  notice.addEventListener('click', event => {
    const button = event.target.closest('[data-choice]');
    if (!button) return;
    consent = button.dataset.choice;
    try { localStorage.setItem(preferenceKey, JSON.stringify({ choice: consent, time: Date.now() })); } catch { /* Keep the current page's choice. */ }
    notice.hidden = true;
    preferenceTrigger?.focus();
    if (consent === 'granted') start();
    else {
      window['ga-disable-' + id] = true;
      clearAnalyticsCookies();
      if (loaded) location.reload();
    }
  });

  document.querySelectorAll('.analytics-preferences').forEach(button => {
    button.hidden = false;
    button.addEventListener('click', () => {
      preferenceTrigger = button;
      notice.hidden = false;
      notice.querySelector('[data-choice="denied"]').focus();
    });
  });

  document.addEventListener('click', event => {
    const anchor = event.target.closest('a[href]');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    const channel = href.startsWith('https://wa.me/') ? 'whatsapp' : href.startsWith('mailto:') ? 'email' : href.startsWith('sms:') ? 'sms' : null;
    if (channel) send('contact_click', { contact_channel: channel });
    else if (href.endsWith('#enquiry')) send('enquiry_link_click');
    else {
      const sport = href.match(/(?:^|\/)(football|basketball|tennis|rugby|esports)-law\.html$/)?.[1];
      if (sport) send('sport_page_click', { sport });
    }
  });

  const form = document.querySelector('#enquiry-form');
  form?.addEventListener('focusin', () => {
    if (consent !== 'granted' || startedForm) return;
    startedForm = true;
    send('enquiry_form_start');
  });
  form?.addEventListener('submit', () => {
    send('enquiry_submit_attempt');
  });
  document.querySelectorAll('.expertise-item').forEach(details => {
    details.addEventListener('toggle', () => {
      if (details.open) send('service_open', { service: details.querySelector('.item-title')?.textContent.trim() || '' });
    });
  });

  if (consent === 'granted') start();
})();
