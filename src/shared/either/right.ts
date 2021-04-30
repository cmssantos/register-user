import Left from './left';

export default class Right<L, A> {
  readonly value: A;

  constructor(value: A) {
    this.value = value;
  }

  // eslint-disable-next-line class-methods-use-this
  isLeft(): this is Left<L, A> {
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  isRight(): this is Right<L, A> {
    return true;
  }
}
