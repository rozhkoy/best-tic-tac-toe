import { PropsWithClassName } from "@/shared/types/propsWithClassName";
export interface ToggleBtnProps extends PropsWithClassName {
  name?: string;
  value: boolean;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}