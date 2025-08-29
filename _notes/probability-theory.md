---
layout: note
title: "Probability Theory"
date: 2024-01-08
category: mathematics
tags: [probability, statistics, mathematics]
mathjax: true
description: "Fundamental concepts in probability theory including random variables, distributions, and stochastic processes with applications to quantitative finance."
keywords: "probability theory, random variables, distributions, stochastic processes, quantitative finance, statistics"
author: Paras Parkash
reading_time: 10
---

# Probability Theory

Probability theory is the branch of mathematics concerned with probability. It provides a mathematical framework for analyzing random phenomena and uncertainty.

## Basic Concepts

### Sample Space and Events

The **sample space** $\Omega$ is the set of all possible outcomes of an experiment.

An **event** $A$ is a subset of the sample space: $A \subseteq \Omega$.

### Probability Measure

A **probability measure** $P$ is a function $P: \mathcal{F} \to [0,1]$ where $\mathcal{F}$ is a $\sigma$-algebra of subsets of $\Omega$, satisfying:

1. **Non-negativity**: $P(A) \geq 0$ for all $A \in \mathcal{F}$
2. **Normalization**: $P(\Omega) = 1$
3. **Countable additivity**: For disjoint events $A_1, A_2, \ldots$:
   $$P\left(\bigcup_{i=1}^{\infty} A_i\right) = \sum_{i=1}^{\infty} P(A_i)$$

## Conditional Probability

The **conditional probability** of event $A$ given event $B$ is:
$$P(A|B) = \frac{P(A \cap B)}{P(B)}$$
provided $P(B) > 0$.

### Bayes' Theorem

For events $A$ and $B$ with $P(A), P(B) > 0$:
$$P(A|B) = \frac{P(B|A)P(A)}{P(B)}$$

More generally, for a partition $\{B_1, B_2, \ldots, B_n\}$ of $\Omega$:
$$P(B_i|A) = \frac{P(A|B_i)P(B_i)}{\sum_{j=1}^n P(A|B_j)P(B_j)}$$

## Random Variables

A **random variable** $X$ is a measurable function $X: \Omega \to \mathbb{R}$.

### Distribution Function

The **cumulative distribution function** (CDF) of $X$ is:
$$F_X(x) = P(X \leq x)$$

### Discrete Random Variables

For discrete random variables, the **probability mass function** (PMF) is:
$$p_X(x) = P(X = x)$$

### Continuous Random Variables

For continuous random variables, the **probability density function** (PDF) $f_X(x)$ satisfies:
$$P(a < X \leq b) = \int_a^b f_X(x) \, dx$$

## Expectation and Variance

### Expected Value

For a discrete random variable:
$$E[X] = \sum_{x} x \cdot P(X = x)$$

For a continuous random variable:
$$E[X] = \int_{-\infty}^{\infty} x \cdot f_X(x) \, dx$$

### Variance

The **variance** of $X$ is:
$$\text{Var}(X) = E[(X - E[X])^2] = E[X^2] - (E[X])^2$$

The **standard deviation** is $\sigma_X = \sqrt{\text{Var}(X)}$.

## Common Distributions

### Bernoulli Distribution

$X \sim \text{Bernoulli}(p)$ where $P(X = 1) = p$ and $P(X = 0) = 1-p$.

- $E[X] = p$
- $\text{Var}(X) = p(1-p)$

### Binomial Distribution

$X \sim \text{Binomial}(n, p)$ represents the number of successes in $n$ independent Bernoulli trials:
$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$

- $E[X] = np$
- $\text{Var}(X) = np(1-p)$

### Poisson Distribution

$X \sim \text{Poisson}(\lambda)$ models the number of events in a fixed interval:
$$P(X = k) = \frac{\lambda^k e^{-\lambda}}{k!}$$

- $E[X] = \lambda$
- $\text{Var}(X) = \lambda$

### Normal Distribution

$X \sim \mathcal{N}(\mu, \sigma^2)$ has PDF:
$$f_X(x) = \frac{1}{\sqrt{2\pi\sigma^2}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}$$

- $E[X] = \mu$
- $\text{Var}(X) = \sigma^2$

