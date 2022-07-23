// deno-lint-ignore-file

type _0 = "0"
type Succ<N> = { succ: N }

type _1 = Succ<_0>
type _2 = Succ<_1>
type _3 = Succ<_2>
type _4 = Succ<_3>
type _5 = Succ<_4>
type _6 = Succ<_5>
type _7 = Succ<_6>
type _8 = Succ<_7>
type _9 = Succ<_8>
type _10 = Succ<_9>

type Natural = _0 | { succ: Natural }

/*
    A + 0       = A
    A + S(N)    = S(A + N)
*/
type Add<A, B> =
    | B extends _0 ? A                              // A if B == 0 
    : B extends Succ<infer N> ? Succ<Add<A, N>>     // else ( S(A + N) if B is S(N) )
    : never

/*
    A * 0       = A
    A * S(N)    = A + (A * N)
*/
type Mul<A, B> =
    | B extends _0 ? _0                             // 0 if B == 0 
    : B extends Succ<infer N> ? Add<A, Mul<A, N>>   // else ( (A + (A * B) ) if B is S(N) )
    : never

type Is<A extends B, B> = void

let test:
    | Is<_5, Natural>
    | Is<Add<_3, _5>, _8>
    | Is<Add<_3, _4>, _8> // Error!
    | Is<Mul<_2, _4>, _8>
    | Is<Mul<_2, _3>, _8> // Error!
