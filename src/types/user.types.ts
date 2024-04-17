import {User} from '@app/entities/user/model/user.schema';

export type UserWithoutPassword = Omit<User, 'password'>;
