/* eslint-disable react/no-unescaped-entities */
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";

import { Autoplay, EffectCards } from "swiper/modules";
import getRandomColor from "../../../utils/getRandomColor";
import { FaLocationArrow } from "react-icons/fa";

const Banner = () => {
  const images = [
    "https://i.ibb.co/LnG8p9d/The-Catcher-in-the-Rye.jpg",
    "https://i.ibb.co/0JjBcZT/The-Great-Gatsby.jpg",
    "https://i.ibb.co/DbPDd0Y/To-Kill-a-Mockingbird.jpg",
    "https://i.ibb.co/Pg4F2gG/1984.jpg",
    "https://i.ibb.co/JRRZK27/The-Hobbit.jpg",
  ];
  return (
    <div className="hero min-h-screen my-1 lg:rounded-lg lg:my-10 md:py-10 bg-gradient-to-bl from-green-50  dark:from-gray-700 via-pink-50 dark:via-gray-800 to-sky-50 dark:to-gray-700 dark:text-white dark:border-gray-500">
      <div className="hero-content flex-col lg:flex-row-reverse lg:p-28 gap-4 lg:gap-20 overflow-hidden">
        <Swiper
          data-aos="zoom-in"
          autoplay={{
            delay: 900,
            disableOnInteraction: false,
          }}
          effect={"cards"}
          grabCursor={true}
          modules={[Autoplay, EffectCards]}
          className="w-[220px] md:w-[500px] lg:w-[300px] drop-shadow-md"
        >
          {images.map((image, idx) => (
            <SwiperSlide
              key={idx}
              style={{ backgroundColor: getRandomColor() }}
              className="p-2 rounded-lg"
            >
              <img
                src={image}
                className="w-full aspect-square md:aspect-video lg:aspect-square rounded-lg drop-shadow-md"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="md:px-10 lg:pl-0">
          <h1
            data-aos="fade-up"
            className="lg:text-5xl mt-4 lg:mt-0 text-2xl font-bold"
          >
            Welcome to <span className="text-sky-600">Book Wise</span>!
          </h1>
          <p data-aos="fade-down" data-aos-delay="300" className="lg:my-6 my-4">
            Your gateway to a world of imagination and knowledge. Dive into our
            extensive book library, where every page holds a new adventure, a
            fresh perspective, and endless inspiration. Whether you're seeking
            thrilling mysteries, heartwarming romances, thought-provoking
            classics, or captivating non-fiction, we've got you covered. Explore
            our curated collection, build your personal library, and embark on
            literary journeys that will enrich your mind and soul. Join us in
            celebrating the timeless magic of books, where every story is a
            treasure waiting to be discovered.
          </p>
          <button
            data-aos="flip-left"
            data-aos-duration="400"
            className="btn btn-primary"
          >
            Get Started <FaLocationArrow />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
