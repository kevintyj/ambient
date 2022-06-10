import {ParentComponent, splitProps,} from "solid-js";
import { styled } from "solid-styled-components";
import { ColorIdentifier } from "../styles/components/colorIdentifier.styled";

type IToastProps = ParentComponent< & {
    color?: 'warning' | 'error' | 'info',
    showExit?: boolean,
    box?: string,
  }
>;

const Toast: IToastProps = (props) => {

  const [local, others] = splitProps(props, ['children', 'color', 'showExit', 'box']);

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
    bottom: 40px;
    right: 40px;
    display: flex;
    position: fixed;
    z-index: 99999;
    background-color: ${toastColor};
    border-radius: 3px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    padding: 8px 8px;
    gap: 8px;
  `

  return(
    <ToastComponent {...others}>
      {local.box && 
        <ColorIdentifier color="#0066ff"/>
      }
      <p>
      {props.children}
      </p>
      {local.showExit &&
        <a><i class="bi bi-x"></i></a>
      }
    </ToastComponent>
  )

}

export default Toast;
