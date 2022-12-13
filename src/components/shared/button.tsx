import {ParentComponent} from "solid-js";

const Button: ParentComponent = (props) => {
  return (
    <button class="font-medium text-sm bg-white rounded-md
    border border-neutral-200
    border-b-neutral-300
    shadow-sm py-1 px-3
    hover:shadow
    active:border-neutral-300
    active:translate-y-px">
      {props.children}
    </button>
  )
}

export default Button;
