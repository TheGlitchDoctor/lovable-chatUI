import { useState } from "react";
import { Send, Mic, StopCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import UserProfile from "./UserProfile";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onSendVoiceMessage: (blobUrl: string) => void;
  isRecording: boolean;
  onToggleRecording: () => void;
}

const ChatInput = ({ onSendMessage, onSendVoiceMessage, isRecording, onToggleRecording }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    onSendMessage(message);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t">
      <div className="max-w-[100rem] mx-auto p-4 flex items-end gap-4">
        <UserProfile />
        <div className="flex-1 flex gap-2">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="min-h-[50px] max-h-[200px] resize-none rounded-xl border-primary/10 focus-visible:ring-primary/20"
            rows={1}
          />
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="ghost"
              className={`rounded-xl hover:bg-primary/10 ${
                isRecording ? "text-red-500" : ""
              }`}
              onClick={onToggleRecording}
            >
              {isRecording ? (
                <StopCircle className="h-5 w-5" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </Button>
            <Button
              size="icon"
              onClick={handleSend}
              className="rounded-xl bg-primary/10 text-primary hover:bg-primary/20"
              disabled={!message.trim()}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;