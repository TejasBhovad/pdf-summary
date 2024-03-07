import React from "react";

const page = ({ params }) => {
  return (
    <div>
      <span>{params.page_id}</span>
    </div>
  );
};

export default page;
