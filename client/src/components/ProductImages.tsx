import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


interface ProductImagesProp {
    images_paths: Array<string>;
}

export default function ProductImages({ images_paths }: ProductImagesProp) {
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
                className="mySwiper"
            >
                {images_paths.map((path, index) => (
                    <SwiperSlide key={index}>
                        <div className="image-wrapper">
                            <img 
                                src={`/${path}`} 
                                alt={`Produktbild ${index + 1}`} 
                                className="product-image-slide"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
