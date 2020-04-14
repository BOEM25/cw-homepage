import React from "react";

function HeaderTitle({
  title = "",
  subtitle = "",
  backgroundColor = "#0e0e0e",
  titleColor = "white",
  subtitleColor = "white"
}) {
  return (
    <div className="codeBanner" style={{ backgroundColor }}>
      <div className="container">
        <h1 className="pageTitle" style={{ titleColor }}>
          {title}
          <span className="cursor"></span>
        </h1>
        <h3 className="pageSubtitle" style={{ subtitleColor }}>
          {subtitle}
        </h3>
      </div>
    </div>
  );
}

export default HeaderTitle;
