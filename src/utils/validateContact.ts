const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asTrimmedString(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.trim();
}

export type ContactBody = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

export type ValidationResult =
  | { ok: true; name: string; email: string; message: string }
  | { ok: false; fields: string[] };

export function validateContact(body: ContactBody): ValidationResult {
  const name = asTrimmedString(body?.name);
  const email = asTrimmedString(body?.email);
  const message = asTrimmedString(body?.message);

  const fields: string[] = [];
  if (name.length < 2 || name.length > 120) fields.push('name');
  if (!EMAIL_RE.test(email) || email.length > 254) fields.push('email');
  if (message.length < 10 || message.length > 5000) fields.push('message');

  if (fields.length > 0) return { ok: false, fields };

  return { ok: true, name, email, message };
}
