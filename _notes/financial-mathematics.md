---
layout: note
title: "Financial Mathematics"
tags: [finance, mathematics, derivatives, quantitative-finance]
category: finance
mathjax: true
---

# Financial Mathematics

Financial mathematics applies mathematical methods to solve problems in finance, including pricing derivatives, managing risk, and optimizing portfolios.

## Time Value of Money

### Present and Future Value

The **present value** (PV) of a future cash flow $FV$ received after time $t$ at interest rate $r$ is:
$$PV = \frac{FV}{(1 + r)^t}$$

The **future value** of a present investment $PV$ after time $t$ is:
$$FV = PV(1 + r)^t$$

### Continuous Compounding

With continuous compounding at rate $r$:
$$FV = PV \cdot e^{rt}$$
$$PV = FV \cdot e^{-rt}$$

### Annuities

The present value of an **ordinary annuity** with payment $PMT$ for $n$ periods at rate $r$:
$$PV = PMT \cdot \frac{1 - (1 + r)^{-n}}{r}$$

For a **perpetuity** (infinite annuity):
$$PV = \frac{PMT}{r}$$

## Bond Pricing

### Zero-Coupon Bonds

The price of a zero-coupon bond with face value $F$ maturing in time $T$ at yield $y$ is:
$$P = F \cdot e^{-yT}$$

### Coupon Bonds

For a bond with coupon rate $c$, face value $F$, and yield $y$:
$$P = \sum_{t=1}^{n} \frac{c \cdot F}{(1 + y)^t} + \frac{F}{(1 + y)^n}$$

### Duration and Convexity

**Modified duration** measures price sensitivity to yield changes:
$$D_{mod} = -\frac{1}{P} \frac{\partial P}{\partial y}$$

**Convexity** measures the curvature of the price-yield relationship:
$$C = \frac{1}{P} \frac{\partial^2 P}{\partial y^2}$$

Price change approximation:
$$\frac{\Delta P}{P} \approx -D_{mod} \Delta y + \frac{1}{2} C (\Delta y)^2$$

## Option Pricing

### Black-Scholes Model

For a European call option on a non-dividend-paying stock:

**Assumptions:**
- Stock price follows geometric Brownian motion: $dS = \mu S dt + \sigma S dW$
- Constant risk-free rate $r$ and volatility $\sigma$
- No transaction costs or taxes

**Black-Scholes Formula:**
$$C = S_0 \Phi(d_1) - K e^{-rT} \Phi(d_2)$$

where:
$$d_1 = \frac{\ln(S_0/K) + (r + \sigma^2/2)T}{\sigma\sqrt{T}}$$
$$d_2 = d_1 - \sigma\sqrt{T}$$

and $\Phi(\cdot)$ is the standard normal CDF.

**Put Option (Put-Call Parity):**
$$P = K e^{-rT} \Phi(-d_2) - S_0 \Phi(-d_1)$$

### The Greeks

Option sensitivities to various parameters:

**Delta** (price sensitivity):
$$\Delta = \frac{\partial C}{\partial S} = \Phi(d_1)$$

**Gamma** (delta sensitivity):
$$\Gamma = \frac{\partial^2 C}{\partial S^2} = \frac{\phi(d_1)}{S_0 \sigma \sqrt{T}}$$

**Theta** (time decay):
$$\Theta = -\frac{\partial C}{\partial T} = -\frac{S_0 \phi(d_1) \sigma}{2\sqrt{T}} - rK e^{-rT} \Phi(d_2)$$

**Vega** (volatility sensitivity):
$$\nu = \frac{\partial C}{\partial \sigma} = S_0 \phi(d_1) \sqrt{T}$$

**Rho** (interest rate sensitivity):
$$\rho = \frac{\partial C}{\partial r} = KT e^{-rT} \Phi(d_2)$$

### Binomial Model

In the binomial model, stock price moves up by factor $u$ or down by factor $d$ each period.

**Risk-neutral probability:**
$$q = \frac{e^{r\Delta t} - d}{u - d}$$

**Option value:**
$$C = e^{-r\Delta t}[qC_u + (1-q)C_d]$$

where $C_u$ and $C_d$ are option values in up and down states.

## Portfolio Theory

### Mean-Variance Optimization

For a portfolio with weights $w = (w_1, \ldots, w_n)$:

**Expected return:**
$$\mu_p = w^T \mu$$

**Portfolio variance:**
$$\sigma_p^2 = w^T \Sigma w$$

where $\mu$ is the vector of expected returns and $\Sigma$ is the covariance matrix.

### Efficient Frontier

The **minimum variance portfolio** solves:
$$\min_{w} w^T \Sigma w \quad \text{subject to} \quad w^T \mathbf{1} = 1$$

Solution:
$$w_{mvp} = \frac{\Sigma^{-1} \mathbf{1}}{\mathbf{1}^T \Sigma^{-1} \mathbf{1}}$$

### Capital Asset Pricing Model (CAPM)

The expected return of asset $i$ is:
$$E[R_i] = R_f + \beta_i (E[R_m] - R_f)$$

where:
- $R_f$ is the risk-free rate
- $R_m$ is the market return
- $\beta_i = \frac{\text{Cov}(R_i, R_m)}{\text{Var}(R_m)}$ is the beta coefficient

