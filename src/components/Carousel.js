import Image from "next/image";
import testimonial1 from "../images/testimonial-1.jpg";
import testimonial2 from "../images/testimonial-2.jpg";
import testimonial3 from "../images/testimonial-3.jpg";
import testimonial4 from "../images/testimonial-4.jpg";
import React from "react";
import { Carousel } from "antd";

const Carousel1 = () => {
  return (
    <div className=" items-center py-5 wow fadeInUp" data-wow-delay="0.1s"> 
    <div className="">
    <div className="text-center">
      <h5 className=" text-center text-primary fw-normal">
        Testimonial
      </h5>
      <h1 className="mb-5">Our Clients Say!!!</h1>
    </div>
    <div className="items-center h-52 w-96 text-white m-auto " style={{ backgroundColor:" #FEA116"}}>
    <Carousel className="w-full items-center m-auto" autoplay>
      <div className="carousel">
        <div className=" rounded p-4">
          <i className="fa fa-quote-left fa-2x mb-3"></i>
          <p>
            Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet
            amet eirmod eos labore diam
          </p>
          <div className="d-flex items-center m-auto ">
            <Image
              className="Image-fluid flex-shrink-0 rounded-circle"
              src={testimonial1}
              style={{ width: "50px", height: "50px" }}
            />
            <div className="ps-3">
              <h5 className="mb-1">Client Name</h5>
              <small>Profession</small>
            </div>
          </div>
        </div>
      </div>
      <div className="carousel">
        <div className="  rounded p-4">
          <i className="fa fa-quote-left  fa-2x mb-3"></i>
          <p>
            Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet
            amet eirmod eos labore diam
          </p>
          <div className="d-flex items-center">
            <Image
              className="Image-fluid flex-shrink-0 rounded-circle"
              src={testimonial2}
              style={{ width: "50px", height: "50px" }}
            />
            <div className="ps-3">
              <h5 className="mb-1">Client Name</h5>
              <small>Profession</small>
            </div>
          </div>
        </div>
      </div>
      <div className="carousel">
        <div className="  rounded p-4">
          <i className="fa fa-quote-left fa-2x mb-3"></i>
          <p>
            Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet
            amet eirmod eos labore diam
          </p>
          <div className="d-flex items-center">
            <Image
              className="Image-fluid flex-shrink-0 rounded-circle"
              src={testimonial3}
              style={{ width: "50px", height: "50px" }}
            />
            <div className="ps-3">
              <h5 className="mb-1">Client Name</h5>
              <small>Profession</small>
            </div>
          </div>
        </div>
      </div>
      <div className="carousel">
        <div className=" rounded p-4">
          <i className="fa fa-quote-left fa-2x  mb-3"></i>
          <p>
            Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet
            amet eirmod eos labore diam
          </p>
          <div className="d-flex items-center">
            <Image
              className="Image-fluid flex-shrink-0 rounded-circle"
              src={testimonial4}
              style={{ width: "50px", height: "50px" }}
            />
            <div className="ps-3">
              <h5 className="mb-1">Client Name</h5>
              <small>Profession</small>
            </div>
          </div>
        </div>
      </div>
    </Carousel>
    </div>
    </div>
    </div>
  );
};
export default Carousel1;
