import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function BaseIcon({
  children,
  ...props
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </BaseIcon>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </BaseIcon>
  );
}

export function ArrowLeft(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M20 12H5" />
      <path d="m11 18-6-6 6-6" />
    </BaseIcon>
  );
}

export function BookOpen(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 6.5C10.2 4.9 7.7 4 4 4v15c3.7 0 6.2.9 8 2.5 1.8-1.6 4.3-2.5 8-2.5V4c-3.7 0-6.2.9-8 2.5Z" />
      <path d="M12 6.5V21" />
    </BaseIcon>
  );
}

export function Headphones(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <path d="M4 14h3v6H5a1 1 0 0 1-1-1v-5ZM20 14h-3v6h2a1 1 0 0 0 1-1v-5Z" />
    </BaseIcon>
  );
}

export function Play(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m8 5 11 7-11 7V5Z" />
    </BaseIcon>
  );
}

export function Pause(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M9 5v14M15 5v14" />
    </BaseIcon>
  );
}

export function Terminal(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="m7 9 3 3-3 3M13 15h4" />
    </BaseIcon>
  );
}

export function Search(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </BaseIcon>
  );
}

export function Sun(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
    </BaseIcon>
  );
}

export function Moon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </BaseIcon>
  );
}

export function Menu(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </BaseIcon>
  );
}

export function X(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </BaseIcon>
  );
}

export function Copy(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3" />
    </BaseIcon>
  );
}

export function Check(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m5 12 4 4L19 6" />
    </BaseIcon>
  );
}

export function CheckCircle(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 2.5 2.5L16 9" />
    </BaseIcon>
  );
}

export function Circle(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="8" />
    </BaseIcon>
  );
}

export function ChevronDown(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m6 9 6 6 6-6" />
    </BaseIcon>
  );
}

export function ChevronRight(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m9 6 6 6-6 6" />
    </BaseIcon>
  );
}

export function ChevronLeft(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m15 18-6-6 6-6" />
    </BaseIcon>
  );
}

export function Clock(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </BaseIcon>
  );
}

export function List(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M8 6h13M8 12h13M8 18h13" />
      <circle cx="3.5" cy="6" r=".8" fill="currentColor" stroke="none" />
      <circle cx="3.5" cy="12" r=".8" fill="currentColor" stroke="none" />
      <circle cx="3.5" cy="18" r=".8" fill="currentColor" stroke="none" />
    </BaseIcon>
  );
}

export function Github(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.5 5.5 0 0 0 19.4 4 5.2 5.2 0 0 0 19.3.5S18.1.1 15 1.8a13.4 13.4 0 0 0-7 0C4.9.1 3.7.5 3.7.5A5.2 5.2 0 0 0 3.6 4a5.5 5.5 0 0 0-1.5 3.8c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 8 18v4" />
      <path d="M8 22c-3 .9-3-1.5-4-2" />
    </BaseIcon>
  );
}

export function Spark(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
    </BaseIcon>
  );
}

export function Volume(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a9 9 0 0 1 0 12" />
    </BaseIcon>
  );
}

export function Info(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </BaseIcon>
  );
}

export function Rotate(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
      <path d="M3 3v5h5" />
    </BaseIcon>
  );
}

export function Loader(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 3a9 9 0 1 0 9 9" />
    </BaseIcon>
  );
}
