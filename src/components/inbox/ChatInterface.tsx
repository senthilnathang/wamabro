import React from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageComposer from "./MessageComposer";

interface ChatInterfaceProps {
  customerName?: string;
  customerAvatar?: string;
  status?: "new" | "assigned" | "resolved";
  assignedAgent?: string;
  lastSeen?: string;
  messages?: Array<{
    id: string;
    content: string;
    timestamp: string;
    sender: {
      name: string;
      avatar: string;
      isCustomer: boolean;
    };
    status: "sent" | "delivered" | "read";
  }>;
  onSendMessage?: (message: string) => void;
  onAttachMedia?: (file: File) => void;
}

const ChatInterface = ({
  customerName,
  customerAvatar,
  status,
  assignedAgent,
  lastSeen,
  messages,
  onSendMessage,
  onAttachMedia,
}: ChatInterfaceProps) => {
  return (
    <div className="flex flex-col h-full w-full bg-white">
      <ChatHeader
        customerName={customerName}
        customerAvatar={customerAvatar}
        status={status}
        assignedAgent={assignedAgent}
        lastSeen={lastSeen}
      />
      <div className="flex-1 overflow-hidden">
        <MessageList messages={messages} />
      </div>
      <MessageComposer
        onSendMessage={onSendMessage}
        onAttachMedia={onAttachMedia}
      />
    </div>
  );
};

export default ChatInterface;
