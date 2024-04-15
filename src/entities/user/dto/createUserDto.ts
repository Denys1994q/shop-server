import {ApiProperty} from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: String;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty({required: false})
  phoneNumber?: string;
}
