import React from "react";
import classes from "../../../../../src/assets/styles/custom.module.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
import serviceService from "../../../../services/service.service";
import { useNavigate } from "react-router";
const ServiceList = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [serverRes, setServerRes] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // console.log(services);

  // get the backend response from the service file
  const response = serviceService.getAllServices();
  // console.log(response);
  useEffect(() => {
    setIsLoading(true);
    response
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.error) {
          setServerRes(data.error);
          isLoading(false);
        }
        setServices(data.data);
        setServerRes(data.message);
        isLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setServerRes(error.error || "Something went wrong");
        setIsLoading(false);
      });
  }, []);

  // delete service handler
  const deleteService = async (serviceId) => {
    // console.log(serviceId);
    if (window.confirm("Are you sure to delete this service")) {
      try {
        const res = await serviceService.deleteService(serviceId);
        const data = await res.json();
        if (res.ok) {
          setServices(
            services.filter((service) => service.service_id !== serviceId),
          );
          alert(data.message);
        } else {
          alert(data.error);
        }
      } catch (error) {
        console.log("Delete Error ", error);
      }
    }
  };
  return (
    <>
      {services.length > 0 ? (
        services.map((service) => (
          <div
            key={service.service_id}
            className={`col-lg-10 mx-auto mb-2 ${classes.custom_bg_section}`}
          >
            <div className="row">
              <div className="col-lg-12 service-block-one">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    alignItems: "center",
                    gap: "16px",
                    padding: "12px 0",
                  }}
                >
                  <div className="d-flex flex-column ">
                    {" "}
                    <span className={`${classes.service__title} fs-5 fw-bold`}>
                      {service.service_name}
                    </span>
                    <span className="text-muted">
                      {service.service_description}
                    </span>
                  </div>
                  <div className="d-flex gap-2 " style={{ width: "40px" }}>
                    <button
                      className="btn btn-link p-0"
                      style={{ background: "none", border: "none" }}
                      onClick={() =>
                        navigate(
                          `/admin/services/edit/${service.service_id}`,
                          {},
                        )
                      }
                    >
                      <FaEdit size={15} color="red" />
                    </button>{" "}
                    <button
                      className="btn btn-link p-0"
                      style={{ background: "none", border: "none" }}
                      onClick={() => deleteService(service.service_id)}
                    >
                      <FaTrash size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>There is no services</div>
      )}
    </>
  );
};

export default ServiceList;
