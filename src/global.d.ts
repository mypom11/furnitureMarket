interface defaultProps {
  className?: string;
  text?: string;
  children?: React.ReactNode;
}

interface bannerComponent {
  img: StaticImageData;
  desc: string;
  title: string;
}

interface productForm {
  company: string;
  name: string;
  price: number;
  category: number;
  desc: string;
  images: File[];
}

type RootState = ReturnType<typeof store.getState>;
