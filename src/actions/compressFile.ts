import imageCompression from "browser-image-compression";

const options = {
  maxSizeMB: 1, // 허용하는 최대 사이즈 지정
  maxWidthOrHeight: 1920, // 허용하는 최대 width, height 값 지정
  useWebWorker: true, // webworker 사용 여부
};

export default async (file: File) => {
  return await imageCompression(file, options);
};
