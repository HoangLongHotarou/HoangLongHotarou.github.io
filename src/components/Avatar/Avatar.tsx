import { getInitials } from '../../utils/helpers';

interface AvatarProps {
  src: string;
  name: string;
}

export default function Avatar({ src, name }: AvatarProps) {
  return src ? (
    <img src={src} alt={name} className="avatar" />
  ) : (
    <div className="avatar avatar--initials" aria-label={name}>
      {getInitials(name)}
    </div>
  );
}
