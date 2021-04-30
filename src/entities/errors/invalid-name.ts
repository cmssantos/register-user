import { IDomainError } from './domain-error-interface';

export default class InvalidNameError extends Error implements IDomainError {
  constructor(name: string) {
    super(`The name "${name}" is invalid.`);
    this.name = 'InvalidNameError';
  }
}
