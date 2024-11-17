"use client";

import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useRef } from "react";
import { Bot, User } from "lucide-react";
import MarkdownRenderer from "../markdown/Markdown";
import { cn } from "@/lib/utils";

const API_CHAT = "/api/chat";

const Chat = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, isLoading, handleSubmit, stop } =
    useChat({ api: API_CHAT });

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const onSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();
    handleSubmit(event);
  };

  return (
    <div
      className={cn(
        "flex flex-col w-3/4 max-w-5xl mr-auto flex-1 p-4",
        "border border-gray-300 rounded-lg shadow-lg",
        "bg-white overflow-hidden"
      )}
    >
      <div ref={containerRef} className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg, index) => (
          <Card
            key={index}
            className={cn(
              "p-4 rounded-lg flex flex-col w-full overflow-x-auto",
              msg.role === "user"
                ? "bg-blue-200 items-end"
                : "bg-gray-100 items-start"
            )}
          >
            <div
              className={cn(
                "flex",
                isLoading && index === messages.length - 1 && "animate-bounce",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {msg.role === "user" ? (
                <User className="text-blue-500" size={20} />
              ) : (
                <Bot className="text-green-500" size={20} />
              )}
            </div>

            <div className="mt-2">
              <MarkdownRenderer content={msg.content} />
            </div>
          </Card>
        ))}
        {isLoading && (
          <p className="text-center text-gray-500">AI is typing...</p>
        )}
      </div>
      <form className="flex gap-2" onSubmit={onSubmit}>
        <Input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message"
          required
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {isLoading ? (
          <Button
            onClick={stop}
            variant="destructive"
            className="p-2 text-white rounded-lg hover:bg-red-600"
          >
            Stop
          </Button>
        ) : (
          <Button
            type="submit"
            className="p-2 text-white rounded-lg hover:bg-blue-600"
          >
            Send
          </Button>
        )}
      </form>
    </div>
  );
};

export default Chat;
