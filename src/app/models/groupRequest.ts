import { Group } from "./group";
import { User } from "./user";

export class GroupRequest{
    groupId: number = 0;
    userId: number = 0;
    type: number = 2;

    group: Group = new Group
    user: User = new User
}