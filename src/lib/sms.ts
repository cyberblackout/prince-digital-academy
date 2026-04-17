/**
 * AfricasTalking SMS Integration
 * Server-side only
 */

const AT_USERNAME = process.env.AT_USERNAME || 'sandbox';
const AT_API_KEY = process.env.AT_API_KEY || '';
const AT_SENDER_ID = process.env.AT_SENDER_ID || 'PrinceAcad';

interface SMSResponse {
  success: boolean;
  message: string;
  data?: Record<string, unknown>;
}

/**
 * Send SMS using AfricasTalking API
 */
export async function sendSMS(to: string | string[], message: string): Promise<SMSResponse> {
  const recipients = Array.isArray(to) ? to.join(',') : to;

  try {
    const response = await fetch('https://api.africastalking.com/version1/messaging', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        apiKey: AT_API_KEY,
      },
      body: new URLSearchParams({
        username: AT_USERNAME,
        to: recipients,
        message,
        from: AT_SENDER_ID,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: 'SMS sent successfully',
        data: result,
      };
    }

    return {
      success: false,
      message: result.SMSMessageData?.Message || 'Failed to send SMS',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'SMS sending failed',
    };
  }
}

/**
 * Send bulk SMS
 */
export async function sendBulkSMS(
  recipients: { phone: string; message: string }[]
): Promise<SMSResponse[]> {
  return Promise.all(
    recipients.map((r) => sendSMS(r.phone, r.message))
  );
}
