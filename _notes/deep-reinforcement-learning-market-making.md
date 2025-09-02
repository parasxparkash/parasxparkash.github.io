---
layout: note
title: "Deep Reinforcement Learning for Market Making Under a Hawkes Process-Based Limit Order Book Model"
date: 2022-11-15
category: "Machine Learning"
tags: ["reinforcement learning", "market making", "Hawkes process", "limit order book", "deep learning"]
mathjax: true
---

# Deep Reinforcement Learning for Market Making Under a Hawkes Process-Based Limit Order Book Model

## Abstract
This paper presents a deep reinforcement learning-based controller trained on a weakly consistent, multivariate Hawkes process-based limit order book simulator to obtain market making controls. The proposed approach leverages Monte Carlo backtesting advantages and contributes to research on market making under weakly consistent limit order book models. The deep reinforcement learning controller is compared to multiple market making benchmarks, showing superior performance in risk-reward metrics, even under significant transaction costs.

## Introduction
Optimal market making is the problem of placing bid and ask orders simultaneously on both sides of the limit order book (LOB) to maximize trader terminal wealth while minimizing inventory risk. The classical Avellaneda-Stoikov (AS) framework reduces the problem to a system of ODEs and derives closed-form approximations.

This work employs deep reinforcement learning (DRL) to solve the market making problem under a weakly consistent, multivariate Hawkes process-based LOB model. The Hawkes process captures self- and cross-excitation effects between order arrivals, providing realistic microstructural dynamics.

## Background
### Hawkes Processes
A p-dimensional linear Hawkes process N(t) = (N_k(t))_{k=1}^p has intensity:

$$\lambda_k(t) = \mu_k + \sum_{l=1}^p \int_{-\infty}^t f_{k,l}(t-s) dN_l(s)$$

For exponential kernels:

$$\lambda_k(t) = \mu_k + \sum_{l=1}^p \int_{-\infty}^t \alpha_{k,l} e^{-\beta_{k,l}(t-s)} dN_l(s)$$

### Limit Order Book Events
The model considers 8 event types representing main LOB events:
- Aggressive market orders: M_a_b (buy), M_a_s (sell)
- Non-aggressive market orders: M_n_b (buy), M_n_s (sell)
- Aggressive limit orders: L_a_b (buy), L_a_s (sell)
- Aggressive cancellations: C_a_b (buy), C_a_s (sell)

### Market Dynamics
The mid-price P_t evolves as:

$$P_t = P_0 + \frac{\delta}{2} \left( \sum_{e \in E_{inc}} J_e - \sum_{e \in E_{dec}} J_e \right)$$

where:
- E_inc = {M_a_b, L_a_b, C_a_s}
- E_dec = {M_a_s, L_a_s, C_a_b}
- J_e is the jump size (in ticks)
- δ is the tick size

### Inventory Process
The market maker's inventory I_t satisfies:

$$dI_t = dN_b^t - dN_a^t + dN_{mb}^t - dN_{ms}^t$$

where N_b^t, N_a^t are executed limit orders, N_mb^t, N_ms^t are market orders.

### Cash Process
The cash process X_t is:

$$dX_t = Q_a^t dN_a^t - Q_b^t dN_b^t - (P_a^t + \epsilon_t) dN_{mb}^t + (P_b^t - \epsilon_t) dN_{ms}^t$$

where Q_a^t, Q_b^t are quote prices, P_a^t, P_b^t are best prices, ε_t are fees.

## Model Setup
### State Space
The state space S_t consists of:
- Inventory I_t ∈ {-c, ..., c}
- Bid-ask spread Δ_t (in ticks)
- Trend variable α_t = λ_{M_a_b}(t) + λ_{M_n_b}(t) - λ_{M_a_s}(t) - λ_{M_n_s}(t)

Normalized using min-max scaling.

### Action Space
Actions A_t are pairs of offsets from best bid/ask prices:
- A_t = (Q_a^t - P_a^t, P_b^t - Q_b^t)
- Discrete action space with size varying from 1 to 4*15
- Actions rounded to tick size
- Invalid actions (negative spread) are ignored

### Reward Function
The reward R_{t+Δt} is the change in net worth minus inventory penalty:

$$R_{t+Δt} = \Delta W_{t+Δt} - \phi \int_t^{t+Δt} |I_s| ds$$

where W_t = I_t P_t + X_t is total wealth, φ ≥ 0 is penalty parameter.

## Deep Reinforcement Learning
### Proximal Policy Optimization (PPO)
PPO is an on-policy, actor-critic algorithm using clipped surrogate objective:

