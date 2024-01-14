"use client";

import Link from "next/link"
import Image from "next/image"
import { IconArrowBarRight, IconEyeFilled } from "@tabler/icons-react"
import { useState } from "react"
import cn from "@/lib/cn";
import { motion, AnimatePresence } from "framer-motion";

interface SideBarProps {
    fullScreenMode: boolean;
    theaterMode: boolean;
}

export default function SideBar({ fullScreenMode, theaterMode }: SideBarProps) {

    const [open, setOpen] = useState(false);
    const streamers = [
        { photo: "/illojuanlogo.png", name: "IlloJuan", category: "Just Chatting", viewers: 42.356 },
        { photo: "/elbokeronlogo.jpg", name: "ElBokeron", category: "Baldur's Gate 3", viewers: 5.107 },
    ]

    return (
        <AnimatePresence>
            {!(fullScreenMode || theaterMode) && (
                <motion.aside
                    exit={{ opacity: 0, maxWidth: "0rem" }}
                    animate={{ maxWidth: open ? "18rem" : "5rem", opacity: 1 }}
                    className={
                        cn(
                            "sticky sm:w-full flex items-center py-2.5 flex-col gap-5 top-0 w-0 overflow-hidden h-full bg-zinc-950"
                        )
                    }>
                    <header className="text-white w-full truncate px-5 flex items-center justify-between">
                        <AnimatePresence>
                            {open && (
                                <motion.p
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: "auto" }}
                                    exit={{ opacity: 0, width: 0 }}
                                    className={
                                        cn(
                                            "text-sm font-medium"
                                        )
                                    }>En directo</motion.p>
                            )}
                        </AnimatePresence>
                        <button onClick={() => setOpen(!open)}
                            className="size-10 flex items-center justify-center text-zinc-400">
                            <IconArrowBarRight className={cn(
                                "size-4",
                                open ? "rotate-180" : "",
                            )} />
                        </button>
                    </header>
                    {
                        streamers.map((streamer, i) => (
                            <Link key={i} href={"/"} className="flex justify-start items-center gap-4 w-full px-5">
                                <figure className="relative ring-2 ring-offset-2 ring-rose-500 ring-offset-zinc-950 sm:size-10 min-w-10 size-0 bg-white rounded-full">
                                    <Image className="relative object-cover rounded-full" fill alt="Streamer Profile Picture" src={streamer.photo} />
                                    <span className="size-4 border-2 border-zinc-950 bg-rose-500 absolute -bottom-0.5 -right-0.5 rounded-full"></span>
                                </figure>
                                <AnimatePresence>
                                    {open && (
                                        <motion.aside
                                            initial={{ opacity: 0, width: 0, y: 10 }}
                                            animate={{ opacity: 1, width: "auto", y: 0 }}
                                            exit={{ opacity: 0, width: 0, y: 10 }}
                                            className={
                                                cn(
                                                    "flex text-white overflow-hidden text-sm grow items-center justify-between"
                                                )
                                            }>
                                            <header className="flex-grow">
                                                <p className="font-medium">{streamer.name}</p>
                                                <p className="text-xs line-clamp-1 text-indigo-300">{streamer.category}</p>
                                            </header>
                                            <footer>
                                                <p className="text-rose-300 font-medium flex text-xs items-center gap-1">
                                                    <IconEyeFilled size={14} />
                                                    {streamer.viewers}
                                                </p>
                                            </footer>
                                        </motion.aside>
                                    )}
                                </AnimatePresence>
                            </Link>
                        ))
                    }
                </motion.aside >
            )}
        </AnimatePresence>
    )
}