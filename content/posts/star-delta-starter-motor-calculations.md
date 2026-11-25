---
title: "Star-Delta Starter & Motor Assembly: Calculations, Design, and Control Engineering"
date: 2024-04-05
category: "MEP Engineering"
tags: ["star-delta starter", "motor starting", "induction motor", "electrical engineering", "MEP", "PLC", "contactors", "DOL"]
description: "Complete engineering reference for three-phase induction motor starting methods — DOL, star-delta, auto-transformer, and soft starters — with full electrical calculations, contactor sizing, timing diagrams, and assembly details from field experience at pumping stations."
author: "Paras Parkash"
reading_time: 25
mathjax: true
---

# Star-Delta Starter & Motor Assembly: Calculations, Design, and Control Engineering

## Introduction

Starting a large three-phase induction motor is one of the most demanding transient events in an industrial electrical system. During the six-year tenure maintaining PHE pumping stations across Jammu & Kashmir, motor starting problems — supply voltage dips, thermal trips, contactor failures, and mechanical shock — were among the most frequent field issues. This document is a complete engineering reference: the physics of starting, the mathematics of each method, sizing calculations, and practical assembly guidance.

---

## 1. Three-Phase Induction Motor Fundamentals

### 1.1 Equivalent Circuit

The per-phase equivalent circuit of an induction motor has:
- Stator impedance: $Z_1 = R_1 + jX_1$
- Magnetising branch: $X_m$ (usually large, often neglected for starting analysis)
- Rotor impedance referred to stator: $Z_2' = R_2'/s + jX_2'$

where $s$ is slip:

$$s = \frac{N_s - N_r}{N_s}$$

$N_s$ = synchronous speed (RPM), $N_r$ = rotor speed (RPM).

Synchronous speed:

$$N_s = \frac{120 f}{P}$$

where $f$ = supply frequency (Hz), $P$ = number of poles.

### 1.2 Motor Torque Equation

$$T = \frac{3}{\omega_s} \cdot \frac{V_1^2 R_2'/s}{(R_1 + R_2'/s)^2 + (X_1 + X_2')^2}$$

where $\omega_s = 2\pi N_s / 60$ is synchronous angular velocity.

**At starting** ($s = 1$):

$$T_{start} = \frac{3}{\omega_s} \cdot \frac{V_1^2 R_2'}{(R_1 + R_2')^2 + (X_1 + X_2')^2}$$

**Maximum torque** (pull-out torque) occurs at slip:

$$s_{max} = \frac{R_2'}{\sqrt{R_1^2 + (X_1 + X_2')^2}}$$

