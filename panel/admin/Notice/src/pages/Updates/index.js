import React from "react";
import { Divider } from "@material-ui/core";

import { AuthGuard } from "../../shared";
import Notice from "./Notice";

function Updates() {
  document.title = "Ads & Updates";
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Divider />
      <Notice />
    </div>
  );
}

export default Updates;
