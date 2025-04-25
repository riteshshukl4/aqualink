/**
 * Asynchronously sends an SMS message to the given phone number.
 *
 * @param phoneNumber The phone number to send the SMS to.
 * @param message The message to send.
 * @returns A promise that resolves to void.
 */
export async function sendSms(phoneNumber: string, message: string): Promise<void> {
  // TODO: Implement this by calling an API.

  console.log(`Sending SMS to ${phoneNumber}: ${message}`);
}
