/*
  151 - Query String Parser
  -------
  by Pig Fang (@g-plane) #extreme #template-literal
  
  ### Question
  
  You're required to implement a type-level parser to parse URL query string into a object literal type.
  
  Some detailed requirements:
  
  - Value of a key in query string can be ignored but still be parsed to `true`. For example, `'key'` is without value, so the parser result is `{ key: true }`.
  - Duplicated keys must be merged into one. If there are different values with the same key, values must be merged into a tuple type.
  - When a key has only one value, that value can't be wrapped into a tuple type.
  - If values with the same key appear more than once, it must be treated as once. For example, `key=value&key=value` must be treated as `key=value` only.
  
  > View on GitHub: https://tsch.js.org/151
*/

/* _____________ Your Code Here _____________ */

type MergeBuffWithKey<
  Buff,
  Key extends string | number | symbol,
  Value
> = Key extends keyof Buff
  ? Value extends Buff[Key]
    ? Buff
    : {
        [k in keyof Omit<Buff, Key> | Key]: k extends keyof Omit<Buff, Key>
          ? Buff[k]
          : [Buff[Key], Value];
      }
  : { [k in keyof Buff | Key]: k extends keyof Buff ? Buff[k] : Value };

type ParseQueryString<S extends string, Buff extends object = {}> = S extends ""
  ? Buff
  : S extends `${infer Pre}=${infer Post}`
  ? Post extends `${infer Val}&${infer Next}`
    ? ParseQueryString<Next, MergeBuffWithKey<Buff, Pre, Val>>
    : MergeBuffWithKey<Buff, Pre, Post>
  : S extends `${infer Pre}&${infer Next}`
  ? ParseQueryString<Next, MergeBuffWithKey<Buff, Pre, true>>
  : MergeBuffWithKey<Buff, S, true>;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<ParseQueryString<"">, {}>>,
  Expect<Equal<ParseQueryString<"k1">, { k1: true }>>,
  Expect<Equal<ParseQueryString<"k1&k1">, { k1: true }>>,
  Expect<Equal<ParseQueryString<"k1&k2">, { k1: true; k2: true }>>,
  Expect<Equal<ParseQueryString<"k1=v1">, { k1: "v1" }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k1=v2">, { k1: ["v1", "v2"] }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k2=v2">, { k1: "v1"; k2: "v2" }>>,
  Expect<
    Equal<ParseQueryString<"k1=v1&k2=v2&k1=v2">, { k1: ["v1", "v2"]; k2: "v2" }>
  >,
  Expect<Equal<ParseQueryString<"k1=v1&k2">, { k1: "v1"; k2: true }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k1=v1">, { k1: "v1" }>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/151/answer
  > View solutions: https://tsch.js.org/151/solutions
  > More Challenges: https://tsch.js.org
*/
