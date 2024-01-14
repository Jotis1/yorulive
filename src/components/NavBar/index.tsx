import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { IconBellFilled, IconMailFilled, IconSearch, IconMenu } from "@tabler/icons-react"

interface NavBarProps {
    fullScreenMode: boolean;
}

export default function NavBar({ fullScreenMode }: NavBarProps) {
    return (
        <AnimatePresence>
            {!fullScreenMode && (
                <motion.nav
                    animate={{ minHeight: "4rem" }}
                    exit={{ minHeight: "0rem" }}
                    className="w-full bg-zinc-950 flex items-center justify-between px-5">
                    <aside className="text-sm text-white flex items-center gap-10">
                        <Link href={"/"} className="flex items-center gap-1.5">
                            YORU<span className="font-bold py-1.5 px-3 bg-indigo-500 rounded-lg">LIVE</span>
                        </Link>
                        <section className="hidden items-center gap-5 sm:flex">
                            <Link href={"/"} className="">
                                Categorías
                            </Link>
                            <Link href={"/"}>
                                Seguidos
                            </Link>
                        </section>
                    </aside>
                    <aside className="sm:flex hidden items-center gap-5">
                        <button className="text-white">
                            <IconSearch className="size-5" />
                        </button>
                        <button className="text-white">
                            <IconMailFilled className="size-5" />
                        </button>
                        <button className="text-white">
                            <IconBellFilled className="size-5" />
                        </button>
                        <Link href={"/"} className="size-10 bg-white rounded-full relative ring-1 ring-zinc-700">
                            <Image alt="Profile Picture" src={"/twitchprofilepic.png"} className="rounded-full" fill></Image>
                        </Link>
                    </aside>
                    <button className="sm:hidden block text-white">
                        <IconMenu className="size-5" />
                    </button>
                </motion.nav>
            )}
        </AnimatePresence>
    )

}