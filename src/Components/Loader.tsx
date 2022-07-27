import React from "react";

const Loader = () => {
  const style = "p-[.4rem] bg-[#F26865] rounded-full animate-bounce2";
  return (
    <div className="absolute flex items-center justify-center gap-1 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <div className={style + " [animation-delay:.2s]"}></div>
      <div className={style + " [animation-delay:.1s]"}></div>
      <div className={style + "  "}></div>
    </div>
  );
};

export default Loader;
