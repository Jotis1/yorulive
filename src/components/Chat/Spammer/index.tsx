import { Spam } from "@/lib/types";
import cn from "@/lib/cn";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { use, useEffect, useState } from "react";

interface Props extends Spam {
    spammedMessage: { timesUsed: number, text: string, emote: string }
    setSpammedMessage: React.Dispatch<React.SetStateAction<{ timesUsed: number, text: string, emote: string }>>;
}

export default function Spammer({ spammedMessage, setSpammedMessage }: Props) {

    const [spamCopy, setSpamCopy] = useState("");
    const [emotes, setEmotes] = useState<{ name: string; id: string }[] | []>([]);
    const [emoteImage, setEmoteImage] = useState("");

    useEffect(() => {


        const emote = emotes.find((emote) => emote.name === spammedMessage.emote);
        setEmoteImage(emote?.id || "");
        const timeout = setTimeout(() => {
            setSpammedMessage({ timesUsed: 0, text: "", emote: "" });
        }, 2000);

        return () => clearTimeout(timeout);
    }, [spammedMessage]);

    useEffect(() => {
        const fetchEmotes = async () => {
            if (spammedMessage.text !== spamCopy || !spamCopy) {
                const res = await fetch("api/emote-set");
                const emotes = await res.json();
                setEmotes(emotes);
            }
        }
        fetchEmotes();
    }, [])


    return (
        <AnimatePresence>
            {spammedMessage.text && (
                <motion.section
                    key={`${spammedMessage.text}`}
                    initial={{ opacity: 0, minHeight: 0, height: 0 }}
                    animate={{ opacity: 1, minHeight: 80, height: 80 }}
                    exit={{ opacity: 0, minHeight: 0, height: 80 }}
                    className="gap-2 bg-yellow-500 min-h-[80px_!important] rounded-b-xl overflow-hidden flex items-center px-2.5 ">
                    <figure className="min-w-12 size-12 relative">
                        {emoteImage && (
                            <Image src={`https://cdn.7tv.app/emote/${emoteImage}/4x.webp`} alt={spammedMessage.emote} fill></Image>
                        )}
                    </figure>
                    <section className="flex items-center justify-center h-full flex-grow relative overflow-hidden">
                        <p
                            className={cn(
                                "animate-bounce w-full break-words text-center font-black text-white",
                                spammedMessage.text.length < 15 && "text-2xl",
                                (spammedMessage.text.length < 40 && spammedMessage.text.length >= 15) && "text-lg",
                                (spammedMessage.text.length < 60 && spammedMessage.text.length >= 40) && "text-sm",
                                (spammedMessage.text.length < 80 && spammedMessage.text.length >= 60) && "text-xs"
                            )}>
                            {spammedMessage.text}
                        </p>
                    </section>
                    <figure className="min-w-12 size-12 relative">
                        {emoteImage && (
                            <Image src={`https://cdn.7tv.app/emote/${emoteImage}/4x.webp`} alt={spammedMessage.emote} fill></Image>
                        )}
                    </figure>
                </motion.section>
            )}
        </AnimatePresence>
    );
}