$$T_{max} = \frac{3}{2\omega_s} \cdot \frac{V_1^2}{\sqrt{R_1^2 + (X_1 + X_2')^2} + R_1}$$

### 1.3 Starting Current

At the moment of starting ($s = 1$, rotor stationary), the motor behaves like a short-circuited transformer:

$$I_{start} = \frac{V_1}{\sqrt{(R_1 + R_2')^2 + (X_1 + X_2')^2}}$$

Practically, starting current is **5 to 8 times full-load current** depending on motor design:

$$I_{start} \approx (5 \text{ to } 8) \times I_{FL}$$

---

## 2. Direct On-Line (DOL) Starting

### 2.1 Principle

The motor is connected directly to full supply voltage. Simple, cheap, but delivers maximum inrush current.

### 2.2 DOL Starting Current

$$I_{DOL} = k \cdot I_{FL}$$

where $k$ typically ranges from 5–8 for squirrel-cage induction motors.

### 2.3 Voltage Drop on Supply

The supply impedance $Z_s$ causes a voltage dip:

$$\Delta V = I_{start} \times Z_s$$

$$\%VD = \frac{I_{start} \times Z_s}{V_{rated}} \times 100$$

Acceptable voltage dip ≤ 5–10% per IS 325 / IEEE 1159.

### 2.4 DOL Starter Components

| Component | Sizing Rule |
|-----------|-------------|
| Main contactor | ≥ $I_{FL}$ AC-3 rating |
| Overload relay | 100–115% of $I_{FL}$ |
| MCB/MCCB | 150–200% of $I_{FL}$ |
| Cables | ≥ 125% of $I_{FL}$ |

---

## 3. Star-Delta (Y-Δ) Starting

### 3.1 Principle

The motor windings are first connected in **star** (Y), then switched to **delta** (Δ) after the motor accelerates to near-synchronous speed (typically after 5–15 seconds).

In star connection, each winding receives:
$$V_{star} = \frac{V_L}{\sqrt{3}}$$

Since impedance is constant, the current per winding is reduced, and because the windings are series-connected from line to neutral, the **line current is reduced to 1/3**.

### 3.2 Star-Delta Current and Torque Reduction

**Line current in star:**

$$I_{start,Y} = \frac{I_{start,\Delta}}{3}$$

**Torque in star** (torque ∝ $V^2$):

$$T_{start,Y} = \frac{T_{start,\Delta}}{3}$$

This is the fundamental trade-off: starting current is reduced to 1/3, but so is starting torque. For centrifugal pumps (which have low torque at zero speed), this is acceptable.

### 3.3 Proof of Current Reduction

In delta, each winding voltage = $V_L$ (line voltage), so winding current:

$$I_{winding,\Delta} = \frac{V_L}{Z_{winding}}$$

Line current in delta (phasor sum):
$$I_{line,\Delta} = \sqrt{3} \cdot I_{winding,\Delta}$$

In star, each winding voltage = $V_L/\sqrt{3}$:

$$I_{winding,Y} = \frac{V_L/\sqrt{3}}{Z_{winding}} = \frac{I_{winding,\Delta}}{\sqrt{3}}$$

Since line current = winding current in star:
$$I_{line,Y} = I_{winding,Y} = \frac{I_{winding,\Delta}}{\sqrt{3}} = \frac{I_{line,\Delta}/\sqrt{3}}{\sqrt{3}} = \frac{I_{line,\Delta}}{3}$$

$$\boxed{I_{start,Y} = \frac{I_{start,\Delta}}{3}}$$

### 3.4 Contactor Sizing for Star-Delta Starters

A star-delta starter requires **three contactors**:

1. **Main contactor (KM1)** — always closes first, connects supply to stator terminals
2. **Star contactor (KM3)** — connects the other three stator ends together (neutral point)
3. **Delta contactor (KM2)** — connects each end of a winding to the start of the next

**Main contactor KM1:** Carries full line current in delta mode.
$$I_{KM1} = I_{FL} \quad \text{(AC-3 rated)}$$

**Star contactor KM3:** Carries winding current during star start:
$$I_{KM3} = \frac{I_{FL}}{\sqrt{3}} \approx 0.58 \cdot I_{FL}$$

Can be rated at 58% of KM1, but in practice often same size for standardisation.

**Delta contactor KM2:** Carries winding current in delta run:
$$I_{KM2} = \frac{I_{FL}}{\sqrt{3}} \approx 0.58 \cdot I_{FL}$$

### 3.5 Timing Diagram

```
Time:    0        t_star        t_trans       t_run
         |          |              |              |
KM1:     ├──────────┼──────────────┼──────────────► (closed throughout)
KM3:     ├──────────┤  OPEN        |              
         |   STAR   |←t_trans→    |              
KM2:     |          |              ├──────────────► (closed for delta)
         |          |              |
Motor:   ├──ACCEL───┤  COAST DIP  ├──DELTA RUN──►
Speed:         ↑ ~80% Ns          ↑ Full speed
```

**Transition dead time** $t_{trans}$ = 50–100 ms (both KM2 and KM3 open simultaneously to prevent short-circuit through the windings). This causes a brief torque dip.

### 3.6 Timer Setting Calculation

The star period $t_{star}$ should allow the motor to reach ≥75% of synchronous speed:

Using the mechanical time constant approximation:

$$t_{star} \approx (1.5 \text{ to } 2.5) \times t_{mech}$$

where the mechanical time constant:

$$t_{mech} = \frac{J \cdot \omega_s^2}{P_{rated}}$$

$J$ = rotor moment of inertia (kg·m²), available from motor data sheet.

**Typical timer settings:**
| Motor Power | Timer Setting |
|-------------|--------------|
| 5–15 kW | 5–8 s |
| 15–45 kW | 8–12 s |
| 45–110 kW | 10–20 s |

---

## 4. Worked Example — 37 kW Pump Motor (PHE Station)

**Motor nameplate data:**
- Rated power: 37 kW
- Voltage: 415 V / 240 V (Δ/Y), 50 Hz
- Rated current: 72 A (delta connection)
- Starting current: 6 × $I_{FL}$ = 432 A
- Rated speed: 1470 RPM (4-pole)
- $\cos\phi$ = 0.86, $\eta$ = 0.92

### 4.1 Starting Current Comparison

| Method | Line Current | % of DOL |
|--------|-------------|----------|
| DOL | 432 A | 100% |
| Star-Delta | 432 / 3 = **144 A** | 33.3% |
| Soft Starter (350%) | 252 A | 58.3% |

### 4.2 Contactor Selection

**KM1 (Main):**
- AC-3 duty current = 72 A → Select Siemens 3RT 80 A contactor

**KM3 (Star):**
- Current = 72/√3 = 41.6 A → Select 50 A contactor

**KM2 (Delta):**
- Current = 72/√3 = 41.6 A → Select 50 A contactor

### 4.3 Overload Relay Setting

Set to 110% of full-load current:
$$I_{OL} = 1.10 \times 72 = 79.2 \text{ A}$$

Note: During star starting, overload relay sees $I_{FL}/\sqrt{3}$ (since relay is in line), so it must not trip during the starting period. Use Class 10 or Class 20 relay.

### 4.4 Cable Sizing

Minimum cable current rating = 125% × 72 = 90 A
→ **25 mm² copper XLPE cable** (rated 95 A in conduit per IS 1554)

### 4.5 Power Factor and kVAR

At full load:
$$S = \frac{P}{\eta} = \frac{37}{0.92} = 40.2 \text{ kVA}$$

$$Q_{reactive} = S \sin(\cos^{-1}(0.86)) = 40.2 \times 0.51 = 20.5 \text{ kVAR}$$

To improve $\cos\phi$ to 0.95, add capacitor bank:
$$Q_{cap} = P(\tan\phi_1 - \tan\phi_2) = 37(0.594 - 0.329) = 9.8 \text{ kVAR}$$

---

## 5. Control Circuit — Star-Delta Starter

### 5.1 Control Schematic Logic

```
Control supply: 230 V AC single phase

[START] ──┬── [KM3 NO] ── [Timer coil T1]
          └── [KM1 coil] ── [OL NC]

[T1 contact NO (time-on)] ── [KM3 NC interlock] ── [KM2 coil]
                                                     (Delta)
[T1 contact NC (time-off)] ── [KM3 coil]
                               (Star)

[KM2 NO interlock] ──→ KM3 coil circuit breaks
[KM3 NO interlock] ──→ KM2 coil circuit breaks
```

This ensures **mechanical and electrical interlock** between KM2 and KM3 — they can never be energised simultaneously.

### 5.2 PLC Implementation (IEC 61131-3)

```pascal
// Star-Delta Motor Starter - Structured Text
VAR
    StartPB    : BOOL;  // Start pushbutton
    StopPB     : BOOL;  // Stop pushbutton (NC)
    OL_Trip    : BOOL;  // Overload relay (NC)
    KM1        : BOOL;  // Main contactor
    KM2        : BOOL;  // Delta contactor
    KM3        : BOOL;  // Star contactor
    T_Star     : TON;   // Star timer
    T_Trans    : TON;   // Transition dead-time timer
    RunLatch   : BOOL;
END_VAR

// Latch circuit
IF StartPB AND NOT OL_Trip THEN
    RunLatch := TRUE;
END_IF
IF NOT StopPB OR OL_Trip THEN
    RunLatch := FALSE;
END_IF

// Main contactor — on whenever running
KM1 := RunLatch;

// Star timer
T_Star(IN := RunLatch, PT := T#10S);

// Star contactor — on during star period, off during transition
KM3 := RunLatch AND NOT T_Star.Q AND NOT KM2;

// Transition dead-time
T_Trans(IN := T_Star.Q AND NOT KM2, PT := T#80MS);

// Delta contactor — after transition delay, interlocked with star
KM2 := T_Trans.Q AND RunLatch AND NOT KM3;
```

---

## 6. Auto-Transformer Starting

### 6.1 Principle

A tapped auto-transformer reduces supply voltage to the motor during starting. The tap ratio $k$ (0 < k < 1) gives:

$$V_{motor} = k \cdot V_{supply}$$

$$I_{motor} = k \cdot I_{DOL,start}$$

$$I_{supply} = k^2 \cdot I_{DOL,start}$$

$$T_{start,AT} = k^2 \cdot T_{DOL,start}$$

### 6.2 Common Taps

| Tap % | $k$ | Supply Current Reduction | Torque |
|-------|-----|------------------------|--------|
| 50% | 0.50 | 25% of DOL | 25% |
| 65% | 0.65 | 42% of DOL | 42% |
| 80% | 0.80 | 64% of DOL | 64% |

Auto-transformer starting gives better torque than star-delta for the same current reduction, making it suitable for high-inertia loads (flywheels, compressors).

---

## 7. Soft Starter

### 7.1 Principle

An SCR-based soft starter gradually ramps up the voltage from an initial value to full supply over a settable ramp time (1–30 s), producing smooth acceleration.

Starting current is adjustable, typically set to 150–400% of $I_{FL}$.

### 7.2 Key Parameters

- **Initial voltage**: 30–60% of supply
- **Ramp time**: 3–20 s
- **Current limit**: 150–400% $I_{FL}$
- **Kick start**: brief full voltage pulse to break away static friction

Soft starters also provide controlled stopping (ramp-down) — useful for water hammer prevention in long pipelines.

### 7.3 Water Hammer Equation

Pressure surge in a pipeline when a pump stops suddenly:

$$\Delta P = \rho \cdot a \cdot \Delta V$$

where $a$ is the acoustic wave velocity:

$$a = \frac{\sqrt{K/\rho}}{\sqrt{1 + (KD)/(Ee)}}$$

$K$ = bulk modulus of water ≈ 2.1 GPa, $E$ = pipe modulus, $e$ = wall thickness.

Soft-stop reduces $\Delta V$ over time, cutting pressure surge proportionally.

---

## 8. Motor Assembly Details

### 8.1 Three-Phase Induction Motor Construction

**Stator:**
- Laminated silicon steel core
- Three-phase distributed winding in slots
- Connection terminals: U1, V1, W1 (line ends), U2, V2, W2 (neutral ends)

**Rotor (Squirrel Cage):**
- Aluminium or copper bars in laminated core slots
- Bars short-circuited at both ends by end rings
- No external connections

**Mechanical:**
- DE (Drive End) and NDE (Non-Drive End) bearings
- IP55 enclosure for outdoor/pump use
- Drain plug at lowest point

### 8.2 Terminal Box Connections

```
         DELTA CONNECTION         STAR CONNECTION
         ───────────────          ───────────────
L1 ─── U1               L1 ─── U1
L2 ─── V1               L2 ─── V1
L3 ─── W1               L3 ─── W1
U2 ─── W1 (bridge)       U2 ─┐
V2 ─── U1 (bridge)       V2 ─┼── Neutral (shorted)
W2 ─── V1 (bridge)       W2 ─┘
```

For star-delta starters, all 6 terminals must be accessible (U1, V1, W1, U2, V2, W2).

### 8.3 Bearing Maintenance

Bearing replacement interval (L₁₀ life):

$$L_{10} = \left(\frac{C}{P}\right)^3 \times \frac{10^6}{60N} \text{ hours}$$

where $C$ = dynamic load rating (kN), $P$ = equivalent dynamic load (kN), $N$ = speed (RPM).

For motor bearings: $L_{10}$ is typically 20,000–40,000 hours. At J&K stations running 18 h/day, this means bearing inspection every **3–6 years**.

---

## 9. Protection Devices

### 9.1 Overload Relay Classes (IEC 60947-4-1)

| Class | Trip Time at 7.2 × $I_s$ |
|-------|--------------------------|
| 10A | ≤ 2 s |
| 10 | 2–10 s |
| 20 | 10–20 s |
| 30 | 20–30 s |

For star-delta starters, **Class 20 or 30** avoids nuisance tripping during the star phase when current is lower.

### 9.2 Motor Protection Relay Settings

| Protection | Setting | Function |
|-----------|---------|----------|
| Overcurrent (Phase) | 115–125% $I_{FL}$ | Overload protection |
| Locked Rotor | 400–600% $I_{FL}$ | Seized pump/motor |
| Phase Unbalance | > 5% unbalance | Phase loss detection |
| Earth Fault | 10–30% $I_{FL}$ | Insulation fault |
| Under-voltage | < 85% $V_{rated}$ | Supply disturbance |
| Thermistor | PTC in winding | Direct winding temp |

### 9.3 Power Factor Correction Capacitor Sizing

Switched capacitors connected at motor terminals for local PFC:

$$C = \frac{Q_{cap}}{2\pi f V^2} \quad \text{(per phase, star connected)}$$

**Warning:** Capacitors must be switched off with the motor — a disconnected motor can self-excite with capacitors causing dangerous over-voltages.

---

## 10. Commissioning Checklist

### Pre-Start Checks
- [ ] Insulation resistance: > 1 MΩ (phase-to-earth, phase-to-phase) with 500 V Megger
- [ ] Bearing clearance within spec
- [ ] Coupling alignment: radial < 0.05 mm, angular < 0.05 mm
- [ ] Rotation direction matches pump arrow
- [ ] All cable terminations tight, correct cross-sectional area
- [ ] Star/delta links correct for supply voltage
- [ ] Overload relay set to 110% $I_{FL}$

### First Start (DOL or Star-Delta)
- [ ] Record starting current on clamp meter (should match calculation)
- [ ] Record starting time to full speed
- [ ] Check for vibration (< 2.8 mm/s RMS per IS 12075)
- [ ] Check bearing temperature (< 90°C after 30 min)
- [ ] Confirm timer transitions correctly (star → delta)
- [ ] Record full-load current (all three phases within 5% of each other)

---

## References

1. Chapman, S.J., *Electric Machinery Fundamentals*, 5th ed., McGraw-Hill
2. IS 325 — Three-Phase Induction Motors, Bureau of Indian Standards
3. IEC 60947-4-1 — Low-voltage switchgear: contactors and motor starters
4. Siemens, *Motor Starters and Protection Devices*, Technical Manual
5. CBIP, *Manual on Pumping Stations*, Central Board of Irrigation and Power, New Delhi
6. Wildi, T., *Electrical Machines, Drives and Power Systems*, Pearson
