import Link from "next/link"
import Image from "next/image"
import { Streamer } from "@/lib/types";
import cn from "@/lib/cn";

interface Avatar {
    href?: string;
    size?: "md" | "lg";
    streamer: Streamer;
}

interface StreamerAvatar {
    streamer: Streamer;
}

const ImageAvatar = ({ streamer }: StreamerAvatar) => {
    return (
        <Image
            className='relative rounded-full object-cover'
            fill
            alt='Streamer Profile Picture'
            src={streamer.photo}
        />
    )
}

export default function Avatar({ href, streamer, size = "md" }: Avatar) {

    if (href) {
        return (
            <Link
                href={href}
                className={cn(
                    'relative rounded-full bg-white ring-2 ring-rose-500 ring-offset-2 ring-offset-zinc-950',
                    size === "lg" && "size-0 sm:size-14 min-w-14",
                    size === "md" && "size-0 sm:size-10 min-w-10",
                    streamer.activity === "live" && "ring-2 ring-rose-500",
                    streamer.activity === "offline" && "ring-2 ring-gray-500",
                    streamer.activity === "replay" && "ring-2 ring-yellow-500",
                    streamer.activity === "hosting" && "ring-2 ring-indigo-500",
                    streamer.activity === "raid" && "ring-2 ring-purple-500",
                    streamer.activity === "watch_party" && "ring-2 ring-green-500",
                    streamer.activity === "fireplace" && "ring-2 ring-orange-500",
                )}>
                <ImageAvatar streamer={streamer} />
            </Link>
        )
    }

    return (
        <section
            className={cn(
                'relative rounded-full bg-white ring-2 ring-rose-500 ring-offset-2 ring-offset-zinc-950',
                size === "lg" && "size-0 sm:size-14 min-w-14",
                size === "md" && "size-0 sm:size-10 min-w-10",
                streamer.activity === "live" && "ring-2 ring-rose-500",
                streamer.activity === "offline" && "ring-2 ring-gray-500",
                streamer.activity === "replay" && "ring-2 ring-yellow-500",
                streamer.activity === "hosting" && "ring-2 ring-indigo-500",
                streamer.activity === "raid" && "ring-2 ring-purple-500",
                streamer.activity === "watch_party" && "ring-2 ring-green-500",
                streamer.activity === "fireplace" && "ring-2 ring-orange-500",
            )}>
            <ImageAvatar streamer={streamer} />
        </section>
    )

}