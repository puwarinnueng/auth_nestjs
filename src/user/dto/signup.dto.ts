import { IsNotEmpty, Matches } from "class-validator";

export class SignUpDto {
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
        message: 'Minimum eight characters, at least one letter and one number:'
    })
    password: string
}