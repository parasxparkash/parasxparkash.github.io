---
title: "Pump Load & Motor Load Analysis: Engineering Calculations, Equations, and Design"
date: 2024-03-10
category: "MEP Engineering"
tags: ["pump engineering", "motor load", "MEP", "hydraulics", "power calculations", "PLC", "water systems"]
description: "A comprehensive engineering reference covering pump load analysis, motor load calculations, hydraulic power equations, efficiency considerations, and practical design tools for water pumping station engineers."
author: "Paras Parkash"
reading_time: 22
mathjax: true
---

# Pump Load & Motor Load Analysis

## Introduction

Water pumping stations form the backbone of municipal water supply, sewage treatment, and irrigation infrastructure. During six years as Section Engineer at Jal Shakti Dept. PHE, Jammu & Kashmir, I designed, commissioned, and maintained dozens of electro-mechanical pumping systems across the district. This reference consolidates the core equations, design methodology, and practical calculators used in that work.

Understanding motor and pump load is not just about selecting the right horsepower — it involves the full hydraulic circuit, the characteristic curves of the pump, the efficiency stack from fluid to shaft to electrical supply, and the starting transients that stress both the motor and the electrical infrastructure.

---

## 1. Fundamental Hydraulic Equations

### 1.1 Continuity Equation

For incompressible flow through a pipe of varying cross-section:

$$Q = A_1 V_1 = A_2 V_2$$

where $Q$ is volumetric flow rate (m³/s), $A$ is cross-sectional area (m²), and $V$ is velocity (m/s).

### 1.2 Bernoulli's Equation (Extended with Losses)

$$\frac{P_1}{\rho g} + \frac{V_1^2}{2g} + z_1 = \frac{P_2}{\rho g} + \frac{V_2^2}{2g} + z_2 + H_L$$

where:
- $P$ = static pressure (Pa)
- $\rho$ = fluid density (kg/m³), water ≈ 1000 kg/m³
- $g$ = 9.81 m/s²
- $z$ = elevation head (m)
- $H_L$ = total head loss (m)

### 1.3 Total Dynamic Head (TDH)

TDH is the total head the pump must develop:

$$TDH = H_{static} + H_{friction} + H_{velocity} + H_{minor}$$

$$TDH = (z_2 - z_1) + \frac{f L V^2}{2gD} + \frac{V_2^2 - V_1^2}{2g} + \sum K \frac{V^2}{2g}$$

where:
- $H_{static}$ = static head difference between suction and discharge reservoirs (m)
- $f$ = Darcy-Weisbach friction factor (dimensionless)
- $L$ = pipe length (m)
- $D$ = pipe diameter (m)
- $K$ = minor loss coefficients (bends, valves, fittings)

### 1.4 Darcy-Weisbach Friction Factor

For turbulent flow, use the **Colebrook-White equation**:

$$\frac{1}{\sqrt{f}} = -2 \log_{10}\left(\frac{\varepsilon/D}{3.7} + \frac{2.51}{Re\sqrt{f}}\right)$$

Explicit approximation (Swamee-Jain):

$$f = \frac{0.25}{\left[\log_{10}\left(\frac{\varepsilon}{3.7D} + \frac{5.74}{Re^{0.9}}\right)\right]^2}$$

where:
- $\varepsilon$ = pipe roughness (m) — cast iron ≈ 0.26 mm, steel ≈ 0.046 mm
- $Re = \frac{VD}{\nu}$ = Reynolds number
- $\nu$ = kinematic viscosity of water ≈ 1.004 × 10⁻⁶ m²/s at 20°C

---

## 2. Hydraulic Power and Pump Power

### 2.1 Hydraulic (Water) Power

$$P_{hydraulic} = \rho g Q \cdot TDH$$

In practical units (kW):

$$P_{kW} = \frac{\rho \cdot g \cdot Q \cdot TDH}{1000} = \frac{1000 \times 9.81 \times Q \times TDH}{1000}$$

$$\boxed{P_{kW} = 9.81 \times Q \times TDH}$$

where $Q$ is in m³/s and $TDH$ in metres.

### 2.2 Pump Shaft Power (Brake Power)

$$P_{shaft} = \frac{P_{hydraulic}}{\eta_{pump}}$$

$$\boxed{P_{shaft} = \frac{9.81 \times Q \times TDH}{\eta_{pump}}}$$

Typical pump efficiencies:
| Pump Type | Efficiency Range |
|-----------|-----------------|
| Centrifugal (small, < 10 kW) | 55–70% |
| Centrifugal (medium, 10–100 kW) | 70–85% |
| Centrifugal (large, > 100 kW) | 82–92% |
| Submersible | 60–80% |
| Turbine pump | 75–88% |

### 2.3 Motor Input Power

$$P_{motor\_input} = \frac{P_{shaft}}{\eta_{motor}}$$

$$\boxed{P_{motor\_input} = \frac{9.81 \times Q \times TDH}{\eta_{pump} \times \eta_{motor}}}$$

Typical motor efficiencies: 85–96% for induction motors depending on size and load.

### 2.4 Overall (Wire-to-Water) Efficiency

