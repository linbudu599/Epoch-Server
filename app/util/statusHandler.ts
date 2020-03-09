export class UserStatusHandler {
  code: number;
  token: string;
  message: string;
  constructor(code: number, token: string, message: string) {
    this.code = code;
    this.token = token;
    this.message = message;
  }
}

export class UserSuccessStatus extends UserStatusHandler {
  code: number;
  token: string;
  message: string;
  constructor(token: string, message: string) {
    super(10000, token, message);
    this.code = 10000;
    this.token = token;
    this.message = message;
  }
}

export class ArticleStatusHandler {
  aid: number;
  status: number;
  updatedAt: string;
  constructor(aid: number, status: number, updatedAt: string) {
    this.aid = aid;
    this.status = status;
    this.updatedAt = updatedAt;
  }
}
