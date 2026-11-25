---
title: "HVAC Heat Load Calculation & System Design: Engineering Reference with Calculators"
date: 2024-05-20
category: "MEP Engineering"
tags: ["HVAC", "heat load calculation", "cooling load", "psychrometrics", "refrigeration", "ECU", "automotive HVAC", "MEP"]
description: "Complete engineering guide to HVAC heat load calculation methods — CLTD/CLF, ASHRAE, and RTS — covering sensible and latent loads, psychrometrics, refrigerant circuit design, ECU-based control, and automotive HVAC system design from first principles."
author: "Paras Parkash"
reading_time: 28
mathjax: true
---

# HVAC Heat Load Calculation & System Design

## Introduction

HVAC engineering sits at the intersection of thermodynamics, fluid mechanics, and control systems. During my tenure as Assistant Manager at Maruti Suzuki India Limited (2013–2015), I designed and evaluated automotive HVAC systems — an unusually challenging domain because the thermal envelope is small, the heat sources are variable (solar, engine, occupants, humidity), and the system must respond within seconds while drawing minimal power from the vehicle. This document bridges automotive and building HVAC, covering heat load calculation from first principles, psychrometric analysis, refrigerant circuit design, and ECU-based control logic.

---

## 1. Fundamental Thermodynamics

### 1.1 Heat Transfer Modes

**Conduction:**
$$q_{cond} = k A \frac{dT}{dx} = \frac{kA(T_1 - T_2)}{L}$$

where $k$ = thermal conductivity (W/m·K), $A$ = area (m²), $L$ = thickness (m).

**Convection:**
$$q_{conv} = h A (T_s - T_\infty)$$

where $h$ = convective heat transfer coefficient (W/m²·K).

**Radiation:**
$$q_{rad} = \varepsilon \sigma A (T_s^4 - T_{surr}^4)$$

where $\varepsilon$ = emissivity, $\sigma = 5.67 \times 10^{-8}$ W/m²·K⁴ (Stefan-Boltzmann).

### 1.2 Thermal Resistance Network

For a composite wall (insulation + air films):

$$R_{total} = R_{i} + \sum_{j} \frac{L_j}{k_j A} + R_{o}$$

$$U = \frac{1}{R_{total} \cdot A} \quad \text{(overall heat transfer coefficient, W/m²·K)}$$

$$q = U A \Delta T$$

---

## 2. Psychrometrics — The Science of Moist Air

### 2.1 Key Psychrometric Properties

**Specific humidity (humidity ratio):**

$$\omega = \frac{m_v}{m_a} = 0.622 \frac{P_v}{P - P_v}$$

where $P_v$ = partial pressure of water vapour, $P$ = total pressure.

**Relative humidity:**

$$\phi = \frac{P_v}{P_{sat}(T)} \times 100\%$$

**Dew point temperature** $T_{dp}$: temperature at which $\phi = 100\%$ for a given $\omega$.

**Enthalpy of moist air (kJ/kg dry air):**

$$h = c_{pa} T + \omega (h_{fg,0} + c_{pv} T)$$

$$h \approx 1.006 T + \omega (2501 + 1.86 T)$$

where $T$ is in °C, $h_{fg,0} = 2501$ kJ/kg (latent heat of vaporisation at 0°C).

**Wet-bulb temperature** $T_{wb}$: temperature of adiabatic saturation, used extensively in cooling tower and evaporative cooler design.

### 2.2 Sensible Heat Ratio (SHR)

$$SHR = \frac{Q_{sensible}}{Q_{total}} = \frac{Q_s}{Q_s + Q_L}$$

For comfort HVAC: typical SHR = 0.75–0.85.
For automotive cabin: SHR = 0.60–0.75 (high latent load from occupant perspiration and humid outside air).

---

## 3. Building HVAC Heat Load Calculation (CLTD/CLF Method)

### 3.1 Sensible Heat Gains

**Wall and Roof Conduction:**

$$Q_{wall} = U \cdot A \cdot CLTD$$

where CLTD (Cooling Load Temperature Difference) accounts for thermal mass and solar effects. Values are tabulated in ASHRAE Fundamentals for different wall groups, latitudes, and times of day.

**Fenestration (Glass) — Solar:**

$$Q_{glass,solar} = SC \cdot A \cdot SHGF \cdot CLF$$

where:
- $SC$ = shading coefficient of glass
- $SHGF$ = solar heat gain factor (W/m²), tabulated by orientation and latitude
- $CLF$ = cooling load factor, accounts for thermal storage

