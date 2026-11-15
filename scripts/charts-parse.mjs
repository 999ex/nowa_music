/**
 * TuneCore（linkco.re）の曲ページから、チャートイン情報を読み取る小さな関数群。
 * ネットワークに触れない純粋な関数だけを置き、テストできるようにしている。
 */

/** アーティストページの HTML から、各リリースのページ（linkco.re）のコードを重複なく取り出す。 */
export function extractReleaseCodes(html) {
  return [...new Set([...String(html).matchAll(/linkco\.re\/([A-Za-z0-9]+)/g)].map((m) => m[1]))];
}

const decode = (text) =>
  String(text)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0*39;|&apos;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();

// TuneCore の表記（日本語の国名）→ 国コード。Intl の日本語名で引けない呼び方だけ書く
const COUNTRY_ALIASES = {
  アメリカ: 'us',
  アメリカ合衆国: 'us',
  英国: 'gb',
  イギリス: 'gb',
  香港: 'hk',
  マカオ: 'mo',
  中国: 'cn',
  韓国: 'kr',
  台湾: 'tw',
  ロシア: 'ru',
  ベトナム: 'vn',
  ニュージーランド: 'nz',
  フランス: 'fr',
  アラブ首長国連邦: 'ae',
  南アフリカ: 'za',
};

let regionNames = null;
/** 日本語の国名を国コード（小文字2文字）にする。分からなければ null。 */
export function countryCode(name) {
  const key = decode(name);
  if (COUNTRY_ALIASES[key]) return COUNTRY_ALIASES[key];
  if (!regionNames) {
    regionNames = new Map();
    const names = new Intl.DisplayNames(['ja'], { type: 'region' });
    const A = 'A'.charCodeAt(0);
    for (let i = 0; i < 26; i++) {
      for (let j = 0; j < 26; j++) {
        const code = String.fromCharCode(A + i, A + j);
        const label = names.of(code);
        // 同じ名前の古いコード（フランスの FX など）で上書きしないよう、先に見つかった方を使う
        if (label && label !== code && !regionNames.has(label)) regionNames.set(label, code.toLowerCase());
      }
    }
  }
  return regionNames.get(key) ?? null;
}

/** チャート名をサイト内のキーにする。iTunes の J-Pop / 総合 以外は表記をそのままキーにする。 */
export function chartKey(store, chart) {
  const s = decode(store);
  const c = decode(chart);
  const prefix = /itunes/i.test(s) ? 'itunes' : s.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  if (/j-?pop/i.test(c)) return `${prefix}-jpop-songs`;
  if (/総合|all genres|top songs$/i.test(c) && !/j-?pop/i.test(c)) return `${prefix}-all-songs`;
  return `${prefix}-${c}`;
}

/** '2026年11月7日' → '2026-11-07'。読めなければ null。 */
export function parseJaDate(text) {
  const m = String(text).match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
  if (!m) return null;
  return `${m[1]}-${m[2].padStart(2, '0')}-${m[3].padStart(2, '0')}`;
}

/** 'iTunes Store • J-Pop トップソング • スイス • 30位 • 2026年11月7日' を1件の記録にする。 */
export function parseEntry(text) {
  const parts = decode(text).split(/\s*•\s*/).filter(Boolean);
  if (parts.length < 4) return null;
  const rankIndex = parts.findIndex((p) => /^\d+位$/.test(p));
  if (rankIndex < 3) return null;
  const store = parts[0];
  const country = parts[rankIndex - 1];
  const chart = parts.slice(1, rankIndex - 1).join(' ');
  const rank = Number(parts[rankIndex].replace('位', ''));
  const date = parts[rankIndex + 1] ? parseJaDate(parts[rankIndex + 1]) : null;
  if (!rank) return null;
  const code = countryCode(country);
  return {
    chart: chartKey(store, chart),
    chartLabel: `${store} • ${chart}`,
    country: code ?? country,
    countryLabel: country,
    rank,
    date,
  };
}

/** 1つの区画（現在ランキング／過去ランキング）から、曲名ごとの記録を取り出す。 */
function parseSection(html, className) {
  const start = html.search(new RegExp(`class=["']?${className}\\b`));
  if (start < 0) return [];
  // 次の区画か、チャートイン全体の終わりまで
  const rest = html.slice(start + className.length);
  const next = rest.search(/class=["']?chart_in_(realtime|past)\b|<\/section|class=["']?artist/);
  const block = next < 0 ? rest : rest.slice(0, next);

  const results = [];
  let song = null;
  for (const m of block.matchAll(/<h4[^>]*>([^<]*)|<span[^>]*>\s*<img[^>]*>([^<]*)/g)) {
    if (m[1] !== undefined) {
      song = decode(m[1]);
    } else if (song) {
      const entry = parseEntry(m[2]);
      if (entry) results.push({ song, ...entry });
    }
  }
  return results;
}

/** 曲ページ全体を読む。ページの形が想定と違えば null（呼び出し側で失敗として扱う）。 */
export function parseReleasePage(html) {
  const text = String(html);
  if (!/trackList|list_song_title/.test(text)) return null;
  const tracks = [...text.matchAll(/class=["']?list_song_title["']?[^>]*>\s*<p[^>]*>([^<]*)/g)].map((m) => decode(m[1]));
  return {
    tracks,
    current: parseSection(text, 'chart_in_realtime'),
    past: parseSection(text, 'chart_in_past'),
  };
}

/** チャート欄の曲名（h4）に合う収録曲名を選ぶ。'(-Silence-)' など版の違いを含む正式な曲名を表示に使う。 */
export function displayTitle(song, tracks) {
  return tracks.find((t) => t === song) ?? tracks.find((t) => t.startsWith(song)) ?? song;
}
