import { useUnits } from '../../../queries/unit.query'
import { UnitCardSkeleton } from '../../skeleton'
import UnitCard from './UnitCard'

const UnitDisplay = () => {
    const { data: units = [], isError, error, isLoading } = useUnits()

    if (isLoading) return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UnitCardSkeleton />
        <UnitCardSkeleton />
        <UnitCardSkeleton />
    </div>
    return (
        <>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-5'>
                {units?.map((unit, i) => <UnitCard key={unit.id} unit={unit} index={i} />)}
            </div>
        </>
    )
}

export default UnitDisplay