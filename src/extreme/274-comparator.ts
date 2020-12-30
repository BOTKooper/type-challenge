/*
  274 - Integers Comparator
  -------
  by Pig Fang (@g-plane) #extreme #template-literal #math
  
  ### Question
  
  Implement a type-level integers comparator. We've provided an enum for indicating the comparison result, like this:
  
  - If `a` is greater than `b`, type should be `Comparison.Greater`.
  - If `a` and `b` are equal, type should be `Comparison.Equal`.
  - If `a` is lower than `b`, type should be `Comparison.Lower`.
  
  **Note that `a` and `b` can be positive integers or negative integers or zero, even one is positive while another one is negative.**
  
  > View on GitHub: https://tsch.js.org/274
*/

/* _____________ Your Code Here _____________ */

export enum Comparison {
  Greater,
  Equal,
  Lower,
}

type Num = {
  isNegative: boolean;
};

type IsNegative<T extends string> = T extends `-${infer R}`
  ? R extends "0"
    ? false
    : true
  : false;

type ParseNumber<T extends number, V extends string = `${T}`> = {
  isNegative: IsNegative<V>;
};

type CompareTwoDigits<A extends string, B extends string> = A extends B
  ? Comparison.Equal
  : A extends "9"
  ? B extends "8" | "7" | "6" | "5" | "4" | "3" | "2" | "1" | "0"
    ? Comparison.Greater
    : Comparison.Lower
  : A extends "8"
  ? B extends "7" | "6" | "5" | "4" | "3" | "2" | "1" | "0"
    ? Comparison.Greater
    : Comparison.Lower
  : A extends "7"
  ? B extends "6" | "5" | "4" | "3" | "2" | "1" | "0"
    ? Comparison.Greater
    : Comparison.Lower
  : A extends "6"
  ? B extends "5" | "4" | "3" | "2" | "1" | "0"
    ? Comparison.Greater
    : Comparison.Lower
  : A extends "5"
  ? B extends "4" | "3" | "2" | "1" | "0"
    ? Comparison.Greater
    : Comparison.Lower
  : A extends "4"
  ? B extends "3" | "2" | "1" | "0"
    ? Comparison.Greater
    : Comparison.Lower
  : A extends "3"
  ? B extends "2" | "1" | "0"
    ? Comparison.Greater
    : Comparison.Lower
  : A extends "2"
  ? B extends "1" | "0"
    ? Comparison.Greater
    : Comparison.Lower
  : A extends "1"
  ? B extends "0"
    ? Comparison.Greater
    : Comparison.Lower
  : A extends "0"
  ? B extends "-"
    ? Comparison.Greater
    : Comparison.Lower
  : never;

type CheckForDifferentSigns<
  A extends Num,
  B extends Num
> = A["isNegative"] extends false
  ? B["isNegative"] extends true
    ? Comparison.Greater
    : Comparison.Equal
  : A["isNegative"] extends true
  ? B["isNegative"] extends false
    ? Comparison.Lower
    : Comparison.Equal
  : never;

type ShiftString<T extends string> = T extends `${infer A}${infer B}`
  ? B
  : never;

type CompareStringsLength<A extends string, B extends string> = A extends ""
  ? B extends ""
    ? Comparison.Equal
    : Comparison.Lower
  : B extends ""
  ? A extends ""
    ? Comparison.Equal
    : Comparison.Greater
  : CompareStringsLength<ShiftString<A>, ShiftString<B>>;

export type StringToList<S extends string> = S extends ""
  ? []
  : S extends `${infer F}${infer R}`
  ? [F, ...StringToList<R>]
  : [];
export type LengthOfString<S extends string> = StringToList<S>["length"];

type First<T extends string> = T extends `${infer F}${infer _}` ? F : never;

type CompareTwoPositiveWithSameLength<
  A extends string,
  B extends string
> = A extends B
  ? Comparison.Equal
  : LengthOfString<A> extends 0
  ? Comparison.Equal
  : CompareTwoDigits<First<A>, First<B>> extends Comparison.Equal
  ? CompareTwoPositiveWithSameLength<ShiftString<A>, ShiftString<B>>
  : CompareTwoDigits<First<A>, First<B>>;

export type Comparator<
  A extends number,
  B extends number,
  Astr extends string = `${A}`,
  Bstr extends string = `${B}`,
  AVal extends string = Astr extends `-${infer AVal}` ? `${AVal}` : Astr,
  BVal extends string = Bstr extends `-${infer BVal}` ? `${BVal}` : Bstr
> = A extends B
  ? Comparison.Equal
  : CheckForDifferentSigns<
      ParseNumber<A>,
      ParseNumber<B>
    > extends Comparison.Equal
  ? CompareStringsLength<AVal, BVal> extends Comparison.Equal
    ? CompareTwoPositiveWithSameLength<AVal, BVal> extends Comparison.Equal
      ? Comparison.Equal
      : CompareTwoPositiveWithSameLength<AVal, BVal> extends Comparison.Greater
      ? ParseNumber<A>["isNegative"] extends false
        ? Comparison.Greater
        : Comparison.Lower
      : CompareTwoPositiveWithSameLength<AVal, BVal> extends Comparison.Lower
      ? ParseNumber<A>["isNegative"] extends false
        ? Comparison.Lower
        : Comparison.Greater
      : CompareTwoPositiveWithSameLength<AVal, BVal>
    : CompareStringsLength<AVal, BVal>
  : CheckForDifferentSigns<ParseNumber<A>, ParseNumber<B>>;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Comparator<5, 50>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 5>, Comparison.Equal>>,
  Expect<Equal<Comparator<5, 6>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 8>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 0>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, 0>, Comparison.Lower>>,
  Expect<Equal<Comparator<0, 0>, Comparison.Equal>>,
  Expect<Equal<Comparator<0, -5>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -3>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -3>, Comparison.Lower>>,
  Expect<Equal<Comparator<-25, -30>, Comparison.Greater>>,
  Expect<Equal<Comparator<15, -23>, Comparison.Greater>>,
  Expect<Equal<Comparator<40, 37>, Comparison.Greater>>,
  Expect<Equal<Comparator<-36, 36>, Comparison.Lower>>,
  Expect<Equal<Comparator<27, 27>, Comparison.Equal>>,
  Expect<Equal<Comparator<-38, -39>, Comparison.Greater>>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/274/answer
    > View solutions: https://tsch.js.org/274/solutions
    > More Challenges: https://tsch.js.org
  */
