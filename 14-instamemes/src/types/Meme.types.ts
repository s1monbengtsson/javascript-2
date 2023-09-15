import { Timestamp } from "firebase/firestore"

export type Meme = {
    _id: string
    created: Timestamp
    name: string    // "lolcat.png"
    path: string    // "memes/23rhj2fn-34h7-4bad-9ddb- 22rkjnjn34t"
    size: number    // 133700 kB
    type: string    // image/png
    uid: string    // WrKf4k5l24hihf2h5fKHGHW43K
    url: string     // pulblic url to meme
}