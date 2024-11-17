// utils/markdown.ts
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";

// Initialize MarkdownIt with highlight.js integration
export const markdown: MarkdownIt = new MarkdownIt({
  highlight: (code, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs rounded-lg bg-gray-800 text-white p-4 overflow-auto"><code>${
          hljs.highlight(code, {
            language: lang,
          }).value
        }</code></pre>`;
      } catch (_) {}
    }

    return `<pre class="hljs rounded-lg bg-gray-800 text-white p-4 overflow-auto"><code>${markdown.utils.escapeHtml(
      code
    )}</code></pre>`;
  },
});
