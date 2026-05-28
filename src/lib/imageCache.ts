class ImageCache {
  private static instance: ImageCache;
  private cache: HTMLImageElement[] = [];
  private constructor() {}

  static getInstance(): ImageCache {
    if (!ImageCache.instance) {
      ImageCache.instance = new ImageCache();
    }
    return ImageCache.instance;
  }

  getImages(): HTMLImageElement[] {
    return this.cache;
  }

  setImages(images: HTMLImageElement[]): void {
    this.cache = images.slice();
  }

  clear(): void {
    this.cache = [];
  }
}

export function getImageCache(): HTMLImageElement[] {
  return ImageCache.getInstance().getImages();
}

export function setImageCache(images: HTMLImageElement[]): void {
  ImageCache.getInstance().setImages(images);
}
