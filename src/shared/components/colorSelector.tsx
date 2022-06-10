import { createForm } from "@felte/solid";
import {Component, createEffect, createSignal, For} from "solid-js";
import { styled } from "solid-styled-components";
import { ColorIdentifier } from "../styles/components/colorIdentifier.styled";
import { colorScale, setColorScale } from "../styles/utils/variables.styled";

const ColorSelector: Component = () => {
  const [colors, setColors] = createSignal(Object.entries(colorScale()));

  const addColor = () => {
    setColors([...colors(), ['NAME', '#ffffff']]);
    // console.log(Object.fromEntries(colors()));
  }

  const removeColor = (index: number) => {
    setColors([...colors().slice(0, index), ...colors().slice(index + 1)]);
  }

  const Button = styled('button')`
  	background: none;
    color: inherit;
    font: inherit;
    cursor: pointer;
    outline: none;
    padding: 6px 8px;
    background-color: rgba(255, 255, 255, 0.14);
    font-weight: bold;
    border-radius: 3px;
    border: none;
    width: 154px;
    transition: all 100ms ease-in-out;
    outline: 0;
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.14);
    margin-top: 12px;
    &:hover {
      background-color: rgba(255, 255, 255, 0.09);
    }
    &:active {
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.14);
    }
  `

  const FormGroup = styled('div')`
    display: flex;
    flex-direction: row;
    gap: 22px;
    align-items: center;
    .form-element {
      display: flex;
      flex-direction: row;
      width: auto;
      align-items: center;
      position: relative;
      label {
        width: 50px;
        position: absolute;
        padding: 4px;
        padding-left: 8px;
        margin-left: 3px;
        background-color: rgba(255, 255, 255, 0.14);
        left: 0;
        border-radius: 2px 0 0 2px;
      }
      input {
        padding: 4px 8px;
        padding-left: 60px;
        background-color:rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.14);
        color: white;
        border-radius: 3px;
        outline: none;
        &:focus {
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.14);
          font-weight: bold;
        }
      }
    }
  `

  const arrToObj = (arr: []) => {
    let obj = {}
    for(let i = 0; i < arr.length; i += 2){
      obj[arr[i]] = arr[i + 1];
    }
    return obj;
  }

  const { form, data } = createForm({
    onSubmit: (val) => {
      console.log('color scale edited')
      setColorScale(arrToObj(Object.values(val) as []) as any);
    },
  });

  createEffect(() => {
    console.log("The count is now", colors());
  });

  return(
    <>
      <h4>
        Color Selector
      </h4>
      <p>Each color should have a unique name. A new color cannot be created until a name has been given</p>
      <br/>
      <form use:form style={{
        display: 'flex',
        "flex-direction": 'column',
        "gap": '8px'
      }}>
        <For each={colors()}>{([key, val], i) =>
          <FormGroup>
            {i() + 1}
            <ColorIdentifier color={val}/>
            <div class="form-element">
              <label for="colorName">Name</label>
              <input type="text" name={`colorName${i()}`} value={key}/>
            </div>
            <div class="form-element">
              <label for="colorHEX">HEX</label>
              <input type="text" name={`colorHEX${i()}`} value={val}/>
            </div>
            <a onclick={() => removeColor(i())}><i class="bi bi-trash3-fill"></i></a>
          </FormGroup>
        }</For>
        <a onClick={() => addColor()}><i class="bi bi-plus-circle-fill"></i> Add Color</a>
        <Button type="submit">Generate Color Set</Button>
      </form>
      <br/>
    </>
  )

}

export default ColorSelector;