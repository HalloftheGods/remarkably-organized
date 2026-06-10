import { getUTCDate } from './src/lib/helpers/date.helper.ts';

const startMonth = 1;
const endMonth = 1;
const year = 2026;
for (let month = startMonth; month <= endMonth; month++) {
    const start = getUTCDate(year, month - 1);
    const end = getUTCDate(year, month, 0);
    console.log(start, end, end.getUTCDate());
}
