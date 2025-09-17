import DataTable from "../../ui/DataTable"
import { useMemberStore } from '../../../store/member.store'
import { useEffect } from "react"
import Paginator from "../../common/Paginator"

const MembersTable = () => {
    const { members, fetchMembers, pagination, loading, error, setPage, currentPage } = useMemberStore()

    useEffect(() => {
        fetchMembers(currentPage, 50)
    }, [currentPage, fetchMembers])

    return (
        <>
            <DataTable values={members} loading={loading} />
            {/* Dynamic Pagination */}
            {pagination && !loading && (
                <Paginator
                    paginationData={pagination}
                    limit={3}
                    onPageChange={(page) => setPage(page)}
                />
            )}
        </>

    )
}

export default MembersTable