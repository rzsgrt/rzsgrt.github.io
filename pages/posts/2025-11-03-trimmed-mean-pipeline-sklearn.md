---
title: Trimmed Mean Pipeline in Sklearn
date: March 30, 2025
excerpt: A post about the trimmed mean and how to create a custom scikit-learn transformer to handle missing values using the trimmed mean.
---


**Why I Wrote This Post**

I came across a coding challenge that asked to create a custom scikit-learn transformer to handle missing values using a robust statistic called the trimmed mean.

**What Is the Trimmed Mean?**

The trimmed mean (also called the truncated mean) is a robust measure of central tendency, a middle ground between:

- the mean, which is sensitive to extreme values, and
- the median, which ignores most of the data.

In many real-world datasets such as income distributions, sensor readings, or user behavior metrics, a few extreme values can heavily distort the regular mean.

By trimming a fixed fraction of the lowest and highest values before computing the average, we get a measure that is:

- Less affected by outliers
- Still uses most of the data (unlike the median)
- Smooth and differentiable, making it suitable for optimization and statistical modeling

**Mathematical Formula of the Trimmed Mean**

Let $x_{(1)}, x_{(2)}, \ldots, x_{(n)}$ be the **sorted sample** of $n$ data points, arranged in ascending order.  
Let $\alpha$ represent the **trimming proportion**, the fraction of data to remove from each tail.

We define:

$$
k = \lfloor \alpha n \rfloor
$$

where $\lfloor \cdot \rfloor$ is the **floor function**, which rounds a real number down to the nearest integer.

The **trimmed mean** is then computed as:

$$
\text{TrimmedMean}_{\alpha}(x) =
\frac{1}{n - 2k}
\sum_{i=k+1}^{n-k} x_{(i)}
$$

This formula means we:
1. Remove the lowest $k$ and highest $k$ values  
2. Compute the mean of the remaining $n - 2k$ values

**I wonder why is $\alpha$ Limited to $0 \leq \alpha < 0.5$?**

We require at least one data point to remain after trimming.  
That gives us the condition:

$$
n - 2k > 0
$$

Substituting $k = \lfloor \alpha n \rfloor$:

$$
n - 2\lfloor \alpha n \rfloor > 0
$$

---

**Key Property of the Floor Function**

For any real number $x$:

$$
\lfloor x \rfloor \leq x
$$

Applying this property:

$$
n - 2\lfloor \alpha n \rfloor \geq n - 2(\alpha n) = n(1 - 2\alpha)
$$

To ensure the expression is positive:

$$
n(1 - 2\alpha) > 0
$$

Since $n > 0$, we can divide both sides by $n$:

$$
1 - 2\alpha > 0
$$

$$
\boxed{\alpha < 0.5}
$$

Without using mathematical proof, we can also reason that if we trim half or more of the data ($\alpha \geq 0.5`), there are no values left to average.  

If you trim half or more of the data ( $\alpha \geq 0.5$ ), there are no values left to average.  
That’s why the valid range is:
$$
0 \leq \alpha < 0.5
$$

---

**How to Calculate the Trimmed Mean in Python**

There are two common approaches to calculate the trimmed mean in Python:

- Using a scipy function
- Using a numpy function

```python
import numpy as np
from scipy import stats
x = np.array([1, 2, 3, 4, 5, 100, 101])  # two large outliers
def trimmed_mean(x, alpha=0.1):
    """
    Compute the trimmed mean manually, ignoring NaNs.
    alpha: fraction (0 <= α < 0.5) of data to trim from each tail.
    """
    x = np.asarray(x, dtype=float)
    x = x[~np.isnan(x)]               
    n = len(x)
    if n == 0:
        return np.nan
    k = int(np.floor(alpha * n))
    if 2 * k >= n:                    
        return np.mean(x)
    x_sorted = np.sort(x)
    trimmed = x_sorted[k:n - k]
    return np.mean(trimmed)
print(f"Trimmed mean scipy (α={alpha}):", stats.trim_mean(x, proportiontocut=0.3))
print(f"Trimmed mean numpy (α={alpha}):", trimmed_mean(x,0.3))
print("Regular mean:", np.mean(x))

Trimmed mean scipy (α=0.3): 4.0
Trimmed mean numpy (α=0.3): 4.0
Regular mean: 30.857142857142858
```

**Implement Trimmed Mean as a Custom Transformer in Sklearn**

Scikit-learn provides two base classes that make it easy to create reusable and pipeline-compatible components:

1. **BaseEstimator**

- Gives your class access to methods like .get_params() and .set_params().
- These are essential for grid search and hyperparameter tuning.
- It also standardizes the initialization pattern , parameters passed in `__init__` are stored as attributes automatically.

Example:
When you call GridSearchCV, it can automatically find and modify parameters like trim_fraction inside your transformer because it inherits BaseEstimator.

2. **TransformerMixin**

- Provides a default implementation of the .fit_transform() method.
- Ensures that your transformer follows scikit-learn’s expected API: it must implement both .fit() and .transform().
- Once you inherit TransformerMixin, you only need to define these two methods, and your class can plug directly into any Pipeline.

**Implementation Details**

1. **Implement helper function to calculate the trimmed mean**

```python
def _trimmed_mean_1d(x, alpha):
    x = np.asarray(x, dtype=float)
    x = x[~np.isnan(x)]
    n = x.size
    if n == 0:
        return np.nan
    k = int(math.floor(alpha * n))
    if 2 * k >= n:
        return float(np.mean(x))
    xs = np.sort(x)
    return float(np.mean(xs[k:n-k]))
```

2. **Wrap helper function in a custom transformer**

- Inherit BaseEstimator and TransformerMixin
- Implement `fit` to calculate the trimmed mean
- Implement `transform` to apply the trimmed mean to the data

Small details: use `check_array` and `check_is_fitted` as checks to ensure the input is valid and the transformer is fitted.


For the complete working code, including the helper function, the TrimmedMeanImputer class, and example usage inside a scikit-learn pipeline, you can check the notebook here: [Trimmed Mean Pipeline Sklearn](https://github.com/rzsgrt/backpocket/blob/main/Trimmed%20Mean%20Pipeline%20Sklearn.ipynb)