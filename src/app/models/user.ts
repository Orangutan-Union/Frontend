import { FriendRequest } from "./friendrequest";
import { Picture } from "./picture";
import { FriendFollower } from "./friendfollower";

export class User{
    userId: number = 0;
    displayName: string = '';
    email?: string = '';
    
    picture: Picture = new Picture;
    sentFriendRequests: FriendRequest[] = [];
    receivedFriendRequests: FriendRequest[] = [];
    userFriendFollowers: FriendFollower[] = [];
    otherUserFriendFollowers: FriendFollower[] = [];
}