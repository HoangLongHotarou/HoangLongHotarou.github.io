import { describe, it, expect } from 'vitest';
import { parseFrontmatter, parseUpdate } from './parseMd';

const SAMPLE_RAW = `---
title: Test Post
date: 2026-03-14
summary: A short summary.
---

# Hello World

This is the body.
`;

describe('parseFrontmatter', () => {
  it('extracts title, date, and summary from frontmatter', () => {
    const { meta } = parseFrontmatter(SAMPLE_RAW);
    expect(meta['title']).toBe('Test Post');
    expect(meta['date']).toBe('2026-03-14');
    expect(meta['summary']).toBe('A short summary.');
  });

  it('body does not contain the frontmatter block', () => {
    const { body } = parseFrontmatter(SAMPLE_RAW);
    expect(body).not.toContain('---');
    expect(body).toContain('# Hello World');
  });

  it('returns raw string as body when no frontmatter block is present', () => {
    const raw = '# No frontmatter\n\nJust content.';
    const { meta, body } = parseFrontmatter(raw);
    expect(meta).toEqual({});
    expect(body).toBe(raw);
  });
});

describe('parseUpdate', () => {
  it('maps frontmatter fields to Update fields', () => {
    const update = parseUpdate('test-post', SAMPLE_RAW);
    expect(update.slug).toBe('test-post');
    expect(update.title).toBe('Test Post');
    expect(update.date).toBe('2026-03-14');
    expect(update.summary).toBe('A short summary.');
  });

  it('uses slug as title fallback when title is missing', () => {
    const update = parseUpdate('my-slug', '# No frontmatter');
    expect(update.title).toBe('my-slug');
  });

  it('content excludes the frontmatter block', () => {
    const update = parseUpdate('test-post', SAMPLE_RAW);
    expect(update.content).not.toContain('title:');
    expect(update.content).toContain('# Hello World');
  });
});
