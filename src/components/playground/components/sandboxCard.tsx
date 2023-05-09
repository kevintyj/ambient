import { createSignal, ParentComponent, Show } from "solid-js";
import Button from "../../../assets/components/button.styled";
import { BaseBackgroundArr } from "../../../functions/colorConfig";

const SandboxCard: ParentComponent = (props) => {

  const [open, setOpen] = createSignal(false)

  return (
    <>
      <Show
        when={open()}
      >
        <div class="fixed w-screen h-screen bg-black bg-opacity-90 dark:bg-opacity-70 top-0 left-0 z-[9998] backdrop-blur">
          <div class="flex w-full h-full justify-center items-center p-6 sm:p-8 z-[9999]">
            <div class={`relative rounded border w-full max-w-screen-xl 
            border-neutral-300 bg-white dark:border-neutral-800 dark:bg-[${BaseBackgroundArr[1]}] shadow p-6 sm:p-8`}>
              <div class="absolute right-4 top-3" onClick={() => setOpen(false)}>
                <Button aria={"Toggle Fullscreen View"} square>
                  <i class="bi bi-fullscreen-exit -mx-[3.5px]"></i>
                </Button>
              </div>
              {props.children}
            </div>
          </div>
        </div>
      </Show>
      <div class={`relative rounded border w-full border-neutral-300 bg-white dark:border-neutral-800 dark:bg-[${BaseBackgroundArr[1]}] shadow p-6 sm:p-8`}>
        <div class="absolute right-4 top-3" onClick={() => setOpen(true)}>
          <Button aria={"Toggle Fullscreen View"} square>
            <i class="bi bi-fullscreen -mx-[3.5px]"></i>
          </Button>
        </div>
        {props.children}
      </div>
    </>
  )
}

export default SandboxCard
