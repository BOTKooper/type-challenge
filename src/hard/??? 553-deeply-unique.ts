/*
  553 - Deep object to unique
  -------
  by null (@uid11) #hard #deep
  
  ### Question
  
  TypeScript has structural type system, but sometimes you want a function to accept only some previously well-defined unique objects (as in the nominal type system), and not any objects that have the required fields.
  
  Create a type that takes an object and makes it and all deeply nested objects in it unique, while preserving the string and numeric keys of all objects, and the values of all properties on these keys.
  
  The original type and the resulting unique type must be mutually assignable, but not identical. 
  
  For example,
  
  ```ts
  import { Equal } from "@type-challenges/utils"
  
  type Foo = { foo: 2; bar: { 0: 1 }; baz: { 0: 1 } }
  
  type UniqFoo = DeepObjectToUniq<Foo>
  
  declare let foo: Foo
  declare let uniqFoo: UniqFoo
  
  uniqFoo = foo // ok
  foo = uniqFoo // ok
  
  type T0 = Equal<UniqFoo, Foo> // false
  type T1 = UniqFoo["foo"] // 2
  type T2 = Equal<UniqFoo["bar"], UniqFoo["baz"]> // false
  type T3 = UniqFoo["bar"][0] // 1
  type T4 = Equal<keyof Foo & string, keyof UniqFoo & string> // true
  ```
  
  > View on GitHub: https://tsch.js.org/553
*/

/* _____________ Your Code Here _____________ */

/**
 * no-doc - This is a helper for `Nominal` and is not useful on its own
 */
declare class Tagged<N> {
  protected _nominal_?: N;
}
/**
 * Constructs a nominal type of type `T`.
 * Useful to prevent any value of type `T` from being used or modified in places it shouldn't (think `id`s).
 * @param T the type of the `Nominal` type (string, number, etc.)
 * @param N the name of the `Nominal` type (id, username, etc.)
 * @returns a type that is equal only to itself, but can be used like its contained type `T`
 */
export type Nominal<T, N> = T & Tagged<N>;

type DO<Obj extends object, Buff extends any[] = []> = Nominal<
  {
    [P in keyof Obj]: Obj[P] extends object ? DO<Obj[P], [...Buff, P]> : Obj[P];
  },
  Buff
>;

// type abc = Equal<keyof {a:1, b:2}, keyof {a:1, b:2} & string>

// type Quz1 = { quz: 4 };

// type Foo1 = { foo: 2; baz: Quz1; bar: Quz1 };
// type Bar1 = { foo: 2; baz: Quz1; bar: Quz1 & { quzz?: 0 } };

// type UniqFoo1 = DO<Foo1>;
// type UniqBar1 = DO<Bar1>;

// declare let foo1: Foo1;
// declare let uniqFoo1: UniqFoo1;

// uniqFoo1 = foo1;
// foo1 = uniqFoo1;

// type Foo2 = { foo: 2; bar: { 0: 1 }; baz: { 0: 1 } }

// type UniqFoo2 = DO<Foo2>

// declare let foo2: Foo2
// declare let uniqFoo2: UniqFoo2

// uniqFoo2 =  foo2// ok
// foo2 = uniqFoo2// ok

// type T0 = Equal<UniqFoo2, Foo2> // false
// type T1 = UniqFoo2["foo"] // 2
// type T2 = Equal<UniqFoo2["bar"], UniqFoo2["baz"]> // false
// type T3 = UniqFoo2["bar"][0] // 1
// type T4 = Equal<keyof Foo2 & string, keyof UniqFoo2 & string> // true

// type cases2 = [
//   IsFalse<Equal<UniqFoo1, Foo1>>,
//   IsTrue<Equal<UniqFoo1["foo"], Foo1["foo"]>>,
//   IsTrue<Equal<UniqFoo1["bar"]["quz"], Foo1["bar"]["quz"]>>,
//   IsFalse<Equal<UniqFoo1["bar"], UniqFoo1["baz"]>>,
//   IsFalse<Equal<UniqBar1["baz"], UniqFoo1["baz"]>>,
//   IsTrue<Equal<keyof UniqBar1["baz"], keyof UniqFoo1["baz"]>>,
//   IsTrue<Equal<keyof Foo1, keyof UniqFoo1 & string>>
// ];

type DeepObjectToUniq<Obj extends object, Buff extends any[] = []> =  DO<Obj>
// {
//   [P in keyof Obj]: Obj[P] extends object ? DeepObjectToUniq<Obj[P], [...Buff, P]> : Obj[P];
// } & {readonly '': symbol} & string & {_nominal_?: Buff}

/* _____________ Test Cases _____________ */
import { Equal, IsTrue, IsFalse } from "@type-challenges/utils";

type Quz = { quz: 4 };

type Foo = { foo: 2; baz: Quz; bar: Quz };
type Bar = { foo: 2; baz: Quz; bar: Quz & { quzz?: 0 } };

type UniqFoo = DeepObjectToUniq<Foo>;
type UniqBar = DeepObjectToUniq<Bar>;

declare let foo: Foo;
declare let uniqFoo: UniqFoo;

uniqFoo = foo;
foo = uniqFoo;

type cases = [
  IsFalse<Equal<UniqFoo, Foo>>,
  IsTrue<Equal<UniqFoo["foo"], Foo["foo"]>>,
  IsTrue<Equal<UniqFoo["bar"]["quz"], Foo["bar"]["quz"]>>,
  IsFalse<Equal<UniqFoo["bar"], UniqFoo["baz"]>>,
  // IsFalse<Equal<UniqBar["baz"], UniqFoo["baz"]>>,
  IsTrue<Equal<keyof UniqBar["baz"], keyof UniqFoo["baz"]>>,
  IsTrue<Equal<keyof Foo, keyof UniqFoo & string>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/553/answer
  > View solutions: https://tsch.js.org/553/solutions
  > More Challenges: https://tsch.js.org
*/
