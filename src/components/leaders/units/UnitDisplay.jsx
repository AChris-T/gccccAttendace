import UnitCard from '@/components/leaders/units/UnitCard';
import { useUnits } from '../../../queries/unit.query'
import { UnitCardSkeleton } from '../../skeleton'
import Message from '@/components/common/Message';
import CreateUnit from '@/components/leaders/units/CreateUnit';
import { useAuthStore } from '@/store/auth.store';

export default function UnitDisplay() {
    const { isAdmin } = useAuthStore()
    const { data: units = [], isError, error, isLoading } = useUnits()

    if (isLoading) return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((index) => <UnitCardSkeleton key={index} />)}
    </div>

    if (isError) return <Message data={error?.data} variant='error' />

    return (
        <>
            {isAdmin && <CreateUnit />}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {units.map((unit, index) => (
                    <UnitCard unit={unit} index={index} key={`${index}-${unit?.id}`} />
                ))}
            </div>
        </>
    );
}