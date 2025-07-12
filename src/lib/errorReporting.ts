import { ErrorInfo } from "react";

export interface ErrorReport {
  message: string;
  stack?: string | null;
  componentStack?: string;
  timestamp: string;
  url: string;
  userAgent: string;
  userId?: string;
  sessionId?: string;
  errorId: string;
}

export interface ErrorLogger {
  logError: (error: Error, errorInfo?: ErrorInfo) => void;
  logWarning: (message: string, context?: Record<string, any>) => void;
  logInfo: (message: string, context?: Record<string, any>) => void;
}

// Generate a unique error ID
function generateErrorId(): string {
  return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Create an error report object
export function createErrorReport(
  error: Error,
  errorInfo?: ErrorInfo,
  context?: Record<string, any>
): ErrorReport {
  return {
    message: error.message,
    stack: error.stack ? error.stack : undefined,
    componentStack: errorInfo?.componentStack,
    timestamp: new Date().toISOString(),
    url: typeof window !== "undefined" ? window.location.href : "unknown",
    userAgent:
      typeof window !== "undefined" ? window.navigator.userAgent : "unknown",
    errorId: generateErrorId(),
    ...context,
  };
}

// Console logger for development
class ConsoleLogger implements ErrorLogger {
  logError(error: Error, errorInfo?: ErrorInfo): void {
    const report = createErrorReport(error, errorInfo);
    console.error("🚨 Application Error:", report);

    // In development, also show a more readable version
    if (process.env.NODE_ENV === "development") {
      console.group("🔍 Error Details");
      console.error("Message:", error.message);
      if (error.stack) console.error("Stack:", error.stack);
      if (errorInfo?.componentStack)
        console.error("Component Stack:", errorInfo.componentStack);
      console.error("Error ID:", report.errorId);
      console.error("URL:", report.url);
      console.groupEnd();
    }
  }

  logWarning(message: string, context?: Record<string, any>): void {
    console.warn("⚠️ Warning:", message, context);
  }

  logInfo(message: string, context?: Record<string, any>): void {
    console.info("ℹ️ Info:", message, context);
  }
}

// Remote logger for production (placeholder - integrate with your service)
class RemoteLogger implements ErrorLogger {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async logError(error: Error, errorInfo?: ErrorInfo): void {
    const report = createErrorReport(error, errorInfo);

    try {
      // In a real app, you'd send this to a service like Sentry, LogRocket, etc.
      await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          level: "error",
          ...report,
        }),
      });
    } catch (loggingError) {
      console.error("Failed to log error to remote service:", loggingError);
      // Fallback to console
      console.error("Original error:", report);
    }
  }

  async logWarning(message: string, context?: Record<string, any>): void {
    try {
      await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          level: "warning",
          message,
          context,
          timestamp: new Date().toISOString(),
          url: typeof window !== "undefined" ? window.location.href : "unknown",
        }),
      });
    } catch (loggingError) {
      console.warn("Failed to log warning:", loggingError);
      console.warn("Original warning:", message, context);
    }
  }

  async logInfo(message: string, context?: Record<string, any>): void {
    try {
      await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          level: "info",
          message,
          context,
          timestamp: new Date().toISOString(),
          url: typeof window !== "undefined" ? window.location.href : "unknown",
        }),
      });
    } catch (loggingError) {
      console.info("Failed to log info:", loggingError);
      console.info("Original info:", message, context);
    }
  }
}

// Create logger instance based on environment
export function createLogger(): ErrorLogger {
  if (
    process.env.NODE_ENV === "production" &&
    process.env.NEXT_PUBLIC_ERROR_REPORTING_ENDPOINT
  ) {
    return new RemoteLogger(process.env.NEXT_PUBLIC_ERROR_REPORTING_ENDPOINT);
  }
  return new ConsoleLogger();
}

// Global error handler for unhandled promise rejections and errors
export function setupGlobalErrorHandling(): void {
  if (typeof window === "undefined") return;

  const logger = createLogger();

  // Handle unhandled promise rejections
  window.addEventListener("unhandledrejection", (event) => {
    logger.logError(
      new Error(`Unhandled Promise Rejection: ${event.reason}`),
      undefined
    );
  });

  // Handle uncaught errors
  window.addEventListener("error", (event) => {
    logger.logError(
      new Error(
        `Uncaught Error: ${event.message} at ${event.filename}:${event.lineno}:${event.colno}`
      ),
      undefined
    );
  });

  // Handle resource loading errors
  window.addEventListener(
    "error",
    (event) => {
      if (event.target && event.target !== window) {
        logger.logWarning("Resource loading error", {
          type: "resource_error",
          source: (event.target as any).src || (event.target as any).href,
          tagName: (event.target as any).tagName,
        });
      }
    },
    true
  );
}

// Export the default logger instance
export const logger = createLogger();

// Helper function to wrap async functions with error handling
export function withErrorHandling<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  context?: string
): T {
  return (async (...args: any[]) => {
    try {
      return await fn(...args);
    } catch (error) {
      logger.logError(
        error instanceof Error ? error : new Error(String(error)),
        undefined
      );
      throw error; // Re-throw to maintain original behavior
    }
  }) as T;
}

// Helper function to safely execute code with error boundaries
export function safeExecute<T>(fn: () => T, fallback: T, context?: string): T {
  try {
    return fn();
  } catch (error) {
    logger.logError(
      error instanceof Error ? error : new Error(String(error)),
      undefined
    );
    return fallback;
  }
}
