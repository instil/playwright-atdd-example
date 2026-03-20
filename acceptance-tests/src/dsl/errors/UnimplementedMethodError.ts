// Only works if called from the method that is not implemented!
export function unimplementedMethodError<ReturnType>(): Promise<ReturnType> {
  return Promise.reject(
    new Error(
      `Method '${captureMethodThatIsNotImplemented()}' is not implemented`,
    ),
  );
}

function captureMethodThatIsNotImplemented(): string {
  const stackTraceAsString = new Error().stack;
  if (!stackTraceAsString) return "Unknown";

  const thirdLineOfStackTrace = stackTraceAsString.split("\n")[2];
  if (!thirdLineOfStackTrace) return "Unknown";

  const regexMatch = thirdLineOfStackTrace.match("at ([a-zA-Z.]+)");
  if (!regexMatch) return "Unknown";

  const capturedMethodName = regexMatch[1];
  if (!capturedMethodName) return "Unknown";

  return capturedMethodName;
}