$$\eta_{overall} = \eta_{pump} \times \eta_{motor} \times \eta_{drive}$$

where $\eta_{drive}$ accounts for VFD or gearbox losses (0.95–0.98).

---

## 3. Motor Load Calculation

### 3.1 Motor Rated Current (Three-Phase)

$$I_{FL} = \frac{P_{motor\_input}}{\sqrt{3} \times V_L \times \cos\phi \times \eta_{motor}}$$

where:
- $V_L$ = line voltage (V)
- $\cos\phi$ = power factor (typically 0.80–0.90 for induction motors at full load)

### 3.2 Motor Torque

$$T = \frac{P_{shaft} \times 60}{2\pi \times N}  = \frac{9550 \times P_{kW}}{N_{rpm}}$$

where $N$ is shaft speed in RPM.

### 3.3 Specific Speed (Dimensionless)

Specific speed characterises the pump geometry and is used for impeller selection:

$$N_s = \frac{N \sqrt{Q}}{H^{3/4}}$$

where $Q$ is in m³/s, $H$ in metres, $N$ in RPM. Used to determine pump type:
- $N_s < 50$: Radial (centrifugal)
- $50 < N_s < 150$: Mixed flow
- $N_s > 150$: Axial flow

### 3.4 Affinity Laws (Pump Scaling)

When speed changes from $N_1$ to $N_2$:

$$\frac{Q_2}{Q_1} = \frac{N_2}{N_1}, \quad \frac{H_2}{H_1} = \left(\frac{N_2}{N_1}\right)^2, \quad \frac{P_2}{P_1} = \left(\frac{N_2}{N_1}\right)^3$$

These are essential for VFD (Variable Frequency Drive) system design — cutting speed by half reduces power consumption to **one-eighth**.

---

## 4. Practical Calculator: Pump & Motor Sizing

### Input Parameters

| Parameter | Symbol | Typical Range |
|-----------|--------|--------------|
| Flow rate | $Q$ | 5–500 L/s |
| Static head | $H_s$ | 10–80 m |
| Pipe length | $L$ | 50–5000 m |
| Pipe diameter | $D$ | 100–600 mm |
| Pipe roughness | $\varepsilon$ | 0.046–0.26 mm |
| Pump efficiency | $\eta_p$ | 0.70–0.88 |
| Motor efficiency | $\eta_m$ | 0.88–0.95 |

### Worked Example — District Water Supply Pump Station

**Given:**
- Flow rate: $Q = 50$ L/s = 0.05 m³/s
- Static head: $H_s = 35$ m
- Pipe: 300 mm dia, cast iron, $L = 800$ m
- Pump efficiency: $\eta_p = 0.78$
- Motor efficiency: $\eta_m = 0.92$
- Supply voltage: 415 V, 3-phase

**Step 1 — Velocity:**
$$V = \frac{Q}{A} = \frac{0.05}{\pi(0.15)^2} = \frac{0.05}{0.0707} = 0.707 \text{ m/s}$$

**Step 2 — Reynolds Number:**
$$Re = \frac{VD}{\nu} = \frac{0.707 \times 0.3}{1.004 \times 10^{-6}} = 211{,}355 \quad \text{(turbulent)}$$

**Step 3 — Friction Factor (Swamee-Jain, $\varepsilon = 0.26$ mm):**
$$f = \frac{0.25}{\left[\log_{10}\left(\frac{0.00026}{3.7 \times 0.3} + \frac{5.74}{211355^{0.9}}\right)\right]^2} \approx 0.022$$

**Step 4 — Friction Head Loss:**
$$H_f = \frac{f L V^2}{2gD} = \frac{0.022 \times 800 \times 0.707^2}{2 \times 9.81 \times 0.3} = \frac{8.797}{5.886} = 1.49 \text{ m}$$

**Step 5 — TDH:**
$$TDH = 35 + 1.49 + 1.5 \text{ (minor losses)} \approx 38 \text{ m}$$

**Step 6 — Hydraulic Power:**
$$P_{hyd} = 9.81 \times 0.05 \times 38 = 18.6 \text{ kW}$$

**Step 7 — Shaft Power:**
$$P_{shaft} = \frac{18.6}{0.78} = 23.9 \text{ kW}$$

**Step 8 — Motor Input Power:**
$$P_{input} = \frac{23.9}{0.92} = 26.0 \text{ kW} \quad \Rightarrow \text{Select 30 kW motor}$$

**Step 9 — Full-Load Current:**
$$I_{FL} = \frac{26000}{\sqrt{3} \times 415 \times 0.85} = \frac{26000}{610.3} = 42.6 \text{ A}$$

---

## 5. System Curve and Operating Point

The system curve is defined by:

$$H_{system} = H_{static} + R \cdot Q^2$$

where $R$ is the system resistance coefficient determined from friction and minor losses:

$$R = \frac{f L}{2g A^2 D} + \sum \frac{K}{2g A^2}$$

The **operating point** is where the pump curve $H_p(Q)$ intersects the system curve $H_{sys}(Q)$.

### Parallel Pumps

