/*
  296 - Permutation
  -------
  by Naoto Ikuno (@pandanoir) #medium #union
  
  ### Question
  
  Implement permutation type that transforms union types into the array that includes permutations of unions.
  
  ```typescript
  type perm = Permutation<'A' | 'B' | 'C'>; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
  ```
  
  > View on GitHub: https://tsch.js.org/296
*/

/* _____________ Your Code Here _____________ */

type Permutation<T, K = T> = 
[T] extends [never] // "T extends never" doesn't work well, see https://github.com/microsoft/TypeScript/issues/23182
  ? []
  : K extends K // Breaking down union, good explanation of this one at https://github.com/type-challenges/type-challenges/issues/614
  ? [K, ...Permutation<Exclude<T, K>>]
  : never;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Permutation<"A">, ["A"]>>,
  Expect<
    Equal<
      Permutation<"A" | "B" | "C">,
      | ["A", "B", "C"]
      | ["A", "C", "B"]
      | ["B", "A", "C"]
      | ["B", "C", "A"]
      | ["C", "A", "B"]
      | ["C", "B", "A"]
    >
  >,
  Expect<
    Equal<
      Permutation<"B" | "A" | "C">,
      | ["A", "B", "C"]
      | ["A", "C", "B"]
      | ["B", "A", "C"]
      | ["B", "C", "A"]
      | ["C", "A", "B"]
      | ["C", "B", "A"]
    >
  >,
  Expect<Equal<Permutation<never>, []>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/296/answer
  > View solutions: https://tsch.js.org/296/solutions
  > More Challenges: https://tsch.js.org
*/
