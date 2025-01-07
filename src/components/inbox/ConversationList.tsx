import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Filter, Plus } from "lucide-react";

interface Conversation {
  id: string;
  customerName: string;
  customerAvatar: string;
  lastMessage: string;
  timestamp: string;
  status: "new" | "assigned" | "resolved";
  unreadCount: number;
  assignedTo?: string;
}

interface ConversationListProps {
  conversations?: Conversation[];
  onSelectConversation?: (id: string) => void;
  selectedId?: string;
}

const defaultConversations: Conversation[] = [
  {
    id: "1",
    customerName: "John Doe",
    customerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    lastMessage: "Hello, I need help with my order",
    timestamp: "5m",
    status: "new",
    unreadCount: 3,
  },
  {
    id: "2",
    customerName: "Jane Smith",
    customerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    lastMessage: "Thanks for your help!",
    timestamp: "1h",
    status: "resolved",
    unreadCount: 0,
    assignedTo: "Tom Wilson",
  },
  {
    id: "3",
    customerName: "Mike Johnson",
    customerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    lastMessage: "When will my package arrive?",
    timestamp: "2h",
    status: "assigned",
    unreadCount: 1,
    assignedTo: "Sarah Lee",
  },
];

const ConversationList = ({
  conversations = defaultConversations,
  onSelectConversation = () => {},
  selectedId = "",
}: ConversationListProps) => {
  const statusColors = {
    new: "bg-blue-500",
    assigned: "bg-yellow-500",
    resolved: "bg-green-500",
  };

  return (
    <div className="w-[380px] h-full border-r bg-white flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Conversations</h2>
          <Button variant="outline" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search conversations..." className="pl-8" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-3 rounded-lg mb-2 cursor-pointer hover:bg-gray-100 ${selectedId === conversation.id ? "bg-gray-100" : ""}`}
              onClick={() => onSelectConversation(conversation.id)}
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={conversation.customerAvatar} />
                  <AvatarFallback>
                    {conversation.customerName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium truncate">
                      {conversation.customerName}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {conversation.timestamp}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 truncate">
                    {conversation.lastMessage}
                  </p>

                  <div className="flex items-center justify-between mt-1">
                    <Badge
                      variant="secondary"
                      className={`${statusColors[conversation.status]} text-white`}
                    >
                      {conversation.status.charAt(0).toUpperCase() +
                        conversation.status.slice(1)}
                    </Badge>

                    {conversation.unreadCount > 0 && (
                      <Badge
                        variant="secondary"
                        className="bg-blue-500 text-white"
                      >
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </div>

                  {conversation.assignedTo && (
                    <p className="text-xs text-gray-500 mt-1">
                      Assigned to {conversation.assignedTo}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ConversationList;
