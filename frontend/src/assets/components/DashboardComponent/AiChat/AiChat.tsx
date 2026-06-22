import { useState, useRef, useEffect } from "react";
import "./AiChat.css";
//function to send message to backend and get response
export default function AiChat() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
//useEffect to scroll to bottom of messages when new message is added or 
// loading state changes
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);
//function to send message to backend and get response
    const sendMessage = async () => {
        if (!input.trim()) return;
        const userMsg = { role: "user", text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setLoading(true);
//send message to backend and get response
        try {
            const token = localStorage.getItem("token");
            const f = new FormData();
            f.append("message", input);
            const res = await fetch("http://127.0.0.1:8000/api/chat/send", {
                method: "POST",
                headers: { "Accept": "application/json", "Authorization": `Bearer ${token}` },
                body: f
            });
            const data = await res.json();
            setMessages(prev => [...prev, { role: "ai", text: data.reply || "..." }]);
        } catch {
            setMessages(prev => [...prev, { role: "ai", text: "حدث خطأ، حاولي مرة ثانية." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        {/* Trigger button to open AI chat */}
            <div className="ai-trigger-wrapper">
                <button className="ai-trigger-btn" onClick={() => setOpen(true)}>
                    🤖 AI Assistant
                </button>
            </div>
        {/* Overlay and popup for AI chat */}
            {open && (
                <div className="ai-overlay" onClick={() => setOpen(false)}>
                    <div className="ai-popup" onClick={e => e.stopPropagation()}>
                        <div className="ai-header">
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <div className="ai-dot" />
                                🤖 AI Assistant
                            </div>
                            <button className="ai-close-btn" onClick={() => setOpen(false)}>✕</button>
                        </div>
                        <div className="ai-messages">
                            {messages.map((m, i) => (
                                <div
                                    key={i}
                                    className={`ai-msg ${m.role}`}
                                    dangerouslySetInnerHTML={{
                                        __html: m.text
                                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                            .replace(/\n/g, '<br/>')
                                    }}
                                />
                            ))}
                            {loading && (
                                <div className="ai-loading">
                                    <span>•</span><span>•</span><span>•</span>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="ai-input-area">
                            <input
                                className="ai-input"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && sendMessage()}
                                placeholder="اكتبي سؤالك..."
                            />
                            <button className="ai-send-btn" onClick={sendMessage}>إرسال</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}