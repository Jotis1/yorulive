import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
    IconBellFilled,
    IconMailFilled,
    IconSearch,
    IconMenu,
} from '@tabler/icons-react';

interface NavBarProps {
    fullScreenMode: boolean;
}

export default function NavBar({ fullScreenMode }: NavBarProps) {
    return (
        <AnimatePresence>
            {!fullScreenMode && (
                <motion.nav
                    animate={{ minHeight: '4rem' }}
                    exit={{ minHeight: '0rem' }}
                    className='flex w-full items-center justify-between bg-zinc-950 px-5'
                >
                    <aside className='flex items-center gap-10 text-sm text-white'>
                        <Link href={'/'} className='flex items-center gap-1.5'>
                            YORU
                            <span className='rounded-lg bg-indigo-500 px-3 py-1.5 font-bold'>
                                LIVE
                            </span>
                        </Link>
                        <section className='hidden items-center gap-5 sm:flex'>
                            <Link href={'/'} className=''>
                                Categorías
                            </Link>
                            <Link href={'/'}>Seguidos</Link>
                        </section>
                    </aside>
                    <aside className='hidden items-center gap-5 sm:flex'>
                        <button className='text-white'>
                            <IconSearch className='size-5' />
                        </button>
                        <button className='text-white'>
                            <IconMailFilled className='size-5' />
                        </button>
                        <button className='text-white'>
                            <IconBellFilled className='size-5' />
                        </button>
                        <Link
                            href={'/'}
                            className='relative size-10 rounded-full bg-white ring-1 ring-zinc-700'
                        >
                            <Image
                                alt='Profile Picture'
                                src={'/twitchprofilepic.png'}
                                className='rounded-full'
                                fill
                            ></Image>
                        </Link>
                    </aside>
                    <button className='block text-white sm:hidden'>
                        <IconMenu className='size-5' />
                    </button>
                </motion.nav>
            )}
        </AnimatePresence>
    );
}