For $n$ identical pumps in parallel:
$$Q_{total} = n \cdot Q_{single}$$

Head remains the same; useful for high-flow, low-head applications.

### Series Pumps

For $n$ identical pumps in series:
$$H_{total} = n \cdot H_{single}$$

Flow remains the same; useful for high-head, low-flow applications.

---

## 6. Net Positive Suction Head (NPSH)

NPSH is critical for cavitation prevention:

### Available NPSH

$$NPSH_A = \frac{P_{atm} - P_v}{\rho g} - H_{suction} - H_{f,suction}$$

where $P_v$ is the vapour pressure of water (at 20°C: 2.34 kPa).

### Required NPSH

Provided by the pump manufacturer. The design condition is:

$$NPSH_A \geq NPSH_R + 0.5 \text{ m (safety margin)}$$

If $NPSH_A$ is insufficient, options are:
1. Lower pump installation elevation
2. Increase suction pipe diameter
3. Reduce suction pipe length and fittings
4. Use a booster pump

---

## 7. Motor Load vs. Time Profiles

### Constant-Speed Pump with Varying Static Head

In district supply systems, the static head changes with reservoir level. The motor load follows:

$$P_{motor}(t) = \frac{9.81 \times Q(t) \times [H_{static}(t) + H_f(Q)]}{\eta_p(Q) \times \eta_m}$$

Since $Q$ is relatively constant (throttle valve controls it) but $H_{static}$ varies by 5–10 m across the day, motor load variation is typically ±15%.

### Variable-Speed Pump (VFD Controlled)

With VFD speed control to match demand, applying affinity laws:

$$P_{motor}(t) \propto \left(\frac{N(t)}{N_{rated}}\right)^3$$

A 20% speed reduction saves 49% in motor energy — the basis for energy audits we conducted across J&K pumping stations.

---

## 8. Motor Starting Methods

The starting method dictates the inrush current and mechanical stress. This is covered in detail in the [Star-Delta Starter Calculations](/posts/star-delta-starter-motor-calculations) post, but briefly:

| Method | Starting Current | Starting Torque | Application |
|--------|----------------|-----------------|-------------|
| Direct On-Line (DOL) | 6–8 × $I_{FL}$ | 100% | < 5 kW, robust supply |
| Star-Delta | 2–2.5 × $I_{FL}$ | 33% | 5–100 kW centrifugal loads |
| Auto-transformer | 2.5–4 × $I_{FL}$ | 50–65% | High inertia loads |
| Soft starter | 1.5–4 × $I_{FL}$ | Adjustable | Sensitive systems |
| VFD | ≤ $I_{FL}$ | Fully controllable | Variable flow systems |

---

## 9. PLC-Based Pump Control Logic

At Jal Shakti, we implemented PLC-based multi-pump control. The control algorithm:

```
// Multi-pump sequencing logic (IEC 61131-3 Structured Text)
IF Level_ReservoirLow AND NOT Motor1_Running THEN
    Motor1_Start := TRUE;
    StartTimer1(IN := TRUE, PT := T#5S);
END_IF

IF StartTimer1.Q AND Level_Low AND NOT Motor2_Running THEN
    Motor2_Start := TRUE;
END_IF

IF Level_ReservoirHigh THEN
    Motor2_Start := FALSE;
    StopTimer2(IN := TRUE, PT := T#10S);
    IF StopTimer2.Q THEN
        Motor1_Start := FALSE;
    END_IF
END_IF

// Overload protection
IF Motor1_Current > Motor1_OL_Setpoint THEN
    Motor1_Start := FALSE;
    Alarm_Motor1_OL := TRUE;
END_IF
```

Sensor inputs: float switches, pressure transducers, current transformers. Actuator outputs: DOL/star-delta contactors, valve actuators.

---

## 10. Energy Audit: Wire-to-Water Efficiency

The "wire-to-water" efficiency audit compares actual energy consumed to the theoretical minimum:

$$E_{theoretical} = \frac{\rho g Q H_{static} \times t}{1000} \text{ kWh}$$

$$E_{actual} = \text{kWh from energy meter reading}$$

$$\eta_{system} = \frac{E_{theoretical}}{E_{actual}} \times 100\%$$

**Field example (PHE Pumping Station, Udhampur):**
- Monthly pumped volume: 45,000 m³
- Average static head: 42 m
- Theoretical energy: $\frac{1000 \times 9.81 \times 45000 \times 42}{3.6 \times 10^6} = 5147 \text{ kWh}$
- Actual energy meter: 8,920 kWh
- System efficiency: **57.7%**

Improvements implemented: impeller trimming (saved 8%), VFD installation (saved 22%), pipe scaling removal (saved 6%) → new system efficiency: **78.4%**

---

## References

1. Hydraulic Institute, *Pump Standards*, ANSI/HI Series
2. Kaplan, A. & Streeter, V.L., *Fluid Mechanics*, McGraw-Hill
3. IS 9137 — Code for acceptance tests for centrifugal, mixed flow and axial pumps
4. IS 325 — Specification for three-phase induction motors, BIS
5. Moody, L.F. (1944), *Friction factors for pipe flow*, ASME Transactions