**Fenestration — Conduction:**

$$Q_{glass,cond} = U_{glass} \cdot A \cdot (T_{outside} - T_{inside})$$

**Infiltration (Sensible):**

$$Q_{inf,s} = \dot{m}_{inf} \cdot c_{pa} \cdot (T_o - T_i) = \rho \dot{V}_{inf} \cdot 1.006 \cdot (T_o - T_i) \text{ kW}$$

**Lighting:**

$$Q_{light} = W_{lamp} \cdot F_{use} \cdot F_{special} \cdot CLF$$

**Occupants (Sensible):**

$$Q_{occ,s} = N \cdot q_{s,person} \cdot CLF$$

where $q_{s,person}$ = sensible heat per person (W), varies by activity:
| Activity | Sensible (W) | Latent (W) |
|----------|-------------|-----------|
| Seated, light office | 65 | 55 |
| Standing, light work | 75 | 85 |
| Walking | 70 | 150 |
| Heavy work | 170 | 255 |

**Equipment:**

$$Q_{equip} = W_{equip} \cdot F_{use} \cdot F_{heat} \cdot CLF$$

### 3.2 Latent Heat Gains

**Infiltration (Latent):**

$$Q_{inf,L} = \dot{m}_{inf} \cdot h_{fg} \cdot (\omega_o - \omega_i) = \rho \dot{V}_{inf} \cdot 2501 \cdot (\omega_o - \omega_i) \text{ kW}$$

**Occupants (Latent):**

$$Q_{occ,L} = N \cdot q_{L,person}$$

### 3.3 Ventilation Load

Outside air brought in for air quality adds both sensible and latent load:

$$Q_{vent,s} = 1.2 \dot{V}_{OA} (T_o - T_i)$$

$$Q_{vent,L} = 3010 \dot{V}_{OA} (\omega_o - \omega_i)$$

where $\dot{V}_{OA}$ is in m³/s.

### 3.4 Total Cooling Load

$$Q_{total} = Q_{wall} + Q_{roof} + Q_{glass} + Q_{inf} + Q_{light} + Q_{occ} + Q_{equip} + Q_{vent}$$

---

## 4. ASHRAE Radiant Time Series (RTS) Method

The RTS method (ASHRAE 2009 Fundamentals, Ch. 18) is more accurate than CLTD/CLF. It converts instantaneous heat gains to cooling loads using radiant time factors (RTF).

### 4.1 Radiative and Convective Split

Heat gains are split into:
- **Convective fraction** $f_c$: immediately becomes cooling load
- **Radiative fraction** $f_r = 1 - f_c$: absorbed by room surfaces and re-radiated later

Typical splits:
| Source | $f_r$ (radiative) | $f_c$ (convective) |
|--------|------------------|------------------|
| Fluorescent lights | 0.67 | 0.33 |
| People | 0.60 | 0.40 |
| Conduction through glass | 0.33 | 0.67 |
| Solar through glass | 1.00 | 0.00 |
| Equipment | 0.20–0.80 | 0.20–0.80 |

### 4.2 RTS Equation

For hour $h$, the cooling load from radiant heat gain:

$$Q_{r,h} = r_0 q_{r,h} + r_1 q_{r,h-1} + r_2 q_{r,h-2} + \ldots + r_{23} q_{r,h-23}$$

$$Q_{r,h} = \sum_{n=0}^{23} r_n \cdot q_{r,h-n}$$

where $r_n$ are the radiant time factors for the room, summing to 1.0.

The total cooling load:

$$Q_{h} = f_c \cdot q_h + Q_{r,h}$$

---

## 5. Refrigeration Cycle & Vapour Compression

### 5.1 Ideal Vapour Compression Cycle (Rankine)

The four processes:

1. **1→2 Compression** (isentropic): Refrigerant vapour compressed in compressor
2. **2→3 Condensation** (isobaric): Heat rejected to outside air
3. **3→4 Expansion** (isenthalpic): Throttling through expansion valve
4. **4→1 Evaporation** (isobaric): Heat absorbed from conditioned space

### 5.2 Key Performance Equations

**Refrigerating effect:**

$$q_L = h_1 - h_4$$

**Compressor work:**

$$w_c = h_2 - h_1$$

**Heat rejected at condenser:**

$$q_H = h_2 - h_3$$

**Coefficient of Performance (COP):**

