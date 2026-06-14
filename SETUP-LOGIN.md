# Setting up the team login + attendance log

This connects the guide's login screen to a **Google Sheet you own**, so you can:

- Let only your athletes in (first name = username, last name = password), and
- See **who logged in and when**, right in the Sheet.

It's free, uses your existing Google account, and takes about 10 minutes once.

> While this isn't set up yet, the guide runs in **setup mode**: anyone can type a
> name and get in, and nothing is logged. Finish the steps below to turn on the
> real roster check and logging.

---

## Step 1 — Make the Sheet (your logbook)

1. Go to [sheets.new](https://sheets.new) to create a blank Google Sheet. Name it **Jaguars Jumps Logins**.
2. At the bottom, you'll see one tab called `Sheet1`. **Rename it to `Roster`** (double-click the tab name).
   - In `Roster`, put these headers in row 1: **First** in A1, **Last** in B1.
   - From row 2 down, add each athlete — first name in column A, last name in column B.
3. Add a second tab (the **+** at the bottom-left), **name it `Log`**.
   - In `Log`, put these headers in row 1: **Time** in A1, **Name** in B1, **Device** in C1.

Tab names must be exactly `Roster` and `Log`.

## Step 2 — Add the script

1. In the Sheet's menu: **Extensions → Apps Script**. A code editor opens in a new tab.
2. Delete whatever's in the `Code.gs` box.
3. Open the file **`apps-script/Code.gs`** from this folder, copy all of it, and paste it in.
4. Click the **Save** icon (💾).

## Step 3 — Deploy it as a Web App

1. Top-right: **Deploy → New deployment**.
2. Click the gear next to "Select type" → choose **Web app**.
3. Set:
   - **Description:** `Jumps login`
   - **Execute as:** **Me**
   - **Who has access:** **Anyone**
4. Click **Deploy**. Google will ask you to **authorize** — approve with your account.
   (If it warns "Google hasn't verified this app," click **Advanced → Go to (your project)** — it's your own script.)
5. Copy the **Web app URL** it gives you. It ends in `/exec`.

## Step 4 — Hand the URL to Claude

Paste that `/exec` URL back in the chat and say "here's the URL." I'll drop it into the
guide, push the change, and your login + logging goes live.

(If you'd rather do it yourself: open `index.html`, find `LOGIN_BACKEND`, and replace
`PASTE_YOUR_APPS_SCRIPT_URL_HERE` with your URL between the quotes.)

---

## Day-to-day

- **See who logged in:** open the Sheet → `Log` tab. Newest logins appear at the bottom,
  each with a timestamp.
- **Add or remove an athlete:** edit the `Roster` tab. Changes take effect immediately —
  no redeploy needed.
- **Someone can't get in:** check their row in `Roster` for typos/extra spaces. The check
  ignores capitalization but not spelling.
- **Changed the script later?** Re-deploy with **Deploy → Manage deployments → Edit → New version**
  so the URL stays the same.

## Good to know

- This is a **soft gate** — fine for keeping the guide to your team and tracking logins,
  but not bank-grade security. Don't reuse these passwords for anything that matters.
- A login lasts 12 hours on a device before it asks again; the **Sign out** chip
  (bottom-right) switches users on a shared phone.
