/*!
 * StoryCraft Academy — course page tools
 * Loaded by every course and recording theme (Customize > Settings > Custom code):
 *   <script src="https://storycraft-2026.github.io/course-tools/course.js" defer></script>
 *
 * Features (each can be switched off in CONFIG):
 *   brand        StoryCraft fonts and colours on course pages
 *   quizBox      multi-line answer box for open-ended quiz questions
 *   quizAutosave keeps unsent quiz answers in the browser until the quiz is submitted
 *   timestamps   "12:40" at the start of a line in lesson text jumps the video there
 *   videoEnd     when a video finishes, prompts "Mark complete" and shows the next lesson
 *   workshops    upcoming live workshops card on recording pages (read from /booking)
 *   commentPrompt reflection prompt in the lesson comment box
 *   fixLinks     repairs lesson links typed without https://
 */
(function () {
  'use strict';
  if (window.__scaCourseTools) return;
  window.__scaCourseTools = true;

  var CONFIG = {
    brand: true,
    quizBox: true,
    quizAutosave: true,
    timestamps: true,
    videoEnd: false, // Kajabi already marks video lessons complete when the video ends
    workshops: true,
    commentPrompt: true,
    fixLinks: true,
    header: true,

    // Course-page header, matching the main site's menu. Keep in step with the
    // site header (Website > Design > Header) when that menu changes.
    logo: 'https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2162382539/settings_images/5c53458-3083-04b1-8025-07c2e3f562f6_long_logo.png',
    libraryLink: { label: 'Back to the Library', short: 'Library', href: '/library' },
    nav: [
      { label: 'Offerings', items: [
        { label: 'Personalized Coaching', href: '/coaching-options' },
        { label: 'Writing Workshops', href: '/booking' },
        { label: 'Courses', href: '/courses' },
        { label: 'Author Resources', href: '/resources' },
        { label: 'Retreats', href: '/retreats' },
        { label: 'Free Tools', href: '/free-tools' }
      ] },
      { label: 'About Us', items: [
        { label: 'Get the App', href: '/app' },
        { label: 'Meet the Team', href: '/team' },
        { label: 'About StoryMetrics™', href: '/about-storymetrics' },
        { label: 'Work with Us', href: '/work-with-us' }
      ] },
      { label: 'Contact', href: '/contact' }
    ],

    workshopsPage: '/booking',
    workshopsToShow: 3,
    // Products whose URL slug matches this get the workshops card.
    recordingSlug: /^(recording-|live-query-review)/,
    autosaveDays: 30,

    prompts: {
      course: [
        "What's one idea from this lesson you'll try in your WIP this week?",
        'Which part of this lesson applies most to the story you are writing now?',
        'Share a moment from your manuscript where this lesson could help.',
        'What clicked for you here, and what still feels fuzzy?'
      ],
      recording: [
        "What's one takeaway from this session you'll put to work this week?",
        'What question would you have asked in the live Q&A?',
        'Which part of this session changed how you see your own draft?'
      ]
    }
  };

  var C = {
    teal: '#18656E',
    tealDark: '#124E55',
    cream: '#F0EEE6',
    gold: '#B89256',
    goldBright: '#C9A227',
    noir: '#17231E'
  };

  var path = location.pathname;
  var slugMatch = path.match(/^\/products\/([^/]+)/);
  var productSlug = slugMatch ? slugMatch[1] : '';
  var postMatch = path.match(/\/posts\/(\d+)/);
  var postId = postMatch ? postMatch[1] : '';
  var isRecording = CONFIG.recordingSlug.test(productSlug);

  function onReady(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }
  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function store() {
    try { var k = '__sca'; localStorage.setItem(k, 1); localStorage.removeItem(k); return localStorage; }
    catch (e) { return null; }
  }
  function safe(name, fn) {
    try { fn(); } catch (e) { if (window.console) console.warn('[StoryCraft course tools] ' + name, e); }
  }

  /* ------------------------------------------------------------------ styles */
  var css = '';

  css += [
    '.quiz-question-card textarea.sca-quiz-ta{display:block!important;width:100%!important;height:auto!important;',
    'min-height:140px!important;padding:10px 12px!important;line-height:1.5!important;resize:vertical!important;',
    'box-sizing:border-box!important;font:inherit;white-space:pre-wrap}',
    '.sca-saved{display:block;margin-top:6px;font-size:12px;color:#6b6b6b;min-height:16px}',

    'a.sca-ts{display:inline-block;font-weight:700;color:' + C.teal + '!important;text-decoration:none!important;',
    'border-bottom:1px solid ' + C.gold + ';cursor:pointer;font-variant-numeric:tabular-nums}',
    'a.sca-ts:hover{color:' + C.tealDark + '!important;border-bottom-color:' + C.teal + '}',

    '.sca-end{display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin:0 0 14px;padding:14px 16px;',
    'border:1px solid ' + C.teal + ';border-left:4px solid ' + C.teal + ';border-radius:6px;background:#fff;',
    'animation:scaIn .35s ease-out}',
    '.sca-end__msg{flex:1 1 220px;margin:0;font-weight:700;color:' + C.noir + '}',
    '.sca-end__next{display:block;font-weight:400;font-size:14px;color:#555}',
    '.sca-end__btn{display:inline-block;padding:9px 16px;border-radius:4px;font-weight:700;text-decoration:none!important;',
    'border:1px solid ' + C.teal + ';cursor:pointer;font-size:14px;line-height:1.2}',
    '.sca-end__btn--solid{background:' + C.teal + ';color:#fff!important}',
    '.sca-end__btn--solid:hover{background:' + C.tealDark + '}',
    '.sca-end__btn--ghost{background:#fff;color:' + C.teal + '!important}',
    '.sca-end__x{background:none;border:0;font-size:20px;line-height:1;color:#888;cursor:pointer;padding:0 4px}',
    '.btn--completion.sca-pulse{animation:scaPulse 1.4s ease-in-out 3}',
    '@keyframes scaPulse{0%,100%{box-shadow:0 0 0 0 rgba(24,101,110,.0)}50%{box-shadow:0 0 0 6px rgba(24,101,110,.25)}}',
    '@keyframes scaIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}',

    '.sca-ws{background:#fff;border:1px solid #e4e0d4;border-top:4px solid ' + C.gold + ';border-radius:6px;',
    'padding:18px 18px 16px;margin:0 0 24px}',
    '@media(min-width:992px){.sca-ws{position:sticky;top:90px}}',
    '.sca-ws__kicker{margin:0 0 2px;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:' + C.gold + ';font-weight:700}',
    '.sca-ws__title{margin:0 0 12px;font-family:"Cormorant Garamond",Georgia,serif;font-size:24px;font-weight:600;line-height:1.15;color:' + C.noir + '}',
    '.sca-ws__list{list-style:none;margin:0 0 14px;padding:0}',
    '.sca-ws__item{display:flex;gap:12px;padding:10px 0;border-top:1px solid #eee}',
    '.sca-ws__item:first-child{border-top:0;padding-top:0}',
    '.sca-ws__date{flex:0 0 46px;align-self:flex-start;text-align:center;background:' + C.cream + ';border-radius:4px;padding:5px 0;line-height:1.1}',
    '.sca-ws__mon{display:block;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:' + C.teal + ';font-weight:700}',
    '.sca-ws__day{display:block;font-family:"Cormorant Garamond",Georgia,serif;font-size:22px;font-weight:600;color:' + C.noir + '}',
    '.sca-ws__name{display:block;font-weight:700;font-size:14px;line-height:1.3;color:' + C.noir + '!important;text-decoration:none!important}',
    '.sca-ws__name:hover{color:' + C.teal + '!important}',
    '.sca-ws__who{display:block;font-size:13px;color:#666;margin-top:2px}',
    '.sca-ws__tag{display:inline-block;margin-top:4px;font-size:11px;font-weight:700;color:' + C.teal + '}',
    '.sca-ws__all{display:block;text-align:center;padding:10px;border-radius:4px;background:' + C.teal + ';color:#fff!important;',
    'font-weight:700;text-decoration:none!important;font-size:14px}',
    '.sca-ws__all:hover{background:' + C.tealDark + '}',
    '.sca-ws__empty{margin:0 0 14px;font-size:14px;color:#555}'
  ].join('');

  if (CONFIG.brand) {
    // "html body" raises specificity above the inline <style> blocks each theme prints.
    var B = 'html body ';
    css += [
      B + '{font-family:Lato,"Open Sans",Helvetica,Arial,sans-serif!important;color:#222}',
      B + 'h1,' + B + 'h2,' + B + 'h3,' + B + 'h4,' + B + '.panel__title,' + B + '.hero__title,' + B + '.media-heading',
      '{font-family:"Cormorant Garamond",Georgia,serif!important;font-weight:600!important;letter-spacing:0!important}',
      // Colour only on lesson titles; hero titles sit on the theme's coloured banner and keep its text colour.
      B + '.panel__title{color:' + C.noir + '}',
      B + 'h5,' + B + 'h6,' + B + '.panel__sub-title{font-family:Lato,"Open Sans",sans-serif!important}',
      B + '.panel__title{font-size:2.1em;line-height:1.15}',
      B + '.panel__sub-title a{color:' + C.gold + '!important;text-transform:uppercase;letter-spacing:.08em;font-size:.8em;font-weight:700}',
      B + '#section-post_body a:not(.btn):not(.sca-ts):not(.sca-end__btn),' + B + '#section-product_body a:not(.btn)',
      '{color:' + C.teal + ';text-decoration-color:' + C.gold + '}',
      B + '.btn{font-family:Lato,"Open Sans",sans-serif!important;font-weight:700!important;letter-spacing:.01em}',
      B + '.btn--solid,' + B + '.btn--solid:focus{background-color:' + C.teal + '!important;border-color:' + C.teal + '!important;color:#fff!important}',
      B + '.btn--solid:hover{background-color:' + C.tealDark + '!important;border-color:' + C.tealDark + '!important}',
      B + '.btn--completion{border-color:' + C.teal + '!important;color:' + C.teal + '!important}',
      B + '.btn--completion[data-post-completion-toggle="true"]{background:' + C.teal + '!important;border-color:' + C.teal + '!important;color:#fff!important}',
      B + '.progress-bar,' + B + '.progress__bar{background-color:' + C.teal + '!important}',
      B + '.smart-next{background:' + C.cream + '!important}',
      B + '.smart-next__link--small,' + B + '.smart-next__link--small:hover{color:' + C.teal + '!important}',
      B + '.btn--comment{background:' + C.teal + '!important;border-color:' + C.teal + '!important;color:#fff!important}',
      B + '#comment_body:focus,' + B + '.quiz-question-card textarea:focus',
      '{border-color:' + C.teal + '!important;box-shadow:0 0 0 2px rgba(24,101,110,.15)!important;outline:0}',

      // Header: brand fonts on the menu links (the theme sets them in its serif).
      B + '.header .header-menu a,' + B + '.header .user__dropdown a',
      '{font-family:Lato,"Open Sans",sans-serif!important;font-size:15px!important;font-weight:700!important;color:' + C.noir + '!important;letter-spacing:.01em}',
      B + '.header .header-menu a:hover,' + B + '.header .user__dropdown a:hover{color:' + C.teal + '!important}',
      B + '.header .user__dropdown a{font-weight:400!important}',

      // Phone menu: drop the duplicate "My Library", group the account links, lighter icon.
      '@media (max-width:767px){',
      B + '.header .header-ham{transform:scale(.7);transform-origin:right center}',
      B + '.header .header-ham span{background:' + C.noir + '!important}',
      B + '.header .header-menu{padding:4px 0 18px!important}',
      B + '.header .header-menu > a{line-height:46px!important;font-size:17px!important}',
      B + '.header .header-menu > a[href$="/library"]{display:none!important}',
      B + '.header .user__dropdown{margin:8px 32px 0!important;padding-top:8px!important;border-top:1px solid #e4e0d4!important;box-shadow:none!important}',
      B + '.header .user__dropdown a{display:block;line-height:42px!important;font-size:16px!important;color:#4a4a4a!important}',
      '}'
    ].join('');
  }

  if (CONFIG.header) {
    var H = '#section-header ';
    var chev = 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 12 8%27%3E%3Cpath d=%27M1 1.5l5 5 5-5%27 fill=%27none%27 stroke=%27%23FFF9EB%27 stroke-width=%271.8%27/%3E%3C/svg%3E")';
    css += [
      H + '.header.sca-replaced{display:none!important}',
      '.sca-hdr{position:relative;z-index:1000;background:' + C.teal + ';border-bottom:3px solid ' + C.gold + ';',
      'font-family:"Open Sans",Lato,Helvetica,Arial,sans-serif}',
      '.sca-hdr *{box-sizing:border-box}',
      '.sca-hdr__bar{display:flex;align-items:center;gap:20px;min-height:76px;max-width:1200px;margin:0 auto;padding:0 24px}',
      '.sca-hdr__logo{display:flex;align-items:center;margin-right:auto;flex:0 0 auto}',
      '.sca-hdr__logo img{display:block;height:auto;max-height:40px;width:auto;max-width:160px}',
      '.sca-hdr__nav{display:flex;align-items:center;gap:26px}',
      '.sca-hdr a,.sca-hdr button{font-family:inherit}',
      '.sca-hdr__link,.sca-dd__btn{display:inline-flex;align-items:center;gap:7px;padding:8px 0;background:none;border:0;cursor:pointer;',
      'color:#FFF9EB!important;font-size:17px;font-weight:400;line-height:1.2;text-decoration:none!important;white-space:nowrap}',
      '.sca-hdr__link:hover,.sca-dd__btn:hover,.sca-dd.is-open>.sca-dd__btn{color:#fff!important;text-decoration:underline!important;text-decoration-color:' + C.gold + '!important;text-underline-offset:6px}',
      '.sca-dd__btn .sca-chev{width:12px;height:8px;background:' + chev + ' center/contain no-repeat;transition:transform .15s}',
      '.sca-dd.is-open>.sca-dd__btn .sca-chev{transform:rotate(180deg)}',
      '.sca-hdr__lib{display:inline-flex;align-items:center;gap:8px;padding:9px 16px;border-radius:4px;background:#FFF9EB;',
      'color:' + C.teal + '!important;font-size:15px;font-weight:700;line-height:1.2;text-decoration:none!important;white-space:nowrap;',
      'border:1px solid #FFF9EB;transition:background .15s,color .15s}',
      '.sca-hdr__lib:hover{background:' + C.gold + ';border-color:' + C.gold + ';color:#fff!important}',
      '.sca-hdr__lib .sca-arrow{font-size:16px;line-height:1}',
      '.sca-dd{position:relative}',
      '.sca-dd__menu{position:absolute;top:calc(100% + 10px);left:-20px;min-width:230px;padding:10px 0;background:#fff;border-radius:4px;',
      'box-shadow:0 10px 40px rgba(0,0,0,.14);display:none}',
      '.sca-dd.is-open>.sca-dd__menu{display:block}',
      '.sca-dd--user .sca-dd__menu{left:auto;right:0;min-width:180px}',
      '.sca-dd__menu a{display:block;padding:9px 20px;color:#595959!important;font-size:16px;line-height:1.35;text-decoration:none!important}',
      '.sca-dd__menu a:hover{color:' + C.teal + '!important;background:' + C.cream + '}',
      '.sca-dd--user .sca-dd__btn{padding:0}',
      '.sca-hdr__avatar{width:36px;height:36px;border-radius:50%;border:2px solid #FFF9EB;object-fit:cover;display:block}',
      '.sca-hdr__search svg{width:18px;height:18px;display:block}',
      '.sca-hdr__ham{display:none;flex:0 0 40px;flex-direction:column;justify-content:center;gap:5px;width:40px;height:40px;padding:8px;background:none;border:0;cursor:pointer}',
      '.sca-hdr__ham span{display:block;height:2px;width:100%;background:#FFF9EB;border-radius:2px;transition:transform .2s,opacity .2s}',
      '.sca-hdr__ham[aria-expanded="true"] span:nth-child(1){transform:translateY(7px) rotate(45deg)}',
      '.sca-hdr__ham[aria-expanded="true"] span:nth-child(2){opacity:0}',
      '.sca-hdr__ham[aria-expanded="true"] span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}',
      '.sca-hdr__panel{display:none;background:' + C.teal + ';padding:6px 24px 22px;border-top:1px solid rgba(255,249,235,.15)}',
      '.sca-hdr__panel.is-open{display:block}',
      '.sca-hdr__panel h4{margin:14px 0 4px!important;font-family:"Open Sans",Lato,sans-serif!important;font-size:16px!important;font-weight:700!important;color:#FFF9EB!important;letter-spacing:0!important}',
      '.sca-hdr__panel a{display:block;padding:9px 0 9px 18px;color:#FFF9EB!important;font-size:16px;text-decoration:none!important}',
      '.sca-hdr__panel a.sca-top{padding-left:0;font-weight:700;margin-top:8px}',
      '.sca-hdr__panel hr{border:0;border-top:1px solid rgba(255,249,235,.25);margin:14px 0 6px}',
      '.sca-hdr__panel .sca-acct a{padding-left:0}',
      '.sca-hdr__lib--mobile{display:none}',
      '@media (max-width:991px){',
      '.sca-hdr__nav{display:none}',
      '.sca-hdr__ham{display:flex}',
      '.sca-hdr__lib--mobile{display:inline-flex;padding:8px 13px;font-size:14px}',
      '.sca-hdr__bar{gap:12px;min-height:66px;padding:0 16px}',
      '.sca-hdr__logo img{max-height:34px;max-width:120px}',
      '}',
      '.sca-hdr__lib--mobile .sca-short{display:none}',
      '@media (max-width:419px){.sca-hdr__lib--mobile .sca-long{display:none}.sca-hdr__lib--mobile .sca-short{display:inline}}'
    ].join('');
  }

  function addStyles() {
    if (CONFIG.brand || CONFIG.workshops) {
      var f = el('link', {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Lato:wght@400;700&display=swap'
      });
      document.head.appendChild(f);
    }
    var s = el('style', { id: 'sca-course-tools-css' });
    s.textContent = css;
    document.head.appendChild(s);
  }

  /* -------------------------------------------------------------- fix links */
  function fixLinks() {
    document.querySelectorAll('#section-post_body a[href], #section-product_body a[href]').forEach(function (a) {
      var h = a.getAttribute('href');
      if (/^(www\.)?storycraftacademy\.org/i.test(h)) a.setAttribute('href', 'https://' + h.replace(/^\/+/, ''));
    });
  }

  /* --------------------------------------------------------- quiz box + save */
  var setInputValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
  var QUIZ_INPUT = '.quiz-question-card input.sage-input__field';
  var ls = store();
  var SAVE_PREFIX = 'sca-quiz:';

  function flat(v) { return v.replace(/\s*[\r\n]+\s*/g, ' '); }
  function saveKey(inp) { return SAVE_PREFIX + path + ':' + (inp.name || inp.id); }

  function pushToReact(inp, value) {
    setInputValue.call(inp, value);
    inp.dispatchEvent(new Event('input', { bubbles: true }));
    inp.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function pruneSaves() {
    if (!ls) return;
    var cutoff = Date.now() - CONFIG.autosaveDays * 864e5;
    for (var i = ls.length - 1; i >= 0; i--) {
      var k = ls.key(i);
      if (k && k.indexOf(SAVE_PREFIX) === 0) {
        try { if (JSON.parse(ls.getItem(k)).t < cutoff) ls.removeItem(k); } catch (e) { ls.removeItem(k); }
      }
    }
  }

  function enhanceQuizInput(inp) {
    if (inp.__scaTA) return;
    var ta = el('textarea', {
      'class': 'sage-form-field sage-input__field sca-quiz-ta',
      rows: '6',
      placeholder: inp.placeholder || 'Your answer',
      'aria-label': inp.getAttribute('aria-label') || inp.placeholder || 'Your answer'
    });
    ta.value = inp.value || '';
    ta.__scaInput = inp;
    inp.__scaTA = ta;
    inp.style.setProperty('display', 'none', 'important');
    inp.setAttribute('tabindex', '-1');
    inp.parentNode.insertBefore(ta, inp.nextSibling);

    var note = null;
    if (CONFIG.quizAutosave && ls) {
      note = el('span', { 'class': 'sca-saved', 'aria-live': 'polite' });
      // Outside Kajabi's .sage-input wrapper, which lays its children out in reverse.
      var wrap = ta.parentNode;
      wrap.parentNode.insertBefore(note, wrap.nextSibling);
      ta.__scaNote = note;
      if (!ta.value) {
        try {
          var saved = JSON.parse(ls.getItem(saveKey(inp)) || 'null');
          if (saved && saved.v) {
            ta.value = saved.v;
            pushToReact(inp, flat(saved.v));
            note.textContent = 'Restored your unsent answer.';
          }
        } catch (e) {}
      }
    }

    var timer;
    ta.addEventListener('input', function () {
      pushToReact(inp, flat(ta.value));
      if (note) {
        clearTimeout(timer);
        timer = setTimeout(function () {
          if (ta.value.trim()) {
            ls.setItem(saveKey(inp), JSON.stringify({ v: ta.value, t: Date.now() }));
            note.textContent = 'Draft saved on this device.';
          } else {
            ls.removeItem(saveKey(inp));
            note.textContent = '';
          }
        }, 600);
      }
    });
    ta.addEventListener('blur', function () {
      pushToReact(inp, flat(ta.value));
      inp.dispatchEvent(new Event('blur', { bubbles: true }));
      inp.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
    });
  }

  var quizSubmitting = false;
  function clearQuizSaves() {
    if (!ls) return;
    for (var i = ls.length - 1; i >= 0; i--) {
      var k = ls.key(i);
      if (k && k.indexOf(SAVE_PREFIX + path + ':') === 0) ls.removeItem(k);
    }
  }

  function scanQuiz() {
    document.querySelectorAll('textarea.sca-quiz-ta').forEach(function (ta) {
      var inp = ta.__scaInput;
      if (!inp || !inp.isConnected) {
        if (ta.__scaNote) ta.__scaNote.remove();
        ta.remove();
        return;
      }
      ta.disabled = inp.disabled;
      ta.readOnly = inp.readOnly;
      if (inp.value !== flat(ta.value) && document.activeElement !== ta) ta.value = inp.value;
    });
    document.querySelectorAll(QUIZ_INPUT).forEach(enhanceQuizInput);

    // Once a submitted quiz leaves the answer form (results view), forget the drafts.
    if (quizSubmitting && !document.querySelector(QUIZ_INPUT)) {
      clearQuizSaves();
      quizSubmitting = false;
    }
  }

  function watchQuizSubmit() {
    document.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('button, input[type=submit]');
      if (!b || !document.querySelector(QUIZ_INPUT)) return;
      var label = (b.textContent || b.value || '').trim();
      if (/^(submit|finish|complete|done)/i.test(label)) quizSubmitting = true;
    }, true);
  }

  /* ------------------------------------------------------------- video hooks */
  function wistiaId() {
    var e = document.querySelector('#section-post_player [class*="wistia_async_"]');
    if (!e) return null;
    var m = String(e.className).match(/wistia_async_([a-z0-9]+)/i);
    return m ? m[1] : null;
  }
  function withVideo(fn) {
    var id = wistiaId();
    if (!id) return false;
    window._wq = window._wq || [];
    window._wq.push({ id: id, onReady: fn });
    return true;
  }

  /* -------------------------------------------------------------- timestamps */
  var TS_LEAD = /^(\s*)(\[?)((?:\d{1,2}:)?\d{1,2}:\d{2})(\]?)(?=\s|$|[–—:\-.,)])/;
  var TS_BRACKET = /\[((?:\d{1,2}:)?\d{1,2}:\d{2})\]/g;

  function toSeconds(t) {
    return t.split(':').reduce(function (acc, n) { return acc * 60 + parseInt(n, 10); }, 0);
  }
  function tsLink(t) {
    var a = el('a', { href: '#', 'class': 'sca-ts', 'data-t': String(toSeconds(t)), title: 'Jump to ' + t + ' in the video' });
    a.textContent = t;
    return a;
  }

  function linkTimestamps() {
    if (!wistiaId()) return;
    var root = document.querySelector('#section-post_body .panel__block');
    if (!root) return;

    // 1) A timestamp that starts a paragraph or list item: "12:40 – Gina on pacing"
    root.querySelectorAll('p, li, h4, h5, h6, div').forEach(function (block) {
      if (block.querySelector('.sca-ts')) return;
      var walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT);
      var first = walker.nextNode();
      while (first && !first.nodeValue.trim()) first = walker.nextNode();
      if (!first || first.parentNode.closest('a')) return;
      if (first.parentNode !== block && first.parentNode.parentNode !== block) return;
      var m = first.nodeValue.match(TS_LEAD);
      if (!m) return;
      var before = first.nodeValue.slice(0, m.index + m[1].length);
      var after = first.nodeValue.slice(m.index + m[0].length);
      if (/^\s*(a\.?m\.?|p\.?m\.?|PT|ET|MT|CT|GMT|BST|UTC)\b/i.test(after)) return; // a clock time, not a video time
      var frag = document.createDocumentFragment();
      if (before) frag.appendChild(document.createTextNode(before));
      frag.appendChild(tsLink(m[3]));
      frag.appendChild(document.createTextNode(after));
      first.parentNode.replaceChild(frag, first);
    });

    // 2) A bracketed timestamp anywhere in the text: "...as she says at [41:05]"
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        return !n.parentNode.closest('a, script, style') && /\[(?:\d{1,2}:)?\d{1,2}:\d{2}\]/.test(n.nodeValue)
          ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (n) {
      var frag = document.createDocumentFragment();
      var last = 0;
      n.nodeValue.replace(TS_BRACKET, function (all, t, idx) {
        frag.appendChild(document.createTextNode(n.nodeValue.slice(last, idx)));
        frag.appendChild(tsLink(t));
        last = idx + all.length;
      });
      frag.appendChild(document.createTextNode(n.nodeValue.slice(last)));
      n.parentNode.replaceChild(frag, n);
    });

    root.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a.sca-ts');
      if (!a) return;
      e.preventDefault();
      var secs = parseInt(a.getAttribute('data-t'), 10);
      withVideo(function (video) {
        video.time(secs);
        video.play();
      });
      var player = document.querySelector('#section-post_player');
      if (player) player.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  /* ---------------------------------------------------- video end → complete */
  function videoEndNudge() {
    withVideo(function (video) {
      video.bind('end', function () {
        if (document.querySelector('.sca-end')) return;
        var comp = document.querySelector('.btn--completion');
        var done = comp && comp.getAttribute('data-post-completion-toggle') === 'true';
        var nextLink = document.querySelector('.smart-next__link[href]') || document.querySelector('.btn-next[href]:not([href="#"])');
        var nextHref = nextLink ? nextLink.getAttribute('href') : null;
        var nextTitle = document.querySelector('.smart-next__link:not(.smart-next__link--small)');
        nextTitle = nextTitle ? nextTitle.textContent.trim() : '';
        // Kajabi's player already counts down to the next lesson, so only step in when
        // the lesson hasn't been marked complete.
        if (!comp || done) return;

        var box = el('div', { 'class': 'sca-end', role: 'status' });
        var html = '<p class="sca-end__msg">Finished the video? Mark this lesson complete.' +
          (nextHref ? '<span class="sca-end__next">Up next: ' + esc(nextTitle || 'the next lesson') + '</span>' : '') + '</p>' +
          '<a href="#" class="sca-end__btn sca-end__btn--solid" data-sca="complete">Mark complete</a>';
        if (nextHref) html += '<a href="' + esc(nextHref) + '" class="sca-end__btn sca-end__btn--ghost">Next lesson →</a>';
        html += '<button type="button" class="sca-end__x" aria-label="Dismiss">×</button>';
        box.innerHTML = html;

        var mark = document.querySelector('#section-post_body .mark-as-complete');
        if (mark) mark.parentNode.insertBefore(box, mark);
        else document.querySelector('#section-post_player').insertAdjacentElement('afterend', box);

        box.addEventListener('click', function (e) {
          var t = e.target;
          if (t.classList.contains('sca-end__x')) { box.remove(); return; }
          if (t.getAttribute('data-sca') === 'complete') {
            e.preventDefault();
            if (comp && comp.getAttribute('data-post-completion-toggle') !== 'true') comp.click();
            t.remove();
            box.querySelector('.sca-end__msg').firstChild.nodeValue = 'Marked complete. Nice work.';
            var nx = box.querySelector('.sca-end__btn--ghost');
            if (nx) nx.className = 'sca-end__btn sca-end__btn--solid';
          }
        });

        comp.classList.add('sca-pulse');
        setTimeout(function () { comp.classList.remove('sca-pulse'); }, 4500);
      });
    });
  }

  /* --------------------------------------------------- upcoming workshops card */
  function workshopsCard() {
    if (!isRecording) return;
    var sidebar = document.querySelector('#section-post_sidebar .section__sidebar') ||
                  document.querySelector('#section-product_sidebar .section__sidebar');
    if (!sidebar) return;

    var card = el('aside', { 'class': 'sca-ws', 'aria-label': 'Upcoming live workshops' });
    card.innerHTML = '<p class="sca-ws__kicker">Join us live</p><h3 class="sca-ws__title">Upcoming workshops</h3>' +
      '<div class="sca-ws__body"></div><a class="sca-ws__all" href="' + CONFIG.workshopsPage + '">See all workshops</a>';
    sidebar.insertBefore(card, sidebar.firstChild);
    var body = card.querySelector('.sca-ws__body');

    fetch(CONFIG.workshopsPage, { credentials: 'same-origin' })
      .then(function (r) { return r.ok ? r.text() : ''; })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var now = Date.now();
        var items = Array.prototype.slice.call(doc.querySelectorAll('.scws-item[data-end]'))
          .filter(function (li) { var t = Date.parse(li.getAttribute('data-end')); return !isNaN(t) && t > now; })
          .slice(0, CONFIG.workshopsToShow);
        if (!items.length) {
          body.innerHTML = '<p class="sca-ws__empty">New sessions are added often. Check the schedule for what is coming up.</p>';
          return;
        }
        var txt = function (li, s) { var n = li.querySelector(s); return n ? n.textContent.trim() : ''; };
        body.innerHTML = '<ul class="sca-ws__list">' + items.map(function (li) {
          var tag = txt(li, '.scws-tag');
          return '<li class="sca-ws__item"><div class="sca-ws__date"><span class="sca-ws__mon">' + esc(txt(li, '.scws-mon')) +
            '</span><span class="sca-ws__day">' + esc(txt(li, '.scws-day')) + '</span></div><div>' +
            '<a class="sca-ws__name" href="' + CONFIG.workshopsPage + '">' + esc(txt(li, '.scws-name')) + '</a>' +
            '<span class="sca-ws__who">' + esc(txt(li, '.scws-who')) + '</span>' +
            (tag ? '<span class="sca-ws__tag">' + esc(tag) + '</span>' : '') + '</div></li>';
        }).join('') + '</ul>';
      })
      .catch(function () {
        body.innerHTML = '<p class="sca-ws__empty">See the schedule for upcoming live sessions.</p>';
      });
  }

  /* ------------------------------------------------------------------ header */
  function buildHeader() {
    var section = document.querySelector('#section-header');
    var old = section && section.querySelector('.header');
    if (!old || section.querySelector('.sca-hdr')) return;

    var avatar = old.querySelector('.user__avatar');
    var searchToggle = old.querySelector('.search__toggle');
    var loggedIn = !!old.querySelector('.user');
    var lib = CONFIG.libraryLink;
    var arrow = '<span class="sca-arrow" aria-hidden="true">←</span>';
    var searchIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="#FFF9EB" stroke-width="2" aria-hidden="true">' +
      '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>';

    var acct = loggedIn
      ? [{ label: 'My Library', href: '/library' }, { label: 'Settings', href: '/settings/account' }, { label: 'Logout', href: '/logout', logout: true }]
      : [{ label: 'Log in', href: '/login' }];
    function acctLink(a) {
      return '<a href="' + esc(a.href) + '"' + (a.logout ? ' data-method="delete" rel="nofollow"' : '') + '>' + esc(a.label) + '</a>';
    }

    var desk = '<a class="sca-hdr__lib" href="' + esc(lib.href) + '">' + arrow + esc(lib.label) + '</a>';
    CONFIG.nav.forEach(function (n) {
      if (n.items) {
        desk += '<div class="sca-dd"><button type="button" class="sca-dd__btn" aria-expanded="false" aria-haspopup="true">' +
          esc(n.label) + '<span class="sca-chev" aria-hidden="true"></span></button><div class="sca-dd__menu">' +
          n.items.map(function (i) { return '<a href="' + esc(i.href) + '">' + esc(i.label) + '</a>'; }).join('') + '</div></div>';
      } else {
        desk += '<a class="sca-hdr__link" href="' + esc(n.href) + '">' + esc(n.label) + '</a>';
      }
    });
    if (searchToggle) desk += '<button type="button" class="sca-hdr__link sca-hdr__search" aria-label="Search this course">' + searchIcon + '</button>';
    desk += '<div class="sca-dd sca-dd--user"><button type="button" class="sca-dd__btn" aria-expanded="false" aria-haspopup="true" aria-label="Account menu">' +
      (avatar ? '<img class="sca-hdr__avatar" alt="" src="' + esc(avatar.getAttribute('src')) + '">' : 'Account') +
      '</button><div class="sca-dd__menu">' + acct.map(acctLink).join('') + '</div></div>';

    var panel = '';
    CONFIG.nav.forEach(function (n) {
      if (n.items) {
        panel += '<h4>' + esc(n.label) + '</h4>' + n.items.map(function (i) { return '<a href="' + esc(i.href) + '">' + esc(i.label) + '</a>'; }).join('');
      } else {
        panel += '<a class="sca-top" href="' + esc(n.href) + '">' + esc(n.label) + '</a>';
      }
    });
    if (searchToggle) panel += '<a class="sca-top sca-hdr__search" href="#">Search this course</a>';
    panel += '<hr><div class="sca-acct">' + acct.map(acctLink).join('') + '</div>';

    var hdr = el('div', { 'class': 'sca-hdr' });
    hdr.innerHTML =
      '<div class="sca-hdr__bar">' +
        '<a class="sca-hdr__logo" href="/"><img src="' + esc(CONFIG.logo) + '" alt="StoryCraft Academy home"></a>' +
        '<nav class="sca-hdr__nav" aria-label="Main">' + desk + '</nav>' +
        '<a class="sca-hdr__lib sca-hdr__lib--mobile" href="' + esc(lib.href) + '">' + arrow +
          '<span class="sca-long">' + esc(lib.label) + '</span><span class="sca-short">' + esc(lib.short) + '</span></a>' +
        '<button type="button" class="sca-hdr__ham" aria-label="Menu" aria-expanded="false" aria-controls="sca-hdr-panel"><span></span><span></span><span></span></button>' +
      '</div>' +
      '<nav class="sca-hdr__panel" id="sca-hdr-panel" aria-label="Main">' + panel + '</nav>';

    old.classList.add('sca-replaced');
    old.parentNode.insertBefore(hdr, old);

    function closeAll(except) {
      hdr.querySelectorAll('.sca-dd.is-open').forEach(function (d) {
        if (d === except) return;
        d.classList.remove('is-open');
        d.querySelector('.sca-dd__btn').setAttribute('aria-expanded', 'false');
      });
    }
    hdr.querySelectorAll('.sca-dd').forEach(function (dd) {
      var btn = dd.querySelector('.sca-dd__btn');
      var t;
      function open() { clearTimeout(t); closeAll(dd); dd.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); }
      function close() { dd.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); }
      btn.addEventListener('click', function (e) { e.stopPropagation(); if (dd.classList.contains('is-open')) close(); else open(); });
      if (window.matchMedia && window.matchMedia('(hover: hover)').matches) {
        dd.addEventListener('mouseenter', open);
        dd.addEventListener('mouseleave', function () { t = setTimeout(close, 180); });
      }
    });
    document.addEventListener('click', function (e) { if (!hdr.contains(e.target)) closeAll(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(); });

    var ham = hdr.querySelector('.sca-hdr__ham');
    var pnl = hdr.querySelector('.sca-hdr__panel');
    ham.addEventListener('click', function () {
      var openNow = !pnl.classList.contains('is-open');
      pnl.classList.toggle('is-open', openNow);
      ham.setAttribute('aria-expanded', String(openNow));
    });

    if (searchToggle) {
      hdr.querySelectorAll('.sca-hdr__search').forEach(function (b) {
        b.addEventListener('click', function (e) {
          e.preventDefault();
          pnl.classList.remove('is-open');
          ham.setAttribute('aria-expanded', 'false');
          searchToggle.click();
        });
      });
    }
  }

  /* ---------------------------------------------------------- comment prompt */
  function commentPrompt() {
    var ta = document.querySelector('#comment_body');
    if (!ta || ta.__scaPrompt) return;
    var list = isRecording ? CONFIG.prompts.recording : CONFIG.prompts.course;
    var n = parseInt(postId || '0', 10);
    ta.placeholder = list[n % list.length];
    ta.__scaPrompt = true;
  }

  /* -------------------------------------------------------------------- boot */
  safe('styles', addStyles);

  onReady(function () {
    if (CONFIG.header) safe('header', buildHeader);
    if (CONFIG.fixLinks) safe('fixLinks', fixLinks);
    if (CONFIG.timestamps) safe('timestamps', linkTimestamps);
    if (CONFIG.videoEnd) safe('videoEnd', videoEndNudge);
    if (CONFIG.workshops) safe('workshops', workshopsCard);
    if (CONFIG.commentPrompt) safe('commentPrompt', commentPrompt);

    if (CONFIG.quizBox) {
      safe('quiz', function () {
        if (CONFIG.quizAutosave) { pruneSaves(); watchQuizSubmit(); }
        scanQuiz();
        var queued = false;
        new MutationObserver(function () {
          if (queued) return;
          queued = true;
          requestAnimationFrame(function () { queued = false; safe('quiz', scanQuiz); });
          if (CONFIG.commentPrompt) safe('commentPrompt', commentPrompt);
        }).observe(document.body, {
          childList: true, subtree: true, attributes: true,
          attributeFilter: ['disabled', 'readonly', 'value']
        });
      });
    }
  });
})();
