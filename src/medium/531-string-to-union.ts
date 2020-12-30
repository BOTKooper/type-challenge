/*
  531 - String to Union
  -------
  by Andrey Krasovsky (@bre30kra69cs) #medium #union #string
  
  ### Question
  
  Implement the String to Union type. Type take string argument. The output should be a union of input letters
    
    For example
    
    ```ts
    type Test = "123"
    type Result = StrintToUnion<Test> // expected to be "1" | "2" | "3"
    ```
  
  > View on GitHub: https://tsch.js.org/531
*/

/* _____________ Your Code Here _____________ */
export type StringToList<S extends string> = S extends ""
  ? []
  : S extends `${infer F}${infer R}`
  ? [F, ...StringToList<R>]
  : [];

export type StringToUnion<T> = T extends string
  ? StringToUnion<StringToList<T>>
  : T extends []
  ? never
  : T extends [infer First, ...infer Rest]
  ? First | StringToUnion<Rest>
  : never;

type test = StringToUnion<"hello">;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<StringToUnion<"">, never>>,
  Expect<Equal<StringToUnion<"t">, "t">>,
  Expect<Equal<StringToUnion<"hello">, "h" | "e" | "l" | "l" | "o">>,
  Expect<
    Equal<
      StringToUnion<"coronavirus">,
      "c" | "o" | "r" | "o" | "n" | "a" | "v" | "i" | "r" | "u" | "s"
    >
  >
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/531/answer
  > View solutions: https://tsch.js.org/531/solutions
  > More Challenges: https://tsch.js.org
*/
