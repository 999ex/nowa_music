/**
 * お知らせ（src/content/news/*.md）を表示用に整える小さな関数群。
 * 文言は言語ごとに持ち、その言語が無ければ 英語 → 日本語 の順で代わりに出す。
 */

/** 言語ごとの文言から、指定の言語のものを選ぶ。 */
export function pickText(texts, lang) {
  if (!texts) return '';
  if (typeof texts === 'string') return texts;
  return texts[lang] ?? texts.en ?? texts.ja ?? '';
}

/** 本文を空行ごとに段落へ分ける。段落内の改行はそのまま行として残す。 */
export function toParagraphs(text) {
  return String(text ?? '')
    .split(/\n\s*\n/)
    .map((p) => p.split('\n').map((line) => line.trim()).filter(Boolean))
    .filter((lines) => lines.length > 0);
}

/** 新しい順に並べる。日付が同じなら id の逆順。 */
export function sortNews(entries) {
  return [...entries].sort((a, b) => b.data.date.localeCompare(a.data.date) || b.id.localeCompare(a.id));
}

const DATE_LOCALES = { ja: 'ja-JP', en: 'en-US', ko: 'ko-KR', 'zh-tw': 'zh-Hant-TW' };

/** '2026-10-31' を各言語の日付表記にする。時差でずれないよう UTC として扱う。 */
export function formatDate(ymd, lang) {
  const [y, m, d] = String(ymd).split('-').map(Number);
  if (!y || !m || !d) return String(ymd);
  return new Intl.DateTimeFormat(DATE_LOCALES[lang] ?? 'ja-JP', { dateStyle: 'long', timeZone: 'UTC' }).format(
    new Date(Date.UTC(y, m - 1, d))
  );
}

// 国名。ブラウザ任せ（Intl）だと「中華人民共和国香港特別行政区」のような長い正式名になる国があるので、
// よく使う国は短い呼び名をここで決めておく。無い国は Intl の名前で代わりに出す。
const COUNTRIES = {
  gb: { ja: 'イギリス', en: 'UK', ko: '영국', 'zh-tw': '英國' },
  us: { ja: 'アメリカ', en: 'US', ko: '미국', 'zh-tw': '美國' },
  br: { ja: 'ブラジル', en: 'Brazil', ko: '브라질', 'zh-tw': '巴西' },
  sg: { ja: 'シンガポール', en: 'Singapore', ko: '싱가포르', 'zh-tw': '新加坡' },
  fr: { ja: 'フランス', en: 'France', ko: '프랑스', 'zh-tw': '法國' },
  tw: { ja: '台湾', en: 'Taiwan', ko: '대만', 'zh-tw': '台灣' },
  hk: { ja: '香港', en: 'Hong Kong', ko: '홍콩', 'zh-tw': '香港' },
  jp: { ja: '日本', en: 'Japan', ko: '일본', 'zh-tw': '日本' },
  kr: { ja: '韓国', en: 'South Korea', ko: '한국', 'zh-tw': '韓國' },
  de: { ja: 'ドイツ', en: 'Germany', ko: '독일', 'zh-tw': '德國' },
  ca: { ja: 'カナダ', en: 'Canada', ko: '캐나다', 'zh-tw': '加拿大' },
  au: { ja: 'オーストラリア', en: 'Australia', ko: '호주', 'zh-tw': '澳洲' },
  ph: { ja: 'フィリピン', en: 'Philippines', ko: '필리핀', 'zh-tw': '菲律賓' },
  my: { ja: 'マレーシア', en: 'Malaysia', ko: '말레이시아', 'zh-tw': '馬來西亞' },
  th: { ja: 'タイ', en: 'Thailand', ko: '태국', 'zh-tw': '泰國' },
  id: { ja: 'インドネシア', en: 'Indonesia', ko: '인도네시아', 'zh-tw': '印尼' },
  it: { ja: 'イタリア', en: 'Italy', ko: '이탈리아', 'zh-tw': '義大利' },
  es: { ja: 'スペイン', en: 'Spain', ko: '스페인', 'zh-tw': '西班牙' },
  mx: { ja: 'メキシコ', en: 'Mexico', ko: '멕시코', 'zh-tw': '墨西哥' },
};

/** 国コード（gb など）を各言語の国名にする。 */
export function countryName(code, lang) {
  const key = String(code).toLowerCase();
  const known = COUNTRIES[key];
  if (known) return known[lang] ?? known.en;
  try {
    return new Intl.DisplayNames([DATE_LOCALES[lang] ?? 'ja-JP'], { type: 'region' }).of(key.toUpperCase()) ?? key;
  } catch {
    return key.toUpperCase();
  }
}
