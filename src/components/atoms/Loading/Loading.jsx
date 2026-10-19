//react
import { LoaderCircle } from 'lucide-react';

export default function Loading({ size = 'layout' }) {
  return (
    <LoaderCircle
      className={`animate-spin ${size === 'layout' ? 'm-auto' : null} `}
      color={`${size === 'layout' ? '#2E7D57E6' : '#fff'} `}
      size={`${size === 'layout' ? 42 : 22}`}
    />
  );
}
