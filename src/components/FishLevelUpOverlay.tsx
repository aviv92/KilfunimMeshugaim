import { FC, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  open: boolean;
  playerName: string;
  fishImg: string;
  onClose: () => void;
  message?: string;
}

const FishLevelUpOverlay: FC<Props> = ({
  open,
  playerName,
  fishImg,
  onClose,
  message,
}) => {
  useEffect(() => {
    if (open) {
      const timeout = setTimeout(() => onClose(), 3000);
      return () => clearTimeout(timeout);
    }
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          sx={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.85)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          <Typography
            variant="h4"
            mb={4}
            component={motion.div}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1.1 }}
            transition={{ yoyo: Infinity, duration: 0.5 }}
            sx={{
              maxWidth: "90%",
              textAlign: "center",
              wordBreak: "break-word",
              px: 2,
            }}
          >
            {message || `${playerName} is getting bigger! 🐟`}
          </Typography>

          <motion.img
            src={fishImg}
            alt="fish level"
            style={{ height: 100 }}
            animate={{
              x: [window.innerWidth, -200],
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        </Box>
      )}
    </AnimatePresence>
  );
};

export default FishLevelUpOverlay;
