import React, { useState, useEffect } from "react";
import classes from "../../../../../src/assets/styles/custom.module.css";
import serviceService from "../../../../services/service.service";

const ChooseService = ({ onSelectService }) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    serviceService
      .getAllServices()
      .then((res) => res.json())
      .then((data) => {
        setServices(data.data || []);
      })
      .catch((err) => console.log(err));
  }, []);
  // console.log(services);
  return (
    <section className={`${classes.custom_bg_section} pb-5`}>
      <div className="px-4 py-3">
        <h4 className={`fw-bolder ${classes.customer__name}`}>
          Choose Services
        </h4>
      </div>
      <div className="px-4">
        {services.length > 0 ? (
          services.map((service) => (
            <div
              key={service.service_id}
              className={`mb-1 px-4 py-2 ${classes.custom_bg_section}`}
            >
              <div className="row">
                <div className="service-block-one">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr auto",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <div className="d-flex flex-column">
                      <span
                        className={`${classes.service__title} fs-5 fw-bold`}
                      >
                        {service.service_name}
                      </span>
                      <span className="text-muted">
                        {service.service_description}
                      </span>
                    </div>
                    <div className="d-flex gap-2">
                      <input
                        type="checkbox"
                        style={{
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                        }}
                        onChange={(e) =>
                          onSelectService(service.service_id, e.target.checked)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4">No services available</div>
        )}
      </div>
    </section>
  );
};

export default ChooseService;
