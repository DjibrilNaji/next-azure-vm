import CopyButton from "../Utils/CopyButton";

export default function VmField({
  value,
  id,
  title,
}: {
  value: string;
  id: string;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-bold">{title} :</span>
      <CopyButton textToCopy={value} id={id} />
    </div>
  );
}
