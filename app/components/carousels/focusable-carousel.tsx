import clsx from 'clsx';
import type { Properties } from 'csstype';
import { useState } from 'react';

export type CarouselItem = {
  id: string;
  imageUrl: string;
};

export type FocusableCarouselProps = {
  items: CarouselItem[];
  isRoundedImage?: boolean;
  style?: Properties;
}

export default function FocusableCarousel({
  items,
  isRoundedImage = true,
  style,
}: FocusableCarouselProps) {
  const [carouselIndex, setCarouselIndex] = useState(0);

  const slide = (direction: -1 | 0 | 1 = 1) => {
    let toIndex = 0;
    if (carouselIndex + direction < 0) {
      toIndex = items.length - 1;
    } else {
      toIndex = (carouselIndex + direction) % items.length;
    }
    setCarouselIndex(toIndex);
  };

  const slideTo = (index: number) => {
    setCarouselIndex(index);
  };

  return (
    <div
      className={clsx(['f-r', 'focusable-carousel'])}
      style={{
        transform: `translateX(-${carouselIndex * 560}px)`,
        ...style,
      }}
    >
      {items.map((item, index) =>
        <div
          className='f-r-ct'
          key={item.id ?? index}
        >
          <img
            className={isRoundedImage ? 'rounded-image' : ''}
            src={item.imageUrl}
            alt='desc'
            data-focused={carouselIndex == index}
            data-no-selection='pointer'
            onClick={() => slideTo(index)}
          />
        </div>,
      )}
    </div>
  );
}
