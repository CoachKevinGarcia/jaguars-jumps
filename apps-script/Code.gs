/**
 * Jaguars Jumps Guide — login + attendance log backend
 * ----------------------------------------------------
 * This runs as a free Google Apps Script "Web App" attached to a Google Sheet.
 * It checks a login against the Roster tab and records each successful login
 * (name + date/time + device) on the Log tab.
 *
 * Required tabs (exact names):
 *   Roster  ->  row 1 headers: First | Last | Role   (athlete names from row 2 down)
 *   Log     ->  row 1 headers: Time | Name | Device  (the script fills these in)
 *
 * Optional tabs that power the Home dashboard (skip any you don't want):
 *   Marks     ->  Athlete | Event | PR | SB | Goal | Goal Note   (Event = LJ/TJ/HJ)
 *   Schedule  ->  Meet | Type | Date | Location                  (Type e.g. Dual / Invitational / League Finals)
 *   Notes     ->  Athlete | Note   (use Athlete = "General" for a team-wide announcement)
 *
 * Role column (C) is optional. Put "admin" (or "coach") in your own row to make
 * the in-app Edit button appear only for you. Blank = normal athlete.
 */

const ROSTER_TAB   = 'Roster';
const LOG_TAB      = 'Log';
const MARKS_TAB    = 'Marks';
const SCHEDULE_TAB = 'Schedule';
const NOTES_TAB    = 'Notes';

function doPost(e) {
  try {
    const body  = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const first = String(body.first || '').trim();
    const last  = String(body.last  || '').trim();
    if (!first || !last) return json({ ok: false });

    const ss     = SpreadsheetApp.getActiveSpreadsheet();
    const roster = ss.getSheetByName(ROSTER_TAB);
    const rows   = Math.max(roster.getLastRow() - 1, 0);
    const names  = rows ? roster.getRange(2, 1, rows, 3).getValues() : [];

    let match = null, admin = false;
    for (const row of names) {
      const rf = String(row[0] || '').trim();
      const rl = String(row[1] || '').trim();
      if (rf && rl &&
          rf.toLowerCase() === first.toLowerCase() &&
          rl.toLowerCase() === last.toLowerCase()) {
        match = rf + ' ' + rl;   // canonical name, properly cased from the roster
        const role = String(row[2] || '').trim().toLowerCase();
        admin = (role === 'admin' || role === 'coach');
        break;
      }
    }
    if (!match) return json({ ok: false });

    ss.getSheetByName(LOG_TAB).appendRow([new Date(), match, String(body.ua || '')]);
    return json({ ok: true, name: match, admin: admin, home: buildHome(ss, match) });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

// Gathers the logged-in athlete's dashboard data from the optional tabs.
function buildHome(ss, name) {
  const tz   = ss.getSpreadsheetTimeZone();
  const key  = name.toLowerCase();
  const read = (tabName, cols) => {
    const sh = ss.getSheetByName(tabName);
    if (!sh) return [];
    const n = Math.max(sh.getLastRow() - 1, 0);
    return n ? sh.getRange(2, 1, n, cols).getValues() : [];
  };
  const ymd = (v) => (v instanceof Date && !isNaN(v))
    ? Utilities.formatDate(v, tz, 'yyyy-MM-dd')
    : String(v || '').trim();

  // Marks (this athlete only)
  const marks = read(MARKS_TAB, 6)
    .filter(r => String(r[0] || '').trim().toLowerCase() === key && String(r[1] || '').trim())
    .map(r => ({
      event:    String(r[1] || '').trim(),
      pr:       String(r[2] || '').trim(),
      sb:       String(r[3] || '').trim(),
      goal:     String(r[4] || '').trim(),
      goalNote: String(r[5] || '').trim()
    }));

  // Schedule (everyone sees the same upcoming meets)
  const schedule = read(SCHEDULE_TAB, 4)
    .filter(r => String(r[0] || '').trim() && r[2] !== '')
    .map(r => ({
      meet:     String(r[0] || '').trim(),
      type:     String(r[1] || '').trim(),
      date:     ymd(r[2]),
      location: String(r[3] || '').trim()
    }));

  // Notes: this athlete's note + a team-wide "General" note
  let note = '', general = '';
  read(NOTES_TAB, 2).forEach(r => {
    const who = String(r[0] || '').trim().toLowerCase();
    const txt = String(r[1] || '').trim();
    if (who === key) note = txt;
    else if (who === 'general' || who === 'all' || who === 'team') general = txt;
  });

  return { marks: marks, schedule: schedule, note: note, general: general };
}

// Lets you confirm the web app is live by opening its URL in a browser.
function doGet() {
  return json({ ok: true, status: 'Jaguars Jumps login service is running.' });
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
