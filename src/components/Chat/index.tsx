import { AnimatePresence, motion } from "framer-motion"
import { IconArrowBarRight, IconSettings, IconClipboardCopy, IconTerminal, IconGift, IconDiamond, IconSend, IconCrown, IconHammer, IconX, IconPlus } from "@tabler/icons-react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import cn from "@/lib/cn"
interface Props {
    chatIsHidden: boolean
    setChatIsHidden: React.Dispatch<React.SetStateAction<boolean>>
    fullScreenMode: boolean
}

import Header from "./Header"
import Footer from "./Footer"

type color = "text-red-500" | "text-yellow-500" | "text-green-500" | "text-blue-500" | "text-indigo-500" | "text-purple-500" | "text-pink-500"

interface Message {
    user: string
    message: string
    color: color
    isMod: boolean
    isSub: boolean
}

export default function Chat({ chatIsHidden, setChatIsHidden, fullScreenMode }: Props) {

    const [messages, setMessages] = useState<Message[] | []>([])
    const [emotes, setEmotes] = useState<{ name: string, id: string }[] | []>([])
    const messagesEndRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        const storagedMessages = localStorage.getItem("messages")
        if (storagedMessages) {
            setMessages(JSON.parse(storagedMessages))
        }
        const fetchEmotes = async () => {
            const res = await fetch("/api/emote-set")
            const emoteList: { name: string, id: string }[] = await res.json()
            setEmotes(emoteList)
        }
        fetchEmotes();
    }, []);

    const renderEmotes = (message: Message, index: number) => {
        let { message: content } = message;
        const emotesInMessage = content.split(" ").filter((word) => emotes.find((emote) => emote.name === word));

        return (
            <motion.article
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                key={index} className="p-2.5 odd:bg-zinc-800 rounded-xl text-sm">
                <p className="text-white text-pretty inline-flex flex-wrap  gap-2 items-baseline">
                    <span className={`font-bold flex items-end gap-2 ${message.color}`}>
                        {message.isSub && (
                            <span className="size-6 text-white bg-indigo-500 flex items-center justify-center rounded">
                                <IconCrown className="fill-current size-4" />
                            </span>
                        )}
                        {message.isMod && (
                            <span className="size-6 text-white bg-green-500 flex items-center justify-center rounded">
                                <IconHammer className="fill-current size-4" />
                            </span>
                        )}
                        {message.user}
                    </span>
                    {emotesInMessage.length > 0 ? (
                        emotesInMessage.reduce<Array<string | React.ReactElement>>((acc, emoteName, emoteIndex) => {
                            const emote = emotes.find((emote) => emote.name === emoteName);
                            const emoteIndexInContent = content.indexOf(emoteName);

                            acc.push(content.substring(0, emoteIndexInContent));
                            acc.push(
                                <section className="relative group">
                                    <Image
                                        key={emoteIndex}
                                        width={30}
                                        height={30}
                                        src={`https://cdn.7tv.app/emote/${emote?.id}/1x.avif`}
                                        alt={emoteName}
                                    />
                                    <span className="relativ group-hover:flex backdrop-blur-md gap-2.5 items-center flex-col hidden text-xs font-medium overflow-hidden absolute p-2.5 transition-all bg-zinc-950/40 rounded-md top-full right-full">
                                        <figure className="size-10 relative">
                                            <Image
                                                key={emoteIndex}
                                                fill
                                                className="size-10"
                                                src={`https://cdn.7tv.app/emote/${emote?.id}/2x.avif`}
                                                alt={emoteName}
                                            />
                                        </figure>
                                        {emoteName}
                                    </span>
                                </section>
                            );
                            content = content.substring(emoteIndexInContent + emoteName.length);
                            return acc;
                        }, [])
                    ) : (
                        content
                    )}
                </p>
            </motion.article>
        );
    };

    return (
        <AnimatePresence>
            {!(fullScreenMode || chatIsHidden) && (
                <motion.aside
                    initial={{ opacity: 0, width: "0%" }}
                    animate={{ opacity: 1, width: "100%", }}
                    exit={{ opacity: 0, width: "0%" }}
                    className="sticky top-0 h-full xl:max-w-96 md:max-w-72 bg-zinc-900 opacity-100 flex flex-col overflow-auto">
                    <Header setChatIsHidden={setChatIsHidden} chatIsHidden={chatIsHidden} />
                    <section className="flex-grow overflow-auto scrollbar-hide flex flex-col gap-2.5 p-2.5">
                        <AnimatePresence>
                            {messages.map((message, index) => renderEmotes(message, index))}
                        </AnimatePresence>
                        <div ref={messagesEndRef} />
                    </section>
                    <Footer
                        fullScreenMode={fullScreenMode}
                        setMessages={setMessages} messages={messages} />
                </motion.aside >
            )}
        </AnimatePresence>

    )
}