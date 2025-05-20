interface LoggerOptions {
  timestamp?: boolean;
  level?: string;
}

class Logger {
  private options: LoggerOptions;

  constructor(options: LoggerOptions = {}) {
    this.options = {
      timestamp: true,
      level: 'info',
      ...options
    };
  }

  private getTimestamp(): string {
    return new Date().toISOString();
  }

  private formatMessage(level: string, message: string, error?: any): string {
    const timestamp = this.options.timestamp ? `[${this.getTimestamp()}] ` : '';
    const formattedMessage = `${timestamp}[${level.toUpperCase()}] ${message}`;

    if (error) {
      return `${formattedMessage}\n${error instanceof Error ? error.stack : JSON.stringify(error)}`;
    }

    return formattedMessage;
  }

  info(message: string): void {
    console.log(this.formatMessage('info', message));
  }

  error(message: string, error?: any): void {
    console.error(this.formatMessage('error', message, error));
  }

  warn(message: string): void {
    console.warn(this.formatMessage('warn', message));
  }

  debug(message: string): void {
    if (process.env.NODE_ENV === 'development') {
      console.debug(this.formatMessage('debug', message));
    }
  }
}

export const logger = new Logger(); 