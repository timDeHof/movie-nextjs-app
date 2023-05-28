interface ButtonProps {
  onClick: () => void;
  text: string;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      className='bg-black p-2 px-4 text-lg text-white rounded-lg'
      onClick={props.onClick}>
      {props.text}
    </button>
  );
}
export function RemoveButton(props: ButtonProps) {
  return (
    <button
      className="before:content-[url('../assets/remove.svg')] bg-transparent flex place-content-end text-lg text-gray-700"
      onClick={props.onClick}>
      {props.text}
    </button>
  );
}
export function WatchButton(props: ButtonProps) {
  return (
    <button
      className="before:content-[url('../assets/add.svg')] bg-transparent flex place-content-end text-lg text-gray-700"
      onClick={props.onClick}>
      {props.text}
    </button>
  );
}
export function SearchButton(props: ButtonProps) {
  return (
    <button
      className='bg-black p-2 px-4 text-lg text-white rounded-r-lg'
      onClick={props.onClick}>
      {props.text}
    </button>
  );
}
