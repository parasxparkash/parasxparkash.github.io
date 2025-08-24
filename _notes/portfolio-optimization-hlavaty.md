---
layout: note
title: "Notes on 'Portfolio Optimization Methods, Their Application and Evaluation' by Tomas Hlavaty (to Chapter 6)"
tags: [portfolio-optimization, quantitative-finance, risk-management, performance, notes]
mathjax: true
---

# 1. Introduction

- "Investing in knowledge yields the best returns" — Benjamin Franklin.
- Investment philosophy = a consistent, coherent approach applied to portfolio management.
- Portfolio management tools:
  1. Asset allocation
  2. Security selection (allocation)
  3. Market timing
- Asset allocation has the largest impact on performance. Diversify across asset classes (equities, bonds, cash, derivatives, etc.).
- Thesis structure: Theory (portfolio theory, optimization, management) + Practice (experimental comparison of optimizers). Key questions:
  - Which optimizer performs best among selected methods?
  - Active vs passive portfolio management?

---

# 2. Portfolio Theory

## 2.1 Time Dimension

- Time value of money (TVM): a dollar today > a dollar in the future. Interest rate links differently dated cash flows.

- Discrete compounding (m times/year, for n years):
  $$\text{FV} = \left(1 + \frac{i}{m}\right)^{mn}, \quad \text{PV} = \frac{1}{\left(1 + \frac{i}{m}\right)^{mn}}$$

- Continuous compounding (rate i, years n):
  $$\text{FV} = e^{in}, \quad \text{PV} = e^{-in}$$

## 2.2 Risk Dimension

- Risk = deviation of realized returns from expectations (downside deviations are undesirable).
- Standard deviation is the most-used risk measure; others: beta, semivariance, VaR, expected shortfall.

### 2.2.1 Utility Functions

Properties (wealth $W$):
- $u(W) > 0$, increasing in $W$; $u'(W) > 0$.
- Diminishing marginal utility: $u''(W) < 0$ (concavity).

Common forms:
- Log: $$u(W) = \ln W$$
- Exponential (CARA form): $$u(W) = 1 - e^{-\nu W} \;\text{or}\; u(W) = -e^{-\alpha W}$$
- Power (CRRA): $$u(W) = \frac{W^{1-\gamma}}{1-\gamma},\; \gamma \neq 1$$
- Quadratic: $$u(W) = W - \frac{b}{2} W^2,\; b>0$$

### 2.2.2 Expected Utility Criterion

- For lottery $L$ with outcomes $x,y$ and probability $\pi$ for $x$:
  $$E[U(L)] = \pi\, u(x) + (1-\pi)\, u(y)$$
- For asset $A$ with returns $\{r_i\}_{i=1}^n$ and probabilities $\{\pi_i\}$:
  $$E[U(r_A)] = \sum_{i=1}^n \pi_i\, u(r_i)$$

### 2.2.3 Risk Aversion

