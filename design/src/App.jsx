import { useState, useEffect } from "react";

const API = "http://localhost:5000";

export default function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch(`${API}/notes`)
      .then((r) => r.json())
      .then(setMessages);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    const note = await fetch(`${API}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    }).then((r) => r.json());
    setMessages([note, ...messages]);
    setInput("");
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/notes/${id}`, { method: "DELETE" });
    setMessages(messages.filter((msg) => msg._id !== id));
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-4 bg-blue-200 font-extrabold p-4">

      {/* INPUT BOX */}
      <div className="h-[24vh] w-[40vw] bg-white border-2 flex flex-col justify-center items-center gap-3 p-3 rounded-xl shadow">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter message..."
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send Note
        </button>
      </div>

      {/* MESSAGE LIST */}
      <div className="h-[40vh] w-[40vw] bg-white border-2 p-3 rounded-xl shadow overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-gray-400 text-center">No messages yet</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id}
              className="flex justify-between items-center border-b py-2"
            >
              <span className="text-black">{msg.text}</span>
              <button
                onClick={() => handleDelete(msg._id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
