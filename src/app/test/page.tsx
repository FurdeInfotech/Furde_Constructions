import React from 'react'
import Video from "next-video";
import furdeVideo from "../../../videos/Furde Constructions.mp4";
function page() {
  return (
    <div>
      {" "}
      <Video
        src={furdeVideo}
        style={{ maxWidth: "600px", maxHeight: "400px" }}
      />
      ;
    </div>
  );
}

export default page