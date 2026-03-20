export function waitFor<ReturnType = void>(
  condition: () => Promise<ReturnType>,
  timeout = 5000,
  interval = 100,
): Promise<ReturnType> {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const checkCondition = async (): Promise<void> => {
      try {
        const result = await condition();
        resolve(result);
      } catch (error) {
        if (Date.now() - startTime > timeout) {
          reject(error);
          return;
        }

        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        setTimeout(checkCondition, interval);
      }
    };

    checkCondition();
  });
}

export function waitForTimeout(timeout: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}
