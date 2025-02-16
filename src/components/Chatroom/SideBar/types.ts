export interface NavItem {
  id: string;
  src: string;
  content?: string;
  onClick?: () => void;
}

export interface SideBarProps {
  className?: string;
} 