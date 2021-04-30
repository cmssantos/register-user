import Right from './right';

export default class Left<L, A> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  // eslint-disable-next-line class-methods-use-this
  isLeft(): this is Left<L, A> {
    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  isRight(): this is Right<L, A> {
    return false;
  }
}
