class StatusHandler {
  code: number;
  token: string;
  message: string;
  constructor(code: number, token: string, message: string) {
    this.code = code;
    this.token = token;
    this.message = message;
  }
}

export default StatusHandler;
