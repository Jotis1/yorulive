import { ButtonHTMLAttributes } from 'react';

import { MotionProps, motion } from 'framer-motion';

export default function PlayerButton({
    ...props
}: MotionProps & ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <motion.button
            whileHover={{ backgroundColor: 'rgb(24,24,27)' }}
            className='flex size-10 items-center justify-center rounded-xl text-white'
            {...props}
        >
            <i className='size-5'>{props.children}</i>
        </motion.button>
    );
}
