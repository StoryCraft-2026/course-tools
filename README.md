# StoryCraft Academy course tools

One script that every StoryCraft course and recording loads. Change it here and every course picks up the change within about 10 minutes.

**Script address:** `https://storycraft-2026.github.io/course-tools/course.js`

## What it does

| Feature | What members see |
|---|---|
| Brand styling | Cormorant Garamond headings, Lato body text, StoryCraft teal and gold on every course page |
| Quiz answer box | Open-ended quiz questions get a six-line box instead of a one-line field |
| Quiz autosave | Unsent quiz answers are kept in that browser for 30 days and restored if the page reloads; cleared once the quiz is submitted |
| Video timestamps | A time like `12:40` at the start of a line in the lesson text, or `[12:40]` anywhere, becomes a link that jumps the video there |
| Video-end prompt | When a video finishes and the lesson isn't marked complete, a box offers "Mark complete" and the next lesson |
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
