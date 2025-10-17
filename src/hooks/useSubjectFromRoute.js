import { useLocation } from 'react-router-dom';
/**
 * Extracts a subject type and ID from a route like:
 * /dashboard/members/1 → { subject_type: "members", subject_id: 1 }
 *
 * @returns {{ subject_type: string | null, subject_id: number | null }}
 */
export function useSubjectFromRoute() {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);

  const subject_type = pathParts[pathParts.length - 2] || null;
  const subject_id = pathParts[pathParts.length - 1] || null;

  return { subject_type, subject_id };
}
