
import { cn } from "@/lib/utils";
import { Bot, User, Copy, Check } from "lucide-react";
import { useState } from "react";

interface ChatMessageProps {
  message: {
    content: string;
    isBot: boolean;
  };
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderContent = (content: string) => {
    if (content.includes("```")) {
      const parts = content.split("```");
      return parts.map((part, index) => {
        if (index % 2 === 1) {
          // This is code block
          return (
            <div key={index} className="relative mt-2 mb-4">
              <div className="absolute right-2 top-2">
                <button
                  onClick={() => copyToClipboard(part.trim())}
                  className="p-1 rounded hover:bg-primary/10"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-primary/60" />
                  )}
                </button>
              </div>
              <pre className="bg-primary/5 p-4 rounded-lg overflow-x-auto">
                <code>{part.trim()}</code>
              </pre>
            </div>
          );
        }
        return <p key={index} className="mb-2">{part}</p>;
      });
    }
    return <p className="mb-2">{content}</p>;
  };

  return (
    <div
      className={cn(
        "flex mb-8 px-4 animate-in fade-in slide-in-from-bottom-4 duration-300",
        message.isBot ? "justify-start" : "justify-end"
      )}
    >
      {message.isBot && (
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 shadow-sm mr-4">
          <Bot className="w-4 h-4 text-primary" />
        </div>
      )}
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-6 py-4 shadow-sm backdrop-blur-[2px]",
          message.isBot 
            ? "bg-[hsl(var(--chat-bot))] text-foreground rounded-tl-none" 
            : "bg-primary text-primary-foreground rounded-tr-none"
        )}
      >
        <div className="text-sm leading-relaxed whitespace-pre-wrap">
          {renderContent(message.content)}
        </div>
      </div>
      {!message.isBot && (
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 shadow-sm ml-4">
          <User className="w-4 h-4 text-primary" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
