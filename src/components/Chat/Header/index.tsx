interface Props {
    chatIsHidden: boolean;
    setChatIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

import { IconArrowBarRight } from '@tabler/icons-react';

export default function Header({ chatIsHidden, setChatIsHidden }: Props) {
    return (
        <header className='relative flex min-h-12 w-full items-center justify-between rounded-b-xl bg-zinc-950 px-5 text-white'>
            <button
                onClick={() => setChatIsHidden(!chatIsHidden)}
                className='flex size-10 items-center justify-center text-zinc-400'
            >
                <IconArrowBarRight className='size-4' />
            </button>
            <p className='absolute left-1/2 -translate-x-1/2 text-sm font-medium'>
                Chat en directo
            </p>
        </header>
    );
}