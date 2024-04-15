import {Body, Controller, Post} from '@nestjs/common';
import {CreateUserDto} from '../dto/createUserDto';
import {UsePipes} from '@nestjs/common';
import {YupValidationPipe} from '@app/utils/YupValidationPipe.util';
import {createUserSchema} from '../validation/createUserValidation.schema';
import {UserService} from '../service/user.service';
import {UserWithoutPasswordHash} from '../service/user.service';

@Controller('auth')
export class UserController {
  constructor(private readonly taskService: UserService) {}

  @Post('register')
  @UsePipes(new YupValidationPipe(createUserSchema))
  async createUser(@Body() userData: CreateUserDto): Promise<{user: UserWithoutPasswordHash; token: string}> {
    const response = await this.taskService.createUser(userData);

    return response;
  }
}
