import test from 'node:test';
import assert from 'node:assert/strict';
import { parseRoute, buildUrlWithParams, getContactMessage, isExternalUrl } from './navigation.ts';

test('parseRoute correctly identifies valid routes including request pages', () => {
  assert.equal(parseRoute('/'), 'home');
  assert.equal(parseRoute('/therapy'), 'therapy');
  assert.equal(parseRoute('/therapy/'), 'therapy');
  assert.equal(parseRoute('/course'), 'course');
  assert.equal(parseRoute('/allergy'), 'allergy');
  assert.equal(parseRoute('/requests/allergy'), 'allergy');
  assert.equal(parseRoute('/dermatitis'), 'dermatitis');
  assert.equal(parseRoute('/requests/dermatitis'), 'dermatitis');
  assert.equal(parseRoute('/asthma'), 'asthma');
  assert.equal(parseRoute('/requests/asthma'), 'asthma');
  assert.equal(parseRoute('/unknown-path'), 'home');
});

test('buildUrlWithParams preserves query string and UTM tags', () => {
  const result = buildUrlWithParams('/allergy', '?utm_source=instagram&utm_medium=bio');
  assert.equal(result, '/allergy?utm_source=instagram&utm_medium=bio');

  const withAnchor = buildUrlWithParams('/', '?utm_source=instagram', 'formats');
  assert.equal(withAnchor, '/?utm_source=instagram#formats');

  const emptySearch = buildUrlWithParams('/course', '', 'details');
  assert.equal(emptySearch, '/course#details');
});

test('getContactMessage returns appropriate message for self vs child', () => {
  const templates = {
    self: 'Запрос касается меня.',
    child: 'Запрос касается ребёнка.',
  };
  assert.equal(getContactMessage('self', templates), 'Запрос касается меня.');
  assert.equal(getContactMessage('child', templates), 'Запрос касается ребёнка.');
});

test('isExternalUrl correctly detects external vs internal URLs', () => {
  assert.equal(isExternalUrl('https://t.me/psy_aleshin'), true);
  assert.equal(isExternalUrl('http://example.com'), true);
  assert.equal(isExternalUrl('/allergy'), false);
  assert.equal(isExternalUrl('#formats'), false);
});
