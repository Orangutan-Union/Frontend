import { Message } from "./message";
import { User } from "./user";

export class Chat{
    chatId: number = 0;
    chatName: string = '';
    timeCreated: Date;

    users: User[] = [];
    messages: Message[] = [];
}