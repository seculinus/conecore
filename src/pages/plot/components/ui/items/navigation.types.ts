export interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  onClick: (props?:any) => void;
}