import { Group } from "./group";
import { User } from "./user";

export class GroupUser{
    groupId: number = 0;
    userId: number = 0;
    type: number = 0;

    group: Group = new Group;
    user: User = new User;
}