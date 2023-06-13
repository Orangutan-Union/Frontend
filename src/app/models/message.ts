import { Chat } from "./chat";
import { User } from "./user";

export class Message{
    messageId: number = 0;
    chatId: number = 0;
    userId: number = 0;
    timeStamp: Date;
    content: string = '';
    latitude: number = 0
    longtitude: number = 0

    chat: Chat = new Chat;
    user: User = new User;
}