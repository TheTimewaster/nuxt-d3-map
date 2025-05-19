export type UiButtonProps = {
  size?: 'sm' | 'lg';
  variant?: 'primary' | 'neutral' | 'transparent';
  disabled?: boolean;
  icon?: string;
  label?: string;
};

export const UiButtonPropsDefault: UiButtonProps = {
  size: 'sm',
  variant: 'primary',
  disabled: false,
  icon: undefined,
  label: undefined,
};
