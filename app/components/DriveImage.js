"use client";

import { useEffect, useState } from "react";
import { getDriveImageUrl } from "../actions/driveActions";

export function DriveImage({ fileId, alt, className }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchImage() {
      if (!fileId) return;
      try {
        const { token } = await getDriveImageUrl(fileId);
        const response = await fetch(
          `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch image");

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageSrc(url);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchImage();
  }, [fileId]);

  if (loading)
    return <div className="animate-pulse bg-gray-200 h-full w-full" />;
  if (error) return <div className="text-red-500">Failed to load image</div>;
  if (!imageSrc) return null;

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onLoad={() => URL.revokeObjectURL(imageSrc)}
    />
  );
}
