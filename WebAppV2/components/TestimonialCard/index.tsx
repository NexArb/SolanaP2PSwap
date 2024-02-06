import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';
import Card from '../Card';
import Surface from '../Surface';
import Typography from '../Typography';

type TestimonialCardProps = {
  image: string;
  name: string;
  user: string;
  rating: number;
  title: string;
  description: string;
};

const NexarbTestimonialCard: React.FC<TestimonialCardProps> = ({
  title,
  image,
  description,
  rating,
  name,
  user,
}) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setShouldRender(true);
  }, [shouldRender]);

  const cardElevation = 1;

  return (
    <Card elevation={cardElevation} className="w-full p-4 sm:p-6 lg:p-8">
      <Surface
        elevation={cardElevation}
        className="flex space-x-2 border-b pb-3"
      >
        <Image
          className="w-10 md:w-12 lg:w-14 h-10 md:h-12 lg:h-14"
          src={image}
          alt="Profile"
          width={56}
          height={56}
        />
        <Surface elevation={cardElevation} className="flex-col">
          <Typography text={name} weight="semibold" variant="header2" />
          <Typography text={user} weight="medium" color="rgb(107, 114, 128)" />
        </Surface>
      </Surface>
      <Surface elevation={cardElevation} className="py-3">
        {shouldRender && (
          <StarRatings
            rating={rating}
            starDimension="24px"
            starRatedColor="orange"
            starSpacing="0.06rem"
            starHoverColor="orange"
          />
        )}
      </Surface>
      <Typography text={title} weight="bold" variant="header3" />
      <Surface elevation={cardElevation} className="pt-2">
        <Typography text={description} weight="medium" variant="header3" />
      </Surface>
    </Card>
  );
};

export default NexarbTestimonialCard;
