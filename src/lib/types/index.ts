export interface SideBarProps {
    fullScreenMode: boolean;
    theaterMode: boolean;
}

export interface Streamer {
    photo: string;
    name: string;
    category: string;
    viewers: number;
    href: string;
    activity: "live" | "offline" | "replay" | "hosting" | "raid" | "watch_party" | "fireplace";
}

export interface Message {
    user: string;
    message: string;
    color: Color;
    isMod: boolean;
    isSub: boolean;
}


export type Color =
    | 'text-red-500'
    | 'text-yellow-500'
    | 'text-green-500'
    | 'text-blue-500'
    | 'text-indigo-500'
    | 'text-purple-500'
    | 'text-pink-500';

export interface Spam {
    emote?: string;
    type: "cheer" | "info"
}