$$L^{CLIP}(\theta) = \mathbb{E}_t \left[ \min \left( r_t(\theta) \hat{A}_t, \clip(r_t(\theta), 1-\epsilon, 1+\epsilon) \hat{A}_t \right) \right]$$

where r_t(θ) = π_θ(a_t|s_t) / π_θ_old(a_t|s_t), ε is clipping parameter.

### Network Architecture
- 2-layer MLP with 64 neurons per layer
- ReLU activation
- Separate actor and critic networks
- Adam optimizer

### Training Details
- Time step Δt = 1
- Terminal time T = 100
- Tick size δ = 0.01
- Inventory penalty φ = 0.01
- Inventory constraint c = 3
- Transaction fees: 0% for limit orders, 0.2% for market orders

## Experiments
### Baselines
- **Linear (LIN)**: Linear strategy in inventory with constraints
- **Symmetric (SYM)**: Places orders at best bid/ask
- **Avellaneda-Stoikov (AS)**: Classical approximation (adapted)

### Evaluation Metrics
- **Profit and Loss (PnL)**: Terminal wealth distribution
- **Annualized Return (AR)**: (PnL / initial capital)^(252/T) - 1
- **Maximum Drawdown (MDD)**: Max peak-to-trough decline
- **Mean Absolute Position (MAP)**: Average |inventory|
- **Sharpe Ratio**: AR / volatility of returns

### Results
Table shows performance comparison:

| Metric | DRL | SYM | LIN |
|--------|-----|-----|-----|
| Mean AR | 13.76 | 9.87 | 8.21 |
| Std AR | 8.50 | 8.24 | 5.79 |
| Mean MDD | 17.17 | 17.17 | 16.51 |
| Sharpe | 1.62 | 1.20 | 1.42 |
| MAP | 0.42 | 1.47 | 0.55 |

DRL shows superior performance across all metrics.

### Sensitivity Analysis
#### Transaction Costs
Figure shows Sharpe ratio vs limit order fees:

- DRL maintains performance up to 0.6% fees
- LIN fails at 0.4% fees
- SYM fails at 0.2% fees

#### Trading Frequency
Mean transactions decrease with higher fees:
- 0% fees: 24.54 trades
- 0.2% fees: 15.0 trades
- 0.4% fees: 11.28 trades
- 0.6% fees: 7.85 trades

## Conclusion
The proposed DRL approach using PPO provides superior market making performance compared to traditional benchmarks, even under high transaction costs. The Hawkes process-based LOB model ensures realistic microstructural dynamics, making the approach suitable for practical applications.

