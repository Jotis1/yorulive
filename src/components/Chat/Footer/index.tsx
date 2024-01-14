import { motion } from 'framer-motion';
import ChatSettings from './chatSettings';
import CopyPaste from './copyPaste';
import Commands from './commands';
import {
    IconDiamond,
    IconSettings,
    IconClipboardCopy,
    IconTerminal,
    IconGift,
    IconSend,
    IconMoodSmile,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import cn from '@/lib/cn';
type color =
    | 'text-red-500'
    | 'text-yellow-500'
    | 'text-green-500'
    | 'text-blue-500'
    | 'text-indigo-500'
    | 'text-purple-500'
    | 'text-pink-500';
const colores: color[] = [
    'text-red-500',
    'text-yellow-500',
    'text-green-500',
    'text-blue-500',
    'text-indigo-500',
    'text-purple-500',
    'text-pink-500',
];
interface User {
    name: string;
    color: color;
    saveMessages: boolean;
    isMod: boolean;
    isSub: boolean;
}
interface Props {
    fullScreenMode: boolean;
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}
interface Message {
    user: string;
    message: string;
    color: color;
    isMod: boolean;
    isSub: boolean;
}

export default function Footer({ setMessages, messages }: Props) {
    const [showChangeUserSettings, setShowChangeUserSettings] = useState(false);
    const [showCopypaste, setShowCopypaste] = useState(false);
    const [showCommands, setShowCommands] = useState(false);
    const [user, setUser] = useState<User>({
        name: 'Anónimo',
        color: 'text-red-500',
        saveMessages: false,
        isMod: false,
        isSub: false,
    });
    const handleMessages = (e: any) => {
        e.preventDefault();
        const input = document.getElementById(
            'sendMessageInput'
        ) as HTMLInputElement;
        const message = input.value;
        if (message.length > 0) {
            if (message.startsWith('/')) {
                if (message.startsWith('/clear')) {
                    setMessages([]);
                    localStorage.removeItem('messages');
                } else if (message.startsWith('/say')) {
                    let messageSplited: string[] = message.split(' ');
                    let username = messageSplited[1];
                    let content = messageSplited.slice(2).join(' ');
                    let color = colores[Math.floor(Math.random() * 7)];
                    setMessages([
                        ...messages,
                        {
                            user: username,
                            message: content,
                            color,
                            isMod: user.isMod,
                            isSub: user.isSub,
                        },
                    ]);
                    if (user.saveMessages)
                        localStorage.setItem(
                            'messages',
                            JSON.stringify([
                                ...messages,
                                {
                                    user: username,
                                    message: content,
                                    color,
                                    isMod: user.isMod,
                                    isSub: user.isSub,
                                },
                            ])
                        );
                }
            } else {
                setMessages([
                    ...messages,
                    {
                        user: user.name,
                        message: message,
                        color: user.color,
                        isMod: user.isMod,
                        isSub: user.isSub,
                    },
                ]);
                if (user.saveMessages)
                    localStorage.setItem(
                        'messages',
                        JSON.stringify([
                            ...messages,
                            {
                                user: user.name,
                                message: message,
                                color: user.color,
                                isMod: user.isMod,
                                isSub: user.isSub,
                            },
                        ])
                    );
            }
            input.value = '';
        }
    };

    useEffect(() => {
        const storagedUser = localStorage.getItem('user');
        if (storagedUser) {
            setUser(JSON.parse(storagedUser));
        }
    }, []);

    return (
        <motion.footer className='relative flex flex-col items-center gap-2 rounded-t-xl bg-zinc-950 p-2.5'>
            <ChatSettings
                setUser={setUser}
                user={user}
                colores={colores}
                showChangeUserSettings={showChangeUserSettings}
            />
            <CopyPaste showCopypaste={showCopypaste} />
            <Commands showCommands={showCommands} />
            <form
                onSubmit={handleMessages}
                className='z-10 flex w-full items-center gap-2'
            >
                <button className='hidden size-10 items-center justify-center rounded-xl bg-zinc-900 text-xs font-medium text-white'>
                    <IconMoodSmile className='size-5' />
                </button>
                <input
                    id='sendMessageInput'
                    type='text'
                    placeholder='Escribe un mensaje'
                    className='h-10 flex-grow rounded-xl border-0 bg-zinc-800 px-2.5 text-sm text-white placeholder:text-zinc-400 focus:ring-0'
                />
                <button className='flex size-10 items-center justify-center rounded-xl bg-indigo-500 text-xs font-medium text-white'>
                    <IconSend className='size-5' />
                </button>
            </form>
            <section className='z-10 flex w-full items-center justify-start gap-2 bg-zinc-950'>
                <p className='flex h-8 items-center justify-center gap-2.5 rounded-lg bg-zinc-900 px-2.5 text-xs font-medium text-white'>
                    <IconDiamond className='size-5' />
                    104k
                </p>
                <button
                    onClick={() => {
                        setShowChangeUserSettings(!showChangeUserSettings);
                        setShowCopypaste(false);
                        setShowCommands(false);
                    }}
                    className={cn(
                        'flex size-8 items-center justify-center rounded-lg bg-zinc-900 text-zinc-400 transition-all',
                        showChangeUserSettings && 'bg-indigo-500 text-white'
                    )}
                >
                    <IconSettings className='size-5' />
                </button>
                <button
                    onClick={() => {
                        setShowCopypaste(!showCopypaste);
                        setShowChangeUserSettings(false);
                        setShowCommands(false);
                    }}
                    className={cn(
                        'flex size-8 items-center justify-center rounded-lg bg-zinc-900 text-zinc-400 transition-all',
                        showCopypaste && 'bg-indigo-500 text-white'
                    )}
                >
                    <IconClipboardCopy className='size-5' />
                </button>
                <button
                    onClick={() => {
                        setShowCopypaste(false);
                        setShowChangeUserSettings(false);
                        setShowCommands(!showCommands);
                    }}
                    className={cn(
                        'flex size-8 items-center justify-center rounded-lg bg-zinc-900 text-zinc-400 transition-all',
                        showCommands && 'bg-indigo-500 text-white'
                    )}
                >
                    <IconTerminal className='size-5' />
                </button>
                <button className='hidden size-8 items-center justify-center rounded-lg bg-zinc-900 text-zinc-400'>
                    <IconGift className='size-5' />
                </button>
            </section>
        </motion.footer>
    );
}
