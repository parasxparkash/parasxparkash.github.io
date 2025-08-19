# Probability Theory Notes

## Basic Concepts

Probability is a measure of the likelihood that an event will occur. It ranges from 0 (impossible) to 1 (certain).

## Probability Axioms (Kolmogorov)

For a probability space $(\Omega, \mathcal{F}, P)$:

1. **Non-negativity**: $P(A) \geq 0$ for all $A \in \mathcal{F}$
2. **Normalization**: $P(\Omega) = 1$
3. **Additivity**: For disjoint events $A_1, A_2, \ldots$:
   $$P\left(\bigcup_{i=1}^{\infty} A_i\right) = \sum_{i=1}^{\infty} P(A_i)$$

## Conditional Probability

The probability of event $A$ given event $B$ has occurred:
$$P(A|B) = \frac{P(A \cap B)}{P(B)}$$

## Bayes' Theorem

$$P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}$$

Where $P(B) = \sum_{i} P(B|A_i) \cdot P(A_i)$ by the law of total probability.

## Random Variables

A **random variable** $X$ is a function $X: \Omega \rightarrow \mathbb{R}$.

### Discrete Random Variables
For discrete $X$ with possible values $x_1, x_2, \ldots$:
- **Probability Mass Function**: $p_X(x_i) = P(X = x_i)$
- **Expected Value**: $E[X] = \sum_{i} x_i \cdot p_X(x_i)$
- **Variance**: $\text{Var}(X) = E[(X - E[X])^2] = E[X^2] - (E[X])^2$

### Continuous Random Variables
For continuous $X$:
- **Probability Density Function**: $f_X(x)$ where $P(a \leq X \leq b) = \int_a^b f_X(x) dx$
- **Expected Value**: $E[X] = \int_{-\infty}^{\infty} x \cdot f_X(x) dx$
- **Variance**: $\text{Var}(X) = \int_{-\infty}^{\infty} (x - E[X])^2 \cdot f_X(x) dx$

## Common Distributions

### Binomial Distribution
$X \sim \text{Binomial}(n, p)$:
$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$
$$E[X] = np, \quad \text{Var}(X) = np(1-p)$$

### Normal Distribution
$X \sim \mathcal{N}(\mu, \sigma^2)$:
$$f_X(x) = \frac{1}{\sqrt{2\pi\sigma^2}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}$$
$$E[X] = \mu, \quad \text{Var}(X) = \sigma^2$$

### Poisson Distribution
$X \sim \text{Poisson}(\lambda)$:
$$P(X = k) = \frac{\lambda^k e^{-\lambda}}{k!}$$
$$E[X] = \lambda, \quad \text{Var}(X) = \lambda$$

## Central Limit Theorem

If $X_1, X_2, \ldots, X_n$ are i.i.d. random variables with mean $\mu$ and variance $\sigma^2$, then:
$$\frac{\bar{X} - \mu}{\sigma/\sqrt{n}} \xrightarrow{d} \mathcal{N}(0,1)$$
as $n \rightarrow \infty$, where $\bar{X} = \frac{1}{n}\sum_{i=1}^n X_i$.

## Markov Chains

A **Markov chain** is a sequence of random variables with the Markov property:
$$P(X_{n+1} = x_{n+1} | X_n = x_n, X_{n-1} = x_{n-1}, \ldots) = P(X_{n+1} = x_{n+1} | X_n = x_n)$$

### Transition Matrix
For a finite state space $S = \{s_1, s_2, \ldots, s_k\}$, the transition matrix $P$ has entries:
$$P_{ij} = P(X_{n+1} = s_j | X_n = s_i)$$

## Applications

Probability theory is used in:
- **Statistics**: Data analysis and inference
- **Machine Learning**: Algorithm design and evaluation
- **Finance**: Risk assessment and portfolio theory
- **Physics**: Quantum mechanics and statistical mechanics

---

*Tags: probability, statistics, maths*
