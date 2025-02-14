
import { useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { Loader2, Bot } from "lucide-react";

interface Message {
  id: number;
  content: string;
  isBot: boolean;
}

interface ChatInterfaceProps {
  messages: Message[];
  onMessagesUpdate: (messages: Message[]) => void;
}

const ChatInterface = ({ messages, onMessagesUpdate }: ChatInterfaceProps) => {
  const [isThinking, setIsThinking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTimeout, setRecordingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const { toast } = useToast();

  const {
    startRecording,
    stopRecording,
    mediaBlobUrl,
    clearBlobUrl,
  } = useReactMediaRecorder({
    audio: true,
    onStop: (blobUrl) => {
      setIsRecording(false);
      toast({
        title: "Recording completed",
        description: "Would you like to send this recording?",
        action: (
          <Button
            onClick={() => handleSendVoiceMessage(blobUrl)}
            className="bg-primary text-primary-foreground"
          >
            Send
          </Button>
        ),
      });
    },
  });

  const simulateBotResponse = (messages: Message[]) => {
    setIsThinking(true);
    setTimeout(() => {
      const updatedMessages = [
        ...messages,
        {
          id: Date.now(),
          content: "Thank you for your message! I'm here to help.",
          isBot: true,
        },
      ];
      onMessagesUpdate(updatedMessages);
      setIsThinking(false);
    }, 1500);
  };

  const handleSendVoiceMessage = (blobUrl: string) => {
    const newMessages = [
      ...messages,
      { id: Date.now(), content: "🎤 Voice message sent", isBot: false },
    ];
    onMessagesUpdate(newMessages);
    clearBlobUrl();
    simulateBotResponse(newMessages);
  };

  const handleSendMessage = (message: string) => {
    const newMessage = { id: Date.now(), content: message, isBot: false };
    const updatedMessages = [...messages, newMessage];
    onMessagesUpdate(updatedMessages);
    simulateBotResponse(updatedMessages);
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
      if (recordingTimeout) {
        clearTimeout(recordingTimeout);
        setRecordingTimeout(null);
      }
    } else {
      startRecording();
      setIsRecording(true);
      const timeout = setTimeout(() => {
        stopRecording();
        setRecordingTimeout(null);
      }, 30000);
      setRecordingTimeout(timeout);
    }
  };

  return (
    <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full relative">
      <MessageList messages={messages} />
      {isThinking && (
        <div className="flex items-center gap-2 px-8 py-4 absolute bottom-24 left-0">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 shadow-sm">
            <Bot className="w-4 h-4 text-primary" />
          </div>
          <div className="bg-[hsl(var(--chat-bot))] rounded-2xl px-6 py-4 shadow-sm backdrop-blur-[2px] animate-pulse">
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span className="text-sm text-primary/60">Thinking...</span>
            </div>
          </div>
        </div>
      )}
      <ChatInput
        onSendMessage={handleSendMessage}
        onSendVoiceMessage={handleSendVoiceMessage}
        isRecording={isRecording}
        onToggleRecording={toggleRecording}
      />
    </div>
  );
};

export default ChatInterface;
