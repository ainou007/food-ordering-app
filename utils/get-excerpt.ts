export function getExcerpt(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text; // If text is shorter than or equal to maxLength, return it as is
  }

  // Trim the text to the nearest word boundary, so we don't cut words in half
  const truncated = text.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");

  // If there is a space in the truncated portion, return up to that point
  if (lastSpaceIndex > 0) {
    return truncated.substring(0, lastSpaceIndex) + "...";
  }

  // If no space is found, just return the truncated text with ellipsis
  return truncated + "...";
}

// Example usage
const text =
  "TypeScript is a powerful language for building large scale applications.";
const excerpt = getExcerpt(text, 30);
