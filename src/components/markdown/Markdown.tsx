import React from "react";
import { markdown } from "@/lib/utils";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const renderedHTML = markdown.render(content);

  return (
    <div
      className="prose prose-lg prose-headings:font-bold prose-code:rounded-lg prose-code:bg-gray-200 prose-code:p-1 prose-pre:bg-gray-800 prose-pre:overflow-auto prose-pre:rounded-lg"
      dangerouslySetInnerHTML={{ __html: renderedHTML }}
    />
  );
};

export default MarkdownRenderer;
