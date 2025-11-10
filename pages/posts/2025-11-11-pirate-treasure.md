---
title: Pirate Treasure
date: November 11, 2025
---

## Problem Statement

There are **n pirates** dividing a treasure.

- Pirate **1** takes **$\frac{1}{n}$** of the **total** treasure.
- Pirate **2** takes **$\frac{2}{n}$** of **what remains**.
- Pirate **3** takes **$\frac{3}{n}$** of the remaining amount.
- …
- Pirate **i** takes **$\frac{i}{n}$** of the remaining pile at his turn.

We must determine the **index of the pirate who gets the largest share**  
(older pirates have smaller indices, so answer is between 1 and n).

---

### Example

If $n = 3$:

| Pirate | Share Taken |
|-------|-------------|
| 1 | $\frac{1}{3}$ |
| 2 | $\frac{2}{3}(1 - \frac{1}{3}) = \frac{4}{9}$ |
| 3 | $\frac{3}{3}(1 - \frac{1}{3} - \frac{4}{9}) = \frac{2}{9}$ |

The **largest share** is $\frac{4}{9}$, taken by **Pirate 2**.

## Formal Definition

Let $S_i$ be the share of Pirate $i$.

$$
S_i = \frac{i}{n} \cdot \prod_{k=1}^{i-1}\left(1 - \frac{k}{n}\right)
$$

The product term is the **fraction of treasure remaining** after pirates 1 to $i-1$ have taken their shares.

Our goal:

$$
\text{Find } \arg\max_{1 \le i \le n} S_i.
$$

---

## Comparing Consecutive Shares

Instead of computing every share, compare two neighbors:

$$
\frac{S_{i+1}}{S_i}
= \frac{(i+1)(n-i)}{in}
$$

- If **> 1**, shares are increasing at $i$
- If **< 1**, shares are decreasing after $i$
- So the **maximum occurs where increasing stops and decreasing starts**

This happens when:

$$
\frac{(i+1)(n-i)}{in} = 1
$$

which simplifies to:

$$
i^2 + i - n = 0
$$

This is a **quadratic equation** in $i$.

---

## Solving the Quadratic

For:
$$
i^2 + i - n = 0
$$

Using the quadratic formula:

$$
i = \frac{-1 + \sqrt{1+4n}}{2}
$$

We only take the **positive root** since pirate indices are positive.

Let:
$$
p = \left\lfloor\frac{\sqrt{1+4n}-1}{2}\right\rfloor
$$

Now check:

- If $n = p(p+1)$, then **pirates p and p+1 tie** → choose the earlier pirate → return **p**
- Otherwise, the maximum occurs at **p + 1**

---

## Python Implementation (Big-Integer Safe)

### Using Integer Square Root

```python
from math import isqrt

def pirate_with_largest_share(n):
    # Compute p = floor((sqrt(1 + 4n) - 1) / 2) using integer sqrt to avoid precision issues
    p = (isqrt(1 + 4*n) - 1) // 2

    # Check for tie case
    return p if p * (p + 1) == n else p + 1
```

### Using brute force

```python
def pirate_largest_bruteforce_float(n: int) -> int:
    remaining = 1.0
    best_i, best_share = 1, 0.0

    for i in range(1, n + 1):
        share = (i / n) * remaining
        if share > best_share:
            best_share, best_i = share, i
        remaining -= share  # same as: remaining *= (1 - i/n)

    return best_i
```
