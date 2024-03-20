import { useAppContext } from "@/hooks/useAppContext";
import { MdContentCopy } from "react-icons/md";

export default function CopyButton({
  textToCopy,
  id,
}: {
  textToCopy: string;
  id: string;
}) {
  const { setDialog } = useAppContext();

  const copyToClipboard = () => {
    const textToCopy = document.getElementById(id)?.innerText;
    navigator.clipboard.writeText(textToCopy || "").then(() => {
      setDialog("Copié dans le presse-papier", "green", 3000);
    });
  };

  return (
    <div className="flex items-center gap-2">
      <p id={id} title={textToCopy}>
        {textToCopy}
      </p>
      <div>
        <button onClick={copyToClipboard}>
          <MdContentCopy />
        </button>
      </div>
    </div>
  );
}
