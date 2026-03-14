import { iconMap } from '../../utils/iconMap';

interface SkillCardProps {
  name: string;
}

export default function SkillCard({ name }: SkillCardProps) {
  const Icon = iconMap[name];
  return (
    <div className="skill-card">
      {Icon && <Icon className="skill-card__icon" aria-hidden="true" />}
      <span className="skill-card__name">{name}</span>
    </div>
  );
}
