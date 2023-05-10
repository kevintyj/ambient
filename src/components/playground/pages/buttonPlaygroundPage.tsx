import { Component } from "solid-js";
import Collapsible from "../../../assets/components/collapsible.styled";
import ToggleColorScale, { currScaleText } from "../../shared/toggleColorScale";
import DefaultButton from "../components/defaultButton";
import Divider from "../components/divider";
import PlaygroundButtons from "../components/playgroundButtons";
import SandboxCard from "../components/sandboxCard";
import AccessibilityCheck from "../../shared/accessibilityCheck";

const ButtonPlaygroundPage: Component = () => {
  return (
    <div class="flex flex-col">
      <div class='flex justify-center px-4 sm:px-6'>
        <div class='flex flex-col w-full max-w-screen-2xl gap-y-1 pb-6'>
          <h6 class="font-semibold text-sm text-am-pink">
            Components
          </h6>
          <h1 class="font-semibold font-display text-3xl text-slate-800 dark:text-slate-200">
            Buttons
          </h1>
          <p class='text-slate-600 dark:text-neutral-500 pb-6'>
            This area was created for users to see the effect of Color Scales on UIUX components. We have devised components to test your color scales to.
          </p>
          <h1 class="font-semibold font-display text-xl text-slate-800 dark:text-slate-200 pb-2">
            Color Swatch
          </h1>
          <div class="flex gap-x-2">
            <ToggleColorScale/>
          </div>
        </div>
      </div>
      <div class='flex flex-auto flex-col justify-center w-full px-4 sm:px-6'>
        <div class='flex flex-col gap-x-8 w-full max-w-screen-2xl'>
          <div class='flex flex-col'>
            <h4 class="text-slate-600 dark:text-neutral-500">
              Active Color Swatch
            </h4>
            <h3 class="font-semibold font-display text-xl text-slate-800 dark:text-slate-200 pb-2">
              {currScaleText()}
            </h3>
          </div>
          <Divider/>
          <div class="flex flex-col gap-8">

            <Collapsible title="Possible color combinations for button">
              <div class="flex flex-col gap-2 pb-6 pt-2">
                <h6 class="text-slate-800 dark:text-slate-200">
                  Secondary Buttons - Increase text contrast on hover
                </h6>
                <AccessibilityCheck APCA WCAG/>
                <PlaygroundButtons baseColorPos={2}/>

                <h6 class="text-slate-800 dark:text-slate-200 pt-3">
                  Primary Buttons - Increase text contrast on hover
                </h6>
                <AccessibilityCheck APCA WCAG={false}/>
                <PlaygroundButtons baseColorPos={5} border="top"/>

                <h6 class="text-slate-800 dark:text-slate-200 pt-3">
                  Primary Buttons - Colorful text
                </h6>
                <AccessibilityCheck APCA WCAG={false}/>
                <PlaygroundButtons baseColorPos={5} border="top" textColorful/>

                <h6 class="text-slate-800 dark:text-slate-200 pt-3">
                  Secondary Buttons (Default) - Colorful text
                </h6>
                <AccessibilityCheck APCA WCAG/>
                <PlaygroundButtons baseColorPos={2} textColorful/>

                <h6 class="text-slate-800 dark:text-slate-200 pt-3">
                  Primary Buttons (Default) - Increase button contrast on hover
                </h6>
                <AccessibilityCheck APCA WCAG={false}/>
                <PlaygroundButtons baseColorPos={5} border="top" direction={1}/>
              </div>
            </Collapsible>
            <div class="flex flex-col gap-3">
              <h6 class="text-lg text-slate-800 dark:text-slate-200 pb-2">
                Secondary Buttons
              </h6>
              <AccessibilityCheck APCA WCAG/>
              <PlaygroundButtons baseColorPos={2} border="full" textColorful direction={1}/>
            </div>
            <div class="flex flex-col gap-3">
              <h6 class="text-lg text-slate-800 dark:text-slate-200 pb-2">
                Primary Buttons
              </h6>
              <AccessibilityCheck APCA WCAG={false}/>
              <PlaygroundButtons baseColorPos={5} border="top" direction={1}/>
            </div>
            <div class="flex flex-col gap-3">
              <h6 class="text-lg text-slate-800 dark:text-slate-200">
                Default Button
              </h6>
              <AccessibilityCheck APCA/>
              <SandboxCard>
                <div class="flex w-full justify-center">
                  <DefaultButton type="default">
                    Default Button
                  </DefaultButton>
                </div>
              </SandboxCard>
            </div>
            <div class="flex flex-col gap-3">
              <h6 class="text-lg text-slate-800 dark:text-slate-200">
                Default Secondary Button
              </h6>
              <AccessibilityCheck APCA/>

              <SandboxCard>
                <div class="flex w-full justify-center">
                  <DefaultButton type="secondary">
                    Secondary Button
                  </DefaultButton>
                </div>
              </SandboxCard>
            </div>
            <div class="flex flex-col gap-3">
              <h6 class="text-lg text-slate-800 dark:text-slate-200">
                Default Primary Button
              </h6>
              <AccessibilityCheck APCA/>
              <SandboxCard>
                <div class="flex w-full justify-center">
                  <DefaultButton type="primary">
                    Primary Button
                  </DefaultButton>
                </div>
              </SandboxCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ButtonPlaygroundPage
