import { AnimatePresence, motion } from 'framer-motion';
import {
    IconCrown,
    IconHammer,
} from '@tabler/icons-react';

import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import Image from 'next/image';
interface Props {
    chatIsHidden: boolean;
    setChatIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
    fullScreenMode: boolean;
}

import Header from './Header';
import Footer from './Footer';
import Spammer from './Spammer';

import { messagesPlaceholder } from '@/lib/utils/placeholder';
import { Message } from '@/lib/types';

export default function Chat({
    chatIsHidden,
    setChatIsHidden,
    fullScreenMode,
}: Props) {
    const [messages, setMessages] = useState<Message[] | []>(messagesPlaceholder);
    const [emotes, setEmotes] = useState<{ name: string; id: string }[] | []>([]);
    const [renderedMessages, setRenderedMessages] = useState<JSX.Element[] | []>([]);
    const [spammedMessage, setSpammedMessage] = useState<{ timesUsed: number, text: string, emote: string }>({ timesUsed: 0, text: "", emote: "" });
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const renderEmotes = (messages: Message[]) => {

            let array: JSX.Element[] = [];

            messages.forEach((message) => {
                let { message: content } = message;
                const emotesInMessage = content
                    .split(' ')
                    .filter((word) => emotes.find((emote) => emote.name === word));
                const renderedMessage = (
                    <motion.article
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className='rounded-xl p-2.5 text-sm'
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
                            {
                                emotesInMessage.length > 0
                                    ? emotesInMessage.reduce<Array<string | React.ReactElement>>((acc, emoteName, emoteIndex, arr) => {
                                        const emote = emotes.find((e) => e.name === emoteName);
                                        const emoteIndexInContent = content.indexOf(emoteName);

                                        if (emoteIndexInContent > 0) {
                                            acc.push(content.substring(0, emoteIndexInContent));
                                        }

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

                                        // Actualiza el contenido para excluir el emote actual
                                        content = content.substring(emoteIndexInContent + emoteName.length);

                                        // Si es el último emote, agrega el texto restante al array
                                        if (emoteIndex === arr.length - 1 && content.length > 0) {
                                            acc.push(content);
                                        }

                                        return acc;
                                    }, [])
                                    : content
                            }

                        </p>
                    </motion.article>
                );

                array.push(renderedMessage);
            });

            return array;

        };
        setRenderedMessages(renderEmotes(messages));
    }, [messages]);

    useLayoutEffect(() => {
        const messagesEnd = messagesEndRef.current;
        messagesEnd?.scrollIntoView({ behavior: 'smooth' });
    }, [renderedMessages]);

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

    return (
        <AnimatePresence>
            {!(fullScreenMode || chatIsHidden) && (
                <motion.aside
                    initial={{ opacity: 0, width: '0%' }}
                    animate={{ opacity: 1, width: '100%' }}
                    exit={{ opacity: 0, width: '0%' }}
                    className='sticky scrollbar-hide top-0 flex h-full flex-col overflow-auto bg-zinc-900 opacity-100 md:max-w-72 xl:max-w-96'
                >
                    <Header
                        setChatIsHidden={setChatIsHidden}
                        chatIsHidden={chatIsHidden}
                    />
                    <Spammer setSpammedMessage={setSpammedMessage} spammedMessage={spammedMessage} emote='Life' type="cheer" />
                    <section className='flex flex-grow flex-col scrollbar-hide gap-2.5 overflow-auto p-2.5'>
                        <AnimatePresence>
                            {renderedMessages.map((message, index) => (
                                <section key={index} className='odd:bg-zinc-800 rounded-xl'>
                                    {message}
                                </section>
                            ))}
                        </AnimatePresence>
                        <div ref={messagesEndRef}></div>
                    </section>
                    <Footer
                        spammedMessage={spammedMessage}
                        setSpammedMessage={setSpammedMessage}
                        setMessages={setMessages}
                        messages={messages}
                    />
                </motion.aside>
            )}
        </AnimatePresence>
    );
}
