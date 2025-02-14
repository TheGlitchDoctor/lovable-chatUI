import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthButtons from "./AuthButtons";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/60 backdrop-blur-md">
      <div className="flex h-16 items-center px-6 w-full">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-primary/10"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shadow-sm">
            <span className="text-base">🤖</span>
          </div>
        </div>
        <div className="flex-1" />
        <AuthButtons />
      </div>
    </nav>
  );
};

export default Navbar;