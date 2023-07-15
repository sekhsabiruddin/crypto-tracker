import React, { useEffect } from "react";
import "./styles.css";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";

function BackToTop() {
  useEffect(() => {
    const scrollFunction = () => {
      let mybutton = document.getElementById("myBtn");
      if (
        document.body.scrollTop > 300 ||
        document.documentElement.scrollTop > 300
      ) {
        mybutton.style.display = "flex";
      } else {
        mybutton.style.display = "none";
      }
    };

    window.addEventListener("scroll", scrollFunction);

    return () => {
      window.removeEventListener("scroll", scrollFunction);
    };
  }, []);

  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <div className="back-to-top-btn" id="myBtn" onClick={topFunction}>
      <ArrowUpwardRoundedIcon />
    </div>
  );
}

export default BackToTop;
