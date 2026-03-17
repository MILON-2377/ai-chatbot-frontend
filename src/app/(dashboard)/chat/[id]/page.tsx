import ChatInput from "@/src/modules/chat/ChatInput";
import MessageList from "@/src/modules/chat/MessageLists";

export default async function ChatPage({ params }: { params: { id: string } }) {
  // Fetch data on server
  // const messages = await fetchMessages(params.id); 

  const messages = []

  return (
    <div className="flex flex-col h-full bg-[#050505]">
      {/* Scrollable Message Area */}
      <div className="flex-1 overflow-y-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <MessageList messages={messages} />
        </div>
      </div>

      {/* Persistent Floating Input */}
      <div className="p-4 bg-gradient-to-t from-[#050505] via-[#050505] to-transparent">
        <div className="max-w-3xl mx-auto">
          <ChatInput chatId={params.id} />
        </div>
      </div>
    </div>
  );
}