type Match<T, U> = [T] extends [U] ? true : false;

type GetSegments<
  S,
  Separator extends string,
  R extends string[] = [],
> = S extends `${infer Curr}${Separator}${infer Next}`
  ? GetSegments<Next, Separator, [...R, Curr]>
  : S extends Separator
    ? R
    : [...R, S];

type ExtractValidSegments<
  Segs,
  Prefix extends string,
  Separator extends string,
  R extends unknown[] = [],
  _Segs = GetSegments<Segs, Separator>,
> = _Segs extends [infer Curr, ...infer Rest]
  ? Curr extends `${Prefix}${infer Val}`
    ? ExtractValidSegments<Rest, Prefix, Separator, [...R, Val], Rest>
    : ExtractValidSegments<Rest, Prefix, Separator, R, Rest>
  : R[number];

type GetParams<G extends string, _F = ExtractValidSegments<G, "$", " ">> =
  Match<_F, never> extends true ? unknown : { params: Record<_F, unknown> };

type GetUrlParams<
  G extends string,
  Result = GetParams<G, ExtractValidSegments<G, ":", "/">>,
> = Result extends { params: infer R } ? R : never;

type Items<T> = T[keyof T];

type OneOf<T, N> = T extends N ? T : N;

type Creatable<T extends string> = (string & {}) | T;

interface Success<T> {
  success: true;
  data: T;
  error: null;
}

interface Failure<E> {
  success: false;
  data: null;
  error: E;
}

type Result<T, E = Error> = Success<T> | Failure<E>;

type FuncOrValue<T> = T | (() => T);
