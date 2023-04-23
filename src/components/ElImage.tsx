import Image from 'next/image';

interface ElImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className: string;
}

const ElImage = ({ src, alt, className }: ElImageProps) => {
  return <Image src={src} alt={alt} className={className} fill priority />;
};

export default ElImage;
