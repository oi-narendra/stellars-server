"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDriveImageUrl } from "../actions/driveActions";

async function fetchDriveImage(fileId) {
  if (!fileId) return null;

  const { token, error } = await getDriveImageUrl(fileId);
  if (error) throw new Error(error);

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
  return URL.createObjectURL(blob);
}

export function useDriveImage(fileId) {
  const {
    data: imageUrl,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["driveImage", fileId],
    queryFn: () => fetchDriveImage(fileId),
    enabled: !!fileId,
    staleTime: 1000 * 60 * 30, // 30 minutes
    cacheTime: 1000 * 60 * 60, // 1 hour
    onSuccess: (url, variables, context) => {
      // Cleanup old URL when query is updated
      if (context?.previousData) {
        URL.revokeObjectURL(context.previousData);
      }
    },
  });

  // Cleanup URL when component unmounts
  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  return { imageUrl, isLoading, error };
}
