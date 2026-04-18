type Web3Response = { success?: boolean; message?: string };

export type ContactPayload = { name: string; email: string; message: string };

/**
 * Sends the contact form via Web3Forms (no backend). Create a free key at https://web3forms.com
 * using your Gmail, then set VITE_WEB3FORMS_ACCESS_KEY in Vercel → Environment Variables.
 */
export async function submitContactWeb3(parsed: ContactPayload): Promise<void> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim();
  if (!accessKey) {
    throw new Error('MISSING_WEB3FORMS_KEY');
  }

  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `Portfolio contact from ${parsed.name}`,
      name: parsed.name,
      email: parsed.email,
      message: parsed.message,
    }),
  });

  const data = (await res.json()) as Web3Response;
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Submission failed');
  }
}
