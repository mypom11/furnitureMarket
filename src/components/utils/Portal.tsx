import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface portalComponent {
  children: React.ReactNode;
  selector: string;
}

const Portal = ({ children, selector }: portalComponent) => {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setElement(document.getElementById(selector));
  }, [selector]);

  if (!element) {
    return <></>;
  }

  return ReactDOM.createPortal(children, element);
};

export default Portal;
