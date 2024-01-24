import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Image } from '../index';

const ImageCarouselSlider = ({ images }: any) => {
  const CustomPrevArrow = (props: any) => (
    <div
      className="slick-arrow slick-prev"
      onClick={props.onClick}
      style={{ color: 'gray' }}
    >
      {/* Your custom left arrow icon or content */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
        />
      </svg>
    </div>
  );

  const CustomNextArrow = (props: any) => (
    <div
      className="slick-arrow slick-next"
      onClick={props.onClick}
      style={{ color: 'gray' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
        />
      </svg>
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 2000,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <>
      <Slider {...settings}>
        {images.map((image: string, id: number) => (
          <div className="flex rounded-md" key={id}>
            {/* <img
              src={`http://localhost:8080/image-uploads/${image}`}
              alt={image}
              className="rounded-lg object-cover aspect-square"
            /> */}
            <Image
              src={image}
              alt={image}
              className="rounded-lg object-cover aspect-square"
            />
          </div>
        ))}
      </Slider>
    </>
  );
};

export default ImageCarouselSlider;
