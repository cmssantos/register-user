import { isUuid } from 'uuidv4';
import { left } from '../../shared/either';
import Right from '../../shared/either/right';
import InvalidEmailError from '../errors/invalid-email';
import InvalidNameError from '../errors/invalid-name';
import InvalidPasswordError from '../errors/invalid-password';
import User from './user';

const userTest = {
  id: '75442486-0878-440c-9db1-a7006c25a39f',
  name: 'Any Name',
  email: 'any_email@domain.com',
  password: 'any_password',
};

describe('User domain entity', () => {
  test('should create a valid user without informing id', async () => {
    const userOrError = User.create({
      name: userTest.name,
      email: userTest.email,
      password: userTest.password,
    });

    expect(userOrError.isRight()).toBe(true);

    const expectValue = ((userOrError as unknown) as Right<null, User>).value;
    expect(isUuid(expectValue.id)).toBe(true);
  });

  test('should create a valid user informing id', async () => {
    const userOrError = User.create(
      {
        name: userTest.name,
        email: userTest.email,
        password: userTest.password,
      },
      userTest.id,
    );

    expect(userOrError.isRight()).toBe(true);

    const expectValue = ((userOrError as unknown) as Right<null, User>).value;
    expect(expectValue.id).toEqual(userTest.id);
  });

  test('should not create user with invalid e-mail', async () => {
    const email = 'not_an_email';

    const userOrError = User.create({
      name: userTest.name,
      email,
      password: userTest.password,
    });

    expect(userOrError).toEqual(left(new InvalidEmailError(email)));
  });

  test('should not create user with invalid name (too few characters)', async () => {
    const name = 'A';

    const user = User.create({
      name,
      email: userTest.email,
      password: userTest.password,
    });

    expect(user).toEqual(left(new InvalidNameError(name)));
  });

  test('should not create user with invalid name (too many characters)', async () => {
    const name = 'A'.repeat(256);

    const user = User.create({
      name,
      email: userTest.email,
      password: userTest.password,
    });

    expect(user).toEqual(left(new InvalidNameError(name)));
  });

  test('should not create user with invalid name (only blank spaces)', async () => {
    const name = '  ';

    const user = User.create({
      name,
      email: userTest.email,
      password: userTest.password,
    });

    expect(user).toEqual(left(new InvalidNameError(name)));
  });

  test('should not create user with invalid password (too few characters)', async () => {
    const password = 'any_p';

    const user = User.create({
      name: userTest.name,
      email: userTest.email,
      password,
    });

    expect(user).toEqual(left(new InvalidPasswordError(password)));
  });

  test('should not create user with invalid password (too many characters)', async () => {
    const password = 'any_password_many';

    const user = User.create({
      name: userTest.name,
      email: userTest.email,
      password,
    });

    expect(user).toEqual(left(new InvalidPasswordError(password)));
  });
});
