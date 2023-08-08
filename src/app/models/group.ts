import { GroupRequest } from "./groupRequest";
import { GroupUser } from "./groupUser";
import { Picture } from "./picture";

export class Group{
    groupId: number | null = 0;
    groupName: string = '';
    pictureId: number = 0;
    bannerUrl: string = '';
    timeCreated: Date;

    picture: Picture = new Picture
    groupRequests: GroupRequest[] = []
    groupUsers: GroupUser[] = []
}