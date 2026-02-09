// Helper to manage the unzipped images
// Since we can't list directories in browser, we'll hardcode some key ones we know exist
// based on the logs, and provide a randomizer.

const BASE_URL = "/images/mr culturel";

const IMAGES = [
  "WhatsApp Image 2026-02-08 at 16.14.46.jpeg",
  "WhatsApp Image 2026-02-08 at 16.14.47 (1).jpeg",
  "WhatsApp Image 2026-02-08 at 16.14.47 (2).jpeg",
  "WhatsApp Image 2026-02-08 at 16.14.47.jpeg",
  "WhatsApp Image 2026-02-08 at 16.14.48 (1).jpeg",
  "WhatsApp Image 2026-02-08 at 16.14.48.jpeg",
  "WhatsApp Image 2026-02-08 at 16.14.49.jpeg",
  "WhatsApp Image 2026-02-08 at 16.14.50.jpeg",
  "WhatsApp Image 2026-02-08 at 16.14.51 (1).jpeg",
  "WhatsApp Image 2026-02-08 at 16.14.51.jpeg",
  "WhatsApp Image 2026-02-08 at 16.14.52 (1).jpeg",
  "WhatsApp Image 2026-02-08 at 16.14.52.jpeg",
];

export function getImageUrl(filename?: string | null) {
  if (!filename) return getRandomImage(); // Fallback
  if (filename.startsWith("http")) return filename;
  
  // If the filename matches one of our known local files (ignoring URL encoding differences)
  const cleanFilename = decodeURIComponent(filename).replace(`${BASE_URL}/`, "");
  if (IMAGES.includes(cleanFilename)) {
    return `${BASE_URL}/${cleanFilename}`;
  }
  
  // Return as is if it seems to be a full path or just fallback
  return filename;
}

export function getRandomImage() {
  const randomFile = IMAGES[Math.floor(Math.random() * IMAGES.length)];
  return `${BASE_URL}/${randomFile}`;
}

export function getAllImages() {
  return IMAGES.map(img => `${BASE_URL}/${img}`);
}
