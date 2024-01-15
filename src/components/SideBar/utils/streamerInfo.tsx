import { Streamer } from "@/lib/types";
import cn from "@/lib/cn";
import { motion } from "framer-motion";

interface StreamerInfoProps {
    streamer: Streamer;
    isOpen?: boolean;
}

export default function StreamerInfo({ isOpen, streamer }: StreamerInfoProps) {

    const textColorClass = cn(
        'truncate text-sm font-medium',
        streamer.activity === "live" && "text-rose-300",
        streamer.activity === "offline" && "text-gray-400",
        streamer.activity === "replay" && "text-yellow-300",
        streamer.activity === "hosting" && "text-indigo-300",
        streamer.activity === "raid" && "text-purple-300",
        streamer.activity === "watch_party" && "text-green-300",
        streamer.activity === "fireplace" && "text-orange-300"
    );

    const statusDotClass = cn(
        'size-2 rounded-full',
        streamer.activity === "live" && "bg-rose-300",
        streamer.activity === "offline" && "bg-gray-400",
        streamer.activity === "replay" && "bg-yellow-300",
        streamer.activity === "hosting" && "bg-indigo-300",
        streamer.activity === "raid" && "bg-purple-300",
        streamer.activity === "watch_party" && "bg-green-300",
        streamer.activity === "fireplace" && "bg-orange-300"
    );

    return (
        <motion.article
            animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -10 }}
            className="flex justify-between items-center h-full w-full">
            <header className="flex flex-col justify-center gap-1">
                <p className={cn(textColorClass)}>{streamer.name}</p>
                <p className="truncate text-xs text-gray-400">{streamer.category}</p>
            </header>
            {streamer.activity !== "offline" && (
                <footer className={cn(textColorClass)}>
                    <p className="flex text-xs items-center gap-1">
                        <span className={cn(statusDotClass)}></span>
                        {streamer.viewers}
                    </p>
                </footer>
            )}
        </motion.article>
    );
}