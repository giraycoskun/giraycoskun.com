import type { ComponentType } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";

/**
 * Calculates reading time for a React component by rendering it and counting words.
 * @param Component - The React component to analyze
 * @param wordsPerMinute - Average reading speed (default: 200)
 * @returns Formatted reading time string (e.g., "5 min read")
 */
export function calculateReadingTime(
  Component: ComponentType<any>,
  wordsPerMinute: number = 200
): string {
  try {
    // Render component to static HTML using createElement instead of JSX
    const html = renderToStaticMarkup(createElement(Component));
    
    // Strip HTML tags and get text content
    const text = html.replace(/<[^>]*>/g, " ");
    
    // Count words (split by whitespace and filter empty strings)
    const wordCount = text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    
    // Calculate reading time in minutes (round up)
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    
    return minutes === 1 ? "1 min read" : `${minutes} min read`;
  } catch (error) {
    console.warn("Failed to calculate reading time:", error);
    return "— min read";
  }
}