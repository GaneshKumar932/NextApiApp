import Image from "next/image";
import testimonial1 from "../images/testimonial-1.jpg";
import testimonial2 from "../images/testimonial-2.jpg";
import testimonial3 from "../images/testimonial-3.jpg";
import testimonial4 from "../images/testimonial-4.jpg";
import { Button } from "antd";
import Carousel1 from "../components/Carousel";

export default function Home() {
  return (
    <main>
      <Carousel1 />
    </main>
  );
}
