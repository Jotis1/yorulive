import { AnimatePresence, motion } from 'framer-motion';
import { IconPlus, IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

interface Props {
    showCopypaste: boolean;
}

export default function CopyPaste({ showCopypaste }: Props) {
    const [copypaste, setCopypaste] = useState<string[] | []>([]);

    const handleCopypasteChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        let oldCopypaste = [...copypaste];
        oldCopypaste[index] = e.target.value;
        setCopypaste(oldCopypaste);
        localStorage.setItem('copypaste', JSON.stringify(oldCopypaste));
    };

    const handleRemoveCopypaste = (index: number) => {
        let oldCopypaste = [...copypaste];
        oldCopypaste.splice(index, 1);
        for (let i = 0; i < oldCopypaste.length; i++) {
            (document.getElementById(`${i}`) as HTMLInputElement).value =
                oldCopypaste[i];
        }
        setCopypaste(oldCopypaste);
        localStorage.setItem('copypaste', JSON.stringify(oldCopypaste));
    };

    useEffect(() => {
        const storagedCopypaste = localStorage.getItem('copypaste');
        if (storagedCopypaste) {
            setCopypaste(JSON.parse(storagedCopypaste));
        }
    }, []);

    return (
        <AnimatePresence>
            {showCopypaste && (
                <motion.section
                    initial={{
                        opacity: 0,
                        maxHeight: '0rem',
                        padding: '0rem 0rem',
                        y: 100,
                    }}
                    animate={{
                        opacity: 1,
                        maxHeight: '40rem',
                        padding: '0.625rem 0rem',
                        y: 0,
                    }}
                    exit={{
                        opacity: 0,
                        maxHeight: '0rem',
                        padding: '0rem 0rem',
                        y: 100,
                    }}
                    className='flex w-full flex-col gap-4 bg-zinc-950'
                >
                    <section className='flex items-center justify-between text-white'>
                        <p className='text-center text-sm'>Copypastas</p>
                        <button
                            onClick={() => setCopypaste([...copypaste, ''])}
                            className='flex size-10 items-center justify-center hover:text-rose-300'
                        >
                            <IconPlus className='size-5'></IconPlus>
                        </button>
                    </section>
                    {copypaste.map((copy, index) => (
                        <label
                            key={index}
                            htmlFor={`copypaste-${index + 1}`}
                            className='flex flex-col gap-2 text-sm font-medium text-zinc-400'
                        >
                            <p
                                onClick={() => {
                                    const input = document.getElementById(
                                        'sendMessageInput'
                                    ) as HTMLInputElement;
                                    input.value = copy;
                                }}
                                className='flex-grow cursor-pointer'
                            >
                                Copypaste #{index + 1}
                            </p>
                            <section className='flex items-center gap-5'>
                                <input
                                    key={index}
                                    onChange={(e) =>
                                        handleCopypasteChange(e, index)
                                    }
                                    defaultValue={copy}
                                    required
                                    name={`copypaste-${index + 1}`}
                                    id={`${index}`}
                                    type='text'
                                    className='h-8 flex-grow rounded-xl border-0 bg-zinc-900 text-sm text-white focus:ring-0'
                                />
                                <button
                                    onClick={() => handleRemoveCopypaste(index)}
                                    className='flex size-10 items-center justify-center hover:text-rose-300'
                                >
                                    <IconX className='size-5'></IconX>
                                </button>
                            </section>
                        </label>
                    ))}
                </motion.section>
            )}
        </AnimatePresence>
    );
}
