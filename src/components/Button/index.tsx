import React from 'react';
import { motion, MotionProps } from 'framer-motion';

import cn from '@/lib/cn';
interface MotionButtonProps extends Omit<MotionProps, 'children'> {
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;
}

const Button: React.FC<MotionButtonProps> = (props) => {
    return (
        <motion.button
            whileHover={{ backgroundColor: 'rgba(24,24,27)' }}
            className={cn('flex size-10 items-center justify-center text-zinc-400 rounded-xl',
                props.className)}
            {...props}
        >
            {props.children}
        </motion.button>
    );
}

export default Button;

