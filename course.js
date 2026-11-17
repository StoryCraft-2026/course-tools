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
    videoEnd: true,
    workshops: true,
    commentPrompt: true,
    fixLinks: true,

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

    '.sca-end{display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin:14px 0 4px;padding:14px 16px;',
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
    '.sca-ws__date{flex:0 0 46px;text-align:center;background:' + C.cream + ';border-radius:4px;padding:5px 0;line-height:1.1}',
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
    css += [
      'body{font-family:Lato,"Open Sans",Helvetica,Arial,sans-serif!important;color:#222}',
      'h1,h2,h3,h4,.panel__title,.hero__title,.product__title,.syllabus__title,.media-heading',
      '{font-family:"Cormorant Garamond",Georgia,serif!important;font-weight:600!important;letter-spacing:0;color:' + C.noir + '}',
      'h5,h6,.panel__sub-title{font-family:Lato,"Open Sans",sans-serif!important}',
      '.panel__title{font-size:2.1em;line-height:1.15}',
      '.panel__sub-title a{color:' + C.gold + '!important;text-transform:uppercase;letter-spacing:.08em;font-size:.8em;font-weight:700}',
      '#section-post_body a:not(.btn):not(.sca-ts),#section-product_body a:not(.btn){color:' + C.teal + ';text-decoration-color:' + C.gold + '}',
      '.btn--solid,.btn--solid:focus{background-color:' + C.teal + '!important;border-color:' + C.teal + '!important;color:#fff!important}',
      '.btn--solid:hover{background-color:' + C.tealDark + '!important;border-color:' + C.tealDark + '!important}',
      '.btn--completion{border-color:' + C.teal + '!important;color:' + C.teal + '!important}',
      '.btn--completion[data-post-completion-toggle="true"]{background:' + C.teal + '!important;color:#fff!important}',
      '.progress-bar,.progress__bar{background-color:' + C.teal + '!important}',
      '.smart-next{background:' + C.cream + '!important}',
      '.smart-next__link--small,.smart-next__link--small:hover{color:' + C.teal + '!important}',
      '.btn--comment{background:' + C.teal + '!important;border-color:' + C.teal + '!important;color:#fff!important}',
      '#comment_body:focus,.quiz-question-card textarea:focus{border-color:' + C.teal + '!important;box-shadow:0 0 0 2px rgba(24,101,110,.15)!important;outline:0}'
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
      ta.parentNode.insertBefore(note, ta.nextSibling);
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
        if (done && !nextHref) return;

        var box = el('div', { 'class': 'sca-end', role: 'status' });
        var msg = done ? 'Nice work.' : 'Finished the video? Mark this lesson complete.';
        var html = '<p class="sca-end__msg">' + esc(msg) +
          (nextHref ? '<span class="sca-end__next">Up next: ' + esc(nextTitle || 'the next lesson') + '</span>' : '') + '</p>';
        if (!done && comp) html += '<a href="#" class="sca-end__btn sca-end__btn--solid" data-sca="complete">Mark complete</a>';
        if (nextHref) html += '<a href="' + esc(nextHref) + '" class="sca-end__btn ' + (done || !comp ? 'sca-end__btn--solid' : 'sca-end__btn--ghost') + '">Next lesson →</a>';
        html += '<button type="button" class="sca-end__x" aria-label="Dismiss">×</button>';
        box.innerHTML = html;

        var player = document.querySelector('#section-post_player');
        (player || document.body).insertAdjacentElement(player ? 'afterend' : 'afterbegin', box);

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

        if (comp && !done) {
          comp.classList.add('sca-pulse');
          setTimeout(function () { comp.classList.remove('sca-pulse'); }, 4500);
        }
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
