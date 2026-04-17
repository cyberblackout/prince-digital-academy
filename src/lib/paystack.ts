/**
 * Paystack API Integration
 * Server-side only — uses secret key
 */

const PAYSTACK_BASE_URL = 'https://api.paystack.co';
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || '';

interface PaystackResponse {
  status: boolean;
  message: string;
  data?: Record<string, unknown>;
}

async function paystackRequest(
  method: 'GET' | 'POST',
  endpoint: string,
  data?: Record<string, unknown>
): Promise<PaystackResponse> {
  const url = `${PAYSTACK_BASE_URL}${endpoint}`;
  const options: RequestInit = {
    method,
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },
  };

  if (method === 'POST' && data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    if (!response.ok) {
      return {
        status: false,
        message: result.message || `Request failed with status ${response.status}`,
      };
    }

    return result;
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : 'Network error',
    };
  }
}

/**
 * Initialize a payment transaction
 * Amount should be in main currency unit (e.g., GHS), automatically converts to pesewas
 */
export async function initializeTransaction(data: {
  email: string;
  amount: number;
  reference: string;
  callback_url?: string;
  metadata?: Record<string, unknown>;
}): Promise<PaystackResponse> {
  return paystackRequest('POST', '/transaction/initialize', {
    ...data,
    amount: Math.round(data.amount * 100), // Convert to pesewas
    currency: 'GHS',
  });
}

/**
 * Verify a transaction
 */
export async function verifyTransaction(reference: string): Promise<PaystackResponse> {
  return paystackRequest('GET', `/transaction/verify/${encodeURIComponent(reference)}`);
}

/**
 * List available banks
 */
export async function listBanks(country: string = 'ghana'): Promise<PaystackResponse> {
  return paystackRequest('GET', `/bank?country=${country}`);
}

/**
 * Create a subaccount
 */
export async function createSubaccount(data: Record<string, unknown>): Promise<PaystackResponse> {
  return paystackRequest('POST', '/subaccount', data);
}

/**
 * Generate unique payment reference
 */
export function generatePaymentReference(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(16).substring(2, 12);
  return `PDA_${timestamp}_${random}`;
}
