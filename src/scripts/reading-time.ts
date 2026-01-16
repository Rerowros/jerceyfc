export function getReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const noCodeContent = content.replace(/```[\s\S]*?```/g, ''); // Remove code blocks
  const words = noCodeContent.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return time.toString();
}
