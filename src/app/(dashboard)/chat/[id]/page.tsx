import ChatInput from "@/src/modules/chat/ChatInput";
import MessageList from "@/src/modules/chat/MessageLists";
import ErrorState from "@/src/modules/ui/ErrorState";
import { chatHistoryAction } from "@/src/service/chat-history/history.actions";
import { ChatHistory } from "@/src/service/chat-history/history.types";

export default async function ChatPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { isNew?: string };
}) {
  const { id } = await params;
  const isNew = (await searchParams).isNew === "true";

  // console.log({id})

  const res = await chatHistoryAction(id);

  if (!res.success || res.error) {
    return (
      <ErrorState
        title="Conversation not found"
        message={
          res.error || "This chat might have been deleted or does not exist"
        }
      />
    );
  }

  const messages: ChatHistory[] = res.data ?? [];

  return (
    <div className="flex flex-col h-full bg-[#050505]">
      {/* Scrollable Message Area */}
      <div className="flex-1 overflow-y-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <MessageList
            initialMessages={messages}
            chatId={id}
            triggerStream={isNew}
          />
        </div>
      </div>

      {/* Persistent Floating Input */}
      <div className="p-4 bg-linear-to-t from-[#050505] via-[#050505] to-transparent">
        <div className="max-w-3xl mx-auto">
          <ChatInput chatId={id} />
        </div>
      </div>
    </div>
  );
}
