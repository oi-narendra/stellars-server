import { useState, useEffect } from "react";
import { getDriveImageUrl } from "../actions/driveActions";

export function useDriveImage(fileId) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    async function loadImage() {
      if (!fileId) return;
      const url = await getDriveImageUrl(fileId);
      setImageUrl(url);
    }

    loadImage();
  }, [fileId]);

  return imageUrl;
}
