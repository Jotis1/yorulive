import { Streamer, Message } from '../types';
export const streamersPlaceholder: Streamer[] = [
    {
        photo: '/illojuanlogo.png',
        name: 'IlloJuan',
        category: 'Just Chatting',
        viewers: 42.356,
        activity: 'live',
        href: "/"
    },
    {
        photo: '/elbokeronlogo.jpg',
        name: 'ElBokeron',
        category: "Baldur's Gate 3",
        viewers: 5.107,
        activity: "hosting",
        href: "/"
    },
    {
        photo: '/knekrologo.jpeg',
        name: 'Knekro',
        category: "",
        viewers: 0,
        activity: "offline",
        href: "/"
    },
];
export const messagesPlaceholder: Message[] = [
    {
        user: 'Juanma',
        message: 'Hola, este es el chat',
        color: 'text-red-500',
        isMod: true,
        isSub: true,
    },
    {
        user: 'Juanma',
        message: 'Prueba a escribir "Life"',
        color: 'text-red-500',
        isMod: true,
        isSub: true,
    },
    {
        user: 'Juanma',
        message: '(sin las comillas)',
        color: 'text-red-500',
        isMod: true,
        isSub: true,
    },
    {
        user: 'Juanma',
        message: 'Por cierto, abajo del reproductor tienes dos botones para configurar el mismo, el de "Añadir directos o vídeos" y los tres puntitos',
        color: 'text-red-500',
        isMod: true,
        isSub: true,
    },
    {
        user: 'Juanma',
        message: 'También puedes customizar el chat, cambiar el color, el tamaño, etc. Con los controles de abajo',
        color: 'text-red-500',
        isMod: true,
        isSub: true,
    },
]