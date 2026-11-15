/**
 * 読み取ったチャートイン情報を、これまでの記録に足し込む。
 * - 最高位は下がらない（TuneCore の一覧から消えた古い記録も残る）
 * - 同じ順位なら、先に取った日付を残す
 * - 「現在の順位」は毎回読み直し、今回見つからなければ圏外（null）にする
 */

const rowKey = (row) => `${row.chart}|${row.country}`;

/** 記録を良い方へ更新する。順位が小さいほど良く、同じなら日付が早いほうを残す。 */
function improve(row, rank, date) {
  if (!rank) return false;
  const better = row.best == null || rank < row.best || (rank === row.best && date && (!row.bestDate || date < row.bestDate));
  if (better) {
    row.best = rank;
    row.bestDate = date ?? row.bestDate ?? null;
  }
  return better;
}

/**
 * @param prev これまでの記録（charts.json の songs）
 * @param releases 今回読んだ曲ページ [{ code, tracks, current: [...], past: [...] }]
 * @param today 今日の日付（'2026-11-15'）。「現在の順位」の日付として使う
 */
export function mergeCharts(prev, releases, today) {
  const songs = new Map((prev ?? []).map((s) => [s.id, { ...s, rows: s.rows.map((r) => ({ ...r, current: null })) }]));

  for (const release of releases) {
    for (const [list, isCurrent] of [[release.current, true], [release.past, false]]) {
      for (const entry of list) {
        const id = `${release.code}:${entry.song}`;
        if (!songs.has(id)) {
          songs.set(id, { id, title: entry.title ?? entry.song, url: `https://linkco.re/${release.code}`, rows: [] });
        }
        const song = songs.get(id);
        if (entry.title) song.title = entry.title;
        let row = song.rows.find((r) => rowKey(r) === rowKey(entry));
        if (!row) {
          row = { chart: entry.chart, chartLabel: entry.chartLabel, country: entry.country, countryLabel: entry.countryLabel, current: null, best: null, bestDate: null };
          song.rows.push(row);
        }
        if (isCurrent) {
          row.current = row.current == null ? entry.rank : Math.min(row.current, entry.rank);
          improve(row, entry.rank, today);
        } else {
          improve(row, entry.rank, entry.date);
        }
      }
    }
  }

  // 並び：曲は 1位の国が多い順 → 記録の多い順、行は 最高位 → 日付 の順
  const ones = (s) => s.rows.filter((r) => r.best === 1).length;
  const list = [...songs.values()];
  for (const s of list) s.rows.sort((a, b) => a.best - b.best || String(a.bestDate).localeCompare(String(b.bestDate)));
  list.sort((a, b) => ones(b) - ones(a) || b.rows.length - a.rows.length || a.title.localeCompare(b.title));
  return list;
}
