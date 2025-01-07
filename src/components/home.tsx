import React, { useState } from "react";
import ConversationList from "./inbox/ConversationList";
import ChatInterface from "./inbox/ChatInterface";
import BroadcastCreator from "./broadcast/BroadcastCreator";
import { Button } from "@/components/ui/button";
import { MessageSquare, Radio } from "lucide-react";

interface HomeProps {
  initialView?: "inbox" | "broadcast";
}

const Home = ({ initialView = "inbox" }: HomeProps) => {
  const [selectedConversation, setSelectedConversation] = useState<string>("");
  const [showBroadcast, setShowBroadcast] = useState(false);
  const [view, setView] = useState(initialView);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="h-16 bg-white border-b px-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">WhatsApp Business</h1>
        <div className="flex gap-2">
          <Button
            variant={view === "inbox" ? "default" : "outline"}
            onClick={() => setView("inbox")}
            className="gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Inbox
          </Button>
          <Button
            variant={view === "broadcast" ? "default" : "outline"}
            onClick={() => {
              setView("broadcast");
              setShowBroadcast(true);
            }}
            className="gap-2"
          >
            <Radio className="h-4 w-4" />
            Broadcast
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        {view === "inbox" && (
          <>
            <ConversationList
              selectedId={selectedConversation}
              onSelectConversation={setSelectedConversation}
            />
            {selectedConversation ? (
              <ChatInterface />
            ) : (
              <div className="flex-1 flex items-center justify-center bg-white">
                <div className="text-center text-gray-500">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold mb-2">
                    Select a conversation
                  </h2>
                  <p>Choose a conversation from the list to start chatting</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <BroadcastCreator
        open={showBroadcast}
        onClose={() => {
          setShowBroadcast(false);
          setView("inbox");
        }}
        onSubmit={(data) => {
          console.log("Broadcast data:", data);
          setShowBroadcast(false);
          setView("inbox");
        }}
      />
    </div>
  );
};

export default Home;
