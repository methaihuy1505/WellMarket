// src/components/chat/MessageList.jsx
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import axios from "../../utils/axios";
import MessageItem from "./MessageItem";
import { messagesMock } from "./Mock/messages.mock";

const LIMIT = 20;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default function MessageList({ conversationId }) {
  const [messages, setMessages] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const initialScrollDoneRef = useRef(false);

  const containerRef = useRef(null);

  useEffect(() => {
    if (!conversationId) return;
    initialScrollDoneRef.current = false;
    loadLatest();
  }, [conversationId]);

  const loadLatest = async () => {
    try {
      const res = await axios.get("/messages", {
        params: { conversationId, limit: LIMIT }
      });

      const list = Array.isArray(res.data)
        ? res.data
        : res.data.data;

      setMessages([...list].reverse());
      setHasMore(list.length === LIMIT);

      
    } catch (err) {
      console.warn("Load latest messages fail → use mock");

      const list = messagesMock
        .filter(m => m.conversationId === conversationId)
        .slice(-LIMIT);

      setMessages(list);
      setHasMore(list.length === LIMIT);
    }
  };

  const loadMore = async () => {
    if (!hasMore || messages.length === 0 || loadingMore) return;

    setLoadingMore(true);

    const container = containerRef.current;
    const prevScrollHeight = container.scrollHeight;

    const oldest = messages[0];

    try {
      // ⏳ delay 1s
      await sleep(1000);

      const res = await axios.get("/messages", {
        params: {
          conversationId,
          limit: LIMIT,
          before: oldest.createdAt
        }
      });

      const list = Array.isArray(res.data)
        ? res.data
        : res.data.data;

      if (list.length < LIMIT) setHasMore(false);

      setMessages(prev => [...list.reverse(), ...prev]);

      // giữ nguyên vị trí scroll
      setTimeout(() => {
        const newScrollHeight = container.scrollHeight;
        container.scrollTop = newScrollHeight - prevScrollHeight;
      }, 0);
    } catch (err) {
      console.warn("Load more messages fail → use mock");

      await sleep(1000);

      const index = messagesMock.findIndex(
        m => m.id === oldest.id
      );

      if (index <= 0) {
        setHasMore(false);
        setLoadingMore(false);
        return;
      }

      const more = messagesMock.slice(
        Math.max(0, index - LIMIT),
        index
      );

      setMessages(prev => [...more, ...prev]);

      // giữ nguyên scroll cho mock
      setTimeout(() => {
        const newScrollHeight = container.scrollHeight;
        container.scrollTop = newScrollHeight - prevScrollHeight;
      }, 0);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleScroll = e => {
    if (e.target.scrollTop === 0) {
      loadMore();
    }
  };

  useLayoutEffect(() => {
  if (
    messages.length > 0 &&
    containerRef.current &&
    !initialScrollDoneRef.current
  ) {
    containerRef.current.scrollTop =
      containerRef.current.scrollHeight;

    initialScrollDoneRef.current = true;
  }
}, [messages]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50"
    >
      {/* Spinner load tin cũ */}
      {loadingMore && (
        <div className="text-center text-xs text-gray-400 mb-2">
          <span className="animate-pulse">Đang tải tin nhắn cũ...</span>
        </div>
      )}

      {messages.length === 0 && !loadingMore && (
        <div className="text-center text-sm text-gray-400 mt-10">
          Chưa có tin nhắn
        </div>
      )}

      {messages.map(m => (
        <MessageItem key={m.id} message={m} />
      ))}
    </div>
  );
}
