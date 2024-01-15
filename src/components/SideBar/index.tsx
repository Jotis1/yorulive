'use client';

import { IconArrowBarRight } from '@tabler/icons-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import cn from '@/lib/cn';

import { streamersPlaceholder as streamers } from '@/lib/utils/placeholder';
import { SideBarProps } from '@/lib/types';
import { Button } from '@/components'
import StreamerSideBar from './utils/Streamer';

export default function SideBar({ fullScreenMode, theaterMode }: SideBarProps) {
    const [open, setOpen] = useState(false);

    return (
        <AnimatePresence>
            {!(fullScreenMode || theaterMode) && (
                <motion.aside
                    exit={{ opacity: 0, maxWidth: '0rem' }}
                    animate={{ maxWidth: open ? '18rem' : '5rem', opacity: 1 }}
                    transition={{ duration: 0.1 }}
                    className={'sticky top-0 flex h-full w-0 flex-col items-center gap-10 overflow-hidden bg-zinc-950 py-2.5 sm:w-full'}>
                    <header className='flex w-full items-center justify-between truncate px-5 text-white'>
                        <AnimatePresence>
                            {open && (
                                <motion.p
                                    initial={{ opacity: 0, width: 0, y: -10 }}
                                    animate={{ opacity: 1, width: 'auto', y: 0 }}
                                    exit={{ opacity: 0, width: 0, y: -10 }}
                                    className={cn('text-sm font-medium')}
                                >
                                    Siguiendo
                                </motion.p>
                            )}
                        </AnimatePresence>
                        <Button
                            onClick={() => setOpen(!open)}
                        >
                            <IconArrowBarRight
                                className={cn(
                                    'size-4',
                                    open ? 'rotate-180' : ''
                                )}
                            />
                        </Button>
                    </header>
                    <section className='flex flex-col gap-5 w-full'>
                        {streamers.map((streamer, i) => (
                            <StreamerSideBar key={i} isOpen={open} streamer={streamer} />
                        ))}
                    </section>
                </motion.aside>
            )}
        </AnimatePresence>
    );
}
