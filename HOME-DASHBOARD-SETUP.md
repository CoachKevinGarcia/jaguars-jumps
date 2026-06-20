# Turning On the Home Dashboard — Full Walkthrough

This is the hand-held version. Follow it top to bottom once and the **Home** tab
(countdowns, PRs, goals, notes), the team **Leaderboard**, and your **Coach** dashboard
all go live.

- **Time:** about 15–20 minutes, once.
- **What you need open:** your Google Sheet *"Jaguars Jumps Logins"* (the one with the
  `Roster` and `Log` tabs you made earlier).
- **You already did the hard part** (deploying the login). This just updates that script
  and adds your data.

> Why a "redeploy"? Google runs a *frozen snapshot* of your script. When the code changes,
> you have to publish a **new version** for the live site to use it. Editing the *data* in
> your tabs later does **not** need a redeploy — only code changes do.

---

## PART 1 — Update the script (one time, ~3 min)

1. Open your Google Sheet.
2. Top menu: click **Extensions → Apps Script**. A new browser tab opens with a code editor.
3. On the left you'll see a file called **`Code.gs`**. Click it. The code shows on the right.
4. Click anywhere in the code, then select all and delete it:
   - Windows: click in the code, press **Ctrl+A** (select all), then **Delete**.
5. Now open the new code: in your project folder open **`apps-script/Code.gs`**
   (or open it from GitHub). Select all of it, copy, and **paste** into the empty editor.
6. Click the **Save** icon (💾) near the top, or press **Ctrl+S**.

You should see no red error messages. If you do, you probably didn't delete the old code
first — clear it fully and paste again.

---

## PART 2 — Publish a new version (one time, ~2 min)

This is the step people miss. Saving is **not** enough — you must publish a new version.

1. Top-right of the Apps Script editor: click **Deploy → Manage deployments**.
2. You'll see your existing **"Jumps login"** deployment. Click the **pencil ✏️ (Edit)** icon
   on its row.
3. Find the **Version** dropdown (it currently says something like "Version 1"). Change it to
   **New version**.
4. Click **Deploy**.
5. If it asks you to **authorize** again, approve with your Google account. (If you see
   "Google hasn't verified this app," click **Advanced → Go to (your project name)** — it's
   your own script, this is normal.)
6. Click **Done**. The web-app URL stays exactly the same, so nothing else needs changing.

✅ The brains are now upgraded. Next we give it data.

---

## PART 3 — Set up your data tabs (~5 min + your data)

Back in your **Google Sheet**. Tabs are the little named buttons along the bottom.
Add a tab with the **+** at the bottom-left, then **double-click** the new tab's name to
rename it. **Spelling and capitalization of the tab names must be exact.**

> **Shortcut:** instead of building these by hand, download
> **`Jaguars-Jumps-Home-Data.xlsx`** and **`Jaguars-Jumps-Roster.xlsx`** from your repo —
> they already have every column and tab below, pre-filled from your roster. In your
> *Jaguars Jumps Logins* sheet use **File → Import → Upload → Insert new sheet(s)**.

### First: add a `Gender` column to your `Roster`
The Leaderboard splits Boys / Girls, so your **existing `Roster` tab** needs a Gender column.

1. On the `Roster` tab, put **`Gender`** in **cell D1** (next to your `Role` header in C1).
2. In each athlete's row, type **`Boys`** or **`Girls`** in column D. Leave your own row blank.

### Tab 1: `Marks`
Each athlete's PRs, Season Bests, goals, and a season-start baseline — one row per athlete *per event*.

Put these **headers in row 1** (columns A through G):

| A: Athlete | B: Event | C: PR | D: SB | E: Goal | F: Goal Note | G: Baseline |
|---|---|---|---|---|---|---|

Then fill rows from row 2 down. Example (replace with real marks):

| Athlete | Event | PR | SB | Goal | Goal Note | Baseline |
|---|---|---|---|---|---|---|
| Pablo Jara | LJ | 18-07.50 | 18-02.00 | 19-06 | Hold your penultimate. | 18-03.00 |
| Pablo Jara | TJ | 40-02.00 | 38-11.00 | 42-00 | Patience in the step phase. | 38-00.00 |
| Juan Ledesma | LJ | 20-01.00 | 19-08.00 | 21-00 | Tall through the board. | 18-06.50 |
| Daniela Gamboa | LJ | 15-04.00 | 14-11.00 | 16-06 | Drive the knee up. | 13-01.50 |

