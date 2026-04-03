type ImgProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fill?: boolean;
};

export function Img({ src, fill, className, style, ...props }: ImgProps) {
  const s = typeof src === "string" ? src : "";
  const fullSrc = s.startsWith("/") ? `/info-forvard-site${s}` : s;

  if (fill) {
    return (
      <img
        src={fullSrc}
        className={`absolute inset-0 w-full h-full ${className || ""}`}
        style={style}
        {...props}
      />
    );
  }

  return <img src={fullSrc} className={className} style={style} {...props} />;
}
