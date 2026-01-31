import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAuthContext } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  MessageCircle,
  Send,
  Loader2,
  Sparkles,
  AlertTriangle,
  Plus,
  Trash2,
  History,
  Bot,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

interface Conversation {
  id: string;
  title: string;
  mode: string;
  created_at: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

export default function Chat() {
  const { user } = useAuthContext();
  const isMobile = useIsMobile();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      fetchConversations();
    }
  }, [user]);

  useEffect(() => {
    if (currentConversation) {
      fetchMessages(currentConversation.id);
    }
  }, [currentConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const fetchConversations = async () => {
    const { data, error } = await supabase
      .from("chat_conversations")
      .select("*")
      .eq("user_id", user!.id)
      .order("updated_at", { ascending: false });

    if (!error && data) {
      setConversations(data as Conversation[]);
      if (data.length > 0 && !currentConversation) {
        setCurrentConversation(data[0] as Conversation);
      }
    }
  };

  const fetchMessages = async (conversationId: string) => {
    const { data, error } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (!error && data) {
      setMessages(data as Message[]);
    }
  };

  const createNewConversation = async () => {
    const { data, error } = await supabase
      .from("chat_conversations")
      .insert({
        user_id: user!.id,
        title: "New Conversation",
        mode: "general",
      })
      .select()
      .single();

    if (!error && data) {
      setConversations((prev) => [data as Conversation, ...prev]);
      setCurrentConversation(data as Conversation);
      setMessages([]);
      setShowHistory(false);
    }
  };

  const deleteConversation = async (id: string) => {
    const { error } = await supabase.from("chat_conversations").delete().eq("id", id);

    if (!error) {
      setConversations((prev) => prev.filter((c) => c.id !== id));
      if (currentConversation?.id === id) {
        const remaining = conversations.filter((c) => c.id !== id);
        setCurrentConversation(remaining.length > 0 ? remaining[0] : null);
        setMessages([]);
      }
    }
  };

  const selectConversation = (conv: Conversation) => {
    setCurrentConversation(conv);
    setShowHistory(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    let conversationId = currentConversation?.id;

    if (!conversationId) {
      const { data, error } = await supabase
        .from("chat_conversations")
        .insert({
          user_id: user!.id,
          title: input.slice(0, 50),
          mode: "general",
        })
        .select()
        .single();

      if (error) {
        toast.error("Failed to create conversation");
        return;
      }

      conversationId = data.id;
      setCurrentConversation(data as Conversation);
      setConversations((prev) => [data as Conversation, ...prev]);
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    await supabase.from("chat_messages").insert({
      conversation_id: conversationId,
      user_id: user!.id,
      role: "user",
      content: input,
    });

    let assistantContent = "";
    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "",
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, assistantMessage]);

    try {
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          toast.error("Rate limit exceeded. Please try again later.");
        } else if (response.status === 402) {
          toast.error("AI credits exhausted. Please add more credits.");
        } else {
          toast.error("Failed to get AI response");
        }
        setMessages((prev) => prev.filter((m) => m.id !== assistantMessage.id));
        setIsLoading(false);
        return;
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMessage.id ? { ...m, content: assistantContent } : m
                )
              );
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      await supabase.from("chat_messages").insert({
        conversation_id: conversationId,
        user_id: user!.id,
        role: "assistant",
        content: assistantContent,
      });

      if (messages.length === 0) {
        await supabase
          .from("chat_conversations")
          .update({ title: input.slice(0, 50) })
          .eq("id", conversationId);
        fetchConversations();
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast.error("Failed to send message");
      setMessages((prev) => prev.filter((m) => m.id !== assistantMessage.id));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const ConversationList = () => (
    <div className="space-y-1">
      <Button
        size="sm"
        variant="outline"
        onClick={createNewConversation}
        className="w-full mb-3"
      >
        <Plus className="w-4 h-4 mr-2" />
        New Chat
      </Button>
      {conversations.map((conv) => (
        <div
          key={conv.id}
          className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer group ${
            currentConversation?.id === conv.id
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          }`}
          onClick={() => selectConversation(conv)}
        >
          <MessageCircle className="w-4 h-4 shrink-0" />
          <span className="flex-1 truncate text-sm">{conv.title}</span>
          <Button
            size="icon"
            variant="ghost"
            className="w-6 h-6 opacity-0 group-hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              deleteConversation(conv.id);
            }}
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      ))}
      {conversations.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">
          No conversations yet
        </p>
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-8rem)] md:flex-row gap-4">
      {/* Desktop Conversations Sidebar */}
      {!isMobile && (
        <Card className="w-64 shrink-0 flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Conversations</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-2">
            <ScrollArea className="h-full">
              <ConversationList />
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col min-h-0">
        <CardHeader className="pb-3 border-b shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-base">DVDL Bot</CardTitle>
                <p className="text-xs text-muted-foreground">Your AI Health Assistant</p>
              </div>
            </div>
            {isMobile && (
              <Sheet open={showHistory} onOpenChange={setShowHistory}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <History className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-72">
                  <SheetHeader>
                    <SheetTitle>Chat History</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4">
                    <ConversationList />
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-3 md:p-4 overflow-hidden min-h-0">
          {/* Disclaimer */}
          <div className="flex items-start gap-2 p-2 md:p-3 mb-3 md:mb-4 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 rounded-lg text-xs md:text-sm shrink-0">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <p>
              DVDL Bot provides general health information only. Always consult a
              healthcare provider for medical concerns.
            </p>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 min-h-0" ref={scrollRef}>
            <div className="space-y-3 md:space-y-4 pr-2 md:pr-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] md:max-w-[80%] p-2.5 md:p-3 rounded-2xl text-sm md:text-base ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-muted rounded-bl-md"
                      }`}
                    >
                      {message.role === "assistant" ? (
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                      ) : (
                        <p>{message.content}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {messages.length === 0 && (
                <div className="text-center py-8 md:py-12 text-muted-foreground">
                  <Bot className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 opacity-50" />
                  <p className="text-base md:text-lg font-medium">
                    Start a conversation with DVDL Bot
                  </p>
                  <p className="text-xs md:text-sm mt-2">
                    Ask about symptoms, health tips, or wellness questions
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="mt-3 md:mt-4 flex gap-2 shrink-0">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask DVDL Bot about your health..."
              className="resize-none min-h-[44px] md:min-h-[50px] text-sm md:text-base"
              disabled={isLoading}
              rows={1}
            />
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              size="icon"
              className="shrink-0 h-[44px] w-[44px] md:h-[50px] md:w-[50px]"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
