import React from "react";
import { useSelector } from "react-redux";
import { selectUniqueBrands, selectVanBrands } from "../../store/vehicleSlice";
import "./FooterTopSection.css";

const FooterTopSection = () => {
  const brands = useSelector(selectUniqueBrands);
  const vanBrands = useSelector(selectVanBrands);

  // Fallback showroom list (same as previous static list) when brands are not yet available
  const showroomFallback = [
    "Audi",
    "BMW",
    "Cupra",
    "Ford",
    "Mercedes-Benz",
    "Nissan",
    "Porsche",
    "Skoda",
    "Toyota",
    "Volkswagen",
    "Volvo",
  ];

  const renderList = (list, type = "cars") =>
    (list || []).map((brand) => {
      const slug = brand
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/--+/g, "-");
      const href = `/used/${type}/${slug}`;
      return (
        <li key={brand}>
          <a href={href} title={`Used ${brand}`}>
            Used <span>{brand}</span>
          </a>
        </li>
      );
    });

  return (
    <div className="footer__top snipcss-k9j2U">
      <div className="wrapper">
        <div className="container">
          <div className="footer__used-vehicles footer__used-vehicles--cars">
            <div className="footer__title">Showroom</div>
            <ul className="footer__used-list">
              {renderList(
                brands && brands.length ? brands : showroomFallback,
                "cars"
              )}
            </ul>
          </div>
          <div className="footer__used-vehicles footer__used-vehicles--vans">
            <div className="footer__title">Used Vans</div>
            <ul className="footer__used-list">
              {renderList(vanBrands || [], "vans")}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterTopSection;
