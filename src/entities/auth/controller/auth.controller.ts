import {Body, Controller, Post, HttpCode, HttpStatus, UsePipes} from '@nestjs/common';
import {AuthService} from '../service/auth.service';
import {CreateUserDto} from '@app/entities/user/dto/createUserDto';
import {YupValidationPipe} from '@app/pipes/YupValidationPipe';
import {createUserSchema} from '@app/entities/user/validation/createUserValidation.schema';
import {ApiOperation} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({summary: 'User sign-up', description: 'Register a new user'})
  @HttpCode(HttpStatus.OK)
  @Post('signUp')
  @UsePipes(new YupValidationPipe(createUserSchema))
  signUp(@Body() userData: CreateUserDto): Promise<{access_token: string}> {
    return this.authService.signUp(userData);
  }
}
