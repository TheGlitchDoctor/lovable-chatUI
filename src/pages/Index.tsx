
import { useState, useEffect } from "react";
import ChatInterface from "@/components/chat/ChatInterface";
import Sidebar from "@/components/chat/Sidebar";
import Navbar from "@/components/chat/Navbar";

interface ChatSession {
  id: number;
  title: string;
  date: string;
  messages: Array<{ id: number; content: string; isBot: boolean }>;
}

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentSession, setCurrentSession] = useState<ChatSession>({
    id: Date.now(),
    title: "New Chat",
    date: new Date().toISOString().split("T")[0],
    messages: [
      { 
        id: 1, 
        content: "👋 Hello! I'm your AI assistant. How can I help you today?", 
        isBot: true 
      },
    ],
  });
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("chatHistory");
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    if (currentSession.messages.length > 1) {
      const title = currentSession.messages[1].content.slice(0, 30) + "...";
      setCurrentSession(prev => ({
        ...prev,
        title
      }));
    }
  }, [currentSession.messages]);

  const handleNewChat = () => {
    if (currentSession.messages.length > 1) {
      const updatedHistory = [currentSession, ...chatHistory];
      setChatHistory(updatedHistory);
      localStorage.setItem("chatHistory", JSON.stringify(updatedHistory));
    }

    setCurrentSession({
      id: Date.now(),
      title: "New Chat",
      date: new Date().toISOString().split("T")[0],
      messages: [
        { 
          id: 1, 
          content: "👋 Hello! I'm your AI assistant. How can I help you today?", 
          isBot: true 
        },
      ],
    });
    setIsSidebarOpen(false);
  };

  const handleSelectSession = (session: ChatSession) => {
    if (
      currentSession.messages.length > 1 &&
      !chatHistory.find((chat) => chat.id === currentSession.id)
    ) {
      const updatedHistory = [currentSession, ...chatHistory];
      setChatHistory(updatedHistory);
      localStorage.setItem("chatHistory", JSON.stringify(updatedHistory));
    }
    setCurrentSession(session);
    setIsSidebarOpen(false);
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNewChat={handleNewChat}
        onSelectSession={handleSelectSession}
        currentSession={currentSession}
        chatHistory={chatHistory}
      />
      <ChatInterface
        messages={currentSession.messages}
        onMessagesUpdate={(messages) =>
          setCurrentSession((prev) => ({ ...prev, messages }))
        }
      />
    </div>
  );
};

export default Index;
