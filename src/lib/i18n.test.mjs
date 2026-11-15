import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggestLang, LANG_SUGGEST, messages, LANGS } from './i18n.js';

test('日本語を含む設定なら案内しない', () => {
  assert.equal(suggestLang(['ja']), null);
  assert.equal(suggestLang(['ja-JP', 'en-US']), null);
  assert.equal(suggestLang(['en-US', 'ja']), null);
});

test('言語設定が取れないときは案内しない', () => {
  assert.equal(suggestLang([]), null);
  assert.equal(suggestLang(undefined), null);
});

test('韓国語は韓国語ページへ', () => {
  assert.equal(suggestLang(['ko-KR', 'en']), 'ko');
  assert.equal(suggestLang(['ko']), 'ko');
});

test('繁体字（台湾・香港）は繁体字ページへ、簡体字は英語へ', () => {
  assert.equal(suggestLang(['zh-TW']), 'zh-tw');
  assert.equal(suggestLang(['zh-HK']), 'zh-tw');
  assert.equal(suggestLang(['zh-Hant-TW']), 'zh-tw');
  assert.equal(suggestLang(['zh-CN']), 'en');
});

test('それ以外の外国語は英語へ', () => {
  assert.equal(suggestLang(['en-US']), 'en');
  assert.equal(suggestLang(['de']), 'en');
});

test('ポルトガル語・インドネシア語・タイ語はそれぞれのページへ', () => {
  assert.equal(suggestLang(['pt-BR', 'pt']), 'pt-br');
  assert.equal(suggestLang(['pt-PT']), 'pt-br');
  assert.equal(suggestLang(['id-ID']), 'id');
  assert.equal(suggestLang(['th']), 'th');
});

test('全言語で、日本語にある文言が欠けていない', () => {
  const keys = (o, p = '') =>
    Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' && !Array.isArray(v) ? keys(v, `${p}${k}.`) : [`${p}${k}`]));
  const ja = keys(messages.ja);
  for (const l of LANGS) {
    const have = new Set(keys(messages[l]));
    assert.deepEqual(ja.filter((k) => !have.has(k)), [], l);
  }
});

test('案内先の言語すべてに文言がある', () => {
  for (const l of LANGS.filter((x) => x !== 'ja')) {
    assert.ok(LANG_SUGGEST[l].text && LANG_SUGGEST[l].go, l);
  }
});

test('トップの新しい文言が全言語にある', () => {
  for (const l of LANGS) {
    for (const key of ['heroPlay', 'heroBrowse', 'stickyPlay', 'listenNote']) {
      assert.ok(messages[l].home[key], `${l}.home.${key}`);
    }
  }
});
