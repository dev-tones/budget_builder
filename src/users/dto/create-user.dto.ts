import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({
    description: "User's first name",
    example: 'Matthew',
  })
  @IsString()
  @IsNotEmpty()
  firstName!: string;
  @ApiProperty({
    description: "User's last name",
    example: 'Smith',
  })
  @IsString()
  @IsNotEmpty()
  lastName!: string;
  @ApiProperty({
    description: "User's email address",
    example: 'test@gmail.com',
  })
  @IsEmail()
  email!: string;
  @ApiProperty({
    description: 'Shows if user is active in system',
    example: true,
  })
  @ApiProperty({
    description: "User's password",
    example: 'Password123',
  })
  @IsString()
  @MinLength(8)
  password!: string;
}
