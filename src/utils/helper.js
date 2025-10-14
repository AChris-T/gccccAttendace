import dayjs from 'dayjs';
import {
  attendanceLevels,
  followupCommentTypes,
  monthNames,
  textColors,
} from './constant';

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
  const message = error?.data?.message || error || 'An error occured.';
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
export function getMonthName(monthNumber) {
  if (monthNumber < 1 || monthNumber > 12) {
    return null;
  }
  return monthNames[monthNumber - 1];
}
export function getWelcomeMessage(name) {
  return `Dear ${name},
          We are glad you attended our service at GCCC Ibadan. Family is the core of what we stand for in GCCC, and we'd genuinely love for you to become a part of our community.
          We look forward to having you around again.
          Here's a little detail about our meeting days:
          At Glory Centre Community Church Ibadan, we meet by 5:30 pm on Tuesdays and Fridays, and 8:00 am on Sundays.
          You can also be a part of our online community.
          Connect with us on;
          Instagram: https://instagram.com/gcccibadan
          Facebook: https://m.facebook.com/GCCCIBADAN
          Mixlr: https://gcccibadan.mixlr.com/ 
          YouTube: https://www.youtube.com/@Gccc_Ibadan
          Telegram: https://t.me/Pastoropeyemipeter to access life transforming messages.
          We will keep sharing content that we hope will bless and encourage you. Hope to see you again soon!
          Have a wonderful day. Cheers!🥂
          Regards,
          GCCC IBADAN`;
}
export function normalizePhone(rawNumber, countryCode = '+234') {
  if (!rawNumber) return null;

  // Remove all non-digits
  let number = rawNumber.replace(/\D/g, '');

  if (number.startsWith('0')) {
    number = number.slice(1);
  }

  if (number.startsWith('00')) {
    return '+' + number.slice(2);
  }

  if (!number.startsWith('+')) {
    return countryCode + number;
  }

  return number;
}
export function getFilteredCommentTypes({ isAdmin, isLeader, isMember }) {
  if (isAdmin) return followupCommentTypes;

  if (isLeader)
    return followupCommentTypes.filter((c) =>
      ['Pre-Service', 'Post-Service', 'Unit-Leader', 'Others'].includes(c.id)
    );

  if (isMember)
    return followupCommentTypes.filter((c) =>
      ['Pre-Service', 'Post-Service', 'Others'].includes(c.id)
    );

  return [];
}
export const formatDateFull = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
export const formatFullDateTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const getTypeConfig = (type) => {
  const configs = {
    'Pre-Service': { color: 'primary' },
    'Post-Service': { color: 'success' },
    Admin: { color: 'error' },
    Pastor: { color: 'warning' },
    'Unit-Leader': { color: 'info' },
    Others: { color: 'light' },
  };
  return configs[type] || { color: 'light' };
};
