# Financial Mathematics Notes

## Time Value of Money

The fundamental principle that money available now is worth more than the same amount in the future.

### Present Value (PV)
$$PV = \frac{FV}{(1 + r)^n}$$

Where:
- $FV$ = Future Value
- $r$ = Interest rate per period
- $n$ = Number of periods

### Future Value (FV)
$$FV = PV \cdot (1 + r)^n$$

## Compound Interest

### Continuous Compounding
$$FV = PV \cdot e^{rt}$$

Where $e$ is Euler's number ($\approx 2.71828$).

### Periodic Compounding
$$FV = PV \cdot \left(1 + \frac{r}{m}\right)^{mt}$$

Where $m$ is the number of compounding periods per year.

## Annuities

### Ordinary Annuity (Payments at End)
$$PV = PMT \cdot \frac{1 - (1 + r)^{-n}}{r}$$
$$FV = PMT \cdot \frac{(1 + r)^n - 1}{r}$$

### Annuity Due (Payments at Beginning)
$$PV = PMT \cdot \frac{1 - (1 + r)^{-n}}{r} \cdot (1 + r)$$
$$FV = PMT \cdot \frac{(1 + r)^n - 1}{r} \cdot (1 + r)$$

## Bond Valuation

### Bond Price
$$P = \sum_{t=1}^{n} \frac{C}{(1 + r)^t} + \frac{F}{(1 + r)^n}$$

Where:
- $P$ = Bond price
- $C$ = Coupon payment
- $F$ = Face value
- $r$ = Yield to maturity
- $n$ = Number of periods

### Yield to Maturity (YTM)
The internal rate of return (IRR) that equates the present value of cash flows to the bond price.

## Portfolio Theory

### Expected Return
$$E[R_p] = \sum_{i=1}^{n} w_i \cdot E[R_i]$$

Where $w_i$ is the weight of asset $i$ in the portfolio.

### Portfolio Variance
$$\sigma_p^2 = \sum_{i=1}^{n} \sum_{j=1}^{n} w_i w_j \sigma_i \sigma_j \rho_{ij}$$

Where $\rho_{ij}$ is the correlation between assets $i$ and $j$.

### Sharpe Ratio
$$S = \frac{E[R_p] - R_f}{\sigma_p}$$

Where $R_f$ is the risk-free rate.

## Black-Scholes Model

### Call Option Price
$$C = S_0 N(d_1) - Ke^{-rT} N(d_2)$$

### Put Option Price
$$P = Ke^{-rT} N(-d_2) - S_0 N(-d_1)$$

Where:
$$d_1 = \frac{\ln(S_0/K) + (r + \sigma^2/2)T}{\sigma\sqrt{T}}$$
$$d_2 = d_1 - \sigma\sqrt{T}$$

And:
- $S_0$ = Current stock price
- $K$ = Strike price
- $r$ = Risk-free rate
- $T$ = Time to expiration
- $\sigma$ = Volatility
- $N(x)$ = Cumulative normal distribution function

## Risk Measures

### Value at Risk (VaR)
The maximum expected loss over a given time period at a given confidence level.

### Conditional Value at Risk (CVaR)
$$CVaR = E[X|X > VaR]$$

The expected loss given that the loss exceeds VaR.

## Monte Carlo Simulation

Used for pricing complex financial instruments:
1. Generate random price paths
2. Calculate payoff for each path
3. Average payoffs and discount to present value

### Example: European Call Option
```python
# Pseudocode
for i in range(num_simulations):
    S_T = S_0 * exp((r - 0.5*sigma^2)*T + sigma*sqrt(T)*Z)
    payoff = max(S_T - K, 0)
    option_price += payoff * exp(-r*T)
option_price /= num_simulations
```

## Applications

Financial mathematics is used in:
- **Investment Banking**: Derivatives pricing
- **Risk Management**: Portfolio optimization
- **Insurance**: Actuarial science
- **Quantitative Trading**: Algorithm development

---

*Tags: finance, maths, probability*
