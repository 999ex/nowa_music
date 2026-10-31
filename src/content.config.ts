import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 言語ごとの文言。日本語は必須、ほかは無ければ 英語 → 日本語 の順で代わりに表示される
const texts = z.object({
  ja: z.string(),
  en: z.string().optional(),
  ko: z.string().optional(),
  'zh-tw': z.string().optional(),
});
const optionalTexts = texts.partial();

// YAML は 2026-10-31 を日付として読むので、文字列に戻してから形を確かめる
const ymd = z.preprocess(
  (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v),
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '日付は 2026-10-31 の形で書いてください')
);

const ranking = z.object({
  chart: z.string(),
  country: z.string(),
  rank: z.number().int().positive(),
  date: ymd.optional(),
});

/**
 * お知らせ。src/content/news/ に .md ファイルを1つ置くと1件増える。
 * 書き方を間違えるとビルドが止まり、公開中のサイトはそのまま残る（壊れたページは公開されない）。
 */
const news = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/news' }),
  schema: z.object({
    date: ymd,
    title: texts,
    body: optionalTexts.optional(),
    rankings: z
      .object({
        song: z.string(),
        asOf: ymd,
        current: z.array(ranking).default([]),
        past: z.array(ranking).default([]),
      })
      .optional(),
    link: z.object({ url: z.string().url(), label: optionalTexts }).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { news };