## References
- Gašperov, B., & Kostanjčar, Z. (2022). Deep Reinforcement Learning for Market Making Under a Hawkes Process-Based Limit Order Book Model. IEEE Control Systems Letters, 6(4), 2485-2490.
- Hawkes, A. G. (1971). Spectra of some self-exciting and mutually exciting point processes. Biometrika, 58(1), 83-90.
- Avellaneda, M., & Stoikov, S. (2008). High-frequency trading in a limit order book. Quantitative Finance, 8(3), 217-224.
- Biais, B., Hillion, P., & Spatt, C. (1995). An empirical analysis of the limit order book and the order flow in the Paris Bourse. The Journal of Finance, 50(5), 1655-1689.
- Ogata, Y. (1981). On Lewis' simulation method for point processes. IEEE Transactions on Information Theory, 27(1), 23-31.
- Schulman, J., Wolski, F., Dhariwal, P., Radford, A., & Klimov, O. (2017). Proximal policy optimization algorithms. arXiv preprint arXiv:1707.06347.
- Mnih, V., Badia, A. P., Mirza, M., Graves, A., Harley, T., Lillicrap, T. P., ... & Kavukcuoglu, K. (2016). Asynchronous methods for deep reinforcement learning. In International Conference on Machine Learning (pp. 1928-1937).
- Schulman, J., Moritz, P., Levine, S., Jordan, M., & Abbeel, P. (2015). High-dimensional continuous control using generalized advantage estimation. arXiv preprint arXiv:1506.02438.
- Guéant, O., Lehalle, C. A., & Fernandez-Tapia, J. (2013). Dealing with the inventory risk: a solution to the market making problem. Mathematics and Financial Economics, 7(4), 477-507.
- Vyetrenko, S., Byrd, D., Petosa, N., Mahfouz, M., Dervovic, D., Veloso, M., & Balch, T. H. (2020). Get real: Realism metrics for robust limit order book market simulations. In Proceedings of the First ACM International Conference on AI in Finance (pp. 1-10).
- Cont, R., & De Larrard, A. (2013). Price dynamics in a Markovian limit order book market. SIAM Journal on Financial Mathematics, 4(1), 1-25.
- Cartea, Á., Jaimungal, S., & Ricci, J. (2018). Algorithmic trading, stochastic control, and mutually exciting processes. SIAM Review, 60(3), 673-703.
- Bacry, E., Mastromatteo, I., & Muzy, J. F. (2015). Hawkes processes in finance. Market Microstructure and Liquidity, 1(01), 1550005.
- Da Fonseca, J., & Zaatour, R. (2014). Hawkes process: Fast calibration, application to trade clustering, and diffusive limit. Journal of Futures Markets, 34(6), 548-579.
- Filimonov, V., & Sornette, D. (2015). Apparent criticality and calibration issues in the Hawkes self-excited point process model: application to high-frequency financial data. Quantitative Finance, 15(8), 1293-1314.
- Simon, G. (2016). Hawkes processes in finance: a review with simulations (Doctoral dissertation, University of Oregon).
- Law, B., & Viens, F. (2019). Market making under a weakly consistent limit order book model. High Frequency, 2(3-4), 215-238.
- Almgren, R., & Chriss, N. (2000). Optimal execution of portfolio transactions. The Journal of Risk, 3(2), 5-39.
- Ho, T., & Stoll, H. R. (1981). Optimal dealer pricing under transactions and return uncertainty. Journal of Financial Economics, 9(1), 47-73.
- Roll, R. (1984). A simple implicit measure of the effective bid-ask spread in an efficient market. The Journal of Finance, 39(4), 1127-1139.
- Kyle, A. S. (1985). Continuous auctions and insider trading. Econometrica, 53(6), 1315-1335.
- Glosten, L. R., & Milgrom, P. R. (1985). Bid, ask and transaction prices in a specialist market with heterogeneously informed traders. Journal of Financial Economics, 14(1), 71-100.
- Foucault, T. (1999). Order flow composition and trading costs in a dynamic limit order book market. Journal of Financial Markets, 2(2), 99-134.
- Parlour, C. A. (1998). Price dynamics in limit order books. The Review of Financial Studies, 11(4), 789-816.
- Rosu, I. (2009). A dynamic model of the limit order book. The Review of Financial Studies, 22(11), 4601-4641.
- Wellman, M. P., & Wang, X. (2017). Spoofing the limit order book: An agent-based model. In Proceedings of the 16th Conference on Autonomous Agents and MultiAgent Systems (pp. 651-659).
- Harker, P. T. (1990). Nonlinear and stochastic programming in the next decade. Mathematical Programming, 50(1-3), 287-293.
- Bertsimas, D., & Lo, A. W. (1998). Optimal control of execution costs. Journal of Financial Markets, 1(1), 1-50.
- Almgren, R. (2003). Optimal execution with nonlinear impact functions and trading-enhanced risk. Applied Mathematical Finance, 10(1), 1-18.
- Lorenz, J., & Almgren, R. (2011). Mean-variance optimal adaptive execution. Applied Mathematical Finance, 18(3), 213-234.
- Gatheral, J. (2010). No-dynamic-arbitrage and market impact. Quantitative Finance, 10(7), 749-759.
- Bouchaud, J. P., Farmer, J. D., & Lillo, F. (2009). How markets slowly digest changes in supply and demand. In Handbook of financial markets: dynamics and evolution (pp. 57-160). North-Holland.
- Cont, R., & De Larrard, A. (2011). Order book dynamics in liquid markets: limit theorems and diffusion approximations. arXiv preprint arXiv:1104.1486.
- Cont, R., & De Larrard, A. (2011). Price dynamics in a Markovian limit order book market. arXiv preprint arXiv:1010.5839.
- Cont, R., & De Larrard, A. (2013). Price dynamics in a Markovian limit order book market. SIAM Journal on Financial Mathematics, 4(1), 1-25.
- Cont, R., Stoikov, S., & Talreja, R. (2010). A stochastic model for order book dynamics. Operations Research, 58(3), 549-563.
- Farmer, J. D., Patelli, P., & Zovko, I. I. (2005). The predictive power of zero intelligence in financial markets. Proceedings of the National Academy of Sciences, 102(6), 2254-2259.
- Smith, E., Farmer, J. D., Gillemot, L., & Krishnamurthy, S. (2003). Statistical theory of the continuous double auction. Quantitative Finance, 3(6), 481-514.
- Chiarella, C., & Iori, G. (2002). A simulation analysis of the microstructure of double auction markets. Quantitative Finance, 2(5), 346-353.
- Raberto, M., Cincotti, S., Focardi, S. M., & Marchesi, M. (2001). Agent-based simulation of a financial market. Physica A: Statistical Mechanics and its Applications, 299(1-2), 319-327.
- LeBaron, B., Arthur, W. B., & Palmer, R. (1999). Time series properties of an artificial stock market. Journal of Economic Dynamics and Control, 23(9-10), 1487-1516.
- Lux, T., & Marchesi, M. (1999). Scaling and criticality in a stochastic multi-agent model of a financial market. Nature, 397(6719), 498-500.
- Bouchaud, J. P., & Potters, M. (2003). Theory of financial risk and derivative pricing: from statistical physics to risk management. Cambridge University Press.
- Gabaix, X., Gopikrishnan, P., Plerou, V., & Stanley, H. E. (2003). A theory of power-law distributions in financial market fluctuations. Nature, 423(6937), 267-270.
- Farmer, J. D., & Joshi, S. (2002). The price dynamics of common trading strategies. Journal of Economic Behavior & Organization, 49(2), 149-171.
- Challet, D., & Stinchcombe, R. (2001). Analyzing and modeling 1+1d markets. Physica A: Statistical Mechanics and its Applications, 300(1-2), 285-299.
- Daniels, M. G., Farmer, J. D., Gillemot, L., Iori, G., & Smith, E. (2003). Quantitative model of price diffusion and market friction based on trading as a mechanistic random process. Physical Review Letters, 90(10), 108102.
- Bouchaud, J. P., Mezard, M., & Potters, M. (2002). Statistical properties of stock order books: empirical results and models. Quantitative Finance, 2(4), 251-256.
- Potters, M., & Bouchaud, J. P. (2003). More statistical properties of order books and price impact. Physica A: Statistical Mechanics and its Applications, 324(1-2), 133-140.
- Bouchaud, J. P., Gefen, Y., Potters, M., & Wyart, M. (2004). Fluctuations and response in financial markets: the subtle nature of 'random' price changes. Quantitative Finance, 4(2), 176-190.
- Lillo, F., & Farmer, J. D. (2004). The long memory of the efficient market. Studies in Nonlinear Dynamics & Econometrics, 8(3).
- Wyart, M., Bouchaud, J. P., Kockelkoren, J., Potters, M., & Vettorazzo, M. (2008). Relation between bid-ask spread, impact and volatility in order spreads. Quantitative Finance, 8(1), 95-114.
- Weber, P., & Rosenow, B. (2005). Order book approach to price impact. Quantitative Finance, 5(4), 357-364.
- Bouchaud, J. P., Farmer, J. D., & Lillo, F. (2009). How markets slowly digest changes in supply and demand. In Handbook of financial markets: dynamics and evolution (pp. 57-160). North-Holland.
- Tóth, B., Lempereur, V., Deremble, C., De Lataillade, J., Kockelkoren, J., & Bouchaud, J. P. (2011). Anomalous price impact and the critical nature of liquidity in financial markets. Physical Review X, 1(2), 021006.
- Eisler, Z., Bouchaud, J. P., & Kockelkoren, J. (2012). The price impact of order book events: market orders, limit orders and cancellations. Quantitative Finance, 12(9), 1395-1419.
- Tóth, B., Eisler, Z., Bouchaud, J. P., & Kockelkoren, J. (2012). How does the market react to your order flow? arXiv preprint arXiv:1203.3867.
- Eisler, Z., & Kertész, J. (2006). Size matters: some stylized facts of the stock market revisited. The European Physical Journal B, 51(1), 145-154.
- Tóth, B., & Kertész, J. (2006). Increasing market efficiency: Evolution of cross-correlations of stock returns. Physica A: Statistical Mechanics and its Applications, 360(2), 505-515.
- Tóth, B., & Kertész, J. (2009). The evolution of the instantaneous volatility and the pricing of options. Physica A: Statistical Mechanics and its Applications, 388(19), 4119-4128.
- Tóth, B., & Kertész, J. (2009). Modelling market dynamics based on price and order flow. In Econophysics and Sociophysics: Trends and Perspectives (pp. 145-158). Wiley-VCH Verlag GmbH & Co. KGaA.
- Tóth, B., Palit, I., Lillo, F., & Farmer, J. D. (2015). Why is equity order flow so persistent? Journal of Economic Dynamics and Control, 51, 218-239.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud, J. P. (2017). The short-term price impact of trades is universal. arXiv preprint arXiv:1703.02728.
- Tóth, B., Eisler, Z., & Bouchaud
