# Turning On the Home Dashboard — Full Walkthrough

This is the hand-held version. Follow it top to bottom once and the Home tab
(countdowns, PRs, goals, notes) goes live for your athletes.

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

## PART 3 — Add the three data tabs (~5 min + your data)

Back in your **Google Sheet**. Tabs are the little named buttons along the bottom.
Add a tab with the **+** at the bottom-left, then **double-click** the new tab's name to
rename it. **Spelling and capitalization of the tab names must be exact.**

### Tab 1: `Marks`
This is each athlete's PRs, Season Bests, and goals — one row per athlete *per event*.

Put these **headers in row 1** (one per column, A through F):

| A: Athlete | B: Event | C: PR | D: SB | E: Goal | F: Goal Note |
|---|---|---|---|---|---|

Then fill rows from row 2 down. Example (replace with real marks):

| Athlete | Event | PR | SB | Goal | Goal Note |
|---|---|---|---|---|---|
| Pablo Jara | LJ | 18-07.50 | 18-02.00 | 19-06 | Hold your penultimate. |
| Pablo Jara | TJ | 40-02.00 | 38-11.00 | 42-00 | Patience in the step phase. |
| Juan Ledesma | LJ | 20-01.00 | 19-08.00 | 21-00 | Tall through the board. |
| Daniela Gamboa | LJ | 15-04.00 | 14-11.00 | 16-06 | Drive the knee up. |

Rules:
- **Athlete** must match the `Roster` exactly as `First Last` (e.g., `Pablo Jara`).
- **Event** is `LJ`, `TJ`, or `HJ` (one event per row — a triple-jumper who also long-jumps
  gets two rows).
- **Marks** are written feet-dash-inches: `18-07.50`. High jump the same way: `5-04.00`.
- **Goal** is optional. If it's a real mark, Home shows a progress bar toward it. Leave it
  blank and the bar just won't appear.
- **Goal Note** is your one-line coaching cue for that event (optional).

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
   - the **General** announcement and their **personal note**.
4. Log in as **yourself** — you'll also see the **Edit** button (because your Roster `Role` is `admin`).

---

## Troubleshooting

- **Home is empty after logging in.** You probably saved the script but didn't publish a
  **New version** (Part 2). Redo Part 2, then sign out and back in.
- **An athlete's marks don't show.** The `Athlete` cell doesn't match the `Roster`. It must be
  `First Last`, spelled the same (capitalization is ignored, spelling and spacing are not).
- **A countdown is missing.** Check the `Type` word (`Dual`, `Invitational`, `League Finals`)
  and that the `Date` is in the future and written like `2027-04-29`.
- **A meet shows the wrong day.** Use the `2027-04-29` date format rather than `4/29/27`.
- **Changes to a tab aren't showing.** Editing tab *contents* is instant, but you must **sign
  out and back in** on the device — the app caches your data for the session.
- **You changed the script again later.** Any code change needs another **New version**
  (Part 2). Adding/typing data does not.
