/**
 * Jaguars Jumps Guide — login + attendance log backend
 * ----------------------------------------------------
 * This runs as a free Google Apps Script "Web App" attached to a Google Sheet.
 * It checks a login against the Roster tab and records each successful login
 * (name + date/time + device) on the Log tab.
 *
 * The Sheet needs two tabs (exact names):
 *   Roster  ->  row 1 headers: First | Last         (athlete names from row 2 down)
 *   Log     ->  row 1 headers: Time | Name | Device  (the script fills these in)
 */

const ROSTER_TAB = 'Roster';
const LOG_TAB    = 'Log';

function doPost(e) {
  try {
    const body  = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const first = String(body.first || '').trim();
    const last  = String(body.last  || '').trim();
    if (!first || !last) return json({ ok: false });

    const ss     = SpreadsheetApp.getActiveSpreadsheet();
    const roster = ss.getSheetByName(ROSTER_TAB);
    const rows   = Math.max(roster.getLastRow() - 1, 0);
    const names  = rows ? roster.getRange(2, 1, rows, 2).getValues() : [];

    let match = null;
    for (const row of names) {
      const rf = String(row[0] || '').trim();
      const rl = String(row[1] || '').trim();
      if (rf && rl &&
          rf.toLowerCase() === first.toLowerCase() &&
          rl.toLowerCase() === last.toLowerCase()) {
        match = rf + ' ' + rl;   // canonical name, properly cased from the roster
        break;
      }
    }
    if (!match) return json({ ok: false });

    ss.getSheetByName(LOG_TAB).appendRow([new Date(), match, String(body.ua || '')]);
    return json({ ok: true, name: match });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
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
