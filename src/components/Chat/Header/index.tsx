interface Props {
    chatIsHidden: boolean
    setChatIsHidden: React.Dispatch<React.SetStateAction<boolean>>
}

import { IconArrowBarRight } from "@tabler/icons-react"

export default function Header({ chatIsHidden, setChatIsHidden }: Props) {
    return (
        <header className="relative text-white min-h-12 px-5 w-full bg-zinc-950 rounded-b-xl flex items-center justify-between">
            <button onClick={() => setChatIsHidden(!chatIsHidden)}
                className="size-10 text-zinc-400 flex items-center justify-center">
                <IconArrowBarRight className="size-4" />
            </button>
            <p className="absolute left-1/2 -translate-x-1/2 text-sm font-medium">Chat en directo</p>
        </header>
    )
}