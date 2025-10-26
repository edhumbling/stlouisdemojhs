/**
 * Error Handling Utilities
 * Common error handling patterns to prevent 5xx server errors
 */

export interface ErrorDetails {
  message: string;
  code?: string | number;
  stack?: string;
  timestamp: string;
  url: string;
  userAgent: string;
}

export class ErrorHandler {
  private static instance: ErrorHandler;
  private errorLog: ErrorDetails[] = [];
  private maxLogSize = 100;

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  /**
   * Handle fetch errors that might cause 5xx server errors
   */
  static async safeFetch(url: string, options?: RequestInit): Promise<Response> {
    try {
      const response = await fetch(url, {
        ...options,
        // Add timeout to prevent hanging requests
        signal: AbortSignal.timeout(30000) // 30 second timeout
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return response;
    } catch (error) {
      const errorDetails: ErrorDetails = {
        message: error instanceof Error ? error.message : 'Unknown fetch error',
        code: error instanceof Error && 'status' in error ? (error as any).status : undefined,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent
      };

      ErrorHandler.getInstance().logError(errorDetails);
      throw error;
    }
  }

  /**
   * Handle JSON parsing errors
   */
  static safeJsonParse<T>(jsonString: string, fallback: T): T {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      const errorDetails: ErrorDetails = {
        message: `JSON parse error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent
      };

      ErrorHandler.getInstance().logError(errorDetails);
      return fallback;
    }
  }

  /**
   * Handle component prop validation
   */
  static validateProps<T>(props: T, requiredProps: (keyof T)[]): void {
    const missingProps = requiredProps.filter(prop => props[prop] === undefined || props[prop] === null);
    
    if (missingProps.length > 0) {
      const errorDetails: ErrorDetails = {
        message: `Missing required props: ${missingProps.join(', ')}`,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent
      };

      ErrorHandler.getInstance().logError(errorDetails);
      throw new Error(`Missing required props: ${missingProps.join(', ')}`);
    }
  }

  /**
   * Handle async operations with retry logic
   */
  static async withRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        
        if (attempt === maxRetries) {
          const errorDetails: ErrorDetails = {
            message: `Operation failed after ${maxRetries} attempts: ${lastError.message}`,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent
          };

          ErrorHandler.getInstance().logError(errorDetails);
          throw lastError;
        }

        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }

    throw lastError!;
  }

  /**
   * Log error details
   */
  private logError(errorDetails: ErrorDetails): void {
    this.errorLog.push(errorDetails);
    
    // Keep only the most recent errors
    if (this.errorLog.length > this.maxLogSize) {
      this.errorLog = this.errorLog.slice(-this.maxLogSize);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error logged:', errorDetails);
    }

    // In production, you might want to send to an error tracking service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(new Error(errorDetails.message), { extra: errorDetails });
    }
  }

  /**
   * Get error log for debugging
   */
  getErrorLog(): ErrorDetails[] {
    return [...this.errorLog];
  }

  /**
   * Clear error log
   */
  clearErrorLog(): void {
    this.errorLog = [];
  }
}

/**
 * React hook for error handling
 */
export function useErrorHandler() {
  const handleError = (error: Error, context?: string) => {
    const errorDetails: ErrorDetails = {
      message: error.message,
      code: context,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent
    };

    ErrorHandler.getInstance().logError(errorDetails);
  };

  return { handleError };
}

/**
 * Higher-order component for error handling
 */
export function withErrorHandling<P extends object>(
  Component: React.ComponentType<P>,
  componentName?: string
) {
  return function ErrorHandledComponent(props: P) {
    const { handleError } = useErrorHandler();

    return (
      <ErrorBoundary
        onError={(error, errorInfo) => {
          handleError(error, componentName);
        }}
      >
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}

export default ErrorHandler;
