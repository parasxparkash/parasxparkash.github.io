interface MEPProject {
  id: number
  name: string
  description: string
  technologies: string[]
  slug: string
}

const mepProjects: MEPProject[] = [
  {
    id: 1,
    name: 'Pump Load & Motor Load Analysis',
    description:
      'Hydraulic power equations, TDH calculation, pump–motor sizing from first principles, affinity laws for VFD systems, NPSH analysis, system curve derivation, and wire-to-water efficiency auditing. Includes a full worked example for a district water supply station.',
    technologies: ['Hydraulics', 'TDH', 'Pump Sizing', 'Affinity Laws', 'NPSH', 'Energy Audit'],
    slug: 'pump-load-motor-load-analysis',
  },
  {
    id: 2,
    name: 'Star-Delta Starter Design & Motor Calculations',
    description:
      'Three-phase induction motor starting analysis — DOL vs star-delta current and torque derivations with proof, contactor sizing for all three contactors, timer calculation, control circuit schematic, and PLC structured-text implementation with interlocks.',
    technologies: ['Star-Delta', 'Contactor Sizing', 'Induction Motor', 'PLC Control', 'Motor Protection'],
    slug: 'star-delta-starter-motor-calculations',
  },
  {
    id: 3,
    name: 'Motor Assembly & Starting Methods Reference',
    description:
      'Complete motor assembly details — terminal box wiring for star and delta, bearing L₁₀ life calculations, insulation resistance testing, auto-transformer and soft-starter design, water hammer suppression with ramp-down control, and full commissioning checklist.',
    technologies: ['Motor Assembly', 'Soft Starter', 'Auto-Transformer', 'Water Hammer', 'Commissioning'],
    slug: 'star-delta-starter-motor-calculations',
  },
  {
    id: 4,
    name: 'HVAC Heat Load Calculation & Design',
    description:
      'Building and automotive HVAC heat load from first principles — CLTD/CLF method, ASHRAE radiant time series, sensible and latent load tables, vapour compression refrigeration cycle equations, COP derivation, refrigerant selection, and TXV sizing.',
    technologies: ['Heat Load', 'CLTD/CLF', 'ASHRAE RTS', 'Refrigeration Cycle', 'COP', 'TXV'],
    slug: 'hvac-heat-load-calculation-design',
  },
  {
    id: 5,
    name: 'Automotive HVAC & ECU Control System',
    description:
      'Cabin thermal load analysis for passenger vehicles — solar gain through glazing, occupant and ventilation loads, psychrometric dehumidification process, PID with solar feedforward ECU control algorithm, and refrigerant circuit design for R-134a and R-1234yf systems.',
    technologies: ['Automotive HVAC', 'Psychrometrics', 'ECU Control', 'PID', 'R-134a', 'Dehumidification'],
    slug: 'hvac-heat-load-calculation-design',
  },
  {
    id: 6,
    name: 'PLC-Based Multi-Pump Sequencing & Control Logic',
    description:
      'IEC 61131-3 structured-text implementation of multi-pump sequencing at water pumping stations — level-based start/stop logic, interlock design, overload protection, alarm handling, and energy-saving pump rotation scheduling.',
    technologies: ['PLC', 'IEC 61131-3', 'Structured Text', 'SCADA', 'Pump Sequencing'],
    slug: 'pump-load-motor-load-analysis',
  },
]

export default function MEPTab() {
  return (
    <section className="mb-12">
      <div className="space-y-8">
        {mepProjects.map((project, index) => (
          <div
            key={project.id}
            className="animate-slide-left"
            style={{ animationDelay: `${Math.min((index + 1) * 50, 400)}ms` }}
          >
            <div className="group hover:translate-x-1 transition-transform duration-150 ease-out">
              <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                <h3 className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  {project.name}
                </h3>
                <div className="flex items-center gap-1.5">
                  <a
                    href={`/posts/${project.slug}`}
                    className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center"
                    title={`Read ${project.name}`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-2 text-justify">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="px-1.5 py-0.5 text-[10px] rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
