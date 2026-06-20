/**
 * Jaguars Jumps Guide — login + attendance log + dashboard backend
 * ----------------------------------------------------------------
 * Runs as a free Google Apps Script "Web App" attached to a Google Sheet.
 * On a valid login it records the login and returns that athlete's dashboard
 * data; for everyone it returns the team leaderboard; for admins it also
 * returns the coach overview.
 *
 * Tabs (exact names). Required:
 *   Roster  ->  First | Last | Role | Gender   (Role admin/coach = coach access; Gender = Boys/Girls)
 *   Log     ->  Time | Name | Device           (filled in automatically)
 * Optional (power the Home + Leaderboard + Coach views):
 *   Marks      ->  Athlete | Event | PR | SB | Goal | Goal Note | Baseline   (Event = LJ/TJ/HJ)
 *   Schedule   ->  Meet | Type | Date | Location
 *   Notes      ->  Athlete | Note            (Athlete = "General" for a team-wide announcement)
 *   Testables  ->  Athlete | Test | Result | Date   (Test e.g. Standing LJ / Flying 10 / Medball Back Toss)
 */

const ROSTER_TAB = 'Roster', LOG_TAB = 'Log', MARKS_TAB = 'Marks',
      SCHEDULE_TAB = 'Schedule', NOTES_TAB = 'Notes', TESTABLES_TAB = 'Testables',
      PLAN_TAB = 'Plan', SESSIONS_TAB = 'Sessions';

// Bump this whenever you paste a new Code.gs, so you can confirm which version is live
// by opening the /exec URL in a browser (it shows in the health check).
const VERSION = 'v4 · plan + sessions (2026-06-19)';

