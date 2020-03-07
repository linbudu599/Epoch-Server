import dayjs from "dayjs";

export function normalizeCurrent(): string {
  return dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
}
