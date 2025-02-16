export interface PanelNavigationProps {
  nextStep?: () => void;
  previousStep?: () => void;
}

export interface Panel14Props extends PanelNavigationProps {
  openPaymentModal: any
}

export interface OverviewSectionProps {
  title: string;
  items: string[] | string;
} 
