
import { PropsWithClassName } from "@/shared/types/propsWithClassName";
import { Dispatch, SetStateAction } from "react";

export interface SearchBarProps extends PropsWithClassName {
    value: string,
    onChange: Dispatch<SetStateAction<string>>
}   

