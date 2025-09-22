import dayjs from 'dayjs';
import { textColors } from './constant';

export const formatDisplayDate = (date) => dayjs(date).format('DD MMM, YYYY');
export const getErrorMessage = (
  error,
  defaultMessage = 'Something went wrong'
) => {
  return error?.response?.data?.message || defaultMessage;
};
export function generateChartSeries(statusesPerMonth) {
  if (!Array.isArray(statusesPerMonth) || statusesPerMonth.length === 0) {
    return [];
  }

  // Predefined fixed colors for certain statuses
  const FIXED_COLORS = {
    'Invited Again': '#f79009',
    Contacted: '#0ba5ec',
    'Not Contacted': '#667085',
    Integrated: '#12b76a',
    Visiting: '#465fff',
    'Opt-out': '#f04438',
  };

  // Extract dynamic keys (all keys except 'month')
  const allKeys = Object.keys(statusesPerMonth[0]).filter(
    (key) => key !== 'month'
  );

  // Helper to generate a truly random color that doesn't clash with fixed ones
  const usedColors = new Set(Object.values(FIXED_COLORS));

  const getRandomUniqueColor = () => {
    let color;
    do {
      color = `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')}`;
    } while (usedColors.has(color));
    usedColors.add(color);
    return color;
  };

  return allKeys.map((key) => {
    const color =
      FIXED_COLORS[key] ||
      (['Second Timer', 'Third Timer', 'Fourth Timer'].includes(key)
        ? getRandomUniqueColor()
        : getRandomUniqueColor());

    return {
      type: 'bar',
      xKey: 'month',
      yKey: key,
      yName: key,
      stroke: color,
      fill: color,
      stacked: true,
    };
  });
}
export function toSlug(text) {
  if (!text || typeof text !== 'string') return null;
  return text
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const getRandomTextColor = () =>
  textColors[Math.floor(Math.random() * textColors.length)];
