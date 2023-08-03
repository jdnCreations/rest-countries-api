
export default function SearchIcon(props: { color: string}) {

  let strokeColor = props.color === "dark";
   
  return  ( 
    <svg className={`${strokeColor ? "fill-white" : "fill-dark-blue"} flex items-center h-full`} width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M11.4253 11.4448C9.47188 13.3877 6.31333 13.3844 4.36396 11.4351C2.41134 9.48245 2.41133 6.31662 4.36396 4.364C6.31658 2.41138 9.4824 2.41138 11.435 4.364C13.3844 6.31338 13.3876 9.47193 11.4447 11.4253L11.4253 11.4448ZM12.092 13.5062C9.35021 15.5619 5.44334 15.3429 2.94974 12.8493C0.216073 10.1156 0.216073 5.68346 2.94974 2.94979C5.68341 0.216119 10.1156 0.216119 12.8492 2.94979C15.3428 5.44337 15.5618 9.3502 13.5062 12.092L19.2132 17.799L17.799 19.2132L12.092 13.5062Z" />
    </svg>
  );
}