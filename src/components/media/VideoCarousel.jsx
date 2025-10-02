import { useVideos } from "@/queries/media.query";
import { formatDate } from "@/utils/helper";
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import Message from "@/components/common/Message";
import { VideoCardSkeleton } from "@/components/skeleton";
import { CalenderIcon, CloseIcon, LeftIcon, PlayIcon, RightIcon } from "@/icons";
import Badge from "@/components/ui/Badge";

const VideoCarousel = () => {
    const { data, isLoading, isError, error } = useVideos();
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [swiperRef, setSwiperRef] = useState(null);

    const videos = data?.data || [];

    const openVideo = (video) => {
        setSelectedVideo(video);
    };

    const closeVideo = () => {
        setSelectedVideo(null);
    };

    if (isLoading) return <VideoCardSkeleton />
    if (isError) return <Message variant="error" data={error?.data} />

    return (
        <>
            <div className="relative">
                {/* Custom Navigation Buttons */}
                <button
                    onClick={() => swiperRef?.slidePrev()}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 bg-white dark:bg-slate-800 p-4 rounded-full shadow-2xl hover:shadow-blue-500/50 dark:hover:shadow-blue-400/30 transition-all duration-300 hover:scale-110 border-2 border-slate-200 dark:border-slate-700 group"
                    aria-label="Previous slide"
                >
                    <LeftIcon className="w-6 h-6 text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                </button>

                <button
                    onClick={() => swiperRef?.slideNext()}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20 bg-white dark:bg-slate-800 p-4 rounded-full shadow-2xl hover:shadow-blue-500/50 dark:hover:shadow-blue-400/30 transition-all duration-300 hover:scale-110 border-2 border-slate-200 dark:border-slate-700 group"
                    aria-label="Next slide"
                >
                    <RightIcon className="w-6 h-6 text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                </button>

                {/* Swiper Carousel */}
                <Swiper
                    modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
                    spaceBetween={30}
                    slidesPerView={1}
                    centeredSlides={false}
                    onSwiper={setSwiperRef}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                        dynamicMainBullets: 3
                    }}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: true,
                        pauseOnMouseEnter: true
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        },
                        1024: {
                            slidesPerView: 3.5,
                            spaceBetween: 30
                        }
                    }}
                    className="!pb-16"
                >
                    {videos.map((video) => (
                        <SwiperSlide key={video.id}>
                            <div
                                className="group bg-white dark:bg-slate-800 rounded-3xl shadow-xl hover:shadow-2xl dark:shadow-slate-950/50 transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-3 border border-slate-200 dark:border-slate-700"
                                onClick={() => openVideo(video)}
                            >
                                {/* Thumbnail */}
                                <div className="relative overflow-hidden aspect-video bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800">
                                    <img
                                        src={video.thumbnail_high}
                                        alt={video.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent group-hover:from-black/70 transition-all duration-300"></div>

                                    {/* Play Button */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-blue-600 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                                            <div className="animate-pulse relative w-20 h-20 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                                                <PlayIcon className="w-10 h-10 text-white ml-1" fill="white" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="font-bold text-xl text-slate-800 dark:text-slate-100 mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight truncate">
                                        {video.title}
                                    </h3>

                                    <div className="flex items-center gap-3 mb-4">
                                        <Badge size="sm">
                                            <CalenderIcon />
                                            <span className="font-medium text-xs">{formatDate(video.published_at)}</span>
                                        </Badge>
                                    </div>

                                    <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wide">
                                                {video.channel_title}
                                            </p>
                                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <PlayIcon className="w-4 h-4 text-white" fill="white" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Video Modal */}
            {selectedVideo && (
                <div
                    className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn"
                    onClick={closeVideo}
                >
                    <div
                        className="bg-white dark:bg-slate-900 rounded-3xl max-w-6xl w-full overflow-hidden shadow-2xl transform transition-all"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative">
                            <button
                                onClick={closeVideo}
                                className="absolute top-4 right-4 z-10 bg-red-70 hover:bg-red-100 dark:bg-white/10 dark:hover:bg-white/20 backdrop-blur-sm text-white rounded-full p-3 transition-all duration-300 hover:scale-110 border border-white/20"
                            >
                                <CloseIcon className="w-6 h-6 text-red-400" />
                            </button>

                            <div className="aspect-video bg-black">
                                <iframe
                                    src={`https://www.youtube.com/embed/${selectedVideo.video_id}?autoplay=1`}
                                    className="w-full h-full"
                                    allowFullScreen
                                    allow="autoplay"
                                    title={selectedVideo.title}
                                />
                            </div>
                        </div>

                        <div className="p-8 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
                            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">
                                {selectedVideo.title}
                            </h2>
                            {selectedVideo.description && (
                                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                                    {selectedVideo.description}
                                </p>
                            )}
                            <div className="flex items-center gap-6 text-sm">
                                <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/30 px-4 py-2 rounded-full">
                                    {/* <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" /> */}
                                    <span className="text-blue-700 dark:text-blue-300 font-semibold">
                                        {formatDate(selectedVideo.published_at)}
                                    </span>
                                </div>
                                <span className="text-slate-500 dark:text-slate-400">•</span>
                                <span className="text-slate-600 dark:text-slate-400 font-medium">
                                    {selectedVideo.channel_title}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .swiper-pagination-bullet {
                width: 12px;
                height: 12px;
                background: rgb(148 163 184);
                opacity: 0.5;
                transition: all 0.3s ease;
                }
                .dark .swiper-pagination-bullet {
                background: rgb(71 85 105);
                }
                .swiper-pagination-bullet-active {
                width: 32px;
                border-radius: 6px;
                background: linear-gradient(135deg, rgb(37 99 235), rgb(147 51 234));
                opacity: 1;
                }
                .swiper-pagination-bullet:hover {
                opacity: 0.8;
                transform: scale(1.2);
                }
            `}</style>
        </>
    );
};

export default VideoCarousel;