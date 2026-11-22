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

/** A letter changes under case conversion; digits and punctuation do not. */
type IsLetter<C extends string> =
  Uppercase<C> extends Lowercase<C> ? false : true;

type IsIdentChar<C extends string> =
  IsLetter<C> extends true ? true : C extends `${number}` | "_" ? true : false;

/** Keep the leading identifier characters, stopping at the first other one. */
type TakeIdent<
  S extends string,
  R extends string = "",
> = S extends `${infer C}${infer Rest}`
  ? IsIdentChar<C> extends true
    ? TakeIdent<Rest, `${R}${C}`>
    : R
  : R;

type ExtractValidSegments<
  Segs,
  Prefix extends string,
  Separator extends string,
  R extends unknown[] = [],
  _Segs = GetSegments<Segs, Separator>,
> = _Segs extends [infer Curr, ...infer Rest]
  ? Curr extends `${Prefix}${infer Val}`
    ? ExtractValidSegments<
        Rest,
        Prefix,
        Separator,
        [...R, TakeIdent<Val>],
        Rest
      >
    : ExtractValidSegments<Rest, Prefix, Separator, R, Rest>
  : R[number];

type StripFns<S extends string> =
  S extends `${infer Before}fn ${string}(${string}) = ${string};${infer After}`
    ? StripFns<`${Before}${After}`>
    : S;

type GetParams<
  G extends string,
  _F = ExtractValidSegments<StripFns<G>, "$", " ">,
> = Match<_F, never> extends true ? unknown : { params: Record<_F, unknown> };

type GetUrlParams<
  G extends string,
  Result = GetParams<G, ExtractValidSegments<G, ":", "/">>,
> = Result extends { params: infer R } ? R : never;

type Items<T> = T[keyof T];

type OneOf<T, N> = T extends N ? T : N;

type Creatable<T extends string> = (string & {}) | T;
