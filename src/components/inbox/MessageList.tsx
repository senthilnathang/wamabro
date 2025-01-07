import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { CheckCheck, Check } from "lucide-react";

interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: {
    name: string;
    avatar: string;
    isCustomer: boolean;
  };
  status: "sent" | "delivered" | "read";
}

interface MessageListProps {
  messages?: Message[];
}

const defaultMessages: Message[] = [
  {
    id: "1",
    content: "Hello! How can I help you today?",
    timestamp: "9:00 AM",
    sender: {
      name: "Support Agent",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=agent1",
      isCustomer: false,
    },
    status: "read",
  },
  {
    id: "2",
    content: "I have a question about my order",
    timestamp: "9:01 AM",
    sender: {
      name: "Customer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=customer1",
      isCustomer: true,
    },
    status: "delivered",
  },
  {
    id: "3",
    content: "Of course! Could you please provide your order number?",
    timestamp: "9:02 AM",
    sender: {
      name: "Support Agent",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=agent1",
      isCustomer: false,
    },
    status: "sent",
  },
];

const MessageStatus = ({ status }: { status: Message["status"] }) => {
  switch (status) {
    case "read":
      return <CheckCheck className="h-4 w-4 text-blue-500" />;
    case "delivered":
      return <CheckCheck className="h-4 w-4 text-gray-500" />;
    case "sent":
      return <Check className="h-4 w-4 text-gray-500" />;
    default:
      return null;
  }
};

const MessageBubble = ({ message }: { message: Message }) => {
  const isCustomer = message.sender.isCustomer;

  return (
    <div
      className={`flex items-start gap-2 mb-4 ${isCustomer ? "flex-row-reverse" : ""}`}
    >
      <Avatar className="h-8 w-8">
        <img src={message.sender.avatar} alt={message.sender.name} />
      </Avatar>
      <div
        className={`flex flex-col ${isCustomer ? "items-end" : "items-start"}`}
      >
        <div
          className={`max-w-[70%] rounded-lg p-3 ${isCustomer ? "bg-blue-500 text-white" : "bg-gray-100"}`}
        >
          {message.content}
        </div>
        <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
          {message.timestamp}
          {!isCustomer && <MessageStatus status={message.status} />}
        </div>
      </div>
    </div>
  );
};

const MessageList = ({ messages = defaultMessages }: MessageListProps) => {
  return (
    <div className="h-full bg-white">
      <ScrollArea className="h-full px-4 py-6">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </ScrollArea>
    </div>
  );
};

export default MessageList;
