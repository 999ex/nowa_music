/**
 * TuneCore のアーティストページから全リリースの曲ページ（linkco.re）を順に読み、
 * チャートイン情報を src/data/charts.json に足し込む。毎朝の自動更新で動く。
 *
 * うまく読めなかったときは何も書き換えずに失敗で終わる（公開中のサイトはそのまま残る）。
 */
import { readFile, writeFile } from 'node:fs/promises';
import { extractReleaseCodes, parseReleasePage, displayTitle } from './charts-parse.mjs';
import { mergeCharts } from './charts-merge.mjs';

const ARTIST_URL = 'https://www.tunecore.co.jp/artists/nowamusic';
const OUTPUT = new URL('../src/data/charts.json', import.meta.url);
const USER_AGENT = 'NowaMusicSite/1.0 (+https://nowajp.com)';
/** 1ページごとの間隔。TuneCore に負担をかけないよう、急がずに読む */
const DELAY_MS = 1000;
/** 読めなかったページがこの割合を超えたら、記録を更新せずに止める */
const MAX_FAILURE_RATE = 0.2;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(url) {
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'user-agent': USER_AGENT }, signal: AbortSignal.timeout(20000) });
      if (res.ok) return await res.text();
      if (attempt === 2) throw new Error(`HTTP ${res.status}`);
    } catch (err) {
      if (attempt === 2) throw err;
    }
    await sleep(3000);
  }
}

/** 日本時間の今日（'2026-11-15'） */
function todayInJapan() {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Tokyo' }).format(new Date());
}

async function main() {
  const codes = extractReleaseCodes(await get(ARTIST_URL));
  if (codes.length === 0) throw new Error('アーティストページからリリースが1件も見つかりませんでした（ページの形が変わった可能性があります）');

  const releases = [];
  const failures = [];
  for (const code of codes) {
    try {
      const page = parseReleasePage(await get(`https://linkco.re/${code}?lang=ja`));
      if (!page) throw new Error('ページの形が想定と違います');
      const withTitle = (list) => list.map((e) => ({ ...e, title: displayTitle(e.song, page.tracks) }));
      releases.push({ code, tracks: page.tracks, current: withTitle(page.current), past: withTitle(page.past) });
    } catch (err) {
      failures.push(`${code}: ${err.message}`);
    }
    await sleep(DELAY_MS);
  }

  if (failures.length > Math.max(3, codes.length * MAX_FAILURE_RATE)) {
    throw new Error(`読めなかったページが多いため、記録を更新しませんでした（${failures.length}/${codes.length}件）\n${failures.join('\n')}`);
  }
  if (failures.length) console.warn(`読めなかったページ（${failures.length}件）。前回までの記録はそのまま残ります:\n${failures.join('\n')}`);

  let prev = { songs: [] };
  try {
    prev = JSON.parse(await readFile(OUTPUT, 'utf8'));
  } catch {
    // 初回は記録なし
  }

  const today = todayInJapan();
  const songs = mergeCharts(prev.songs, releases, today);
  const rows = songs.reduce((n, s) => n + s.rows.length, 0);
  if (rows < (prev.songs ?? []).reduce((n, s) => n + s.rows.length, 0)) {
    throw new Error('記録が前回より減っています。想定外のため更新しませんでした');
  }

  const data = { checkedAt: new Date().toISOString(), checkedDate: today, releasesChecked: codes.length - failures.length, songs };
  await writeFile(OUTPUT, JSON.stringify(data, null, 2) + '\n');
  console.log(`${releases.length}件のリリースを確認し、${songs.length}曲・${rows}件の記録を保存しました`);
}

main().catch((err) => {
  console.error(`::error::${err.message}`);
  process.exit(1);
});
