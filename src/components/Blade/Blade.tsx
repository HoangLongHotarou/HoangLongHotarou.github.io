interface BladeProps {
  categories: string[];
  active: string;
  onSelect: (category: string) => void;
}

export default function Blade({ categories, active, onSelect }: BladeProps) {
  return (
    <div className="blade" role="tablist" aria-label="Skill categories">
      {categories.map((cat) => (
        <button
          key={cat}
          role="tab"
          aria-selected={active === cat}
          className={`blade__tab${active === cat ? ' blade__tab--active' : ''}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
