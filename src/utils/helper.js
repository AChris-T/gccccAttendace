import dayjs from 'dayjs';
import { attendanceLevels, textColors } from './constant';

export const formatDisplayDate = (date) => dayjs(date).format('DD MMM, YYYY');

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

export const getRandomTextColor = (value) => {
  if (value) return textColors[value];
  return textColors[Math.floor(Math.random() * textColors.length)];
};

export const handleApiError = (error) => {
  const message = error?.data?.message || 'An error occured.';
  return message;
};

export function isServiceDay(services, selectedDate) {
  const date = dayjs(selectedDate);
  const dayOfWeek = date.format('dddd').toLowerCase();

  return services.some((service) => {
    if (service.is_recurring) {
      return service.day_of_week?.toLowerCase() === dayOfWeek;
    } else {
      return service.service_date
        ? dayjs(service.service_date).isSame(date, 'day')
        : false;
    }
  });
}
export function getMatchingServiceId(services, selectedDate) {
  const date = dayjs(selectedDate);
  const dayOfWeek = date.format('dddd').toLowerCase();

  const match = services.find((service) => {
    if (service.is_recurring) {
      return service.day_of_week?.toLowerCase() === dayOfWeek;
    } else {
      return service.service_date
        ? dayjs(service.service_date).isSame(date, 'day')
        : false;
    }
  });

  return match ? match.id : null;
}
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};
export function getAttendanceMessage(percentage) {
  if (typeof percentage !== 'number' || percentage < 0 || percentage > 100) {
    return {
      level: 'Error',
      message:
        'Invalid percentage provided. Please ensure it is a number between 0 and 100.',
    };
  }

  const levelObject = attendanceLevels.find(
    (level) => percentage >= level.min && percentage <= level.max
  );

  if (levelObject) {
    const messages = levelObject.messages;
    const randomIndex = Math.floor(Math.random() * messages.length);
    const selectedMessage = messages[randomIndex];

    return {
      level: levelObject.level,
      message: selectedMessage,
      fromColor: levelObject.fromColor,
      toColor: levelObject.toColor,
    };
  }

  return {
    level: 'Undefined',
    message: 'We appreciate your dedication! Keep moving forward.',
    fromColor: '#000000',
    toColor: '#000000',
  };
}
