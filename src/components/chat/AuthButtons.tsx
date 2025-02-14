import { LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const AuthButtons = () => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" className="gap-2 rounded-lg hover:bg-primary/10">
        <LogIn className="h-4 w-4" />
        Login
      </Button>
      <Button size="sm" className="gap-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20">
        <UserPlus className="h-4 w-4" />
        Sign Up
      </Button>
    </div>
  );
};

export default AuthButtons;