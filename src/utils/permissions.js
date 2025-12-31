/**
 * Application Permissions Constants
 * 
 * Defines all available permissions in the system.
 * These permissions control access to various features and resources.
 */

export const PERMISSIONS = {
    // Prayer Management
    PRAYER_REQUEST_VIEW: 'view-prayer',

    // Question Management
    QUESTION_VIEW: 'view-question',

    // Attendance Management
    ATTENDANCE_VIEW: 'view-attendance-records',
    ATTENDANCE_EDIT: 'edit-attendance-records',
    ATTENDANCE_DELETE: 'delete-attendance-records',
};

/**
 * Permission metadata for UI display and categorization
 */
export const PERMISSION_METADATA = {
    [PERMISSIONS.PRAYER_REQUEST_VIEW]: {
        label: 'View Prayer Requests',
        description: 'Permission to view prayer requests',
        category: 'Prayer Management'
    },
    [PERMISSIONS.QUESTION_VIEW]: {
        label: 'View Questions',
        description: 'Permission to view questions',
        category: 'Question Management'
    },
    [PERMISSIONS.ATTENDANCE_VIEW]: {
        label: 'View Attendance Records',
        description: 'Permission to view attendance records',
        category: 'Attendance Management'
    },
    [PERMISSIONS.ATTENDANCE_EDIT]: {
        label: 'Edit Attendance Records',
        description: 'Permission to edit attendance records',
        category: 'Attendance Management'
    },
    [PERMISSIONS.ATTENDANCE_DELETE]: {
        label: 'Delete Attendance Records',
        description: 'Permission to delete attendance records',
        category: 'Attendance Management'
    },
};

/**
 * Groups permissions by category for organized display
 */
export const PERMISSION_CATEGORIES = {
    'Prayer Management': [PERMISSIONS.PRAYER_REQUEST_VIEW],
    'Question Management': [PERMISSIONS.QUESTION_VIEW],
    'Attendance Management': [
        PERMISSIONS.ATTENDANCE_VIEW,
        PERMISSIONS.ATTENDANCE_EDIT,
        PERMISSIONS.ATTENDANCE_DELETE
    ],
};

/**
 * Converts permissions to select options format
 * @returns {Array<{value: string, text: string, category: string}>}
 */
export const getPermissionOptions = () => {
    return Object.entries(PERMISSION_METADATA).map(([value, metadata]) => ({
        value,
        text: metadata.label,
        description: metadata.description,
        category: metadata.category
    }));
};

/**
 * Gets permissions grouped by category for hierarchical display
 * @returns {Array<{category: string, permissions: Array}>}
 */
export const getGroupedPermissionOptions = () => {
    return Object.entries(PERMISSION_CATEGORIES).map(([category, permissions]) => ({
        category,
        permissions: permissions.map(permission => ({
            value: permission,
            text: PERMISSION_METADATA[permission].label,
            description: PERMISSION_METADATA[permission].description
        }))
    }));
};