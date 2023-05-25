import { Group } from "./group";
import { Like } from "./like";
import { Picture } from "./picture";
import { User } from "./user";
import { Comment } from "./comment";

export class Post{
    postId: number = 0;
    userId: number = 0;
    groupId?: number = 0;
    timeStamp: Date;
    content: string = '';
    friendOnly: boolean = false;
    latitude: number = 0;
    longtitude: number = 0;

    
    comments: Comment[] = [];
    group: Group = new Group;
    likes: Like[] = [];
    pictures: Picture[] = [];
    user: User = new User;
}