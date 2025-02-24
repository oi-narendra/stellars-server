"use client";

import { useDriveImage } from "../hooks/use-drive-image";

export function DriveImage({ fileId, alt, className }) {
  const { imageUrl, isLoading, error } = useDriveImage(fileId);

  if (isLoading)
    return <div className="animate-pulse bg-gray-200 h-full w-full" />;
  if (error) return <div className="text-red-500">Failed to load image</div>;
  if (!imageUrl) return null;

  return <img src={imageUrl} alt={alt} className={className} />;
}
