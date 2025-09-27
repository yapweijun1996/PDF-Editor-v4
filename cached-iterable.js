export default class CachedIterable {
  constructor(iterable) {
    this.iterable = iterable;
    this.cache = [];
    this.iter = iterable[Symbol.iterator]();
  }

  [Symbol.iterator]() {
    return this;
  }

  next() {
    if (this.cache.length > 0) {
      return this.cache.shift();
    }
    const result = this.iter.next();
    if (!result.done) {
      this.cache.push(result);
    }
    return result;
  }

  touchNext() {
    if (this.cache.length === 0) {
      const result = this.iter.next();
      if (!result.done) {
        this.cache.push(result);
      }
    }
  }

  static from(iterable) {
    return new CachedIterable(iterable);
  }
}

export class CachedAsyncIterable {
  constructor(iterable) {
    this.iterable = iterable;
    this.cache = [];
    this.iter = iterable[Symbol.asyncIterator]();
  }

  [Symbol.asyncIterator]() {
    return this;
  }

  async next() {
    if (this.cache.length > 0) {
      return this.cache.shift();
    }
    const result = await this.iter.next();
    if (!result.done) {
      this.cache.push(result);
    }
    return result;
  }

  async touchNext() {
    if (this.cache.length === 0) {
      const result = await this.iter.next();
      if (!result.done) {
        this.cache.push(result);
      }
    }
  }

  static from(iterable) {
    return new CachedAsyncIterable(iterable);
  }
}