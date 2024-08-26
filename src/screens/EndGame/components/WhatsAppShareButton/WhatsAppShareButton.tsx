import { FC } from "react";
import { IconButton } from "@mui/material";
import { usePlayerStore } from "../../../../stores/usePlayerStore";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const WhatsAppShareButton: FC = () => {
  const { payments } = usePlayerStore();

  const generateWhatsAppMessage = () =>
    payments
      .map((payment) => `${payment.from} ==> ${payment.to} ${payment.amount}`)
      .join("\n");

  const shareOnWhatsApp = () => {
    const message = encodeURIComponent(generateWhatsAppMessage());
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <IconButton color="info" onClick={shareOnWhatsApp}>
      <WhatsAppIcon />
    </IconButton>
  );
};

export default WhatsAppShareButton;
