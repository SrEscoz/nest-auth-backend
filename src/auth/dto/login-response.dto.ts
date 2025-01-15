import { User } from "../entities/user.entity";

export interface LoginResponseDto {
    user: User;
    token: string;
}