$$COP = \frac{q_L}{w_c} = \frac{h_1 - h_4}{h_2 - h_1}$$

**Carnot COP (maximum theoretical):**

$$COP_{Carnot} = \frac{T_L}{T_H - T_L}$$

where temperatures are in Kelvin.

**Mass flow rate of refrigerant:**

$$\dot{m} = \frac{\dot{Q}_L}{h_1 - h_4}$$

**Compressor power:**

$$\dot{W}_c = \dot{m} \cdot w_c = \frac{\dot{Q}_L \cdot w_c}{h_1 - h_4}$$

### 5.3 Real Cycle Deviations

**Isentropic efficiency of compressor:**

$$\eta_{is} = \frac{h_{2s} - h_1}{h_{2a} - h_1}$$

where subscript $s$ = isentropic, $a$ = actual.

**Volumetric efficiency:**

$$\eta_v = \frac{\dot{V}_{actual}}{\dot{V}_{displacement}}$$

Typical values: $\eta_{is}$ = 0.65–0.80, $\eta_v$ = 0.70–0.90.

---

## 6. Refrigerants

### 6.1 Common Refrigerants

| Refrigerant | Type | GWP | ODP | $T_{boil}$ at 1 atm | Application |
|-------------|------|-----|-----|---------------------|-------------|
| R-134a | HFC | 1430 | 0 | -26.3°C | Automotive, refrigerators |
| R-410A | HFC blend | 2088 | 0 | -51.5°C | Building AC |
| R-32 | HFC | 675 | 0 | -51.7°C | Split AC |
| R-1234yf | HFO | 4 | 0 | -29.5°C | Automotive (replacing R-134a) |
| R-744 (CO₂) | Natural | 1 | 0 | -78.5°C | Transcritical |
| R-717 (NH₃) | Natural | 0 | 0 | -33.4°C | Industrial |

Maruti Suzuki transitioned from R-12 to **R-134a** during my tenure, which required recalibration of all pressure switches, expansion valves, and ECU refrigerant pressure maps.

### 6.2 P-h Diagram (Mollier Diagram)

The P-h (pressure-enthalpy) diagram is the working tool for refrigeration design:

$$\text{Evaporator pressure} = P_{sat}(T_{evap})$$

$$\text{Condenser pressure} = P_{sat}(T_{cond})$$

For R-134a:
- Evaporator: $T_{evap}$ = 0–10°C → $P_{evap}$ = 2.9–4.1 bar abs
- Condenser: $T_{cond}$ = 40–55°C → $P_{cond}$ = 10.2–14.9 bar abs
- Compression ratio: typically 3–5

---

## 7. Automotive HVAC — Specific Design Considerations

### 7.1 Cabin Heat Load

Automotive cabins are thermally severe environments:

**Solar gain through glazing:**

$$Q_{solar} = \sum_i SC_i \cdot A_i \cdot I_{solar,i}$$

where $I_{solar}$ on a black car roof in Pune summer ≈ 1000–1200 W/m², windshield (angled) ≈ 600–900 W/m².

**Occupant load (5 passengers, 80 W sensible + 60 W latent each):**

$$Q_{occ} = 5 \times (80 + 60) = 700 \text{ W}$$

**Body conduction:**

$$Q_{body} = \sum U_i A_i (T_{outside} - T_{cabin})$$

For a compact car with $T_{outside} = 45°C$, $T_{cabin} = 25°C$:
- Roof: $U \approx 2.5$ W/m²K, $A \approx 1.5$ m² → 75 W
- Floor: $U \approx 3.0$ W/m²K, $A \approx 2.5$ m² → 150 W (engine heat)
- Doors: $U \approx 2.8$ W/m²K, $A \approx 3.6$ m² → 202 W

**Ventilation (fresh air at 150 L/s, 45°C, 50% RH → 25°C, 55% RH):**

$$Q_{vent,s} = 1.2 \times 0.15 \times (45 - 25) = 3.6 \text{ kW}$$

$$Q_{vent,L} = 3010 \times 0.15 \times (0.0129 - 0.0110) = 0.86 \text{ kW}$$

**Total cabin cooling load (typical small passenger car):**

| Source | Sensible (W) | Latent (W) |
|--------|-------------|-----------|
| Solar (glazing) | 2200 | — |
| Occupants | 400 | 300 |
| Body conduction | 450 | — |
| Ventilation | 3600 | 860 |
| Engine compartment | 300 | — |
| **Total** | **6950** | **1160** |

