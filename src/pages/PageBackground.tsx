import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  imageUrl: string;
};

const PageBackground: FC<Props> = ({ children, imageUrl }) => {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(assets/${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
          opacity: 0.1,
        }}
      />
      {children}
    </Box>
  );
};

export default PageBackground;
