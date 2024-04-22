import {ApiProperty} from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  refreshToken: string;
}
