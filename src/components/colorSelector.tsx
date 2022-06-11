import { createForm } from "@felte/solid";
import {Component, createEffect, createSignal, For} from "solid-js";
import { styled } from "solid-styled-components";
import toast from "solid-toast";
import { ColorIdentifier } from "../shared/styles/components/colorIdentifier.styled";
import { colorScale, setColorScale } from "../shared/styles/utils/variables.styled";
import Toast from "../shared/components/toast";
import { Button } from "../shared/styles/components/button.styled";

const ColorSelector: Component = () => {
  const [colors, setColors] = createSignal(Object.entries(colorScale()));

  const addColor = () => {
    setColors([...colors(), ['NAME', '#ffffff']]);
    // console.log(Object.fromEntries(colors()));
  }

  const removeColor = (index: number) => {
    setColors([...colors().slice(0, index), ...colors().slice(index + 1)]);
  }

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

  const arrToArr = (arr: []) => {
    let c: [] = [];
    for(let i = 0; i < arr.length; i += 2) {
      c.push(arr[i]);
    }
    return c;
  }

  const { form, data, errors, isSubmitting, isValid } = createForm({
    onSubmit: (val) => {
      // console.log('color scale edited')
      setColorScale(arrToObj(Object.values(val) as []) as any);
      // console.log(arrToObj(Object.values(val) as []) as any);
      //console.log(val)
    }, validate: (val) => {
      const errors = {};
      let values: string[] = arrToArr(Object.values(val) as []);
      if (values.length !== new Set(values).size) {
        errors.duplicate = 'There are duplicates in the color names!';
      }
      if (isSubmitting && !isValid) {
        console.log('wow');
        toast.custom((t) => (
          <Toast color={'error'} showExit={true} toast={t}>
            WOW! WTF
          </Toast>
        ));
        console.log('lmao');
      }
      return errors;
    }
  });

  createEffect(() => {
    // console.log("New arr", colors());
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
            <div style={{
              width: '12px'
            }}>
              {i() + 1}
            </div>
            <ColorIdentifier color={data(`colorHEX${i()}`)}/>
            <div class="form-element">
              <label for="colorName">Name</label>
              <input type="text" name={`colorName${i()}`} value={key}/>
            </div>
            <div class="form-element">
              <label for="colorHEX">HEX</label>
              <input type="text" name={`colorHEX${i()}`} value={val} maxlength="7" 
       style="text-transform:uppercase"/>
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