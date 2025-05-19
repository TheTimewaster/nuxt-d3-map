export type ProductsLocationsProps = {
  name: string;
  coordinates: {
    long: number;
    lat: number;
  };
  image?: string;
  align?: 'top' | 'bottom' | 'left' | 'right';
};
