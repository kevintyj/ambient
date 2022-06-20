import { createForm } from "@felte/solid";
import {Component, createEffect, createSignal, For} from "solid-js";
import { styled } from "solid-styled-components";
import toast from "solid-toast";
import { ColorIdentifier } from "../shared/styles/components/colorIdentifier.styled";
import { colorScale, ColorShades, setColorScale } from "../shared/styles/utils/variables.styled";
import Toast from "../shared/components/toast";
import { Button } from "../shared/styles/components/button.styled";
import { Flex } from "../shared/styles/components/flex.styled";

const ColorSelector: Component = () => {
  const [colors, setColors] = createSignal(Object.entries(colorScale()));
  const [jsonFile, setJsonFile] = createSignal();

  const addColor = () => {
    setColors([...colors(), ['NAME', '#ffffff']]);
  }

  const removeColor = (index: number) => {
    setColors([...colors().slice(0, index), ...colors().slice(index + 1)]);
  }

  createEffect(() => {
    setColors(Object.entries(colorScale()));
  })

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
      setColorScale(arrToObj(Object.values(val) as []) as any);
      // console.log(arrToObj(Object.values(val) as []) as any);
      //console.log(val)

      console.log(
        ColorShades()
      );
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

  const fileDownload = () => {
    const fileData = JSON.stringify(colorScale());
    const blob = new Blob([fileData], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'ambientcolors.json';
    link.href = url;
    link.click();
  }

  const fileChange = (e: any) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0]);
    fileReader.onload = e => {
      // console.log(e.target?.result);
      setJsonFile(eval(`(${e.target?.result as string})`));
      // console.log(eval(`(${jsonFile() as string})`))
      setColors(Object.entries(jsonFile() as object));
      // setColorScale(jsonFile() as any);
    };
  }

  return(
    <>
      <form use:form style={{
        display: 'flex',
        "flex-direction": 'column',
        "gap": '8px',
        "padding": '4px 0 8px 0',
        'align-items': 'flex-start'
      }}>
        <For each={colors()}>{([key, val], i) =>
          <FormGroup>
            <div style={{
              width: '12px'
            }}>
              {i() + 1}
            </div>
            <label>
              <ColorIdentifier color={colors()[i()][1]}/>
            </label>
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
      <Flex flexDirection={'row'} gap={12} style={{
        "padding-bottom": '20px'
      }}>
        <Button type="submit" onclick={fileDownload}>
          <i class="bi bi-cloud-arrow-down-fill"></i> Export Color Set
          </Button>
        <Button type="submit">
          <label style={{
            'font-weight': 'bold',
            cursor: 'pointer'
          }}>
            <input type="file" onchange={fileChange} style={{
              display: 'none'
            }}/>
            <i class="bi bi-cloud-arrow-up-fill"></i> Import Color Set
          </label>
        </Button>
      </Flex>
    </>
  )

}

export default ColorSelector;