import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  SmileIcon,
  ImageIcon,
  PaperclipIcon,
  SendIcon,
  ListIcon,
  ZapIcon,
} from "lucide-react";

interface MessageComposerProps {
  onSendMessage?: (message: string) => void;
  onAttachMedia?: (file: File) => void;
  disabled?: boolean;
  quickReplies?: Array<{ id: string; text: string }>;
  templates?: Array<{ id: string; name: string; content: string }>;
}

const MessageComposer = ({
  onSendMessage = () => {},
  onAttachMedia = () => {},
  disabled = false,
  quickReplies = [
    { id: "1", text: "Thank you for your message" },
    { id: "2", text: "We'll get back to you shortly" },
    { id: "3", text: "How can I help you today?" },
  ],
  templates = [
    { id: "1", name: "Welcome", content: "Welcome to our service!" },
    {
      id: "2",
      name: "Follow-up",
      content: "Following up on your recent inquiry...",
    },
  ],
}: MessageComposerProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full h-[100px] bg-white border-t p-4">
      <div className="flex gap-2">
        <div className="flex-1">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="min-h-[60px] resize-none"
            disabled={disabled}
          />
        </div>
        <div className="flex flex-col justify-between gap-2">
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="icon">
                        <ZapIcon className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="font-medium">Quick Replies</h4>
                        {quickReplies.map((reply) => (
                          <Button
                            key={reply.id}
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => setMessage(reply.text)}
                          >
                            {reply.text}
                          </Button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Quick Replies</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="icon">
                        <ListIcon className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="font-medium">Message Templates</h4>
                        {templates.map((template) => (
                          <Button
                            key={template.id}
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => setMessage(template.content)}
                          >
                            {template.name}
                          </Button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Templates</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const input = document.createElement("input");
                      input.type = "file";
                      input.accept = "image/*";
                      input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file) onAttachMedia(file);
                      };
                      input.click();
                    }}
                  >
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Attach Image</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const input = document.createElement("input");
                      input.type = "file";
                      input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file) onAttachMedia(file);
                      };
                      input.click();
                    }}
                  >
                    <PaperclipIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Attach File</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <SmileIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Emoji</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <Button
            className="self-end"
            size="icon"
            disabled={!message.trim() || disabled}
            onClick={handleSend}
          >
            <SendIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageComposer;