## Interest Rate Models

### Vasicek Model

Short rate follows:
$$dr_t = a(b - r_t)dt + \sigma dW_t$$

where $a$ is mean reversion speed, $b$ is long-term mean, and $\sigma$ is volatility.

**Bond price:**
$$P(t,T) = A(t,T) e^{-B(t,T) r_t}$$

where:
$$B(t,T) = \frac{1 - e^{-a(T-t)}}{a}$$
$$A(t,T) = \exp\left(\frac{(B(t,T) - T + t)(a^2 b - \sigma^2/2)}{a^2} - \frac{\sigma^2 B(t,T)^2}{4a}\right)$$

### Cox-Ingersoll-Ross (CIR) Model

$$dr_t = a(b - r_t)dt + \sigma \sqrt{r_t} dW_t$$

This ensures non-negative interest rates.

## Risk Management

### Value at Risk (VaR)

**Parametric VaR** (assuming normal returns):
$$\text{VaR}_\alpha = -(\mu - z_\alpha \sigma) \cdot V$$

where $z_\alpha$ is the $\alpha$-quantile of standard normal distribution.

**Historical Simulation VaR:**
Use empirical distribution of historical returns.

**Monte Carlo VaR:**
Simulate future portfolio values using stochastic models.

### Expected Shortfall (Conditional VaR)

$$\text{ES}_\alpha = E[\text{Loss} | \text{Loss} > \text{VaR}_\alpha]$$

### Risk-Neutral Valuation

Under the risk-neutral measure $\mathbb{Q}$:
$$C_0 = e^{-rT} E^\mathbb{Q}[C_T]$$

The **Radon-Nikodym derivative** transforms from physical to risk-neutral measure:
$$\frac{d\mathbb{Q}}{d\mathbb{P}} = e^{-\frac{1}{2}\theta^2 T - \theta W_T}$$

where $\theta$ is the market price of risk.

## Exotic Options

### Asian Options

**Arithmetic average:**
$$\text{Payoff} = \max\left(\frac{1}{n}\sum_{i=1}^n S_{t_i} - K, 0\right)$$

**Geometric average:**
$$\text{Payoff} = \max\left(\left(\prod_{i=1}^n S_{t_i}\right)^{1/n} - K, 0\right)$$

### Barrier Options

**Up-and-out call:**
$$\text{Payoff} = \begin{cases}
\max(S_T - K, 0) & \text{if } \max_{0 \leq t \leq T} S_t < H \\
0 & \text{otherwise}
\end{cases}$$

### Lookback Options

**Fixed strike:**
$$\text{Payoff} = \max\left(\max_{0 \leq t \leq T} S_t - K, 0\right)$$

**Floating strike:**
$$\text{Payoff} = S_T - \min_{0 \leq t \leq T} S_t$$

## Numerical Methods

### Monte Carlo Simulation

For European options:
1. Simulate $N$ paths of $S_T$
2. Calculate payoff for each path
3. Average and discount: $C_0 = e^{-rT} \frac{1}{N} \sum_{i=1}^N \text{Payoff}_i$

**Variance Reduction:**
- **Antithetic variables**: Use $W$ and $-W$
- **Control variates**: Use known analytical solution
- **Importance sampling**: Change probability measure

### Finite Difference Methods

Discretize the Black-Scholes PDE:
$$\frac{\partial C}{\partial t} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 C}{\partial S^2} + rS\frac{\partial C}{\partial S} - rC = 0$$

**Explicit scheme:**
$$C_{i,j+1} = aC_{i-1,j} + bC_{i,j} + cC_{i+1,j}$$

**Implicit scheme:**
$$aC_{i-1,j+1} + bC_{i,j+1} + cC_{i+1,j+1} = C_{i,j}$$

## Applications

### Algorithmic Trading

**Mean reversion strategy:**
$$\text{Signal} = \frac{S_t - \text{MA}(S_t)}{\text{StdDev}(S_t)}$$

**Momentum strategy:**
$$\text{Signal} = \frac{S_t - S_{t-k}}{S_{t-k}}$$

### Credit Risk

**Merton Model:**
Firm value follows:
$$dV_t = \mu V_t dt + \sigma V_t dW_t$$

Default occurs when $V_T < D$ (debt level).

**Credit spread:**
$$s = -\frac{1}{T} \ln\left(\frac{P_{\text{risky}}}{P_{\text{risk-free}}}\right)$$

## Exercises

1. **Calculate** the price of a European call option using Black-Scholes formula with $S_0 = 100$, $K = 105$, $r = 0.05$, $\sigma = 0.2$, $T = 0.25$.

2. **Derive** the put-call parity relationship for European options.

3. **Show** that delta-hedging eliminates the risk in a Black-Scholes world.

4. **Implement** a two-period binomial model for option pricing.

## Further Reading

- Hull, J. *Options, Futures, and Other Derivatives*
- Shreve, S. *Stochastic Calculus for Finance*
- Björk, T. *Arbitrage Theory in Continuous Time*

---

*Tags: quantitative finance, derivatives pricing, risk management, portfolio theory*
