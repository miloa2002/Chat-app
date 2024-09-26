export interface Message {
    id: number,
    senderId: number | null,
    recipientId: number | null,
    content: string | null,
    timestamps: string | null,
    isRead: boolean
}

export interface User {
    id?: number,
    name: string,
    phone: number | null,
    password: string,
    image: string,
    isActive: boolean,
    info: string,
    date: string | null,
    friends: User[],
    messages: Message[]
}

export interface UserLogin {
    phone: number | null,
    password: string,
}