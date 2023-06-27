import { Message } from "./message";
import { User } from "./user";

export class Chat{
    chatId: number = 0;
    chatName: string = '';
    lastMessageSent: Date;
    isPrivate: boolean = false;

    users: User[] = [];
    messages: Message[] = [];
}