- Weak risk aversion: $$u(E[W]) \ge E[u(W)]$$
- Absolute risk aversion: $$\alpha(W) = -\frac{u''(W)}{u'(W)}$$
- Relative risk aversion: $$\rho(W) = W\, \alpha(W) = -\frac{W\, u''(W)}{u'(W)}$$
- Risk tolerance: $$\tau(W) = \frac{1}{\alpha(W)} = -\frac{u'(W)}{u''(W)}$$
- CARA utility: $$u(W) = -e^{-\alpha W}$$
- CRRA utility: $$u(W) = \frac{W^{1-\rho}}{1-\rho}$$

## 2.3 Modern Portfolio Theory (MPT)

- Markowitz (1952). Mean–variance framework; assumptions: perfect markets, no frictions, risk-free asset, rational investors, Gaussian returns, quadratic utility, etc.

### 2.3.1 Canonical Portfolio Problem

- Risky assets $r_1,\dots,r_n$ and risk-free return $r_f$.
- Capital proportions: $$w_f + \sum_{i=1}^n w_i = 1$$
- Max expected utility:
  $$\max_{w_1,\dots,w_n} \; E\big[u\big(w_f(1+r_f) + \sum_{i=1}^n w_i (r_i - r_f)\big)\big]$$
- FOC (schematic): $$E\big[u'(\cdot)\, (r_i - r_f)\big] = 0$$
- Implication: total risky weight $w_r = \sum_i w_i > 0 \iff E(r_R) > r_f$.

### 2.3.2 Mean–Variance Criterion

- Utility: $$U = E(r) - \tfrac{1}{2} A \sigma^2$$
- Dominance: $A$ dominates $B$ if $\mu_A \ge \mu_B$ and $\sigma_A < \sigma_B$ (or strictly in one dimension and weakly in the other).

## 2.4 Efficient Frontier

- Return vector: $$\mu = [E(r_1),\dots,E(r_n)]^T$$
- Weights: $$w = [w_1,\dots,w_n]^T$$
- Covariance matrix $\Sigma$.
- Portfolio return and variance: $$E(r_p)=w^T\mu,\quad \sigma_p^2 = w^T\Sigma w$$

### 2.4.1 Risky Assets Only

- Two-asset volatility:
  $$\sigma_p = \sqrt{w_A^2\sigma_A^2 + w_B^2\sigma_B^2 + 2 w_A w_B \sigma_A \sigma_B \rho_{A,B}}$$
- Diversification reduces risk as correlation decreases.

### 2.4.2 With Risk-Free Asset

- If risky asset $A$ and risk-free asset: $$\sigma_p = w_A \sigma_A,\; w_A + w_f = 1$$
- Capital Allocation Line (CAL): straight line from $r_f$ with slope equal to Sharpe ratio of tangency portfolio.

---

# 3. Return Generating Models

## 3.1 CAPM

- $$E[r_i] = r_f + \beta_i (E[r_M] - r_f)$$
- Portfolio: $$E[r_p] = r_f + \beta_p (E[r_M] - r_f)$$

## 3.2 Market Model (Single-Factor)

- $$r_A = \alpha_A + \beta_A r_M + \epsilon_A$$
- In excess returns: $$r_A - r_f = \alpha_A + \beta_A (r_M - r_f) + \epsilon_A$$
- Assumptions: $E[\epsilon_A]=0$, $\mathrm{Cov}(r_M,\epsilon_A)=0$, $\mathrm{Cov}(\epsilon_A,\epsilon_B)=0$ for $A\ne B$.
- Expected return: $$E[r_A] = \alpha_A + \beta_A E[r_M]$$
- Variance: $$\mathrm{Var}(r_A) = \beta_A^2\sigma_M^2 + \sigma_{\epsilon_A}^2$$
- Covariance: $$\mathrm{Cov}(r_A,r_B) = \beta_A \beta_B \sigma_M^2$$

### 3.2.1 Diversification

- Beta: $$\beta_A = \frac{\mathrm{Cov}(r_A,r_M)}{\mathrm{Var}(r_M)}$$
- Portfolio beta: $$\beta_p = \sum_i w_i \beta_i$$
- Idiosyncratic risk diversifies away as $n\to\infty$.

---

# 4. Portfolio Optimization

## 4.1 Mean–Variance Optimization (MVO)

### 4.1.1 Risky Assets Only

- Problem:
  $$\min_w \tfrac{1}{2} w^T\Sigma w \quad \text{s.t.} \quad w^T\mu = r_R,\; w^T \mathbf{1} = 1$$
- Lagrangian:
  $$\mathcal{L} = \tfrac{1}{2} w^T \Sigma w + \lambda (r_R - w^T \mu) + \gamma (1 - w^T \mathbf{1})$$
- Constants: $$A = \mathbf{1}^T\Sigma^{-1}\mu,\; B = \mu^T\Sigma^{-1}\mu,\; C = \mathbf{1}^T\Sigma^{-1}\mathbf{1},\; D = BC - A^2$$
- Multipliers: $$\lambda = \frac{C r_R - A}{D},\; \gamma = \frac{B - A r_R}{D}$$
- Weights: $$w = \lambda\, \Sigma^{-1}\mu + \gamma\, \Sigma^{-1} \mathbf{1} = \frac{C r_R - A}{D}\, \Sigma^{-1}\mu + \frac{B - A r_R}{D}\, \Sigma^{-1} \mathbf{1}$$
- Frontier: $$\sigma_p^2 = \frac{C}{D}\left(\mu_p - \frac{A}{C}\right)^2 + \frac{1}{C}$$
- Global minimum variance (GMV): $$\mu_{gmv} = \frac{A}{C},\; \sigma_{gmv}^2 = \frac{1}{C}$$

### 4.1.2 With Risk-Free Asset

- Problem: $$\min_w \tfrac{1}{2} w^T\Sigma w \;\text{s.t.}\; r_f + (\mu - r_f \mathbf{1})^T w = r_R$$
- Let $$H = (\mu - r_f\mathbf{1})^T \Sigma^{-1} (\mu - r_f\mathbf{1}) = B - 2 A r_f + C r_f^2$$
- Weights on risky assets:
  $$w = \frac{r_R - r_f}{\,\sqrt{H}\,\sqrt{H}\,}\, \Sigma^{-1} (\mu - r_f\mathbf{1}) = \frac{r_R - r_f}{H}\, \Sigma^{-1} (\mu - r_f\mathbf{1})$$
- Tangency portfolio (fully invested in risky assets):
  $$w_T = \frac{1}{A - C r_f} \Sigma^{-1} (\mu - r_f\mathbf{1})$$
- Risk–return along CAL: $$\mu_p = r_f + \sigma_p\, \sqrt{H},\quad \sigma_p^2 = \frac{(\mu_p - r_f)^2}{H}$$

### 4.1.3 Portfolio Choice

- Mean–variance utility: $$U = \mu_p - \tfrac{1}{2} A \sigma_p^2$$
- Optimal risky allocation: $$w_r = \frac{1}{A} \Sigma^{-1} (\mu - r_f\mathbf{1})$$
- Choose mix between risk-free asset and tangency portfolio based on $A$.

### 4.1.4 Limitations of MVO

- Estimation error sensitivity, concentrated weights, non-normal returns, single-period horizon, unrealistic quadratic utility, ignores costs/taxes, unstable correlations, assumes unlimited divisibility/shorting.

## 4.2 Treynor–Black (TB)

- Combine market (passive) with active portfolio of securities with $\alpha \ne 0$.
- Aggregates: $$\alpha_P = \sum w_i \alpha_i,\; \beta_P = \sum w_i \beta_i,\; \sigma_{\epsilon_P}^2 = \sum w_i^2 \sigma_{\epsilon_i}^2$$
- Define $$w_0 = \frac{\alpha_A/\sigma_{\epsilon_A}^2}{E[r_M - r_f]/\sigma_M^2}$$
- Active weight: $$w_A = \frac{w_0}{1 + (1 - \beta_A) w_0}, \quad w_M = 1 - w_A$$
- Risk premium: $$E[r_p - r_f] = (w_M + w_A \beta_A) E[r_M - r_f] + w_A \alpha_A$$
- Variance: $$\sigma_p^2 = (w_M + w_A \beta_A)^2 \sigma_M^2 + (w_A \sigma_{\epsilon_A})^2$$
- Sharpe ratio: $$SR_p = \sqrt{SR_M^2 + \left(\tfrac{\alpha_A}{\sigma_{\epsilon_A}}\right)^2}$$

## 4.3 Black–Litterman (BL)

- Implied equilibrium excess returns: $$\Pi = \lambda \Sigma w_{mkt},\; \lambda = \frac{E[r_M] - r_f}{\sigma_M^2}$$
- Investor views: matrix $P$, view vector $Q$, uncertainty $\Omega$; scalar $\tau$.
- Posterior returns:
  $$E(\bar{\mu}) = \left[(\tau \Sigma)^{-1} + P^T \Omega^{-1} P\right]^{-1} \left[(\tau \Sigma)^{-1}\Pi + P^T \Omega^{-1} Q\right]$$
- Optimal weights: $$w = (\lambda \Sigma)^{-1} E(\bar{\mu})$$
- With no views, recover market-cap weights.

## 4.4 Naïve Methods

- 1/N: $$w_i = 1/n$$
- Sharpe Ratio Model: $$SR_i = \frac{\mu_i - r_f}{\sigma_i},\; w_i = \frac{SR_i}{\sum_j SR_j}$$
- Most Diversified Portfolio (MDP):
  $$DR = \frac{w^T \sigma}{\sqrt{w^T \Sigma w}}, \quad w_{mdp} = \frac{\Sigma^{-1} \sigma}{\mathbf{1}^T \Sigma^{-1} \sigma}$$

---

# 5. Portfolio Performance

## 5.1 Metrics

- Time-Weighted Return (TWR):
  $$\text{TWR} = \left(\prod_{i=1}^n (1 + r_i)\right)^{1/n} - 1$$

- Effective Annual Return (EAR), for per-period $r$ and $n$ periods/year:
  $$\text{EAR} = (1 + r)^n - 1$$

- Standard Deviation (sample over $T$):
  $$\sigma = \sqrt{\frac{1}{T-1} \sum_{t=1}^T (r_t - \bar{r})^2}$$
  From market model: $$\sigma = \sqrt{\beta^2 \sigma_M^2 + \sigma_\epsilon^2}$$

- Beta (systematic risk): asset/portfolio sensitivity to market.

- Sharpe Ratio (SR):
  $$SR = \frac{r_p - r_f}{\sigma_p}$$

- Treynor Ratio (TR):
  $$TR = \frac{r_p - r_f}{\beta_p}$$

- Jensen's Alpha (CAPM alpha):
  $$r_{p,t} - r_{f,t} = \alpha_p + \beta_p (r_{M,t} - r_{f,t}) + \epsilon_{p,t}$$
  Ex post: $$\alpha_p = r_p - r_f - \beta_p (r_M - r_f)$$

- Information Ratio (IR):
  $$IR = \frac{r_p - r_M}{\sigma_{er}}, \quad \sigma_{er} = \sqrt{\frac{1}{T} \sum_{t=1}^T (er_t - \bar{er})^2}}$$
  Alternative (via regression): $$IR_p = \frac{\alpha_p}{\sigma_\epsilon}$$

- M-squared (M²):
  $$M^2 = r_p + SR_p (\sigma_M - \sigma_p) = r_f + \frac{\sigma_M}{\sigma_p} (r_p - r_f)$$

---

# 6. Portfolio Management

- Process aligned to Investment Policy Statement (IPS): objectives, risk profile, constraints.

## Planning
- Form market expectations; select strategy: Passive, Active, Semi-active.
- Strategic Asset Allocation (SAA) as long-term policy; Tactical Asset Allocation (TAA) for short-term deviations.

## Execution
- Implement SAA; execute TAA tilts when justified.

## Feedback
- Monitor markets, portfolio, and investor circumstances.
- Rebalance to targets:
  - Calendar-based (e.g., monthly/quarterly)
  - Tolerance band triggers (percentage-of-portfolio)
- Evaluate performance using Chapter 5 metrics.

- Passive: buy-and-hold or indexing.
- Active: exploit mispricings to seek alpha.
- Semi-active: blend of both with risk controls.
