import { Plus, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface ChatSession {
  id: number;
  title: string;
  date: string;
  messages: Array<{ id: number; content: string; isBot: boolean }>;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNewChat: () => void;
  onSelectSession: (session: ChatSession) => void;
  currentSession: ChatSession | null;
  chatHistory: ChatSession[];
}

const Sidebar = ({
  isOpen,
  onClose,
  onNewChat,
  onSelectSession,
  chatHistory,
}: SidebarProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
        <SheetHeader className="p-6 border-b">
          <SheetTitle>Chat History</SheetTitle>
        </SheetHeader>

        <div className="px-4 py-2">
          <Button
            className="w-full justify-start gap-2 mb-4"
            onClick={onNewChat}
            variant="outline"
          >
            <Plus className="h-4 w-4" />
            New Chat
          </Button>

          <div className="space-y-2">
            {chatHistory.map((chat) => (
              <Button
                key={chat.id}
                variant="ghost"
                className="w-full justify-start text-left hover:bg-accent"
                onClick={() => onSelectSession(chat)}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 shrink-0" />
                  <div className="truncate">
                    <p className="font-medium truncate">{chat.title}</p>
                    <p className="text-xs text-muted-foreground">{chat.date}</p>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;