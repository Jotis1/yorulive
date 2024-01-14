'use client';

import Link from 'next/link';
import Image from 'next/image';
import { IconArrowBarRight, IconEyeFilled } from '@tabler/icons-react';
import { useState } from 'react';
import cn from '@/lib/cn';
import { motion, AnimatePresence } from 'framer-motion';

interface SideBarProps {
    fullScreenMode: boolean;
    theaterMode: boolean;
}

export default function SideBar({ fullScreenMode, theaterMode }: SideBarProps) {
    const [open, setOpen] = useState(false);
    const streamers = [
        {
            photo: '/illojuanlogo.png',
            name: 'IlloJuan',
            category: 'Just Chatting',
            viewers: 42.356,
        },
        {
            photo: '/elbokeronlogo.jpg',
            name: 'ElBokeron',
            category: "Baldur's Gate 3",
            viewers: 5.107,
        },
    ];

    return (
        <AnimatePresence>
            {!(fullScreenMode || theaterMode) && (
                <motion.aside
                    exit={{ opacity: 0, maxWidth: '0rem' }}
                    animate={{ maxWidth: open ? '18rem' : '5rem', opacity: 1 }}
                    className={cn(
                        'sticky top-0 flex h-full w-0 flex-col items-center gap-5 overflow-hidden bg-zinc-950 py-2.5 sm:w-full'
                    )}
                >
                    <header className='flex w-full items-center justify-between truncate px-5 text-white'>
                        <AnimatePresence>
                            {open && (
                                <motion.p
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: 'auto' }}
                                    exit={{ opacity: 0, width: 0 }}
                                    className={cn('text-sm font-medium')}
                                >
                                    En directo
                                </motion.p>
                            )}
                        </AnimatePresence>
                        <button
                            onClick={() => setOpen(!open)}
                            className='flex size-10 items-center justify-center text-zinc-400'
                        >
                            <IconArrowBarRight
                                className={cn(
                                    'size-4',
                                    open ? 'rotate-180' : ''
                                )}
                            />
                        </button>
                    </header>
                    {streamers.map((streamer, i) => (
                        <Link
                            key={i}
                            href={'/'}
                            className='flex w-full items-center justify-start gap-4 px-5'
                        >
                            <figure className='relative size-0 min-w-10 rounded-full bg-white ring-2 ring-rose-500 ring-offset-2 ring-offset-zinc-950 sm:size-10'>
                                <Image
                                    className='relative rounded-full object-cover'
                                    fill
                                    alt='Streamer Profile Picture'
                                    src={streamer.photo}
                                />
                                <span className='absolute -bottom-0.5 -right-0.5 size-4 rounded-full border-2 border-zinc-950 bg-rose-500'></span>
                            </figure>
                            <AnimatePresence>
                                {open && (
                                    <motion.aside
                                        initial={{
                                            opacity: 0,
                                            width: 0,
                                            y: 10,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            width: 'auto',
                                            y: 0,
                                        }}
                                        exit={{ opacity: 0, width: 0, y: 10 }}
                                        className={cn(
                                            'flex grow items-center justify-between overflow-hidden text-sm text-white'
                                        )}
                                    >
                                        <header className='flex-grow'>
                                            <p className='font-medium'>
                                                {streamer.name}
                                            </p>
                                            <p className='line-clamp-1 text-xs text-indigo-300'>
                                                {streamer.category}
                                            </p>
                                        </header>
                                        <footer>
                                            <p className='flex items-center gap-1 text-xs font-medium text-rose-300'>
                                                <IconEyeFilled size={14} />
                                                {streamer.viewers}
                                            </p>
                                        </footer>
                                    </motion.aside>
                                )}
                            </AnimatePresence>
                        </Link>
                    ))}
                </motion.aside>
            )}
        </AnimatePresence>
    );
}
