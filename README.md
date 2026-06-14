# Jaguars Jumps Guide

A mobile-friendly technique guide for Jurupa Valley Jaguars long, triple, and high jumpers.
Everything lives in one file — `jaguars-jumps-guide.html` — so there's nothing to install just to use it.

This README is written for a coach, not a programmer. Pick the section that matches what you want to do.

---

## What's in this folder

- **`jaguars-jumps-guide.html`** — the whole guide. This is your master file. Open it, edit it, share it.
- **`README.md`** — this file.
- **`.gitignore`** — a small housekeeping file you can ignore unless you use version history (explained below).

---

## Option A — Just use it (you and your athletes)

1. Double-click `jaguars-jumps-guide.html`. It opens in any web browser.
2. On a phone: open it in the browser, tap the **Share** button, then **Add to Home Screen**. It now opens like an app, and works without signal once loaded.

That's it. No accounts, no internet required after it loads.

---

## Option B — Change the wording yourself (no coding)

You don't need any tools to edit the words.

1. Open `jaguars-jumps-guide.html` in a browser (a laptop is easier than a phone for this).
2. Tap **Edit** in the top-right corner.
3. Tap any cue, summary, drill, fault, or checklist line and type your changes. Use the **+ Add** buttons to add items and the small red **×** to delete them.
4. When you're happy, tap **Download my version** in the bar at the bottom.

That download is a brand-new copy of the file with your wording baked in. **That copy becomes your new master** — save it somewhere safe and share that one with your athletes.

> Tip: pick one home for the master file (a Google Drive folder works great) and always edit from and save back to that, so you never wonder which copy is current.

---

## Option C — Build new things with Claude Code

When you want bigger changes than editing words — new sections, design tweaks, new features — Claude Code lets you ask for them in plain English and have them built for you.

### 1. Install Claude Code (one time)

You'll need a paid Claude plan (Pro or Max) or an API key. It runs on Mac, Windows, and Linux.

- **Mac / Linux:** open Terminal and run
  `curl -fsSL https://claude.ai/install.sh | bash`
- **Windows:** open PowerShell and run
  `irm https://claude.ai/install.ps1 | iex`

(If you'd rather not use a terminal at all, there's also a Claude Code desktop app for Mac and Windows.)
Full instructions: https://code.claude.com/docs/en/setup

### 2. Open this folder in Claude Code

In your terminal, move into this folder and start it:

```
cd path/to/jaguars-jumps
claude
```

(Replace `path/to/` with wherever you saved this folder.)

### 3. Just ask for what you want

Type requests in plain English, for example:

- "Make the phase titles editable too, like the cues are."
- "Add a spot on each drill where I can paste a YouTube demo link."
- "Add a fourth event tab for the pole vault."
- "Make the navy a little darker and the silver a little brighter."
- "Add a 'Season PRs' section where athletes can log their best marks."

Claude Code edits the file for you. To see the result, open `jaguars-jumps-guide.html` in your browser and refresh — or ask Claude Code to "start a local preview" and it'll give you a link.

### 4. Keep a safety net with version history (recommended)

This solves the "which copy is the latest?" problem for good. The first time you open the folder, run:

```
git init
git add .
git commit -m "Starting master"
```

After that, any time you finish a round of changes:

```
git add .
git commit -m "short note about what changed"
```

Now every version is saved and you can always roll back. You can also ask Claude Code to do these steps for you.

---

## Sharing it with your team

- **Easiest:** keep the master in a Google Drive (or Dropbox) folder and send athletes the link.
- **Nicest long-term:** host it at a free web address (services like Netlify or GitHub Pages) so there's one link that's always current and athletes just bookmark it. Claude Code can walk you through this.

---

## Good to know

- The guide saves your edits *only* when you tap **Download my version**. Treat each download as your new master copy.
- Everything works the same whether the file is opened from your computer, your phone, or a web link — there are no hidden pieces that need setup.
