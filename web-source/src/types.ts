export type ReleaseCategory =
  | 'New Service'
  | 'New Tool'
  | 'Enhancement'
  | 'Tool Change'
  | 'Tool Removed'
  | 'Service Removed';

export interface Release {
  id: string;
  date: string; // ISO date string "YYYY-MM-DD"
  title: string;
  description: string | string[];
  category: ReleaseCategory;
  services: string[];
  dataCenters: DataCenter[];
  newTools?: string[];
  removedTools?: string[];
}

export type DataCenter = 'US' | 'EU' | 'IN' | 'AU' | 'JP' | 'CN' | 'CA' | 'SA' | 'All';

export type Theme = 'light' | 'dark';

export interface FilterState {
  search: string;
  selectedMonth: string | null; // "YYYY-MM"
  selectedServices: string[];
  selectedDCs: DataCenter[];
  selectedCategories: ReleaseCategory[];
}
