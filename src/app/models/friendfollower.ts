import { User } from "./user";

export class FriendFollower{
    date: Date = new Date;
    otherUserId: number = 0;
    type: number = 0;
    userId: number = 0;
    user: User = new User;
}