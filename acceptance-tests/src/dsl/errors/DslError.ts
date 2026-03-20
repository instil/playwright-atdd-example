export class DslError extends Error {
  constructor(message: string, maybePreviousError: unknown) {
    super(message);

    if (maybePreviousError instanceof Error) {
      this.stack += `\n\n${maybePreviousError.stack}`;
    }

    console.error(maybePreviousError);
  }

  static toString(objectToPrint: object): string {
    return JSON.stringify(objectToPrint, null, 0);
  }
}