### Exponential Distribution

$X \sim \text{Exponential}(\lambda)$ has PDF:
$$f_X(x) = \lambda e^{-\lambda x} \text{ for } x \geq 0$$

- $E[X] = \frac{1}{\lambda}$
- $\text{Var}(X) = \frac{1}{\lambda^2}$

## Limit Theorems

### Law of Large Numbers

**Weak Law**: For i.i.d. random variables $X_1, X_2, \ldots$ with $E[X_i] = \mu$:
$$\frac{1}{n}\sum_{i=1}^n X_i \xrightarrow{P} \mu$$

**Strong Law**: 
$$P\left(\lim_{n \to \infty} \frac{1}{n}\sum_{i=1}^n X_i = \mu\right) = 1$$

### Central Limit Theorem

For i.i.d. random variables $X_1, X_2, \ldots$ with $E[X_i] = \mu$ and $\text{Var}(X_i) = \sigma^2$:
$$\frac{\sum_{i=1}^n X_i - n\mu}{\sqrt{n\sigma^2}} \xrightarrow{d} \mathcal{N}(0,1)$$

## Bayesian Inference

### Prior and Posterior

In Bayesian inference, we update our beliefs about parameter $\theta$ given data $x$:

- **Prior**: $\pi(\theta)$
- **Likelihood**: $L(\theta|x) = f(x|\theta)$
- **Posterior**: $\pi(\theta|x) = \frac{L(\theta|x)\pi(\theta)}{m(x)}$

where $m(x) = \int L(\theta|x)\pi(\theta) \, d\theta$ is the marginal likelihood.

### Conjugate Priors

A prior $\pi(\theta)$ is **conjugate** to likelihood $L(\theta|x)$ if the posterior has the same functional form as the prior.

**Example**: For $X|\theta \sim \text{Binomial}(n, \theta)$ and $\theta \sim \text{Beta}(\alpha, \beta)$:
$$\theta|x \sim \text{Beta}(\alpha + x, \beta + n - x)$$

## Stochastic Processes

### Markov Chains

A sequence of random variables $\{X_n\}$ is a **Markov chain** if:
$$P(X_{n+1} = j | X_n = i, X_{n-1} = i_{n-1}, \ldots, X_0 = i_0) = P(X_{n+1} = j | X_n = i)$$

The **transition probability** is $p_{ij} = P(X_{n+1} = j | X_n = i)$.

### Poisson Process

A **Poisson process** with rate $\lambda$ is a counting process $\{N(t), t \geq 0\}$ where:

1. $N(0) = 0$
2. Independent increments
3. $N(t+s) - N(s) \sim \text{Poisson}(\lambda t)$

### Brownian Motion

**Brownian motion** $\{B(t), t \geq 0\}$ satisfies:

1. $B(0) = 0$
2. Independent increments
3. $B(t) - B(s) \sim \mathcal{N}(0, t-s)$ for $t > s$
4. Continuous paths

## Applications

### Finance
- **Black-Scholes Model**: Stock prices follow geometric Brownian motion
- **Value at Risk**: Quantifying financial risk
- **Portfolio Optimization**: Markowitz mean-variance theory

### Machine Learning
- **Bayesian Classification**: Using Bayes' theorem for classification
- **Gaussian Processes**: Non-parametric Bayesian approach
- **Monte Carlo Methods**: Sampling-based algorithms

### Quality Control
- **Statistical Process Control**: Monitoring manufacturing processes
- **Reliability Theory**: Modeling system failures

## Exercises

1. **Prove** that for any two events $A$ and $B$:
   $$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

2. **Show** that if $X \sim \mathcal{N}(\mu, \sigma^2)$, then $\frac{X - \mu}{\sigma} \sim \mathcal{N}(0, 1)$.

3. **Derive** the moment generating function for the exponential distribution.

4. **Prove** the weak law of large numbers using Chebyshev's inequality.

## Further Reading

- Billingsley, P. *Probability and Measure*
- Ross, S. *A First Course in Probability*
- Durrett, R. *Probability: Theory and Examples*

---

*Tags: probability, statistics, bayesian inference, stochastic processes*
