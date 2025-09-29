export interface MenuItem {
  id?: number;
  label?: any;
  icon?: string;
  link?: string;
  className?: string; // Ajoute cette ligne si nécessaire
  subItems?: any;
  isTitle?: boolean;
  badge?: any;
  parentId?: number;
  isLayout?: boolean;
}