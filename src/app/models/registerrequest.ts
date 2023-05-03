import { UploadPicture } from "./uploadpicture";

export class RegisterRequest{
    username: string = '';
    password: string = '';
    verifyPassword: string = '';
    email: string = '';
    displayName: string = '';
    picture: UploadPicture = new UploadPicture;
}