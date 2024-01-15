import { NextResponse } from 'next/server';

export async function GET() {
    const res = await fetch(
        'https://7tv.io/v3/emote-sets/65a2776ef51b4ca854c15f55'
    );
    const data = await res.json();
    const emotes = data.emotes;
    const emoteList: {}[] = [];
    emotes.forEach((emote: any) => {
        emoteList.push({
            id: emote.id,
            name: emote.name,
        });
    });
    return NextResponse.json(emoteList);
}
