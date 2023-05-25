export class Like{
    likeId: number = 0;
    userId: number = 0;
    postId?: number | null = null;
    commentId: number | null = null;
    isLiked: boolean = false;
    isDisliked: boolean = false;
}