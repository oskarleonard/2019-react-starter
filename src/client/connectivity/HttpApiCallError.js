export default class HttpApiCallError extends Error {
  constructor(message, statusCode, data) {
    super(message);

    this.message = message;
    this.statusCode = statusCode;
    this.data = data;

    this.stack = new Error(message).stack;
    this.name = 'HttpApiCallError';
  }
}
