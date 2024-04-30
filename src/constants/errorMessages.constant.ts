export const statusMessages = {
  USER_ALREADY_EXISTS: (email: string) => `User with email ${email} already exists`,
  INCORRECT_PASSWORD: 'Incorrect password',
  USER_NOT_FOUND: (email: string) => `User with email ${email} not found`,
  NOT_FOUND: (entity: string) => `${entity} not found`
};
