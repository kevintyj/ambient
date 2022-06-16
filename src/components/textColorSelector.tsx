import { createForm } from "@felte/solid";
import {Component, createEffect, createSignal, For} from "solid-js";
import { styled } from "solid-styled-components";
import toast from "solid-toast";
import { ColorIdentifier } from "../shared/styles/components/colorIdentifier.styled";
import { colorScale, setColorScale, setTextColorScale, textColorScale } from "../shared/styles/utils/variables.styled";
import Toast from "../shared/components/toast";
import { Button } from "../shared/styles/components/button.styled";
import { Flex } from "../shared/styles/components/flex.styled";

const TextColorSelector: Component = () => {
  const [colors, setColors] = createSignal(Object.entries(textColorScale()));

  const FormGroup = styled('div')`
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
    .form-element {
      display: flex;
      flex-direction: row;
      width: auto;
      align-items: center;
      position: relative;
      margin-left: 4px;
      label {
        width: 50px;
        position: absolute;
        padding: 4px;
        padding-left: 8px;
        background-color: rgba(255, 255, 255, 0.14);
        left: 1px;
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
        width: 180px;
        &:focus {
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.14);
          font-weight: bold;
        }
        @media only screen and (max-width: 472px) {
        & {
            width: 120px;
          }
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
      setTextColorScale(arrToObj(Object.values(val) as []) as any);
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
            Something Happened
          </Toast>
        ));
        console.log('lmao');
      }
      return errors;
    }
  });

  createEffect(() => {
    setColors(Object.entries(textColorScale()));
  });

  return(
    <>
      <form use:form style={{
        display: 'flex',
        "flex-direction": 'column',
        "gap": '8px',
        "padding": '4px 0 16px 0',
        'align-items': 'flex-start'
      }}>
        <For each={colors()}>{([key, val], i) =>
          <FormGroup>
            <div style={{
              width: 'auto'
            }}>
              {key}
            </div>
            <label>
              <ColorIdentifier color={colors()[i()][1]}/>
            </label>
            <div class="form-element" style={{
              display: 'none'
            }}>
              <label for="colorName">Name</label>
              <input type="text" name={`colorName${i()}`} value={key}/>
            </div>
            <div class="form-element">
              <label for="colorHEX">HEX</label>
              <input type="text" name={`colorHEX${i()}`} value={val} maxlength="7" 
       style="text-transform:uppercase"/>
            </div>
          </FormGroup>
        }</For>
        <Button type="submit">Change Text Colors</Button>
      </form>
      <br/>
    </>
  )

}

export default TextColorSelector;