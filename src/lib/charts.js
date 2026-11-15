/**
 * チャート実績（src/data/charts.json）を表示用にまとめる小さな関数群。
 */

/** 1位を取った国の数（曲やチャートをまたいで重複しない国の数） */
export function numberOneCountries(songs) {
  return new Set(songs.flatMap((s) => s.rows.filter((r) => r.best === 1).map((r) => r.country))).size;
}

/** いまチャートインしている国の数 */
export function currentCountries(songs) {
  return new Set(songs.flatMap((s) => s.rows.filter((r) => r.current != null).map((r) => r.country))).size;
}

/** 最高位を記録した一番新しい日付。新しい記録が出た日として、お知らせの並びに使う */
export function latestRecordDate(songs) {
  return songs.flatMap((s) => s.rows.map((r) => r.bestDate)).filter(Boolean).sort().at(-1) ?? null;
}

export const songStats = (song) => ({
  ones: song.rows.filter((r) => r.best === 1).length,
  charting: song.rows.some((r) => r.current != null),
});

/**
 * 1行分の表示用の値。バーは左端が1位、右端が100位（100位より下は右端に置く）。
 * gap は「最高位まであと◯」。現在の順位が最高位より下のときだけ出す。
 */
export function rowView(row) {
  const pos = (rank) => (rank == null ? null : ((Math.min(100, Math.max(1, rank)) - 1) / 99) * 100);
  return {
    ...row,
    bestPos: pos(row.best),
    currentPos: pos(row.current),
    gap: row.current != null && row.best != null && row.current > row.best ? row.current - row.best : null,
  };
}
