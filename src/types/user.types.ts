import {User} from '@app/entities/user/model/user.schema';

export type AuthorizedUser = Omit<User, 'password'>;
