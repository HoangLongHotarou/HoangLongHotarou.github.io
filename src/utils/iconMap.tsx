import {
  AWS,
  Azure,
  CircleCI,
  Docker,
  Git,
  GoogleCloud,
  Grafana,
  Jenkins,
  Kubernetes,
  Terraform,
} from 'developer-icons';
import type { ComponentType, SVGProps } from 'react';

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

export const iconMap: Record<string, IconComponent> = {
  Kubernetes,
  Docker,
  Terraform,
  AWS,
  Azure,
  Helm: Jenkins,           // closest generic CI tooling icon
  'CI/CD Pipelines': CircleCI,
  GitOps: Git,
  Observability: Grafana,
  GCP: GoogleCloud,
};
