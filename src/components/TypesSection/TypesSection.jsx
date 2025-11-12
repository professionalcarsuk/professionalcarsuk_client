import React from "react";
import { NavLink } from "react-router-dom";
import "./TypesSection.css";

const TypesSection = () => {
  const blocks = [
    {
      id: 1,
      title: "SELECT YOUR NEXT VEHICLE",
      href: "/used-cars",
      alt: "Used car sales of Essendine",
    },
    {
      id: 2,
      title: "Part Exchange",
      href: "/part-exchange",
      alt: "Used car valuation of Essendine",
    },
    {
      id: 3,
      title: "Finance",
      href: "/contact",
      alt: "Used car finance of Essendine",
    },
    {
      id: 4,
      title: "About Us",
      href: "/about",
      alt: "Find out more about S James Prestige Limited",
    },
    {
      id: 5,
      title: "Reviews",
      href: "https://uk.trustpilot.com/review/sjamesprestige.com",
      alt: "S James Prestige Limited's reviews",
      target: "_blank",
    },
    {
      id: 6,
      title: "WARRANTY",
      href: "/warranty",
      alt: "Aftersales",
    },
  ];

  return (
    <div className="row-block">
      <div className="home-panel home-panel--promo-blocks">
        <div className="wrapper">
          <div className="container">
            <div className="blocks px-3">
              {blocks.map((block) => (
                <div
                  key={block.id}
                  className={`blocks__item blocks__item--${block.id}`}
                >
                  <div className="blocks__wrapper lazy-background visible">
                    {block.target === "_blank" ? (
                      <a
                        href={block.href}
                        title={block.alt}
                        target={block.target}
                      >
                        <em className="blocks__title">{block.title}</em>
                      </a>
                    ) : (
                      <NavLink to={block.href} title={block.alt}>
                        <em className="blocks__title">{block.title}</em>
                      </NavLink>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypesSection;
