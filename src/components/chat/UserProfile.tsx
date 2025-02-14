import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

const UserProfile = () => {
  return (
    <Avatar className="h-9 w-9 border-2 border-primary/10">
      <AvatarImage src="" alt="User" />
      <AvatarFallback className="bg-primary/10 text-primary">
        <User className="h-4 w-4" />
      </AvatarFallback>
    </Avatar>
  );
};

export default UserProfile;