Rules:
- **Athlete** must match the `Roster` exactly as `First Last` (e.g., `Pablo Jara`).
- **Event** is `LJ`, `TJ`, or `HJ` (one event per row — a triple-jumper who also long-jumps
  gets two rows).
- **Marks** are written feet-dash-inches: `18-07.50`. High jump the same way: `5-04.00`.
- **Goal** is optional. If it's a real mark, Home shows a progress bar toward it. Leave it
  blank and the bar just won't appear.
- **Goal Note** is your one-line coaching cue for that event (optional).
- **Baseline** is their mark at the *start of the season* (use last season's best). It's what
  the **Most Improved** leaderboard measures growth from. If you leave it blank, that athlete
  just won't appear on the growth board.

### Tab 2: `Schedule`
Every meet. The app reads this to build the countdowns and pick the nearest meet.

**Headers in row 1:**

| A: Meet | B: Type | C: Date | D: Location |
|---|---|---|---|

- **Type** is how the app sorts the small countdowns. Use these words so they're recognized:
  `Dual`, `Invitational`, `League Finals`. Anything else still shows under "Next Up."
- **Date** works best as **year-month-day**: `2027-04-29`.
- A ready-to-paste starter schedule is in **Part 4** below.

### Tab 3: `Notes`
Short messages. Two kinds, same two columns.

**Headers in row 1:**

| A: Athlete | B: Note |
|---|---|

| Athlete | Note |
|---|---|
| General | Bring spikes Thursday — full approaches. |
| Pablo Jara | Knee drive looked sharp today. Keep stacking days. |

- A row with an **athlete's name** = a private note only that athlete sees on their Home.
- A row with **`General`** in column A = a team-wide announcement everyone sees.

### Tab 4: `Testables` (optional)
Your block-end test results — they power the **Testables** board on the Leaderboard.

**Headers in row 1:**

| A: Athlete | B: Test | C: Result | D: Date |
|---|---|---|---|

| Athlete | Test | Result | Date |
|---|---|---|---|
| Juan Ledesma | Standing LJ | 9-02.00 | 2027-01-09 |
| Pablo Jara | Standing LJ | 8-09.00 | 2027-01-09 |
| Juan Ledesma | Flying 10 | 1.05 | 2027-01-09 |
| Daniela Gamboa | Medball Back Toss | 28-00.00 | 2027-01-09 |

- **Test** is the test name. Anything with "fly", "flying", or "sprint" in it is ranked
  **fastest-first** (lower time wins); everything else is ranked **farthest-first**.
- **Result** is feet-dash-inches for distances (`9-02.00`) or a plain number for times (`1.05`).
- Add a new row each time you test — the board always shows each athlete's best.

### Tab 5: `Plan` (the season blocks)
Powers the **Plan** tab's block timeline and the "This Block" card. **Pre-filled** with all 16
of your blocks in the import file — you usually won't touch this except to tweak wording.

**Headers in row 1:** `Block | Phase | Start | End | Theme | Focus`
- `Start`/`End` as `2026-08-03` — the app highlights whichever block today falls inside ("Now").
- `Focus` is a single cell; separate bullets with ` · ` (a middle dot) and the app splits them.

### Tab 6: `Sessions` (the daily practice detail)
Powers the per-day practice card athletes open before practice (Setup → drills → goal).
**One row per drill.** The import file includes a worked Block 1 · Day 1 example to copy.

**Headers in row 1:**
`Block | Day | Date | Type | Intensity | Goal | Segment | Item | Sets/Reps | Time | Rest | Cue`

| Block | Day | Date | Type | Intensity | Goal | Segment | Item | Sets/Reps | Time | Rest | Cue |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Block 1 · Foundation | Day 1 | | GPP | Teach | Learn the warm-up… | Warm-Up | Standard Warm-Up | full circuit | 25 | — | Even lines… |
| | | | | | | Speed | Wall drills | 3×10s | 8 | full | Tall, push the ground |

- **Fill `Block`, `Day`, `Date`, `Type`, `Intensity`, `Goal` only on the first row** of a session.
  Leave them blank on the following drill rows — the app carries them down (blank = "same session").
- A new session starts whenever you type a new `Block`/`Day`.
- **`Date`** is optional — fill it and that session pops up as **"Today's Practice"** on the day it matches.
- **`Time`** is minutes (the app totals them); **`Segment`** groups drills (Warm-Up / Speed / Power / Strength / Cool-down).

---

## PART 4 — Starter season schedule (optional, paste-ready)

Built from your season anchors. **Double-check the exact dates, names, and locations** —
treat these as a starting point, and add your dual meets (vs Rubidoux, etc.) as you get dates.
Paste into the `Schedule` tab starting at **row 2** (under the headers).

| Meet | Type | Date | Location |
|---|---|---|---|
| Winter Qualifier #1 | Qualifier | 2027-01-09 | TBD |
| Winter Qualifier #2 | Qualifier | 2027-01-16 | TBD |
| Winter Qualifier #3 | Qualifier | 2027-01-23 | TBD |
| Winter Qualifier #4 | Qualifier | 2027-01-30 | TBD |
| Winter Championships | Championship | 2027-02-06 | Arcadia |
| Spring Opener | Dual | 2027-02-20 | TBD |
| Raincross Invitational | Invitational | 2027-04-10 | Riverside |
| IE Championships | Invitational | 2027-04-17 | TBD |
| League Finals | League Finals | 2027-04-29 | TBD |
| CIF Prelims | CIF | 2027-05-08 | TBD |
| CIF Semifinals | CIF | 2027-05-15 | TBD |
| CIF Finals | CIF | 2027-05-22 | TBD |

> Tip for pasting a table from here: copy the rows, click the `Schedule` tab cell **A2**, and
> paste. If everything lands in one column, undo, then use **Edit → Paste special →
> Paste values only**, or paste into a cell and use **Data → Split text to columns**.

---

## PART 5 — Test it (~2 min)

1. Go to your live guide: https://coachkevingarcia.github.io/jaguars-jumps/
2. If you're already logged in, tap the **Sign out** chip (bottom-right), so it re-pulls fresh data.
3. Log in as one of your athletes (their first + last name). You should land on **Home** and see:
   - their **Next Up** meet and the Dual / Invite / League Finals countdowns,
   - their **PR / Season Best / Goal** cards with progress bars,
   - the **General** announcement and their **personal note**,
   - a **Ranks** tab with the team leaderboard (PR / Season Best / Most Improved / Testables).
4. Log in as **yourself** — instead of Home you land on the **Coach** dashboard (team bests,
   attention flags, everyone's goals, login activity), and you'll see the **Edit** button.

---

## Troubleshooting

- **Home is empty after logging in.** You probably saved the script but didn't publish a
  **New version** (Part 2). Redo Part 2, then sign out and back in.
- **Not sure which script version is live?** Open your Web-app `/exec` URL in a browser. It
  shows a `version` line (e.g. `v4 · plan + sessions`). If it's older than the `VERSION` at the
  top of the latest `Code.gs`, you still need to redeploy a New version (Part 2).
- **A new feature/tab isn't showing up.** New app features that add data (Plan, Sessions, etc.)
  ship in a new `Code.gs` — paste it and redeploy a **New version**, then sign out and back in.
- **An athlete's marks don't show.** The `Athlete` cell doesn't match the `Roster`. It must be
  `First Last`, spelled the same (capitalization is ignored, spelling and spacing are not).
- **The Leaderboard is empty or everyone's in one list.** Add the **`Gender`** column to your
  `Roster` (Boys / Girls) — the boards split by it.
- **Nobody shows on Most Improved.** That board needs the **`Baseline`** column filled in `Marks`
  *and* a Season Best to compare against.
- **A testable ranks the wrong direction.** Times must have "fly"/"flying"/"sprint" in the test
  name to rank fastest-first; otherwise it's treated as a distance (farthest-first).
- **A countdown is missing.** Check the `Type` word (`Dual`, `Invitational`, `League Finals`)
  and that the `Date` is in the future and written like `2027-04-29`.
- **A meet shows the wrong day.** Use the `2027-04-29` date format rather than `4/29/27`.
- **Changes to a tab aren't showing.** Editing tab *contents* is instant, but you must **sign
  out and back in** on the device — the app caches your data for the session.
- **You changed the script again later.** Any code change needs another **New version**
  (Part 2). Adding/typing data does not.
