import { IsString, IsEmail } from 'class-validator';

export class CreatePersonDto {
  @IsEmail()
  public email: string;

  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;
}
