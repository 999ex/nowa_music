import { test } from 'node:test';
import assert from 'node:assert/strict';
import { extractReleaseCodes, parseEntry, parseReleasePage, countryCode, chartKey, displayTitle } from './charts-parse.mjs';
import { mergeCharts } from './charts-merge.mjs';

const PAGE = `
<div class=list_song_title><p>伝えられなかった想い (-Silence-)<p class=list_song_artistname>Nowa</div>
<div class=trackList_block></div>
<div class=chart_in><div class=chart_in_detail>
<div class=chart_in_realtime><h3>現在ランキング</h3><h4>伝えられなかった想い</h4>
<span><img class=ranking_store_icon src=x.svg> iTunes Store • J-Pop トップソング • スイス • 30位 </span>
<span><img class=ranking_store_icon src=x.svg> iTunes Store • J-Pop トップソング • ブラジル • 30位</span></div>
<div class=chart_in_past><h3>過去ランキング</h3><div class=contents><h4>伝えられなかった想い</h4>
<span><img class=ranking_store_icon src=x.svg> iTunes Store • J-Pop トップソング • イギリス • 1位 • 2026年10月31日 </span>
<span><img class=ranking_store_icon src=x.svg> iTunes Store • 総合 トップソング • スペイン • 13位 • 2026年11月1日 </span>
</div></div></div></div>`;

test('extractReleaseCodes: linkco.re のコードを重複なく取り出す', () => {
  assert.deepEqual(extractReleaseCodes('a linkco.re/AbC12 b linkco.re/AbC12 linkco.re/Z9'), ['AbC12', 'Z9']);
});

test('parseEntry: 現在の順位（日付なし）と過去の順位（日付つき）', () => {
  assert.deepEqual(parseEntry('iTunes Store • J-Pop トップソング • スイス • 30位'), {
    chart: 'itunes-jpop-songs', chartLabel: 'iTunes Store • J-Pop トップソング', country: 'ch', countryLabel: 'スイス', rank: 30, date: null,
  });
  const past = parseEntry('iTunes Store • 総合 トップソング • 香港 • 99位 • 2026年11月8日');
  assert.equal(past.chart, 'itunes-all-songs');
  assert.equal(past.country, 'hk');
  assert.equal(past.date, '2026-11-08');
});

test('parseEntry: 読めない行は null', () => {
  assert.equal(parseEntry('なにか'), null);
});

test('countryCode: TuneCore の呼び方も Intl の名前も引ける。分からない国は null', () => {
  assert.equal(countryCode('英国'), 'gb');
  assert.equal(countryCode('アメリカ'), 'us');
  assert.equal(countryCode('インドネシア'), 'id');
  assert.equal(countryCode('フランス'), 'fr');
  assert.equal(countryCode('スイス'), 'ch');
  assert.equal(countryCode('架空の国'), null);
});

test('chartKey: J-Pop と総合を見分ける', () => {
  assert.equal(chartKey('iTunes Store', 'J-Pop J-Pop トップソング'), 'itunes-jpop-songs');
  assert.equal(chartKey('iTunes Store', 'ミュージック 総合 トップソング'), 'itunes-all-songs');
});

test('parseReleasePage: 現在と過去の記録を曲名つきで取り出す', () => {
  const page = parseReleasePage(PAGE);
  assert.equal(page.current.length, 2);
  assert.equal(page.past.length, 2);
  assert.equal(page.past[0].song, '伝えられなかった想い');
  assert.equal(displayTitle(page.past[0].song, page.tracks), '伝えられなかった想い (-Silence-)');
});

test('parseReleasePage: 想定と違うページは null', () => {
  assert.equal(parseReleasePage('<html>メンテナンス中</html>'), null);
});

test('mergeCharts: 最高位は下がらず、一覧から消えた記録も残る', () => {
  const prev = [{ id: 'A:曲', title: '曲', url: 'u', rows: [
    { chart: 'itunes-jpop-songs', country: 'br', countryLabel: 'ブラジル', current: 3, best: 1, bestDate: '2026-10-31' },
  ] }];
  const releases = [{ code: 'A', tracks: [], current: [
    { song: '曲', chart: 'itunes-jpop-songs', country: 'br', countryLabel: 'ブラジル', rank: 14, date: null },
    { song: '曲', chart: 'itunes-jpop-songs', country: 'ch', countryLabel: 'スイス', rank: 13, date: null },
  ], past: [] }];
  const [song] = mergeCharts(prev, releases, '2026-11-15');
  const br = song.rows.find((r) => r.country === 'br');
  assert.equal(br.best, 1);
  assert.equal(br.bestDate, '2026-10-31');
  assert.equal(br.current, 14);
  const ch = song.rows.find((r) => r.country === 'ch');
  assert.equal(ch.best, 13);
  assert.equal(ch.bestDate, '2026-11-15');
});

test('mergeCharts: より良い順位で更新、同じ順位なら早い日付を残す、見つからなければ圏外', () => {
  const prev = [{ id: 'A:曲', title: '曲', url: 'u', rows: [
    { chart: 'c', country: 'gb', current: 5, best: 3, bestDate: '2026-11-02' },
    { chart: 'c', country: 'us', current: 9, best: 2, bestDate: '2026-11-05' },
  ] }];
  const releases = [{ code: 'A', tracks: [], current: [], past: [
    { song: '曲', chart: 'c', country: 'gb', rank: 1, date: '2026-11-03' },
    { song: '曲', chart: 'c', country: 'us', rank: 2, date: '2026-11-01' },
  ] }];
  const [song] = mergeCharts(prev, releases, '2026-11-15');
  assert.deepEqual(song.rows.map((r) => [r.country, r.best, r.bestDate, r.current]), [
    ['gb', 1, '2026-11-03', null],
    ['us', 2, '2026-11-01', null],
  ]);
});
