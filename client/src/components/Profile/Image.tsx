const Image = ({ src, ...rest }: any) => {
  src =
    src && src.includes('https://')
      ? src
      : `http://localhost:8080/image-uploads/${src}`;
  return <img {...rest} src={src} alt={src} />;
};

export default Image;
