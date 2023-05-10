import { useState } from "react";
import { toast } from "react-toastify";
import { FiClipboard } from "react-icons/fi";
import { socketIo } from "../../../api/socket";
import Button from "../../../UI/button/Button";

export default function PlayerSidebarActions() {
  const [isPressedReady, setIsPressedReady] = useState<boolean>(false);
  const handleReady = () => {
    socketIo.emit("player_ready");
    setIsPressedReady(true);
  };
  const handleStart = async () => {
    socketIo.emit("game_init");
  };
  const handleCopyLink = async () => {
    const currentCopiedText = await navigator.clipboard.readText();
    const currentUrl = window.location.href;
    if (currentCopiedText === currentUrl) return;
    await navigator.clipboard.writeText(currentUrl);
    toast("🦄 Посилання скопійовано", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      className: "bg-gray",
      pauseOnFocusLoss: false,
      hideProgressBar: true,
    });
  };
  return (
    <div className='sidebar-actions'>
      {!isPressedReady && <Button title='готовий' onClick={handleReady} />}
      <Button title='почати' onClick={handleStart} />
      <span className='copy-link' onClick={handleCopyLink}>
        <FiClipboard size={24} />
        посилання
      </span>
    </div>
  );
}
