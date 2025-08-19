# Linear Algebra Fundamentals

## Vector Spaces

A **vector space** $V$ over a field $F$ is a set equipped with:
- **Vector Addition**: $+ : V \times V \rightarrow V$
- **Scalar Multiplication**: $\cdot : F \times V \rightarrow V$

## Matrix Operations

### Matrix Multiplication
For matrices $A \in \mathbb{R}^{m \times n}$ and $B \in \mathbb{R}^{n \times p}$:
$$(AB)_{ij} = \sum_{k=1}^{n} A_{ik} B_{kj}$$

### Determinant
For a $2 \times 2$ matrix:
$$\det\begin{pmatrix} a & b \\ c & d \end{pmatrix} = ad - bc$$

## Eigenvalues and Eigenvectors

A vector $\mathbf{v} \neq \mathbf{0}$ is an eigenvector of matrix $A$ if:
$$A\mathbf{v} = \lambda\mathbf{v}$$

Where $\lambda$ is the corresponding eigenvalue.

---

*Tags: maths, algebra, linear-algebra*
