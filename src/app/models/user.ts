import { Picture } from "./picture";

export class User{
    userId: number = 0;
    displayName: string = '';
    email?: string = '';
    picture: Picture = new Picture;
}