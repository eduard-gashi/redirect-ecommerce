import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import "../../styles/home.css";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


interface ProductImagesProp {
    images_paths: Array<string>;
    onImageChange?: (index: number) => void;
}

interface TransformState {
    zoomIn: (scale: number, animationTime?: number) => void;
    resetTransform: () => void;
}


export default function ProductImages({ images_paths, onImageChange }: ProductImagesProp) {
    const [zoomedIndex, setZoomedIndex] = useState<number | null>(null);

    if (!images_paths || images_paths.length === 0) {
        return <div className="no-image">Kein Bild verfügbar</div>;
    }

    return (
        <div className="product-images-slider">
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={10}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                loop={images_paths.length > 1}
                allowTouchMove={true}
                onSlideChange={(swiper) => {
                    onImageChange?.(swiper.realIndex);
                }}
            >
                {images_paths.map((path, index) => (
                    <SwiperSlide key={index}
                        style={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                        <TransformWrapper
                            minScale={1}
                            maxScale={2}
                            initialScale={1}
                        >
                            {({ zoomIn, resetTransform, }: TransformState) => {
                                const isZoomedIn = zoomedIndex === index;

                                const handleClick = () => {
                                    if (isZoomedIn) {
                                        resetTransform();
                                        setZoomedIndex(null);
                                    } else {
                                        zoomIn(2);
                                        setZoomedIndex(index);
                                    }
                                };
                                return (
                                    <div
                                        className="image-wrapper"
                                        onClick={handleClick}
                                        style={{ cursor: isZoomedIn ? "zoom-out" : "zoom-in" }}
                                    >
                                        <TransformComponent>
                                            <img src={`/${path}`} className="product-image-slide" />
                                        </TransformComponent>
                                    </div>
                                );
                            }}
                        </TransformWrapper>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
