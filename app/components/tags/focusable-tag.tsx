export type FocusableTagProps = {
  label: string;
  onClick?: () => void;
}

export default function FocusableTag({
  label,
  onClick,
}: FocusableTagProps) {
  return (
    <div>
      {label}
    </div>
  );
}
