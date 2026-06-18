function toE164(phone) {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('61')) return `+${digits}`;
  if (digits.startsWith('0')) return `+61${digits.slice(1)}`;
  return `+61${digits}`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { firstName, lastName, email, phoneNumber, enquiry } = req.body;

  try {
    const momence = await fetch(
      'https://api.momence.com/integrations/customer-leads/46474/collect',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          token: 'WZ8Y3x5jDd',
          firstName,
          lastName,
          email,
          phoneNumber: toE164(phoneNumber),
          discoveryAnswer: enquiry,
        }),
      }
    );

    res.status(momence.ok ? 200 : 502).end();
  } catch {
    res.status(500).end();
  }
}
