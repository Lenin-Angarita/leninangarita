# [Your Name] — personal academic website

Static site (plain HTML/CSS/JS — no build step, no framework) for a profile,
teaching, and research page. Built to grow: add a course, add lectures to it,
and both the navigation and content stay consistent because every page shares
the same `assets/css/style.css` and `assets/js/main.js`.

## 1. First things to edit

Search each file for text in `[brackets]` and replace it with your own
information. The main ones:

- `index.html` — your name, photo (`assets/img/portrait.jpg`), bio, research
  tags, education timeline, email/CV/GitHub/Scholar links.
- `research.html` — research statement, papers, talks.
- `courses.html` — the list of courses you teach.
- Every page's `<footer>` — email and social links (repeated per page since
  there's no templating engine; a find-and-replace across files is the
  fastest way once you have final links).

## 2. Project structure

```
index.html              Profile / home page
research.html            Research page (papers, talks)
courses.html             Index of all courses ("Teaching")
courses/
  real-analysis/          One folder per course
    index.html             Course overview + list of lectures
    lectures/
      lecture-01.html       One file per lecture
templates/
  course-template.html    Blank scaffold — copy when starting a new course
  lecture-template.html   Blank scaffold — copy when starting a new lecture
assets/
  css/style.css           All styling — one shared file
  js/main.js              Dark mode, mobile nav, TOC scrollspy, tabs,
                           "copy LaTeX" buttons, back-to-top
  img/                    Photo, CV, etc.
.nojekyll                 Tells GitHub Pages to serve files as-is
```

`courses/real-analysis/` is a complete worked example (one course, one
lecture) — keep it as a reference, or delete it once you have real courses.

## 3. Adding a new course

1. Duplicate the `courses/real-analysis/` folder (or copy
   `templates/course-template.html`) into `courses/<course-slug>/index.html`.
   Use a short, URL-friendly slug: lowercase, hyphens instead of spaces
   (`topology-i`, not `Topology I`).
2. Edit the title, term, and description.
3. Go to `courses.html` and copy the commented `<a class="card ...>` template
   block into the "Current" section, filling in the link and details.

## 4. Adding a new lecture to a course

This is the part you'll do constantly, so here's the exact loop:

1. **You send me the LaTeX.** Paste the `.tex` source (or the relevant
   part of it) in the chat.
2. **I convert it to HTML** following `templates/lecture-template.html`:
   section headings become `<h2>`, `\begin{theorem}...\end{theorem}` becomes
   a `<div class="math-box math-box--theorem">`, `\begin{proof}...\end{proof}`
   becomes a collapsible `<details class="proof">`, and so on. Crucially,
   **the math itself is not rewritten** — it's wrapped in `\( ... \)` or
   `\[ ... \]` and rendered live by MathJax, so equations look exactly like
   your LaTeX source.
3. **You tell me where it goes** (e.g. "this is lecture 4 of Topology I") and
   I save it as `courses/<course-slug>/lectures/lecture-NN.html`, add it to
   that course's lecture list, and link it from the previous lecture's
   "Next" footer.

If you ever want to build one yourself by hand, copy
`templates/lecture-template.html` and follow the comments inside it — every
component (theorem box, definition box, proof toggle, tabbed alternative
definitions, numbered equation with a copy button) is demonstrated with real
content in `courses/real-analysis/lectures/lecture-01.html`.

### Available content blocks

| What | Markup |
|---|---|
| Theorem / Lemma / Proposition / Corollary | `<div class="math-box math-box--theorem">` |
| Definition | `<div class="math-box math-box--definition">` |
| Example | `<div class="math-box math-box--example">` |
| Remark | `<div class="math-box math-box--remark">` |
| Collapsible proof | `<details class="proof"><summary>Proof</summary>...` |
| Numbered display equation | `<div class="eq-block">` with `<span class="eq-block__num">` |
| Two-tab comparison (e.g. two equivalent definitions) | `<div class="tabs">` — see lecture-01.html |

## 5. Previewing locally

Because pages are plain files, you can often just double-click `index.html`.
If a page ever looks unstyled or math doesn't load, open a tiny local server
instead (avoids browser file:// restrictions):

```bash
cd math-website
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## 6. Deploying to GitHub Pages, step by step

1. **Create a GitHub account** if you don't have one: https://github.com/join
2. **Create a new repository.**
   - Click the **+** icon (top right) → **New repository**.
   - Name it whatever you like — e.g. `personal-website` — or, if you want
     the site at `https://<your-username>.github.io` directly (no
     sub-path), name it exactly `<your-username>.github.io`.
   - Set it to **Public**, don't initialize with a README (you already have
     one), then click **Create repository**.
3. **Upload the site.** Easiest path if you're not using git yet:
   - On the new repo's page, click **uploading an existing file**.
   - Drag the *contents* of the `math-website` folder (not the folder
     itself) into the browser window, then **Commit changes**.
   - GitHub's uploader flattens folder structure in older interfaces —
     if drag-and-drop doesn't preserve subfolders for you, use git instead
     (below), which always does.
4. **Or upload with git (recommended, and needed for future updates):**
   ```bash
   cd math-website
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
5. **Turn on GitHub Pages.**
   - In the repository, go to **Settings → Pages**.
   - Under **Build and deployment → Source**, choose **Deploy from a
     branch**.
   - Under **Branch**, choose `main` and folder `/ (root)`, then **Save**.
6. **Wait about a minute**, then refresh that same Settings → Pages screen.
   GitHub will show the live URL:
   - `https://<your-username>.github.io/` if you named the repo
     `<your-username>.github.io`, or
   - `https://<your-username>.github.io/<repo-name>/` otherwise.
7. **Publishing updates afterward** is just:
   ```bash
   git add .
   git commit -m "Add lecture 2"
   git push
   ```
   The live site rebuilds automatically within a minute or two.

### A note on links if your repo is not `<username>.github.io`

All links in this project are **relative** (`courses.html`, `../../index.html`,
etc.), not absolute (`/courses.html`). This is deliberate: it means the site
works correctly whether it's served from the domain root or from a sub-path
like `/repo-name/`, with nothing to reconfigure. Keep new links relative the
same way and this will keep working.

## 7. Optional next steps

- Add a real CV PDF and photo to `assets/img/`.
- Add a custom domain in **Settings → Pages → Custom domain** if you have one.
- Add an Open Graph image / favicon for nicer link previews (ask me and I'll
  add the meta tags).
