import React from "react";
import { Box } from "@material-ui/core";

interface AdminLogoProps {}

const AdminLogo: React.FC<AdminLogoProps> = () => (
  <Box
    textAlign="center"
    mt={5}
    mb={5}
    fontFamily="fontFamily"
    fontSize={24}
    data-testid="adminLogo"
  >
    Fusion
    <br />
    Admin
  </Box>
);

export default AdminLogo;
