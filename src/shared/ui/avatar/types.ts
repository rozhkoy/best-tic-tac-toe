import { PropsWithClassName } from "@/shared/types/propsWithClassName";
export interface AvatarProps extends PropsWithClassName {
  size?: "small" | "medium" | "large";
  alt?: string;
  src: string;
}