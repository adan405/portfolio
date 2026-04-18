import { describe, expect, it } from 'vitest';
import { formatContactEmailBody } from './contactEmail.js';

describe('formatContactEmailBody', () => {
  it('includes name, email, and message in subject and body', () => {
    const out = formatContactEmailBody({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      message: 'Hello from the test.',
    });
    expect(out.subject).toContain('Ada Lovelace');
    expect(out.text).toContain('ada@example.com');
    expect(out.text).toContain('Hello from the test.');
    expect(out.html).toContain('Ada Lovelace');
    expect(out.html).toContain('Hello from the test.');
  });

  it('escapes HTML in user content', () => {
    const out = formatContactEmailBody({
      name: '<script>',
      email: 'a@b.co',
      message: '<b>bold</b>',
    });
    expect(out.html).not.toContain('<script>');
    expect(out.html).toContain('&lt;script&gt;');
  });
});
