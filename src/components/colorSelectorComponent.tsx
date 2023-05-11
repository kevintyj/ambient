import {Component, createContext, createEffect, createMemo, createSignal, For} from "solid-js";
import {createForm} from "@felte/solid";
import toast from "solid-toast";
import Toast from "./shared/toast";
import {BaseBackgroundArr, ScalePrimObj} from "../functions/colorConfig";
import PlaygroundBtn from "./playground/button/playgroundButton";
import {neutralSwatch} from "./playground/components/colorSwatch";
import {darkMode} from "./shared/darkModeToggle";
import {css} from "solid-styled";
import {useColorArrContext} from "../pages/colorGenerationPage";

const ColorSelectorComponent:Component = () => {

  const [colorsArr, setColorsArr] = useColorArrContext();

  const [colors, setColors] = createSignal(colorsArr());

  createEffect(() => {
    setColorsArr(colors());
  })

  css`
    .color-picker {
      width: 28px;
      height: 32px;
    }

    .color-picker::-webkit-color-swatch {
      border-radius: 4px;
      border: none;
      outline: 1px solid rgba(136, 136, 136, 0.32);
      outline-offset: 2px;
    }
  `

  const addColor = () => {
    setColors([...colors(), ['NAME', ['#FFFFFF', '#666666', '#111111']]]);
  }

  const removeColor = (index: number) => {
    setColors([...colors().slice(0, index), ...colors().slice(index + 1)]);
  }

  const handleColorChange = (row: number, index: number, val: string) => {
    let newColorArr: string[] = [...colors()[row][1]];
    newColorArr[index] = val;
    setColors([...colors().slice(0, row), [colors()[row][0], newColorArr], ...colors().slice(row + 1)]);
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
      console.log(val)
      setColorsArr(colors());
    }, validate: (val) => {
      const errors = {};
      let values: string[] = arrToArr(Object.values(val) as []);
      if (values.length !== new Set(values).size) {
        // @ts-ignore
        errors.duplicate = 'There are duplicates in the color names!';
      }
      if (isSubmitting() && !isValid) {
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
  })

  return(
    <div class="flex flex-row justify-between">
      <form ref={form} class="flex flex-col">
        <div class="flex flex-col gap-4">
          <For each={colors()}>{([key, val], i) =>
            <div class="flex flex-row text-slate-600 dark:text-neutral-400 items-center">
              <p class="w-12 font-mono">{i() + 1}</p>
              <div class="flex flex-col md:flex-row gap-2">
                <input type="color" class="h-8 w-8 appearance-none border-none color-picker bg-transparent"
                       value={val[0]} onChange={(e) => handleColorChange(i(), 0, e.currentTarget.value)}/>
                <input type="color" class="h-8 w-8 appearance-none border-none color-picker bg-transparent"
                       value={val[1]} onChange={(e) => handleColorChange(i(), 1, e.currentTarget.value)}/>
                <input type="color" class="h-8 w-8 appearance-none border-none color-picker bg-transparent"
                       value={val[2]} onChange={(e) => handleColorChange(i(), 2, e.currentTarget.value)}/>
              </div>
              <div class="flex gap-3 pl-6 flex-wrap">
                <div class="flex items-center">
                  <label class="bg-neutral-200 dark:bg-neutral-500 rounded-l px-3 text-sm h-full flex items-center" for="colorName">
                    Name
                  </label>
                  <input type="text" class="bg-gray-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-500
            rounded-r text-slate-800 dark:text-neutral-100 font-semibold px-3 py-1 w-40"
                         value={key} name={`colorName${i()}`}/>
                </div>

                <div class="flex items-center">
                  <label class="bg-neutral-200 dark:bg-neutral-500 rounded-l px-3 text-sm h-full flex items-center" for="colorName">
                    01
                  </label>
                  <input type="text" class="bg-gray-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-500
            rounded-r text-slate-800 dark:text-neutral-100 font-semibold font-mono px-3 py-1 w-32"
                         value={val[0]} name={`colorHex${i()}-01`}
                         onChange={(e) => handleColorChange(i(), 0, e.currentTarget.value)}/>
                </div>

                <div class="flex items-center">
                  <label class="bg-neutral-200 dark:bg-neutral-500 rounded-l px-3 text-sm h-full flex items-center" for="colorName">
                    06
                  </label>
                  <input type="text" class="bg-gray-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-500
            rounded-r text-slate-800 dark:text-neutral-100 font-semibold font-mono px-3 py-1 w-32"
                         value={val[1]} name={`colorHex${i()}-06`}
                         onChange={(e) => handleColorChange(i(), 1, e.currentTarget.value)}/>
                </div>

                <div class="flex items-center">
                  <label class="bg-neutral-200 dark:bg-neutral-500 rounded-l px-3 text-sm h-full flex items-center" for="colorName">
                    09
                  </label>
                  <input type="text" class="bg-gray-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-500
            rounded-r text-slate-800 dark:text-neutral-100 font-semibold font-mono px-3 py-1 w-32"
                         value={val[2]} name={`colorHex${i()}-09`}
                         onChange={(e) => handleColorChange(i(), 2, e.currentTarget.value)}/>
                </div>
              </div>

              <a class="cursor-pointer" onclick={() => removeColor(i())}><i class="bi bi-trash3-fill pl-4"></i></a>
            </div>
          }</For>
        </div>
        <div class="flex flex-col gap-4 py-4 text-slate-600 dark:text-neutral-400">
          <a class="cursor-pointer" onClick={() => addColor()}><i class="bi bi-plus-circle-fill"></i> Add Color</a>
          <PlaygroundBtn border={'full'}
                         textColor={neutralSwatch(9)}
                         color={darkMode() ? neutralSwatch(0) : BaseBackgroundArr[0]}
                         hoverColor={darkMode() ? BaseBackgroundArr[1] : BaseBackgroundArr[0]}
                         borderColor={neutralSwatch(2)}
                         hoverBorderColor={neutralSwatch(1)} type="submit">
            Generate Colors
          </PlaygroundBtn>
        </div>
      </form>
    </div>
  )
}

export default ColorSelectorComponent
