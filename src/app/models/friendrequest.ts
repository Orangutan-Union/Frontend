import { User } from "./user";

export class FriendRequest{
    senderId: number = 0;
    receiverId: number = 0;
    dateSent: Date = new Date;
    sender: User = new User;
    receiver: User = new User;
}