**Total cooling capacity required: ~8.1 kW** (plus system losses → size compressor for 9–10 kW)

### 7.2 Blower and Evaporator Airflow

Required airflow to handle the sensible load:

$$\dot{m}_{air} = \frac{Q_s}{c_{pa}(T_{supply} - T_{room})} = \frac{Q_s}{1.006 \times \Delta T_{coil}}$$

For $Q_s = 7$ kW, supply air at 10°C, cabin at 25°C:

$$\dot{m}_{air} = \frac{7}{1.006 \times 15} = 0.464 \text{ kg/s} \approx 460 \text{ L/s}$$

Blower motor power: typically 100–300 W for automotive.

### 7.3 Expansion Valve Sizing (Thermostatic Expansion Valve)

The TXV meters refrigerant to maintain a fixed superheat at evaporator outlet:

$$Q_{evap} = \dot{m}_{ref} \cdot (h_1 - h_4)$$

For R-134a, $h_1 - h_4 \approx 150$ kJ/kg (at typical operating conditions):

$$\dot{m}_{ref} = \frac{9000}{150000} = 0.060 \text{ kg/s} = 216 \text{ kg/h}$$

TXV rated capacity is selected with 20% margin → **260 kg/h TXV**.

---

## 8. ECU-Based HVAC Control

### 8.1 Sensor Inputs

| Sensor | Type | Range | Function |
|--------|------|-------|----------|
| Evaporator temp | NTC thermistor | -10 to +20°C | Freeze protection |
| Cabin temp | NTC | 10–40°C | Comfort control |
| Solar sensor | Photodiode | 0–1500 W/m² | Feedforward compensation |
| High-pressure switch | Pressure switch | > 32 bar | Compressor cutout |
| Low-pressure switch | Pressure switch | < 1.8 bar | Compressor cutout |
| Refrigerant pressure | Piezo transducer | 0–30 bar | Continuous monitoring |
| Outside air temp | NTC | -40 to +80°C | Ambient adaptation |
| Blower voltage | Voltage divider | 0–12 V | Speed feedback |

### 8.2 Control Algorithm — PID with Feedforward

The cabin temperature controller:

$$u(t) = K_p e(t) + K_i \int_0^t e(\tau) d\tau + K_d \frac{de(t)}{dt} + u_{FF}(T_{solar}, T_{outside}, N_{occupants})$$

Feedforward term accounts for measurable disturbances (solar load, ambient temperature) before they affect cabin temperature — reducing response lag.

**Compressor clutch duty cycle (for capacity modulation):**

$$D_{clutch}(t) = \text{clip}\left(\frac{T_{evap,setpoint} - T_{evap,actual}}{T_{band}}, 0, 1\right)$$

Modern vehicles use variable displacement compressors, eliminating clutch cycling.

### 8.3 Psychrometric Dehumidification Control

The ECU adjusts reheat to maintain cabin humidity. The dehumidification process on a psychrometric chart:

1. **Process A→B** (cooling and dehumidification): Air enters evaporator at state A, exits at state B (near saturation, below dew point of A)
2. **Process B→C** (reheating): Air passes through heater core, temperature rises from $T_B$ to $T_C$ while humidity ratio stays constant at $\omega_B$

The dehumidification rate:

$$\dot{m}_{condensed} = \dot{m}_{air} (\omega_A - \omega_B)$$

For 460 L/s airflow, $\omega_A = 0.015$ kg/kg, $\omega_B = 0.009$ kg/kg:

$$\dot{m}_{condensed} = (460/1000 \times 1.2) \times (0.015 - 0.009) = 0.552 \times 0.006 = 3.3 \text{ g/s}$$

The condensate drain from the evaporator housing must handle this flow — typically 50–100 mL/min.

---

## 9. Refrigerant Circuit Design

### 9.1 Pipe Sizing

Refrigerant suction line velocity: 4–10 m/s (avoid oil pooling)
Refrigerant discharge line velocity: 8–15 m/s
Liquid line velocity: 0.5–1.5 m/s

**Suction line pressure drop (should be < 2°C equivalent saturation temperature drop):**

$$\Delta T_{eq} = \frac{dT_{sat}}{dP}\bigg|_{sat} \times \Delta P$$

For R-134a at $T_{evap} = 5°C$: $dT/dP \approx 0.025°C/kPa$, so allow $\Delta P \leq 80$ kPa.

### 9.2 Filter-Drier Sizing

