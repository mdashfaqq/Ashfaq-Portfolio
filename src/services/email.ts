export interface ContactEmailPayload {
  name: string;
  email: string;
  message: string;
  subject?: string;
}

export async function sendContactEmail(payload: ContactEmailPayload): Promise<{ success: boolean; data?: any }> {
  const response = await fetch('/api/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.error || 'Failed to send message. Please try again.');
  }

  return resData;
}
