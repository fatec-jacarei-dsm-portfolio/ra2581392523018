import { useState, useEffect, forwardRef } from 'react';

interface GracefulImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackSrc?: string;
    loadingComponent?: React.ReactNode;
}

export const GracefulImage = forwardRef<HTMLImageElement, GracefulImageProps>((props, ref) => {
    const {
        src,
        fallbackSrc = 'https://placehold.co/600x400/e2e8f0/64748b?text=Sem+Preview',
        alt,
        loadingComponent,
        ...rest
    } = props;
    const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (!src) {
            setImageSrc(fallbackSrc);
            return;
        }

        let isMounted = true;

        fetch(src)
            .then(res => {
                if (isMounted) {
                    setImageSrc(res.ok ? src : fallbackSrc);
                }
            })
            .catch(() => {
                if (isMounted) {
                    setImageSrc(fallbackSrc);
                }
            });

        return () => { isMounted = false; };
    }, [src, fallbackSrc]);

    if (!imageSrc) {
        return <>{loadingComponent || <div className="h-full w-full animate-pulse rounded-t-xl bg-slate-200" style={{ aspectRatio: '16/9' }}></div>}</>;
    }

    return <img ref={ref} src={imageSrc} alt={alt} {...rest} />;
});
