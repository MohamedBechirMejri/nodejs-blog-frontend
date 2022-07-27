import React from "react";

const Loader = () => {
  const style = "p-[.4rem] bg-[#F26865] rounded-full animate-bounce2";
  return (
    <div className="flex items-center justify-center gap-1 ">
      <div className={style + " [animation-delay:.2s]"}></div>
      <div className={style + " [animation-delay:.1s]"}></div>
      <div className={style + "  "}></div>
    </div>
  );
};

export default Loader;
