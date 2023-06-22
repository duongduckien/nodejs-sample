export class StringError extends Error {
  constructor(message?: string) {
    super();
    this.name = 'StringError';
    this.message = message;
  }
}
