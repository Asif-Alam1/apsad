/** Renders CMS HTML from src/data/legacy (sanitized by scripts/import-legacy.mjs). */
export function LegacyProse({ html, className = "", lang }: { html: string; className?: string; lang?: string }) {
  return <div lang={lang} className={`legacy-prose ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}
