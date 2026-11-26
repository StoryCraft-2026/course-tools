# StoryCraft Academy course tools

One script that every StoryCraft course and recording loads. Change it here and every course picks up the change within about 10 minutes.

**Script address:** `https://storycraft-2026.github.io/course-tools/course.js`

## What it does

| Feature | What members see |
|---|---|
| Header | Same menu as the main site (Offerings and About Us dropdowns, Contact, account menu) plus a **Back to the Library** button. Links live in `CONFIG.nav` in `course.js` |
| Brand styling | Cormorant Garamond headings, Lato body text, StoryCraft teal and gold on every course page |
| Quiz answer box | Open-ended quiz questions get a six-line box instead of a one-line field |
| Quiz autosave | Unsent quiz answers are kept in that browser for 30 days and restored if the page reloads; cleared once the quiz is submitted |
| Video timestamps | A time like `12:40` at the start of a line in the lesson text, or `[12:40]` anywhere, becomes a link that jumps the video there |
| Video-end prompt (off) | Built but switched off: Kajabi already marks a video lesson complete when the video ends and counts down to the next lesson |
| Upcoming workshops | On recordings, a sidebar card lists the next three sessions from the Writing Workshops page (`/booking`) |
| Comment prompts | The comment box shows a reflection question instead of "Say Something..." |
| Link repair | Lesson links typed as `storycraftacademy.org/...` without `https://` are fixed |

## Adding timestamps to a recording

In the lesson text in Kajabi, start a line with the time:

```
0:00 – Welcome and introductions
12:40 – Pacing at the scene level
41:05 – Q&A
```

Clock times such as `9:00 am PT` are left alone.

## Adding the script to a new course

Kajabi admin → the course → **Customize** → **Settings** → **Custom code** (embedded scripts), then paste:

```html
<script src="https://storycraft-2026.github.io/course-tools/course.js" defer></script>
```

Also switch on **Settings → Community** for the course and pick the access group.

## Turning a feature off

Near the top of `course.js`, set the feature to `false` in `CONFIG`, for example `workshops: false`.

## Limits

- Runs in web browsers only. The Kajabi mobile app does not run custom code.
- Quiz drafts are saved per browser, so they don't follow someone to another device.
- Kajabi stores short-answer quiz responses on one line, so line breaks are saved as spaces.

## Pitch Day pages

The two Pitch Day landing pages load their page text and booking code from this repo, so edits don't have to be pasted into Kajabi.

| Page | Kajabi landing page | Script |
|---|---|---|
| Writer sales page `/pitch-day` | 2152414898 (theme 2168329814) | `https://storycraft-2026.github.io/course-tools/pitch-day/writers.js` |
| Agent sign-up `/pitch-day-agents` | 2152415226 (theme 2168331226) | `https://storycraft-2026.github.io/course-tools/pitch-day/agents.js` |

In Kajabi, each page keeps its stylesheet code block, plus an empty mount (`<div id="spd-mount"></div>` or `<div id="apd-mount"></div>`) and a `<script src>` tag pointing at the script above. The agent page also keeps its native Kajabi form block, which the script fills in and submits.

To change a page: edit `pitch-day/src/` (`*.html` is the page markup, `*.js` the behaviour), run `node pitch-day/build.js` (needs `npm i -g terser`), test, and push. Live pages pick up the change within about 10 minutes.
