import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}