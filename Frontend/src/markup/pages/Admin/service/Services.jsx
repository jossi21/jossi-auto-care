import React from "react";
import ServiceList from "../../../components/Admin/service/ServiceList";
import AddServiceForm from "../../../components/Admin/service/AddServiceForm";

const Services = () => {
  return (
    <>
      <section className="services-section ">
        <div className="auto-container">
          <div className="sec-title style-two col-lg-10 mx-auto">
            <h2>Our Services</h2>
            <div className="text">
              Bring to the table win-win survival strategies to ensure proactive
              domination. At the end of the day, going forward, a new normal
              that has evolved from generation X is on the runway heading
              towards a streamlined cloud solution.
            </div>
          </div>
          <ServiceList />
          <AddServiceForm />
        </div>
      </section>
    </>
  );
};

export default Services;