function doPost(e) {
  try {
    const body  = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const first = String(body.first || '').trim();
    const last  = String(body.last  || '').trim();
    if (!first || !last) return json({ ok: false });

    const ss     = SpreadsheetApp.getActiveSpreadsheet();
    const roster = ss.getSheetByName(ROSTER_TAB);
    const rRows  = Math.max(roster.getLastRow() - 1, 0);
    const rData  = rRows ? roster.getRange(2, 1, rRows, 4).getValues() : [];

    let match = null, admin = false;
    for (const row of rData) {
      const rf = String(row[0] || '').trim(), rl = String(row[1] || '').trim();
      if (rf && rl &&
          rf.toLowerCase() === first.toLowerCase() &&
          rl.toLowerCase() === last.toLowerCase()) {
        match = rf + ' ' + rl;
        const role = String(row[2] || '').trim().toLowerCase();
        admin = (role === 'admin' || role === 'coach');
        break;
      }
    }
    if (!match) return json({ ok: false });

    ss.getSheetByName(LOG_TAB).appendRow([new Date(), match, String(body.ua || '')]);

    const resp = { ok: true, name: match, admin: admin, version: VERSION,
                   home: buildHome(ss, match), board: buildBoard(ss),
                   plan: buildPlan(ss), sessions: buildSessions(ss) };
    if (admin) resp.coach = buildCoach(ss);
    return json(resp);
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function doGet() { return json({ ok: true, status: 'Jaguars Jumps login service is running.', version: VERSION }); }
function json(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

// ---- helpers ----
function _read(ss, tab, cols) {
  const sh = ss.getSheetByName(tab);
  if (!sh) return [];
  const n = Math.max(sh.getLastRow() - 1, 0);
  return n ? sh.getRange(2, 1, n, cols).getValues() : [];
}
function _ymd(v, tz) {
  return (v instanceof Date && !isNaN(v)) ? Utilities.formatDate(v, tz, 'yyyy-MM-dd') : String(v || '').trim();
}
function _genderMap(ss) {
  const m = {};
  _read(ss, ROSTER_TAB, 4).forEach(r => {
    const n = (String(r[0] || '').trim() + ' ' + String(r[1] || '').trim()).trim();
    if (n) m[n.toLowerCase()] = String(r[3] || '').trim();
  });
  return m;
}

// This athlete's own Home dashboard.
function buildHome(ss, name) {
  const tz = ss.getSpreadsheetTimeZone(), key = name.toLowerCase();
  const marks = _read(ss, MARKS_TAB, 7)
    .filter(r => String(r[0] || '').trim().toLowerCase() === key && String(r[1] || '').trim())
    .map(r => ({ event: String(r[1]||'').trim(), pr: String(r[2]||'').trim(), sb: String(r[3]||'').trim(),
                 goal: String(r[4]||'').trim(), goalNote: String(r[5]||'').trim() }));
  const schedule = _read(ss, SCHEDULE_TAB, 4)
    .filter(r => String(r[0] || '').trim() && r[2] !== '')
    .map(r => ({ meet: String(r[0]||'').trim(), type: String(r[1]||'').trim(), date: _ymd(r[2], tz), location: String(r[3]||'').trim() }));
  let note = '', general = '';
  _read(ss, NOTES_TAB, 2).forEach(r => {
    const who = String(r[0]||'').trim().toLowerCase(), txt = String(r[1]||'').trim();
    if (who === key) note = txt;
    else if (who === 'general' || who === 'all' || who === 'team') general = txt;
  });
  return { marks, schedule, note, general };
}

// Team leaderboard data (everyone). Marks + gender + testables — no goals/notes.
function buildBoard(ss) {
  const g = _genderMap(ss), tz = ss.getSpreadsheetTimeZone(), byAth = {};
  _read(ss, MARKS_TAB, 7).forEach(r => {
    const ath = String(r[0]||'').trim(), ev = String(r[1]||'').trim();
    if (!ath || !ev) return;
    const k = ath.toLowerCase();
    if (!byAth[k]) byAth[k] = { name: ath, gender: g[k] || '', marks: [] };
    byAth[k].marks.push({ event: ev, pr: String(r[2]||'').trim(), sb: String(r[3]||'').trim(), baseline: String(r[6]||'').trim() });
  });
  const testables = _read(ss, TESTABLES_TAB, 4)
    .filter(r => String(r[0]||'').trim() && String(r[1]||'').trim())
    .map(r => ({ athlete: String(r[0]||'').trim(), gender: g[String(r[0]||'').trim().toLowerCase()] || '',
                 test: String(r[1]||'').trim(), result: String(r[2]||'').trim(), date: _ymd(r[3], tz) }));
  return { athletes: Object.keys(byAth).map(k => byAth[k]), testables };
}

// Season practice plan — the blocks (everyone).
function buildPlan(ss) {
  const tz = ss.getSpreadsheetTimeZone();
  return _read(ss, PLAN_TAB, 6)
    .filter(r => String(r[0] || '').trim())
    .map(r => ({
      block: String(r[0] || '').trim(),
      phase: String(r[1] || '').trim(),
      start: _ymd(r[2], tz),
      end:   _ymd(r[3], tz),
      theme: String(r[4] || '').trim(),
      focus: String(r[5] || '').trim()
    }));
}

// Daily practice sessions (everyone). One sheet row = one drill; rows are grouped
// into a session by Block + Day. Session meta (Date/Type/Intensity/Goal) is taken
// from the first row of the group, so you only fill those once per session.
function buildSessions(ss) {
  const tz = ss.getSpreadsheetTimeZone();
  const order = [], map = {};
  let pBlock = '', pDay = '';
  _read(ss, SESSIONS_TAB, 12).forEach(r => {
    let block = String(r[0] || '').trim(), day = String(r[1] || '').trim();
    if (!block) block = pBlock;   // blank Block/Day = same session as the row above
    if (!day)   day   = pDay;
    if (!block && !day) return;
    pBlock = block; pDay = day;
    const key = block + '||' + day;
    if (!map[key]) {
      map[key] = { block: block, day: day, date: _ymd(r[2], tz),
                   type: String(r[3]||'').trim(), intensity: String(r[4]||'').trim(),
                   goal: String(r[5]||'').trim(), items: [] };
      order.push(key);
    }
    const s = map[key];
    if (!s.date)      s.date      = _ymd(r[2], tz);
    if (!s.type)      s.type      = String(r[3]||'').trim();
    if (!s.intensity) s.intensity = String(r[4]||'').trim();
    if (!s.goal)      s.goal      = String(r[5]||'').trim();
    const seg = String(r[6]||'').trim(), item = String(r[7]||'').trim();
    if (seg || item) s.items.push({
      segment: seg, item: item, detail: String(r[8]||'').trim(),
      time: String(r[9]||'').trim(), rest: String(r[10]||'').trim(), cue: String(r[11]||'').trim()
    });
  });
  return order.map(k => map[k]);
}

// Coach overview (admins only): goals, notes, and last-seen activity.
function buildCoach(ss) {
  const goals = _read(ss, MARKS_TAB, 7)
    .filter(r => String(r[0]||'').trim() && String(r[1]||'').trim())
    .map(r => ({ athlete: String(r[0]||'').trim(), event: String(r[1]||'').trim(),
                 goal: String(r[4]||'').trim(), goalNote: String(r[5]||'').trim() }));
  const notes = _read(ss, NOTES_TAB, 2)
    .map(r => ({ athlete: String(r[0]||'').trim(), note: String(r[1]||'').trim() }))
    .filter(x => x.athlete);
  const tz = ss.getSpreadsheetTimeZone(), last = {};
  _read(ss, LOG_TAB, 3).forEach(r => {
    const n = String(r[1]||'').trim(); if (!n) return;
    const d = (r[0] instanceof Date) ? r[0] : new Date(r[0]); if (isNaN(d)) return;
    const k = n.toLowerCase();
    if (!last[k] || d > last[k].d) last[k] = { name: n, d: d };
  });
  const activity = Object.keys(last).map(k => ({ name: last[k].name, lastSeen: last[k].d.toISOString() }));
  return { goals, notes, activity };
}
