import ButtonCard from '@/components/ui/ButtonCard'
import { YoutubeIcon } from '@/icons'
import { useFetchFromYouTube } from '@/queries/admin.query'

const UpdateYoutubeVideoCarousel = () => {
    const { mutate, isPending } = useFetchFromYouTube()
    return (
        <>
            <ButtonCard color='red' loading={isPending} onClick={mutate} description={'Fetch latest videos from our youtube channel to populate the video carousel on user dashboard'} icon={<YoutubeIcon />}>Fetch YouTube Videos</ButtonCard>
        </>
    )
}

export default UpdateYoutubeVideoCarousel