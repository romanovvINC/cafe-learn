import { FC, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import styles from './SliderTheme.module.scss';
import { ITopic } from '../../../types/topicTypes';
import { MyToast } from '../MyToast/MyToast';

interface SliderThemeProps {
  sliders: ITopic[]
}

const personalProjectAnimation = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const SliderTheme:FC<SliderThemeProps> = ({ sliders }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlayVideo, setIsPlayVideo] = useState<boolean>(false);

  // eslint-disable-next-line consistent-return
  const changeVideoUrl = (videoUrl: string) => {
    try {
      return require(`../../../assets/videos/${videoUrl}`);
    } catch (error) {
      MyToast('Не удалось загрузить лекцию', false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setIsPlayVideo(true);
    }, 2000);

    return () => {
      clearTimeout(handler);
    };
  }, [activeIndex]);

  return (
    <div className={styles.desktopContainer}
    >
      <Swiper
        slidesPerView={3}
        centeredSlides
        spaceBetween={30}
        pagination={{
          type: 'fraction',
        }}
        navigation
        className={styles.swiperCard}
        onRealIndexChange={(element) => {
          setActiveIndex(element.activeIndex);
          setIsPlayVideo(false);
        }}
      >
        {sliders.map((slider, idx) => (
          <SwiperSlide key={slider.id}>
            <div className={styles.containerPoster}>
              <img className={cn(styles.img, { [styles.displayNoneImg]: isPlayVideo && idx === activeIndex })} alt="Постер." />
              {isPlayVideo && idx === activeIndex
                  && (
                  <motion.video
                    className={styles.videos}
                    transition={{ duration: 0.5 }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={personalProjectAnimation}
                    src={changeVideoUrl(slider.videoUrl)}
                    autoPlay
                    muted
                    loop
                  />
                  )}
            </div>
            <h2 className={styles.title}>
              #
              {idx + 1}
              {' '}
              {slider.titleTopic}
            </h2>
            <p className={styles.description}>{slider.descriptionTopic}</p>
            <Link className={styles.btnContainer} to={slider.id}><button className={styles.btn} color="Pink">Начать</button></Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderTheme;
