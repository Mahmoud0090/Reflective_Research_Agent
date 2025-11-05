import React, { useState } from 'react';
import { FileText, Copy, Check, Download } from 'lucide-react';

export default function ReportDisplay({ report }) {
  const [copied, setCopied] = useState(false);

  if (!report) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([report], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `research-report-${Date.now()}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Enhanced markdown renderer
  const renderMarkdown = (text) => {
    const lines = text.split('\n');
    const elements = [];
    let listItems = [];
    let inList = false;

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="list-disc list-inside space-y-2 ml-4 mb-4">
            {listItems.map((item, idx) => (
              <li key={idx} className="text-gray-700 leading-relaxed">
                {renderInlineMarkdown(item)}
              </li>
            ))}
          </ul>
        );
        listItems = [];
      }
      inList = false;
    };

    const renderInlineMarkdown = (text) => {
      // Bold
      text = text.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>');
      // Italic
      text = text.replace(/\*(.+?)\*/g, '<em class="italic text-gray-700">$1</em>');
      // Code
      text = text.replace(/`(.+?)`/g, '<code class="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-indigo-600">$1</code>');
      
      return <span dangerouslySetInnerHTML={{ __html: text }} />;
    };

    lines.forEach((line, idx) => {
      // Headers
      if (line.startsWith('#### ')) {
        flushList();
        elements.push(
          <h4 key={idx} className="text-lg font-semibold text-gray-800 mt-6 mb-3 border-l-4 border-indigo-400 pl-3">
            {line.slice(5)}
          </h4>
        );
      } else if (line.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={idx} className="text-xl font-bold text-gray-800 mt-8 mb-4 border-l-4 border-indigo-500 pl-4">
            {line.slice(4)}
          </h3>
        );
      } else if (line.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={idx} className="text-2xl font-bold text-gray-900 mt-10 mb-5 pb-2 border-b-2 border-indigo-200">
            {line.slice(3)}
          </h2>
        );
      } else if (line.startsWith('# ')) {
        flushList();
        elements.push(
          <h1 key={idx} className="text-3xl font-bold text-gray-900 mt-8 mb-6">
            {line.slice(2)}
          </h1>
        );
      }
      // Unordered list
      else if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        inList = true;
        listItems.push(line.trim().slice(2));
      }
      // Numbered list
      else if (line.trim().match(/^\d+\.\s/)) {
        flushList();
        const match = line.trim().match(/^\d+\.\s(.+)/);
        if (match) {
          listItems.push(match[1]);
          inList = true;
        }
      }
      // Blockquote
      else if (line.trim().startsWith('>')) {
        flushList();
        elements.push(
          <blockquote key={idx} className="border-l-4 border-gray-300 pl-4 py-2 italic text-gray-600 my-4 bg-gray-50">
            {line.slice(1).trim()}
          </blockquote>
        );
      }
      // Horizontal rule
      else if (line.trim() === '---' || line.trim() === '***') {
        flushList();
        elements.push(<hr key={idx} className="my-8 border-gray-300" />);
      }
      // Code block
      else if (line.trim().startsWith('```')) {
        flushList();
        // Skip code blocks for now (you can enhance this)
      }
      // Regular paragraph
      else if (line.trim()) {
        if (inList) {
          flushList();
        }
        elements.push(
          <p key={idx} className="text-gray-700 leading-relaxed mb-4">
            {renderInlineMarkdown(line)}
          </p>
        );
      }
      // Empty line
      else {
        flushList();
      }
    });

    flushList(); // Flush any remaining list items
    return elements;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header with actions */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileText size={28} />
            Research Report
          </h2>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg transition-all"
            >
              {copied ? (
                <>
                  <Check size={16} />
                  <span className="text-sm font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span className="text-sm font-medium">Copy</span>
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg transition-all"
            >
              <Download size={16} />
              <span className="text-sm font-medium">Download</span>
            </button>
          </div>
        </div>
      </div>

      {/* Report content */}
      <div className="px-8 py-6 max-h-[600px] overflow-y-auto">
        <article className="prose prose-lg max-w-none">
          {renderMarkdown(report)}
        </article>
      </div>
    </div>
  );
}
