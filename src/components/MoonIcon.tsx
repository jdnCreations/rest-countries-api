export default function MoonIcon(props: { color: string}) {

  let mode = props.color === "dark";
  
  return  ( 
    <svg className={`${mode ? "fill-light" : "fill-none stroke-dark-blue"}`} width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path className={`${mode ? "stroke-none" : "stroke-dark-blue"} stroke-dark-blue`} d="M11.0045 11.4969C12.6322 11.4969 14.12 10.8986 15.2602 9.91082C14.4141 13.1275 11.4857 15.5 8.00327 15.5C3.85933 15.5 0.5 12.1406 0.5 7.99667C0.5 4.51516 2.87126 1.58732 6.08661 0.740313C5.09972 1.8803 4.50204 3.36749 4.50204 4.99439C4.50204 8.58561 7.41328 11.4969 11.0045 11.4969Z"/>
    </svg>


  );
}