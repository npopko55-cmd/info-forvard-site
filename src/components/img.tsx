"use client";

const PREFIX = process.env.NEXT_PUBLIC_BASE_PATH || "";

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fill?: boolean;
};

export function Img({ src, fill, className, style, ...props }: ImgProps) {
  const fullSrc = src ? `${PREFIX}${src}` : "";

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
