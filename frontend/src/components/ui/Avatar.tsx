import * as React from "react";
import { styled } from "@mui/material/styles";
import { Avatar as MuiAvatar, Box } from "@mui/material";
import { cn } from "../../utils/cn";

const AvatarRoot = styled('div')({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  borderRadius: '100%',
  verticalAlign: 'middle',
  userSelect: 'none',
});

const AvatarImage = styled(MuiAvatar)({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: 'inherit',
});

const AvatarFallback = styled(Box)({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  color: 'white',
  fontWeight: 500,
});

export interface AvatarProps extends React.ComponentProps<typeof AvatarRoot> {
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
  delayMs?: number;
  size?: "sm" | "md" | "lg";
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, delayMs = 600, size = "md", ...props }, ref) => {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);
    const [shouldLoad, setShouldLoad] = React.useState(false);

    React.useEffect(() => {
      const timer = setTimeout(() => setShouldLoad(true), delayMs);
      return () => clearTimeout(timer);
    }, [delayMs]);

    const handleLoad = React.useCallback(() => {
      setIsLoaded(true);
    }, []);

    const handleError = React.useCallback(() => {
      setHasError(true);
    }, []);

    const getSize = () => {
      switch (size) {
        case "sm":
          return { width: 32, height: 32 };
        case "md":
          return { width: 40, height: 40 };
        case "lg":
          return { width: 56, height: 56 };
        default:
          return { width: 40, height: 40 };
      }
    };

    return (
      <AvatarRoot
        ref={ref}
        className={cn(className)}
        {...props}
        sx={{ ...getSize() }}
      >
        {!hasError && shouldLoad && (
          <AvatarImage
            src={src}
            alt={alt}
            onLoad={handleLoad}
            onError={handleError}
            sx={{
              opacity: isLoaded ? 1 : 0,
              transition: "opacity 0.2s ease",
              ...getSize()
            }}
          />
        )}
        {(!shouldLoad || hasError || !src) && (
          <AvatarFallback sx={getSize()}>
            {fallback || alt?.charAt(0).toUpperCase() || "U"}
          </AvatarFallback>
        )}
      </AvatarRoot>
    )
  }
);

Avatar.displayName = "Avatar";

export { Avatar }; 