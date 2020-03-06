import { slice } from "lodash";

type IPaginator = (
  cursor: number,
  count: number,
  origin: any[]
) => any[] | null;

// TODO: consider more edge cases
const paginator: IPaginator = (cursor = 0, count = 10, origin) => {
  if (cursor < 0 || count < 1) return null;
  return slice(origin, cursor + 1, cursor + count + 1);
};

export default paginator;
