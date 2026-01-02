/**
 * Members Table Utilities
 * Helper functions for data processing, formatting, and table operations
 */

/**
 * Format boolean values for Glory Team display
 * @param {boolean|number|string} value - The value to format
 * @returns {boolean} - Normalized boolean value
 */
export const formatGloryTeamStatus = (value) => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'number') return value === 1;
    if (typeof value === 'string') return value === 'true' || value === '1';
    return false;
};

/**
 * Get role display information
 * @param {string} roleValue - Role value from API
 * @returns {object} - Role display information
 */
export const getRoleInfo = (roleValue) => {
    const roleMap = {
        all: { label: 'All Users', icon: 'users', color: 'gray' },
        admin: { label: 'Administrators', icon: 'shield', color: 'purple' },
        leader: { label: 'Leaders', icon: 'star', color: 'yellow' },
        member: { label: 'Members', icon: 'user', color: 'blue' },
        firstTimer: { label: 'First Timers', icon: 'user-plus', color: 'green' },
        pastor: { label: 'Pastors', icon: 'book-open', color: 'indigo' },
        gloryTeam: { label: 'Glory Team', icon: 'briefcase', color: 'teal' },
        nonGloryTeam: { label: 'Non-Glory Team', icon: 'user-x', color: 'red' }
    };

    return roleMap[roleValue] || roleMap.member;
};

/**
 * Format date for display
 * @param {string|Date} date - Date to format
 * @param {string} format - Format type ('short', 'long', 'iso')
 * @returns {string} - Formatted date string
 */
export const formatDate = (date, format = 'short') => {
    if (!date) return '';

    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj.getTime())) return date;

    const formats = {
        short: { month: 'short', day: 'numeric' },
        long: { year: 'numeric', month: 'long', day: 'numeric' },
        iso: null
    };

    if (format === 'iso') {
        return dateObj.toISOString().split('T')[0];
    }

    return dateObj.toLocaleDateString('en-US', formats[format]);
};

/**
 * Generate CSV filename with timestamp and role
 * @param {string} role - Current role filter
 * @param {string} prefix - Filename prefix
 * @returns {string} - Complete filename
 */
export const generateCSVFilename = (role = 'all', prefix = 'members-report') => {
    const timestamp = new Date().toISOString().split('T')[0];
    const roleLabel = getRoleInfo(role).label.toLowerCase().replace(/\s+/g, '-');
    return `${prefix}-${roleLabel}-${timestamp}.csv`;
};

/**
 * Calculate table height based on row count
 * @param {number} rowCount - Number of rows
 * @param {object} options - Height calculation options
 * @returns {number} - Calculated height in pixels
 */
export const calculateTableHeight = (rowCount, options = {}) => {
    const {
        rowHeight = 42,
        headerHeight = 56,
        paginationHeight = 60,
        minHeight = 400,
        maxHeight = 800
    } = options;

    if (rowCount === 0) return minHeight;

    const contentHeight = (rowCount * rowHeight) + headerHeight + paginationHeight;
    return Math.min(Math.max(contentHeight, minHeight), maxHeight);
};

/**
 * Filter members by search term
 * @param {Array} members - Members array
 * @param {string} searchTerm - Search term
 * @returns {Array} - Filtered members
 */
export const searchMembers = (members, searchTerm) => {
    if (!searchTerm || !members) return members;

    const term = searchTerm.toLowerCase().trim();
    return members.filter(member => {
        const searchableFields = [
            member.full_name,
            member.email,
            member.phone_number,
            member.community,
            member.address
        ];

        return searchableFields.some(field =>
            field?.toLowerCase().includes(term)
        );
    });
};

/**
 * Group members by a specific field
 * @param {Array} members - Members array
 * @param {string} field - Field to group by
 * @returns {object} - Grouped members
 */
export const groupMembersBy = (members, field) => {
    if (!members || !field) return {};

    return members.reduce((groups, member) => {
        const key = member[field] || 'Unknown';
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(member);
        return groups;
    }, {});
};

/**
 * Get member statistics
 * @param {Array} members - Members array
 * @returns {object} - Statistics object
 */
export const getMemberStatistics = (members) => {
    if (!members || members.length === 0) {
        return {
            total: 0,
            gloryTeam: 0,
            nonGloryTeam: 0,
            byCommunity: {},
            byGender: {}
        };
    }

    const stats = {
        total: members.length,
        gloryTeam: 0,
        nonGloryTeam: 0,
        byCommunity: {},
        byGender: {}
    };

    members.forEach(member => {
        // Glory Team stats
        if (formatGloryTeamStatus(member.is_glory_team_member)) {
            stats.gloryTeam++;
        } else {
            stats.nonGloryTeam++;
        }

        // Community stats
        const community = member.community || 'Unknown';
        stats.byCommunity[community] = (stats.byCommunity[community] || 0) + 1;

        // Gender stats
        const gender = member.gender || 'Unknown';
        stats.byGender[gender] = (stats.byGender[gender] || 0) + 1;
    });

    return stats;
};

/**
 * Validate filter parameters
 * @param {object} filters - Filter object
 * @returns {object} - Validated filters
 */
export const validateFilters = (filters) => {
    const validated = { ...filters };

    // Ensure date_of_birth is an array
    if (validated.date_of_birth && !Array.isArray(validated.date_of_birth)) {
        validated.date_of_birth = [validated.date_of_birth];
    }

    // Remove null/undefined values
    Object.keys(validated).forEach(key => {
        if (validated[key] === null || validated[key] === undefined || validated[key] === '') {
            delete validated[key];
        }
        // Remove empty arrays
        if (Array.isArray(validated[key]) && validated[key].length === 0) {
            delete validated[key];
        }
    });

    return validated;
};

