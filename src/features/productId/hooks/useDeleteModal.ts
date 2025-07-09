import { useState } from "react";

export default function useDeleteModal() {
  const [modalInfo, setModalInfo] = useState({
    message: "",
    buttonText: "",
  });
  const [modalOpen, setModalOpen] = useState(false);

  const handleDeleteClick = async () => {
    setModalInfo({
      message: "정말 삭제하시겠습니까?",
      buttonText: "삭제하기",
    });
    setModalOpen(true);
  };

  return {
    modalInfo,
    setModalInfo,
    modalOpen,
    setModalOpen,
    handleDeleteClick,
  };
}
