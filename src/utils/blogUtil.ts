/**
 * Calculates reading time for content by counting words.
 * @param content - The text content to analyze
 * @param wordsPerMinute - Average reading speed (default: 200)
 * @returns Formatted reading time string (e.g., "5 min read")
 */
export function calculateReadingTime(
  content: string,
  wordsPerMinute: number = 200
): string {
  try {
    // Strip HTML tags and get text content
    const text = content.replace(/<[^>]*>/g, " ");
    
    // Count words (split by whitespace and filter empty strings)
    const wordCount = text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    
    // Calculate reading time in minutes (round up)
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    
    return `${minutes} min read`;
  } catch (error) {
    console.error("Error calculating reading time:", error);
    return "— min read";
  }
}