The filter-drier removes moisture and particulates. Minimum desiccant capacity:

$$W_{desiccant} \geq 0.5 \times V_{system} \times \rho_{refrigerant}$$

where $V_{system}$ is total refrigerant circuit volume (m³).

For automotive (small system): 25–50 g desiccant (molecular sieve 4A or 3A).

### 9.3 Refrigerant Charge Calculation

Approximate system charge:

$$m_{charge} = \rho_{liquid}(T_{cond}) \times V_{liquid\_line} + \rho_{vapor}(T_{evap}) \times V_{suction\_line}$$

Exact charge determined by superheat and subcooling measurements during commissioning:
- Target superheat at TXV outlet: 5–10°C
- Target subcooling at condenser outlet: 5–8°C

---

## 10. Worked Example — Building HVAC (Office Room)

**Room:** 6m × 8m × 3m, Hyderabad, India, peak summer (June, 14:00 IST)

**Given:**
- Outdoor: 42°C dry bulb, 28°C wet bulb (ω = 0.0186 kg/kg)
- Indoor: 24°C, 55% RH (ω = 0.0104 kg/kg)
- West wall, 200mm brick ($k$ = 0.84 W/m·K)
- West glass: 2.5 m², single-glazed ($U$ = 5.8 W/m²K, $SC$ = 0.87)
- Lighting: 10 W/m² (fluorescent)
- Occupants: 10 persons, seated
- Fresh air: 10 L/s per person

**Calculations:**

| Component | Sensible (W) | Latent (W) |
|-----------|-------------|-----------|
| West wall ($U=2.5$, $A=18$ m², $CLTD=18$°C) | 810 | — |
| West glass solar ($SHGF = 500$ W/m², $CLF = 0.65$) | 711 | — |
| West glass cond ($A = 2.5$, $\Delta T = 18$) | 261 | — |
| Lighting ($10 × 48$ m² × 0.9) | 432 | — |
| Occupants (10 × 65 W sensible, 10 × 55 W latent) | 650 | 550 |
| Ventilation (100 L/s, $\Delta T = 18$, $\Delta\omega = 0.0082$) | 2160 | 2468 |
| **Total** | **5024** | **3018** |

**Total cooling load: 5.0 + 3.0 = 8.0 kW**

**Equipment sizing:**

$$\dot{m}_{supply} = \frac{5024}{1006 \times (24 - 12)} = 0.416 \text{ kg/s} \approx 345 \text{ L/s}$$

Select **1-ton (3.5 kW) + 1-ton cassette split AC** (total 7 kW sensible) + dehumidification mode.

Actually 8 kW total → **2.5 TR (8.8 kW) ceiling cassette unit**.

---

## 11. Energy Performance Metrics

### 11.1 EER and SEER

**Energy Efficiency Ratio (EER):**

$$EER = \frac{Q_{cooling} \text{ (BTU/h)}}{W_{input} \text{ (W)}}$$

or in SI:

$$COP_{cooling} = \frac{Q_{cooling} \text{ (kW)}}{W_{input} \text{ (kW)}}$$

**Seasonal EER (SEER):** Accounts for part-load operation over the cooling season.

**Minimum standards (IS 1391 / BEE India):**
| Star Rating | Minimum EER |
|-------------|------------|
| 1 star | 2.70 |
| 3 star | 3.10 |
| 5 star | 3.50 |
| Inverter 5-star | > 4.50 |

### 11.2 Cooling Tower Performance

For water-cooled systems:

**Range:** $T_{in} - T_{out}$ (hot water in – cold water out)

**Approach:** $T_{out} - T_{wb}$ (cold water out – wet-bulb temperature of inlet air)

Cooling tower efficiency:

$$\eta_{CT} = \frac{Range}{Range + Approach} = \frac{T_{in} - T_{out}}{T_{in} - T_{wb}}$$

---

## References

1. ASHRAE, *Fundamentals Handbook*, 2021 edition, Chapters 14–18
2. IS 1391 — Room air conditioners, Bureau of Indian Standards
3. SAE J639 — HVAC System Safety Standards for Automotive
4. Dossat, R.J., *Principles of Refrigeration*, Prentice Hall
5. Wang, S.K., *Handbook of Air Conditioning and Refrigeration*, 2nd ed., McGraw-Hill
6. Maruti Suzuki Technical Training Manual, HVAC Systems (internal reference)
7. ASHRAE Standard 62.1 — Ventilation for Acceptable Indoor Air Quality
