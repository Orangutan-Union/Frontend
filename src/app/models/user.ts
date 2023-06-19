import { FriendRequest } from "./friendrequest";
import { Picture } from "./picture";
import { UserFriendFollower } from "./userfriendfollower";

export class User{
    userId: number = 0;
    displayName: string = '';
    email?: string = '';
    
    picture: Picture = new Picture;
    sentFriendRequests: FriendRequest[] = [];
    receivedFriendRequests: FriendRequest[] = [];
    userFriendFollowers: UserFriendFollower[] = [];
    otherUserFriendFollowers: UserFriendFollower[] = [];
}