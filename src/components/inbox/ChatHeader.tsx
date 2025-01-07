import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, Phone, Video, UserPlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatHeaderProps {
  customerName?: string;
  customerAvatar?: string;
  status?: "new" | "assigned" | "resolved";
  assignedAgent?: string;
  lastSeen?: string;
}

const ChatHeader = ({
  customerName = "John Doe",
  customerAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  status = "new",
  assignedAgent = "Unassigned",
  lastSeen = "5 minutes ago",
}: ChatHeaderProps) => {
  const statusColors = {
    new: "bg-blue-500",
    assigned: "bg-yellow-500",
    resolved: "bg-green-500",
  };

  return (
    <div className="h-[72px] w-full border-b border-gray-200 bg-white px-6 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={customerAvatar} alt={customerName} />
          <AvatarFallback>
            {customerName.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold">{customerName}</h2>
            <Badge
              variant="secondary"
              className={`${statusColors[status]} text-white`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>
          <p className="text-sm text-gray-500">
            Last seen {lastSeen} • Assigned to {assignedAgent}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon">
          <Phone className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Video className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <UserPlus className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Profile</DropdownMenuItem>
            <DropdownMenuItem>Mark as Resolved</DropdownMenuItem>
            <DropdownMenuItem>Transfer Chat</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              Block Contact
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ChatHeader;
