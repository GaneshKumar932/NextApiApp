import React from 'react'
import Image from "next/image";
import testimonial1 from "../images/testimonial-1.jpg";
import testimonial2 from "../images/testimonial-2.jpg";
import testimonial3 from "../images/testimonial-3.jpg";
import testimonial4 from "../images/testimonial-4.jpg";

const about = () => {
 
  return (
    <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
            <div className="container">
                <div className="text-center">
                    <h5 className="section-title ff-secondary text-center text-primary fw-normal">Testimonial</h5>
                    <h1 className="mb-5">Our Clients Say!!!</h1>
                </div>
                <div style={{backgroundColor: "blue",color:"white"}} className="owl-carousel testimonial-carousel">
                    <div  className="testimonial-item bg-transparent border rounded p-4">
                        <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
                        <p>Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam</p>
                        <div className="d-flex align-items-center">
                            <Image className="img-fluid flex-shrink-0 rounded-circle" src={testimonial1} style={{width: "50px", height: "50px"}}/>
                            <div className="ps-3">
                                <h5 className="mb-1">Client Name</h5>
                                <small>Profession</small>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial-item bg-yellow border rounded p-4">
                        <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
                        <p>Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam</p>
                        <div className="d-flex align-items-center">
                            <Image className="img-fluid flex-shrink-0 rounded-circle" src={testimonial2} style={{width: "50px", height: "50px"}}/>
                            <div className="ps-3">
                                <h5 className="mb-1">Client Name</h5>
                                <small>Profession</small>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial-item bg-transparent border rounded p-4">
                        <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
                        <p>Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam</p>
                        <div className="d-flex align-items-center">
                            <Image className="img-fluid flex-shrink-0 rounded-circle" src={testimonial3} style={{width: "50px", height: "50px"}}/>
                            <div className="ps-3">
                                <h5 className="mb-1">Client Name</h5>
                                <small>Profession</small>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial-item bg-transparent border rounded p-4">
                        <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
                        <p>Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam</p>
                        <div className="d-flex align-items-center">
                            <Image className="img-fluid flex-shrink-0 rounded-circle" src={testimonial4} style={{width: "50px", height: "50px"}}/>
                            <div className="ps-3">
                                <h5 className="mb-1">Client Name</h5>
                                <small>Profession</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default about