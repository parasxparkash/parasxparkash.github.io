---
layout: note
title: "Asymmetric Information Modelling in the Realized Spread"
date: 2022-11-16
category: "Market Microstructure"
tags: ["asymmetric information", "realized spread", "bid-ask spread", "market liquidity", "informed trading"]
mathjax: true
---

# Asymmetric Information Modelling in the Realized Spread

## Abstract
This paper proposes a new estimation of the bid-ask spread, termed the Informed Realized Spread (IRS), which modifies the Realized Spread (RS) to exclusively illustrate asymmetric information effects on spread size. The IRS model is found to be positive and strongly correlated with the RS model, providing a straightforward, computationally less-intensive method suitable for various asset pricing studies.

## Introduction
The market liquidity plays an authoritative role in financial transaction execution. Liquidity has immediate impact on trading, and liquidity risk has gained significant attention in asset pricing, corporate financing, and portfolio risk management. The bid-ask spread is a significant indicator of market liquidity and its associated cost.

The paper proposes a new estimation called the Informed Realized Spread (IRS), a modified version of the Realized Spread (RS) that exclusively illustrates asymmetric information effects on spread size.

## Realized Spread (RS) Model
The analytical expression of the RS estimator is given by:

$$RS_t = 2|\eta_{t+1} - C_t| \cdot \frac{high_t + low_t}{2}$$

where:
- $high_t$ is the highest price of day $t$
- $low_t$ refers to the lowest price of day $t$
- $C_t$ indicates the closing price of day $t$
- $\eta_{t+1}$ is a mean value of the following trading-day high and low prices:

$$\eta_{t+1} = \frac{high_{t+1} + low_{t+1}}{2}$$

## Informed Realized Spread (IRS) Model
The IRS model assumes that asymmetric information about the fundamental value drives trading, following Glosten and Milgrom (1985). The informed trader gains from trading, and the model assumes the presence of informed traders with different expectations.

The buyer-initiated trade is expected to be executed if:

$$E[buy_{t+1}] = E[v_{ask}] = E[ask_{t+1}]$$

The seller-initiated trade is assumed to be executed if:

$$E[sell_{t+1}] = E[v_{bid}] = E[bid_{t+1}]$$

Assuming the presence of an informed optimistic buyer:

$$E[ask_{t+1}] = high_{t+1} \cdot \gamma + \left(\frac{high_{t+1} + low_{t+1}}{2}\right) \cdot \gamma$$

Assuming the presence of an informed pessimistic seller:

$$E[bid_{t+1}] = low_{t+1} \cdot \gamma + \left(\frac{high_{t+1} + low_{t+1}}{2}\right) \cdot \gamma$$

The expected mean value conditional on the following trading session:

$$E[\eta_{t+1}] = \frac{E[ask_{t+1}] + E[bid_{t+1}]}{2}$$

Inserting the expected mean value into the RS formula yields the IRS model:

$$IRS_t = 2|E[\eta_{t+1}] - C_t| \cdot \frac{High_t + Low_t}{2}$$

## Theoretical Framework
The market makers are compensated against price variation risk, return uncertainty, and market environment. The RS model elucidates the immediacy cost that liquidity providers ask against providing liquidity.

The IRS model structures asymmetric information in the RS method, assuming informed traders drive trading. Optimistic buyers accept inventory at higher ask prices, while pessimistic sellers redeem positions at lower bid prices.

## Data and Methods
The analysis uses Australian Securities Exchange (ASX) data from January 1, 2001 to April 30, 2021, with daily observations of high, low, and closing prices.

### Spread Proxies
**Quoted Spread (QS):**

$$QS_t = \frac{high_t - low_t}{\eta_t}$$

where $\eta_t$ is the mean value of high and low prices on day $t$.

**Effective Spread (ES):**

$$ES_t = 2|C_t - \eta_t| \cdot \frac{1}{\eta_t}$$

**Realized Spread (RS):** As defined above.

**Informed Realized Spread (IRS):** As defined above.

## Results
### Descriptive Statistics
The table shows descriptive statistics for the spread proxies:

| Variable | N    | Min       | Median   | Mean     | Max       | SD       | Skewness |
|----------|------|-----------|----------|----------|-----------|----------|----------|
| RS      | 5050 | 2.30E-16 | 0.01109 | 0.01531 | 0.43841  | 0.01699 | 5.64298 |
| IRS     | 5050 | 2.30E-16 | 0.01109 | 0.01531 | 0.43841  | 0.01699 | 5.64298 |
| QS      | 5050 | 0.001197 | 0.01485 | 0.01755 | 0.18281  | 0.01115 | 3.57961 |
| ES      | 5050 | 2.29E-16 | 0.00746 | 0.00974 | 0.16897  | 0.00975 | 4.01687 |

### Correlation Analysis
The correlation coefficients between variables:

| Variables | RS   | IRS  | QS   | ES   |
|-----------|------|------|------|------|
| RS       | 1    | 1    | 0.34 | 0.23 |
| IRS      | 1    | 1    | 0.34 | 0.23 |
| QS       | 0.34 | 0.34 | 1    | 0.76 |
| ES       | 0.23 | 0.23 | 0.76 | 1    |

