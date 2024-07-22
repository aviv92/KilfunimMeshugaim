import React from "react";
import styles from "./ConfirmDialog.module.css";

type ConfirmDialogProps = {
  title: React.ReactNode | string;
  content: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
};
const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  content,
  onCancel,
  onConfirm,
  title,
}) => {
  return (
    <div className={styles.quitModal}>
      <div className={styles.modalContent}>
        {typeof title === "string" ? <h2>{title}</h2> : title}
        {content}
        <button onClick={onConfirm} className={styles.confirmButton}>
          Confirm
        </button>
        <button onClick={onCancel} className={styles.cancelButton}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmDialog;
