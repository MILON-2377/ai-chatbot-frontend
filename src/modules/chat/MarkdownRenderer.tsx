import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => <p className="mb-4 last:mb-0 leading-relaxed">{children}</p>,
        ul: ({ children }) => <ul className="list-disc ml-6 mb-4 space-y-2">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal ml-6 mb-4 space-y-2">{children}</ol>,
        li: ({ children }) => <li className="text-slate-300">{children}</li>,
        h1: ({ children }) => <h1 className="text-xl font-bold mb-4 text-white">{children}</h1>,
        h2: ({ children }) => <h2 className="text-lg font-semibold mb-3 text-white">{children}</h2>,
        code: ({ children }) => (
          <code className="bg-white/10 rounded px-1.5 py-0.5 text-blue-300 font-mono text-sm">
            {children}
          </code>
        ),
        pre: ({ children }) => (
          <pre className="bg-[#0d0d0d] border border-white/10 rounded-lg p-4 overflow-x-auto my-4">
            {children}
          </pre>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer