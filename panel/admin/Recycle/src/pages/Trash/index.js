import React from "react";

import { AuthGuard } from "../../shared";
import Timer from "../../shared/Timeer/Timer";

function Trash() {
  document.title = "Trash";
  return (
    <div>
      <Timer />
    </div>
  );
}

export default Trash;
