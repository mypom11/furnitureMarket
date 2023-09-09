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

type RootState = ReturnType<typeof store.getState>;
