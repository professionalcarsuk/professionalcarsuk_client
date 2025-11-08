import React from "react";
import PageWithSidebarLayout from "../../layouts/PageWithSidebarLayout";
import "./Sitemap.css";

const Sitemap = () => {
  return (
    <PageWithSidebarLayout
      pageClass="sitemap-pg"
      headerTitle=""
      headerClass="page-hdr--sitemap lazy-background visible"
      showSidebar={false}
      showHeading={false}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "40px",
          flexWrap: "wrap",
          padding: "20px",
          justifyContent: "space-between",
        }}
      >
        <div
          className="sitemap__pages"
          style={{ flex: "1 1 45%", minWidth: "300px" }}
        >
          <h2>Pages</h2>
          <ul>
            <li>
              <a href="/" title="Home">
                Home
              </a>
            </li>
            <li>
              <a href="/used-cars" title="Showroom">
                Showroom
              </a>
            </li>
            <li>
              <a href="/used-vans" title="Used Vans">
                Used Vans
              </a>
            </li>
            <li>
              <a href="/sell-car" title="Sell Your Car">
                Sell Your Car
              </a>
            </li>
            <li>
              <a href="/part-exchange" title="Part Exchange">
                Part Exchange
              </a>
            </li>
            <li>
              <a href="/customization" title="Customisation">
                Customisation
              </a>
            </li>
            <li>
              <a href="/complaints" title="Complaints">
                Complaints
              </a>
            </li>
            <li>
              <a href="/warranty" title="Warranty">
                Warranty
              </a>
            </li>
            <li>
              <a href="/about" title="About Us">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" title="Contact">
                Contact
              </a>
            </li>
            <li>
              <a href="/sitemap" title="Sitemap">
                Sitemap
              </a>
            </li>
          </ul>
        </div>
        <div
          className="sitemap__brands"
          style={{ flex: "1 1 45%", minWidth: "300px" }}
        >
          <h2>Vehicles</h2>
          <ul>
            <li>
              <a href="/used-cars" title="Showroom">
                Showroom
              </a>
            </li>
            <li>
              <ul>
                <li>
                  <a href="/used/cars/audi" title="Audi">
                    Audi
                  </a>
                </li>
                <li>
                  <a href="/used/cars/bmw" title="BMW">
                    BMW
                  </a>
                </li>
                <li>
                  <a href="/used/cars/cupra" title="Cupra">
                    Cupra
                  </a>
                </li>
                <li>
                  <a href="/used/cars/ford" title="Ford">
                    Ford
                  </a>
                </li>
                <li>
                  <a href="/used/cars/mercedes-benz" title="Mercedes-Benz">
                    Mercedes-Benz
                  </a>
                </li>
                <li>
                  <a href="/used/cars/nissan" title="Nissan">
                    Nissan
                  </a>
                </li>
                <li>
                  <a href="/used/cars/porsche" title="Porsche">
                    Porsche
                  </a>
                </li>
                <li>
                  <a href="/used/cars/skoda" title="Skoda">
                    Skoda
                  </a>
                </li>
                <li>
                  <a href="/used/cars/toyota" title="Toyota">
                    Toyota
                  </a>
                </li>
                <li>
                  <a href="/used/cars/volkswagen" title="Volkswagen">
                    Volkswagen
                  </a>
                </li>
                <li>
                  <a href="/used/cars/volvo" title="Volvo">
                    Volvo
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <ul style={{ marginTop: "10px" }}>
            <li>
              <a href="/used-vans" title="Used Vans">
                Used Vans
              </a>
            </li>
            <li>
              <ul>
                <li>
                  <a href="/used/vans/ford" title="Ford">
                    Ford
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </PageWithSidebarLayout>
  );
};

export default Sitemap;
