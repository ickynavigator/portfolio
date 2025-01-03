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
