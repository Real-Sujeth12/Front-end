export function logEvent(eventName, payload) {
  try {
    if (typeof window !== 'undefined' && window.preTestLoggerClient) {
      window.preTestLoggerClient(eventName, payload)
    } else {
      console.log(`[LOG] ${eventName}`, payload) // helpful in local dev
    }
  } catch (err) {
    console.error("Logging failed", err)
  }
}
