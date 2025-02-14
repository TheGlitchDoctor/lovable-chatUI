
import ChatMessage from "./ChatMessage";

interface Message {
  id: number;
  content: string;
  isBot: boolean;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div className="chat-container py-4">
      {messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} />
      ))}
    </div>
  );
};

export default MessageList;
