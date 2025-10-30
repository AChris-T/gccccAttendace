import AssignRole from "@/components/admin/settings/AssignRole"
import UpdateYoutubeVideoCarousel from "@/components/admin/settings/UpdateYoutubeVideoCarousel"

const AdminSettings = () => {
    return (
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <AssignRole />
            <UpdateYoutubeVideoCarousel />
        </div>
    )
}

export default AdminSettings