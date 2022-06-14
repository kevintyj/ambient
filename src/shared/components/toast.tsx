import {ParentComponent, splitProps,} from "solid-js";
import { styled } from "solid-styled-components";
import toast from "solid-toast";
import { ColorIdentifier } from "../styles/components/colorIdentifier.styled";

type IToastProps = ParentComponent< & {
    toast?: any,
    color?: 'warning' | 'error' | 'info',
    showExit?: boolean,
    box?: string,
  }
>;

const Toast: IToastProps = (props) => {

  const [local, others] = splitProps(props, ['children', 'toast', 'color', 'showExit', 'box']);

  const toastColor = () => {
    switch(props.color) {
      case 'warning':
        return '#674d0f'
      case 'error':
        return '#5d000a'
      case 'info':
        return '#040e1f'
    }
    return 'black';
  }

  const ToastComponent = styled('div')`
    display: flex;
    background-color: ${toastColor};
    border-radius: 3px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    padding: 10px 10px 6px 10px;
    gap: 8px;

    @media only screen and (max-width: 780px) {
      padding: 8px 8px 6px 8px;
    }
  `

  return(
    <ToastComponent {...others}>
      {local.box && 
        <ColorIdentifier color={props.box}/>
      }
      <p>
      {props.children}
      </p>
      {local.showExit &&
        <a  onClick={() => toast.dismiss(props.toast.id)}><i class="bi bi-x"></i></a>
      }
    </ToastComponent>
  )

}

export default Toast;
