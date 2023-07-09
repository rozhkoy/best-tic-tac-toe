import { PropsWithClassName } from "@/shared/types/propsWithClassName";
export interface AvatarProps extends PropsWithClassName {
  size?: AvatarSizeTypes;
  alt?: string;
  src: string;
}

export type AvatarSizeTypes =  "small" | "medium" | "large";