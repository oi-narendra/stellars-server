export const getDriveURlFromId = (id) => {
  if (!id) return null;

  return `https://drive.google.com/file/d/${id}/view?usp=sharing`;
};
