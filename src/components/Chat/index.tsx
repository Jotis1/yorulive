import { AnimatePresence, motion } from 'framer-motion';
import {
    IconArrowBarRight,
    IconSettings,
    IconClipboardCopy,
    IconTerminal,
    IconGift,
    IconDiamond,
    IconSend,
    IconCrown,
    IconHammer,
    IconX,
    IconPlus,
} from '@tabler/icons-react';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import cn from '@/lib/cn';
interface Props {
    chatIsHidden: boolean;
    setChatIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
    fullScreenMode: boolean;
}

import Header from './Header';
import Footer from './Footer';

type color =
    | 'text-red-500'
    | 'text-yellow-500'
    | 'text-green-500'
    | 'text-blue-500'
    | 'text-indigo-500'
    | 'text-purple-500'
    | 'text-pink-500';

interface Message {
    user: string;
    message: string;
    color: color;
    isMod: boolean;
    isSub: boolean;
}

export default function Chat({
    chatIsHidden,
    setChatIsHidden,
    fullScreenMode,
}: Props) {
    const [messages, setMessages] = useState<Message[] | []>([]);
    const [emotes, setEmotes] = useState<{ name: string; id: string }[] | []>(
        []
    );
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        const storagedMessages = localStorage.getItem('messages');
        if (storagedMessages) {
            setMessages(JSON.parse(storagedMessages));
        }
        const fetchEmotes = async () => {
            const res = await fetch('/api/emote-set');
            const emoteList: { name: string; id: string }[] = await res.json();
            setEmotes(emoteList);
        };
        fetchEmotes();
    }, []);

    const renderEmotes = (message: Message, index: number) => {
        let { message: content } = message;
        const emotesInMessage = content
            .split(' ')
            .filter((word) => emotes.find((emote) => emote.name === word));

        return (
            <motion.article
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                key={index}
                className='rounded-xl p-2.5 text-sm odd:bg-zinc-800'
            >
                <p className='inline-flex flex-wrap items-baseline gap-2  text-pretty text-white'>
                    <span
                        className={`flex items-end gap-2 font-bold ${message.color}`}
                    >
                        {message.isSub && (
                            <span className='flex size-6 items-center justify-center rounded bg-indigo-500 text-white'>
                                <IconCrown className='size-4 fill-current' />
                            </span>
                        )}
                        {message.isMod && (
                            <span className='flex size-6 items-center justify-center rounded bg-green-500 text-white'>
                                <IconHammer className='size-4 fill-current' />
                            </span>
                        )}
                        {message.user}
                    </span>
                    {emotesInMessage.length > 0
                        ? emotesInMessage.reduce<
                              Array<string | React.ReactElement>
                          >((acc, emoteName, emoteIndex) => {
                              const emote = emotes.find(
                                  (emote) => emote.name === emoteName
                              );
                              const emoteIndexInContent =
                                  content.indexOf(emoteName);

                              acc.push(
                                  content.substring(0, emoteIndexInContent)
                              );
                              acc.push(
                                  <section className='group relative'>
                                      <Image
                                          key={emoteIndex}
                                          width={30}
                                          height={30}
                                          src={`https://cdn.7tv.app/emote/${emote?.id}/1x.avif`}
                                          alt={emoteName}
                                      />
                                      <span className='relativ absolute right-full top-full hidden flex-col items-center gap-2.5 overflow-hidden rounded-md bg-zinc-950/40 p-2.5 text-xs font-medium backdrop-blur-md transition-all group-hover:flex'>
                                          <figure className='relative size-10'>
                                              <Image
                                                  key={emoteIndex}
                                                  fill
                                                  className='size-10'
                                                  src={`https://cdn.7tv.app/emote/${emote?.id}/2x.avif`}
                                                  alt={emoteName}
                                              />
                                          </figure>
                                          {emoteName}
                                      </span>
                                  </section>
                              );
                              content = content.substring(
                                  emoteIndexInContent + emoteName.length
                              );
                              return acc;
                          }, [])
                        : content}
                </p>
            </motion.article>
        );
    };

    return (
        <AnimatePresence>
            {!(fullScreenMode || chatIsHidden) && (
                <motion.aside
                    initial={{ opacity: 0, width: '0%' }}
                    animate={{ opacity: 1, width: '100%' }}
                    exit={{ opacity: 0, width: '0%' }}
                    className='sticky top-0 flex h-full flex-col overflow-auto bg-zinc-900 opacity-100 md:max-w-72 xl:max-w-96'
                >
                    <Header
                        setChatIsHidden={setChatIsHidden}
                        chatIsHidden={chatIsHidden}
                    />
                    <section className='scrollbar-hide flex flex-grow flex-col gap-2.5 overflow-auto p-2.5'>
                        <AnimatePresence>
                            {messages.map((message, index) =>
                                renderEmotes(message, index)
                            )}
                        </AnimatePresence>
                        <div ref={messagesEndRef} />
                    </section>
                    <Footer
                        fullScreenMode={fullScreenMode}
                        setMessages={setMessages}
                        messages={messages}
                    />
                </motion.aside>
            )}
        </AnimatePresence>
    );
}
