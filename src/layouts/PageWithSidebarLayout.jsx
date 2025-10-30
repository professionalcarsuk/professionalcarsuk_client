import React from "react";
import PageSidebar from "../components/PageSidebar";
import "./PageWithSidebarLayout.css";

const PageWithSidebarLayout = ({
  children,
  pageClass,
  headerTitle,
  headerClass = "lazy-background visible",
  showSidebar = true,
  showHeading = true,
}) => {
  return (
    <div id="main-wrap">
      <div
        className={`page-hdr page-hdr--contact lazy-background visible ${headerClass}`}
      >
        {showHeading && <h1>{headerTitle}</h1>}
      </div>
      <div id="page-warrior">
        <div id={pageClass}>
          <div className="wrapper">
            <div className="container">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className={showSidebar ? "lg:w-2/3 w-full" : "w-full"}>
                  <div className="pad-20 overflow-hidden">{children}</div>
                </div>
                {showSidebar && (
                  <div className="lg:w-1/3 w-full lg:block hidden" id="sidebar">
                    <div className="sidebar">
                      <PageSidebar />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageWithSidebarLayout;
