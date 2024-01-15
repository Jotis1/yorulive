import { Avatar } from "@/components"
import StreamerInfo from "./streamerInfo"
import { Streamer } from "@/lib/types"
import Link from "next/link"
interface StreamerSideBarProps {
    streamer: Streamer
    isOpen?: boolean
}

export default function StreamerSideBar({ streamer, isOpen }: StreamerSideBarProps) {
    return (
        <Link href={streamer.href} className='flex w-full items-center justify-start gap-4 px-5'>
            <Avatar streamer={streamer} />
            <StreamerInfo
                isOpen={isOpen}
                streamer={streamer}
            />
        </Link>
    )
}