/**
 * Build query string from filters
 * @param {object} filters - Filter object
 * @returns {string} - Query string
 */
export const buildFilterQueryString = (filters) => {
    const queryParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach(item => queryParams.append(`${key}[]`, item));
        } else if (value !== null && value !== undefined && value !== '') {
            queryParams.append(key, value);
        }
    });

    return queryParams.toString();
};

/**
 * Check if filters are active
 * @param {object} filters - Filter object
 * @param {object} defaultFilters - Default filter values
 * @returns {boolean} - Whether filters are active
 */
export const hasActiveFilters = (filters, defaultFilters) => {
    return Object.keys(filters).some(key => {
        const value = filters[key];
        const defaultValue = defaultFilters[key];

        if (Array.isArray(value)) {
            return value.length > 0;
        }

        return value !== defaultValue && value !== null && value !== undefined && value !== '';
    });
};

/**
 * Export members data to CSV format
 * @param {Array} members - Members array
 * @param {Array} columns - Column definitions
 * @returns {string} - CSV string
 */
export const exportToCSV = (members, columns) => {
    if (!members || members.length === 0) return '';

    // CSV headers
    const headers = columns.map(col => col.headerName).join(',');

    // CSV rows
    const rows = members.map(member => {
        return columns.map(col => {
            let value = member[col.field];

            // Handle special formatting
            if (col.field === 'is_glory_team_member') {
                value = formatGloryTeamStatus(value) ? 'Yes' : 'No';
            } else if (col.field === 'date_of_birth' && value) {
                value = formatDate(value, 'iso');
            }

            // Escape commas and quotes
            if (typeof value === 'string') {
                value = value.replace(/"/g, '""');
                if (value.includes(',') || value.includes('"') || value.includes('\n')) {
                    value = `"${value}"`;
                }
            }

            return value || '';
        }).join(',');
    }).join('\n');

    return `${headers}\n${rows}`;
};

/**
 * Sort members by field
 * @param {Array} members - Members array
 * @param {string} field - Field to sort by
 * @param {string} direction - Sort direction ('asc' or 'desc')
 * @returns {Array} - Sorted members
 */
export const sortMembers = (members, field, direction = 'asc') => {
    if (!members || !field) return members;

    return [...members].sort((a, b) => {
        let valueA = a[field];
        let valueB = b[field];

        // Handle null/undefined
        if (valueA == null) return direction === 'asc' ? 1 : -1;
        if (valueB == null) return direction === 'asc' ? -1 : 1;

        // Handle dates
        if (field === 'date_of_birth') {
            valueA = new Date(valueA).getTime();
            valueB = new Date(valueB).getTime();
        }

        // Handle strings (case-insensitive)
        if (typeof valueA === 'string') {
            valueA = valueA.toLowerCase();
            valueB = valueB.toLowerCase();
        }

        if (valueA < valueB) return direction === 'asc' ? -1 : 1;
        if (valueA > valueB) return direction === 'asc' ? 1 : -1;
        return 0;
    });
};

/**
 * Debounce function for search input
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait = 300) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Get age from date of birth
 * @param {string|Date} dateOfBirth - Date of birth
 * @returns {number|null} - Age in years
 */
export const getAge = (dateOfBirth) => {
    if (!dateOfBirth) return null;

    const dob = dateOfBirth instanceof Date ? dateOfBirth : new Date(dateOfBirth);
    if (isNaN(dob.getTime())) return null;

    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    return age;
};

/**
 * Format phone number
 * @param {string} phone - Phone number
 * @returns {string} - Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
    if (!phone) return '';

    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');

    // Format based on length
    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }

    return phone;
};

/**
 * Validate email format
 * @param {string} email - Email address
 * @returns {boolean} - Whether email is valid
 */
export const isValidEmail = (email) => {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Get member's full display name with title
 * @param {object} member - Member object
 * @returns {string} - Full display name
 */
export const getMemberDisplayName = (member) => {
    if (!member) return '';

    const parts = [];

    if (member.title) parts.push(member.title);
    if (member.full_name) parts.push(member.full_name);

    return parts.join(' ') || 'Unknown Member';
};

/**
 * Check if member has complete profile
 * @param {object} member - Member object
 * @returns {object} - Completeness info
 */
export const checkProfileCompleteness = (member) => {
    if (!member) return { complete: false, percentage: 0, missing: [] };

    const requiredFields = [
        'full_name',
        'email',
        'phone_number',
        'gender',
        'date_of_birth',
        'address',
        'community'
    ];

    const missing = requiredFields.filter(field => !member[field]);
    const filled = requiredFields.length - missing.length;
    const percentage = Math.round((filled / requiredFields.length) * 100);

    return {
        complete: missing.length === 0,
        percentage,
        missing,
        filled
    };
};

export default {
    formatGloryTeamStatus,
    getRoleInfo,
    formatDate,
    generateCSVFilename,
    calculateTableHeight,
    searchMembers,
    groupMembersBy,
    getMemberStatistics,
    validateFilters,
    buildFilterQueryString,
    hasActiveFilters,
    exportToCSV,
    sortMembers,
    debounce,
    getAge,
    formatPhoneNumber,
    isValidEmail,
    getMemberDisplayName,
    checkProfileCompleteness
};