import React from "react";

function HeaderTitle({
  title = "{Code} Workshop",
  subtitle = "Adventure driven development."
}) {
  return (
    <div className="codeBanner">
      <div className="container">
        <h1 className="pageTitle">
          {title}
          <span className="cursor"></span>
        </h1>
        <h3 className="pageSubtitle">{subtitle}</h3>
      </div>
    </div>
  );
}

export default HeaderTitle;
