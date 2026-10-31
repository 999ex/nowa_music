import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pickText, toParagraphs, sortNews, formatDate, countryName } from './news.js';

test('pickText: その言語があればそれを使う', () => {
  assert.equal(pickText({ ja: 'あ', en: 'a' }, 'ja'), 'あ');
});

test('pickText: 無い言語は 英語 → 日本語 の順で代わりに出す', () => {
  assert.equal(pickText({ ja: 'あ', en: 'a' }, 'ko'), 'a');
  assert.equal(pickText({ ja: 'あ' }, 'zh-tw'), 'あ');
  assert.equal(pickText(undefined, 'ja'), '');
});

test('toParagraphs: 空行で段落、改行で行に分ける', () => {
  assert.deepEqual(toParagraphs('一行目\n二行目\n\n次の段落\n'), [['一行目', '二行目'], ['次の段落']]);
  assert.deepEqual(toParagraphs(''), []);
});

test('sortNews: 新しい日付が先', () => {
  const entries = [
    { id: 'a', data: { date: '2026-10-01' } },
    { id: 'b', data: { date: '2026-10-31' } },
  ];
  assert.deepEqual(sortNews(entries).map((e) => e.id), ['b', 'a']);
});

test('formatDate: 言語ごとの日付表記で、日付がずれない', () => {
  assert.equal(formatDate('2026-10-31', 'ja'), '2026年10月31日');
  assert.equal(formatDate('2026-10-31', 'en'), 'October 31, 2026');
});

test('countryName: よく使う国は短い名前、それ以外は Intl の名前', () => {
  assert.equal(countryName('gb', 'ja'), 'イギリス');
  assert.equal(countryName('HK', 'ja'), '香港');
  assert.equal(countryName('tw', 'zh-tw'), '台灣');
  assert.equal(countryName('nz', 'en'), 'New Zealand');
});
