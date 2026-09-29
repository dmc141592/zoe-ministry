/**
 * Unsichtbares Sprungziel für Dropdown-Links, `navbars` Navbar-Höhen unter dem Sektionsanfang
 * (die Sektions-IDs selbst bleiben für die Seitennavigation unverändert).
 * Die umgebende <section> muss `relative` sein.
 */
export function SectionAnchor({ id, navbars = 1 }: { id: string; navbars?: number }) {
  return (
    <span
      id={id}
      aria-hidden
      className="scroll-target pointer-events-none absolute left-0"
      style={{ top: `calc(var(--navbar-height) * ${navbars})` }}
    />
  )
}
