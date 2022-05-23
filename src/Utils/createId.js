export default function createId() {
  const seconds = new Date().getSeconds();
  const milli = new Date().getMilliseconds();

  return seconds + milli
}
