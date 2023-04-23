import { useEffect, useRef } from 'react';

const useScrollEvent = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  });

  return scrollRef;
};

export default useScrollEvent;
