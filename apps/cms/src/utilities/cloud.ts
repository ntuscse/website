/**
 * Determine if we are using cloud storage (AWS S3) by detecting environment vars.
 *
 * @returns true if using cloud storage, false otherwise.
 */
export function isUsingCloudStore(): boolean {
  return (
    process.env?.S3_ACCESS_KEY_ID != null &&
    process.env.S3_ACCESS_KEY_ID.length !== 0
  );
}
