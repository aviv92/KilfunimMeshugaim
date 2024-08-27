import { FC } from "react";
import { IconButton } from "@mui/material";
import { usePlayerStore } from "../../../../stores/usePlayerStore";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { calculateNetPayments } from "./utils";

const WhatsAppShareButton: FC = () => {
  const { payments, foodOrders } = usePlayerStore();

  const generateWhatsAppMessage = () =>
    calculateNetPayments(payments, foodOrders)
      .map((payment) => `${payment.from} ==> ${payment.to} ${payment.amount}`)
      .join("\n");

  const shareOnWhatsApp = () => {
    const message = encodeURIComponent(generateWhatsAppMessage());
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <IconButton sx={{ color: "#25d366" }} onClick={shareOnWhatsApp}>
      <WhatsAppIcon />
    </IconButton>
  );
};

export default WhatsAppShareButton;
