import { useEffect, useState, useRef } from "react";
import { Send, CheckCheck } from "lucide-react";
import { getMessages, sendMessage, markMessagesRead } from "@/services/client.service";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getMessages();
        setMessages(res.messages || []);
        await markMessagesRead();
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim() || sending) return;
    setSending(true);
    try {
      const res = await sendMessage(text);
      setMessages((prev) => [...prev, res.message]);
      setText("");
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-10rem)] flex-col">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-white">Messages</h1>
        <p className="mt-1 text-slate-400">Chat with the Snaplifye team</p>
      </div>

      <div className="flex flex-1 flex-col rounded-2xl border border-slate-800 bg-slate-900/60">
        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 rounded-full bg-slate-800 p-4">
                <Send size={24} className="text-slate-500" />
              </div>
              <p className="text-slate-400">No messages yet</p>
              <p className="text-sm text-slate-500">Send a message to start the conversation</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg._id}
                className={`flex ${msg.sender === "client" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.sender === "client"
                      ? "rounded-br-md bg-cyan-500 text-white"
                      : "rounded-bl-md bg-slate-800 text-slate-200"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <div className={`mt-1 flex items-center gap-1 ${msg.sender === "client" ? "justify-end" : ""}`}>
                    <span className="text-[10px] text-white/60">
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    {msg.sender === "client" && (
                      <CheckCheck size={12} className={msg.read ? "text-blue-300" : "text-white/40"} />
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={handleSend} className="flex items-center gap-3 border-t border-slate-800 p-4">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-500"
          />
          <button
            type="submit"
            disabled={!text.trim() || sending}
            className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-cyan-600 disabled:opacity-50"
          >
            <Send size={16} />
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Messages;
