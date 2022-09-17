type Nullable<T> = T | null

type Optional<T, K> = Omit<T, K> & { [P in K]?: T[K] }
