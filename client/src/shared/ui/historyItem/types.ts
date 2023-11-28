
import { PropsWithClassName } from "@/shared/types/propsWithClassName";
export interface HistoryItemProps extends PropsWithClassName {
  nickname: string;
  date: string;
  dateTime: string; // Should be format yyyy-mm-dd hh:mm. Used for datetime attribute of <time></time>.
  status: string;
  statusColor: HistoryItemStatusColorType;
}

export type HistoryItemStatusColorType =  "red" | "white";