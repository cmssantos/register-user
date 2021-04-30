import { IDomainError } from './domain-error-interface';

export default class InvalidPasswordError
  extends Error
  implements IDomainError {
  constructor(password: string) {
    super(`The password "${password}" is invalid.`);
    this.name = 'InvalidPasswordError';
  }
}
