import { PropsWithChildren } from 'react';

export type ModalOptions = {
  backdrop: {
    enabled: boolean;
    canDismiss: boolean;
  };
  showCancelBtn: boolean;
};

export interface VariantComponentProps extends PropsWithChildren {
  options: ModalOptions;
  onMeasured: (width: number, height: number) => void;
  visible: boolean;
  onDismiss?: () => void;
}
