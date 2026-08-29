/**
 * Centralized configuration for the Sales Call Summary Agent.
 *
 * Environment variables control all settings. Demo mode is automatically
 * enabled when Gong credentials are not provided.
 */

/**
 * Returns true if running in demo mode (using mock data instead of real APIs).
 * Demo mode is active when Gong credentials are missing.
 */
export function isDemoMode(): boolean {
  return !process.env.GONG_ACCESS_KEY || !process.env.GONG_SECRET_KEY;
}

/**
 * Application configuration loaded from environment variables.
 */
export const config = {
  companyName: process.env.COMPANY_NAME || 'Your Company',
  model: process.env.AI_MODEL || 'anthropic/claude-haiku-4-5',

  gong: {
    baseUrl: process.env.GONG_BASE_URL || 'https://api.gong.io',
    accessKey: process.env.GONG_ACCESS_KEY || '',
    secretKey: process.env.GONG_SECRET_KEY || '',
  },

  sandbox: {
    timeout: '10m' as const,
  },
};
