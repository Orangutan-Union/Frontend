import { Like } from "./like";
import { User } from "./user";

export class Comment{
    commentId: number = 0;
    userId: number = 0;
    timeStamp: Date;
    content: string= '';

    likes: Like[] = [];
    user: User = new User;
}