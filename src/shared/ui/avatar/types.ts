import { PropsWithClassName } from "shared/types/propsWithClassName";
export interface avatarProps extends PropsWithClassName {
  size?: "small" | "medium" | "big";
  alt?: string;
  src: string;
}