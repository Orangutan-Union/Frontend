export class NewPost{
    postId: number = 0;
    userId: number = 0;
    groupId?: number = 0;
    timeStamp: Date;
    content: string = '';
    friendOnly: boolean = false;
    latitude: number = 0;
    longtitude: number = 0;
}