import { describe, expect, it } from 'vitest';
import { validateContact } from './validateContact.js';

describe('validateContact', () => {
  it('accepts valid payload', () => {
    const r = validateContact({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      message: 'Hello, this is at least ten characters.',
    });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.name).toBe('Ada Lovelace');
      expect(r.email).toBe('ada@example.com');
    }
  });

  it('rejects short name', () => {
    const r = validateContact({
      name: 'A',
      email: 'a@b.co',
      message: '1234567890',
    });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.fields).toContain('name');
  });

  it('rejects invalid email', () => {
    const r = validateContact({
      name: 'Valid Name',
      email: 'not-an-email',
      message: '1234567890',
    });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.fields).toContain('email');
  });

  it('rejects short message', () => {
    const r = validateContact({
      name: 'Valid Name',
      email: 'a@b.co',
      message: 'short',
    });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.fields).toContain('message');
  });

  it('trims strings', () => {
    const r = validateContact({
      name: '  Test User  ',
      email: '  test@example.com  ',
      message: '  Enough characters here for validation.  ',
    });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.name).toBe('Test User');
      expect(r.email).toBe('test@example.com');
    }
  });
});
