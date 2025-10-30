import AdminSettings from '@/components/admin/settings/AdminSettings'
import ComponentCard from '@/components/common/ComponentCard'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import PageMeta from '@/components/common/PageMeta'
import { SettingsIcon } from '@/icons'

const AdminSettingsPage = () => {
    return (
        <>
            <PageMeta title="Admin: Settings | GCCC Ibadan" />
            <PageBreadcrumb pageTitle="Admin: Settings" description={'Manage user roles and permissions, update YouTube carousel videos and more...'} icon={SettingsIcon} />
            <ComponentCard>
                <AdminSettings />
            </ComponentCard>
        </>
    )
}

export default AdminSettingsPage