export default function DropdownIcon(props: { color: string}) {

  let strokeColor = props.color === "dark";
  
  return  ( 
    <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${strokeColor ? "stroke-white" : "stroke-dark-blue"}`}>
    <path d="M0.410604 0.676514L4.29971 4.56562M4.29971 4.56562L4.65324 4.91915M4.29971 4.56562L3.94614 4.91919M4.29971 4.56562L8.18878 0.676548"/>
    </svg> 
  );
}