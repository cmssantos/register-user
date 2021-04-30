import { uuid } from 'uuidv4';
import InvalidNameError from '../errors/invalid-name';
import InvalidEmailError from '../errors/invalid-email';
import InvalidPasswordError from '../errors/invalid-password';
import { Either, left, right } from '../../shared/either';
import Name from './name';
import Email from './email';
import Password from './password';
import { UserData } from './user-data';

export default class User {
  public readonly id!: string;

  public readonly name!: Name;

  public readonly email!: Email;

  public readonly password!: Password;

  private constructor(props: Omit<User, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    } else {
      this.id = id;
    }

    Object.freeze(this);
  }

  static create(
    userData: UserData,
    id?: string,
  ): Either<InvalidNameError | InvalidEmailError | InvalidPasswordError, User> {
    const nameOrError: Either<InvalidNameError, Name> = Name.create(
      userData.name,
    );

    const emailOrError: Either<InvalidEmailError, Email> = Email.create(
      userData.email,
    );

    const passwordOrError: Either<
      InvalidPasswordError,
      Password
    > = Password.create(userData.password);

    if (nameOrError.isLeft()) {
      return left(nameOrError.value);
    }

    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value);
    }

    const name: Name = nameOrError.value;
    const email: Email = emailOrError.value;
    const password: Password = passwordOrError.value;

    return right(new User({ name, email, password }, id));
  }
}
