import DOMPurify from 'dompurify';

// Configure DOMPurify for safe markdown rendering
const purifyConfig = {
  ALLOWED_TAGS: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'br', 'strong', 'em', 'u', 'del',
    'ul', 'ol', 'li',
    'blockquote',
    'code', 'pre',
    'a',
    'img',
    'table', 'thead', 'tbody', 'tr', 'th', 'td'
  ],
  ALLOWED_ATTR: [
    'href', 'src', 'alt', 'title', 'target', 'rel',
    'class', 'id'
  ],
  ALLOW_DATA_ATTR: false,
  FORBID_TAGS: ['script', 'object', 'embed', 'iframe', 'form', 'input'],
  FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onmouseout'],
};

// Sanitize HTML content
export const sanitizeHTML = (content: string): string => {
  if (!content) return '';
  return DOMPurify.sanitize(content, purifyConfig);
};

// Sanitize text input (for titles, etc.)
export const sanitizeText = (text: string, maxLength: number = 1000): string => {
  if (!text) return '';
  
  // Remove HTML tags entirely for text-only fields
  const textOnly = text.replace(/<[^>]*>/g, '');
  
  // Trim and limit length
  const trimmed = textOnly.trim();
  return trimmed.length > maxLength ? trimmed.substring(0, maxLength) : trimmed;
};

// Validate input length
export const validateLength = (text: string, maxLength: number): boolean => {
  return Boolean(text) && text.length <= maxLength;
};

// Rate limiting utility
export class RateLimiter {
  private lastCall: number = 0;
  private minInterval: number;

  constructor(minIntervalMs: number = 1000) {
    this.minInterval = minIntervalMs;
  }

  canCall(): boolean {
    const now = Date.now();
    if (now - this.lastCall >= this.minInterval) {
      this.lastCall = now;
      return true;
    }
    return false;
  }

  getRemainingTime(): number {
    const now = Date.now();
    const timeSinceLastCall = now - this.lastCall;
    return Math.max(0, this.minInterval - timeSinceLastCall);
  }
}

// Error message sanitization - disabled for local development
export const sanitizeError = (error: Error): string => {
  // Always return full error messages for local development
  return error.message;
};

// Environment variable validation
export const validateEnvVars = (): { valid: boolean; missing: string[] } => {
  const requiredVars = ['VITE_OLLAMA_URL', 'VITE_QDRANT_URL'];
  const missing = requiredVars.filter(varName => !import.meta.env[varName]);
  
  return {
    valid: missing.length === 0,
    missing
  };
};

// URL validation for service endpoints
export const validateServiceUrl = (url: string): string => {
  try {
    const parsed = new URL(url);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      throw new Error('Invalid URL protocol');
    }
    return url;
  } catch {
    throw new Error(`Invalid service URL: ${url}`);
  }
};