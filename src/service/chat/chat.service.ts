import { Payload } from "./chat.service.types";

export async function streamChat(
  payload: Payload,
  onChunk: (chunk: string) => void,
  signal?: AbortSignal
) {

  let reader: ReadableStreamDefaultReader<Uint8Array> | null = null;

  try {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal,
      credentials: "include"
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(error.message || `HTTP ${res.status}`)
    };

    reader = res.body?.getReader() ?? null;
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error("Response body is not readable")
    }

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      const chunk = decoder.decode(value, { stream: true });

      onChunk(chunk);

    }

  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") return;
    throw error;

  } finally {
    reader?.releaseLock();
  }



}