The IRS measure shows strong correlation with RS (correlation = 1), moderate correlation with QS (0.34), and low correlation with ES (0.23).

## Conclusion
The IRS model provides a simple, computationally efficient method to estimate informed trading effects on bid-ask spreads. Despite theoretical differences from other spread proxies, IRS shows strong correlation with RS and provides valuable insights for asset pricing studies.

## References
- Saleemi, J. (2022). Asymmetric information modelling in the realized spread: A new simple estimation of the informed realized spread. Finance, Markets and Valuation, 8(1), 1–12.
- Glosten, L. R., & Milgrom, P. R. (1985). Bid, ask and transaction prices in a specialist market with heterogeneously informed traders. Journal of Financial Economics, 14, 71–100.
- Berkman, H., Brailsford, T., & Frino, A. (2005). A note on execution costs for stock index futures: Information versus liquidity effects. Journal of Banking & Finance, 29(3), 565–577.
- Bacidore, J. M., & Sofianos, G. (2003). Liquidity provision and specialist trading in NYSE-listed non-US stocks. Journal of Financial Economics, 63(1), 133–158.
- Bessembinder, H., & Kaufman, H. M. (1997). A cross-exchange comparison of execution costs and information flow for NYSE-listed stocks. Journal of Financial Economics, 46(3), 293-319.
- Huang, R. D., & Stoll, H. R. (1997). The Components of the Bid-Ask Spread: A General Approach. The Review of Financial Studies, 10(4), 995–1034.
- Easley, D., & O'Hara, M. (1992). Time and the process of security price adjustment. The Journal of Finance, 47(2), 577–605.
- Roll, R. (1984). A Simple Implicit Measure of the Effective Bid-Ask Spread in an Efficient Market. The Journal of Finance, 39(4), 1127-1139.
- Hasbrouck, J. (2004). Liquidity in the futures pits: Inferring market dynamics from incomplete data. Journal of Financial and Quantitative Analysis, 39(2), 305–326.
- Holden, C. W. (2009). New low-frequency spread measures. Journal of Financial Markets, 12(4), 778–813.
- Corwin, S. A., & Schultz, P. (2012). A Simple Way to Estimate Bid-Ask Spreads from Daily High and Low Prices. The Journal of Finance, 67(2), 719-760.
- Abdi, F., & Ranaldo, A. (2017). A simple estimation of bid-ask spreads from daily close, high, and low prices. The Review of Financial Studies, 30(12), 4437–4480.
- Fong, K. Y., Holden, C. W., & Trzcinka, C. A. (2017). What are the best liquidity proxies for global research? Review of Finance, 21(4), 1355–1401.
- Lesmond, D. A., Ogden, J. P., & Trzcinka, C. A. (1999). A new estimate of transaction costs. Review of Financial Studies, 12(5), 1113–1141.
- Amihud, Y., & Mendelson, H. (1980). Dealership market. Journal of Financial Economics, 8(1), 31–53.
- Amihud, Y., & Mendelson, H. (1986). Asset pricing and the bid-ask spread. Journal of Financial Economics, 17(2), 223-249.
- Gorton, G., & Metrick, A. (2010). Haircuts. Federal Reserve Bank St Louis Review, 92(6), 507–520.
- Guijarro, F., Moya-Clemente, I., & Saleemi, J. (2019). Liquidity Risk and Investors' Mood: Linking the Financial Market Liquidity to Sentiment Analysis through Twitter in the S&P500 Index. Sustainability, 11, 7048.
- Guijarro, F., Moya-Clemente, I., & Saleemi, J. (2021). Market Liquidity and Its Dimensions: Linking the Liquidity Dimensions to Sentiment Analysis through Microblogging Data. Journal of Risk and Financial Management, 14(9), 394.
- Ho, T., & Stoll, H. (1981). Optimal dealer pricing under transactions and return uncertainty. Journal of Financial Economics, 9(1), 47–73.
- Le, H., & Gregoriou, A. (2020). How do you capture liquidity? A review of the literature on Low-frequency stock liquidity. Journal of Economic Surveys, 34(5), 1170-1186.
- Lybek, T., & Sarr, A. (2002). Measuring liquidity in financial markets. INTERNATIONAL MONETARY FUND, 02(232), 1–64.
- Degennaro, R. P., & Robotti, C. (2007). Financial Market Frictions. Economic Review, 92(3), 1-16.
- Hasbrouck, J., & Seppi, D. J. (2001). Common Factors in Prices, Order Flows, and Liquidity. Journal of Financial Economics, 59, 383-411.
- Amihud, Y., Hameed, A., Kang, W., & Zhang, H. (2015). The Illiquidity Premium: International Evidence. Journal of Financial Economics, 117(2), 350–368.
- Saleemi, J. (2020a). In COVID-19 outbreak, correlating the cost-based market liquidity risk to microblogging sentiment indicators. National Accounting Review, 2(3), 249-262.
- Saleemi, J. (2020b). An estimation of cost-based market liquidity from daily high, low and close prices. Finance, Markets and Valuation, 6(2), 1-11.
- Saleemi, J. (2021). COVID-19 and liquidity risk, exploring the relationship dynamics between liquidity cost and stock market returns. National Accounting Review, 3(2), 218-236.
