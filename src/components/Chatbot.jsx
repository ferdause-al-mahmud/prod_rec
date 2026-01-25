import { useState, useRef, useEffect, useContext } from "react";
import { Send, MessageCircle, X, Minimize2, Maximize2 } from "lucide-react";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";

const Chatbot = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Welcome! I'm your ProdRec AI Assistant. I can help you find recommendations, manage queries, or answer questions about the platform. What can I help you with today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    if (!user) {
      const errorMessage = {
        id: messages.length + 1,
        text: "⚠️ Please login first to use the chatbot.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      return;
    }

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/chatbot/chat",
        { message: inputValue },
        { withCredentials: true },
      );

      const botMessage = {
        id: messages.length + 2,
        text: response.data.reply,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        id: messages.length + 2,
        text: "❌ Sorry, I encountered an error. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: "👋 Welcome! I'm your ProdRec AI Assistant. I can help you find recommendations, manage queries, or answer questions about the platform. What can I help you with today?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  };

  // Floating button - only show if not open
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full p-4 shadow-2xl flex items-center gap-2 transition-all duration-300 hover:scale-110 animate-bounce"
        title="Open chat"
      >
        <MessageCircle size={24} />
        <span className="hidden sm:inline font-semibold">Chat with AI</span>
      </button>
    );
  }

  // Chat window - minimized state
  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 p-4 flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-indigo-600 flex items-center gap-2">
            <MessageCircle size={20} />
            ProdRec Assistant
          </h3>
          <p className="text-sm text-gray-500">Click to expand</p>
        </div>
        <button
          onClick={() => setIsMinimized(false)}
          className="hover:bg-gray-100 p-2 rounded transition-colors"
        >
          <Maximize2 size={20} className="text-indigo-600" />
        </button>
      </div>
    );
  }

  // Full chat window
  return (
    <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-2xl flex flex-col h-96 sm:h-[600px] z-50 border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 flex justify-between items-center flex-shrink-0">
        <div>
          <h3 className="font-semibold flex items-center gap-2 text-lg">
            <MessageCircle size={22} />
            ProdRec Assistant
          </h3>
          <p className="text-xs text-indigo-100 mt-1">
            Powered by Google Gemini AI
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsMinimized(true)}
            className="hover:bg-indigo-700 p-2 rounded transition-colors"
            title="Minimize"
          >
            <Minimize2 size={18} />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-indigo-700 p-2 rounded transition-colors"
            title="Close"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length === 1 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <MessageCircle size={48} className="text-indigo-200 mb-4" />
            <p className="text-gray-400 text-sm">Start a conversation...</p>
          </div>
        ) : null}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
          >
            <div
              className={`max-w-xs px-4 py-3 rounded-lg text-sm leading-relaxed ${
                message.sender === "user"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-none shadow-md"
                  : "bg-white text-gray-800 rounded-bl-none border border-gray-200 shadow-sm"
              }`}
            >
              <p className="break-words whitespace-pre-wrap">{message.text}</p>
              <span
                className={`text-xs mt-2 block ${message.sender === "user" ? "text-indigo-100" : "text-gray-400"}`}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 px-4 py-3 rounded-lg rounded-bl-none border border-gray-200 shadow-sm">
              <div className="flex gap-2 items-center">
                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-200 flex-shrink-0"></div>

      {/* Input Area */}
      <div className="p-4 bg-white flex-shrink-0 border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex gap-2 mb-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={user ? "Ask me anything..." : "Login to chat..."}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent text-sm transition-all"
            disabled={loading || !user}
          />
          <button
            type="submit"
            disabled={loading || !inputValue.trim() || !user}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:bg-gray-400 text-white p-2 rounded-lg transition-all duration-200 hover:shadow-lg flex-shrink-0"
            title="Send message"
          >
            <Send size={20} />
          </button>
        </form>

        {/* Clear Chat Button */}
        <button
          onClick={clearChat}
          className="w-full text-xs text-gray-500 hover:text-gray-700 transition-colors py-1"
        >
          Clear Chat
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
