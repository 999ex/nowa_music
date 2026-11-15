import { test } from 'node:test';
import assert from 'node:assert/strict';
import { numberOneCountries, currentCountries, latestRecordDate, rowView } from './charts.js';

const songs = [
  { rows: [
    { country: 'gb', best: 1, bestDate: '2026-10-31', current: 71 },
    { country: 'us', best: 1, bestDate: '2026-11-03', current: null },
  ] },
  { rows: [
    { country: 'gb', best: 1, bestDate: '2026-11-01', current: null },
    { country: 'sg', best: 5, bestDate: '2026-11-08', current: 40 },
  ] },
];

test('numberOneCountries: 曲をまたいで同じ国は1つと数える', () => {
  assert.equal(numberOneCountries(songs), 2);
});

test('currentCountries: いまチャートインしている国の数', () => {
  assert.equal(currentCountries(songs), 2);
});

test('latestRecordDate: 一番新しい最高位の日付', () => {
  assert.equal(latestRecordDate(songs), '2026-11-08');
  assert.equal(latestRecordDate([]), null);
});

test('rowView: バーの位置と「最高位まであと◯」', () => {
  const v = rowView({ best: 1, current: 14 });
  assert.equal(v.bestPos, 0);
  assert.equal(Math.round(v.currentPos), 13);
  assert.equal(v.gap, 13);
  assert.equal(rowView({ best: 5, current: null }).gap, null);
  assert.equal(rowView({ best: 1, current: null }).currentPos, null);
  assert.equal(rowView({ best: 150, current: null }).bestPos, 100);
});
