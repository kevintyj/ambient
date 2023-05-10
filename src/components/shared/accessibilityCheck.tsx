import {Component, Show} from "solid-js";

type IAccessibilityCheckProps = Component< & {
  APCA?: boolean;
  WCAG?: boolean;
}>;

const AccessibilityCheck: IAccessibilityCheckProps = (props) => {
  return (
    <div class={"flex gap-x-2"}>
      <Show when={props.APCA}>
        <div class={`mb-3 px-2 py-1 pr-2.5 rounded-full border border-neutral-300 dark:border-neutral-700 
      bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#6bc28066] via-[#a5dcb242] to-transparent
      dark:from-[#01542366] dark:via-[#0f3f2042] dark:to-transparent 
      font-semibold text-sm inline dark:text-white`}>
          <div class={"rounded-full bg-green-700 inline mr-2"}><i class={"bi bi-check-all p-1 text-white"}/></div>
          APCA Contrast Passing
        </div>
      </Show>
      <Show when={props.WCAG}>
        <div class={`mb-3 px-2 py-1 pr-2.5 rounded-full border border-neutral-300 dark:border-neutral-700 
      bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#ffd56b36] via-[#fff7e142] to-transparent
      dark:from-[#472b1366] dark:via-[#61401642] dark:to-transparent 
      font-semibold text-sm inline dark:text-neutral-400 text-neutral-600 group`}>
          <div class={"rounded-full bg-[#ffd56b] inline mr-2"}><i class={"bi bi-check p-1 text-yellow-800"}/></div>
          WCAG AA Contrast Passing
          <Show when={!props.APCA}>
            <a><i class={"bi bi-info-circle-fill ml-2"}></i></a>
            <div role="tooltip" class={`rounded-md border border-neutral-300 dark:border-neutral-600 shadow-md
        bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 
        px-3.5 py-2.5 text-sm w-80 absolute z-40 hidden group-hover:block`}>
              This component passes WCAG 2.0 contrast test, however may fail APCA (WCAG 3.0) tests depending on the use case.
              <b>It is recommended that special care is put to the font size and background separation for better readability. </b>
            </div>
          </Show>
        </div>
      </Show>
      <Show when={props.WCAG == false}>
        <div class={`mb-3 px-2 py-1 pr-2.5 rounded-full border border-neutral-300 dark:border-neutral-700 
      bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#ca233136] via-[#fac6c042] to-transparent
      dark:from-[#4e141a66] dark:via-[#91202828] dark:to-transparent 
      font-semibold text-sm inline dark:text-neutral-400 text-neutral-600 group cursor-help`}>
          <div class={"rounded-full bg-[#961524] inline mr-2"}><i class={"bi bi-exclamation p-1 text-white"}/></div>
          Contains WCAG Failing Colors
          <a><i class={"bi bi-info-circle-fill ml-2"}></i></a>
          <div role="tooltip" class={`rounded-md border border-neutral-300 dark:border-neutral-600 shadow-md
        bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 
        px-3.5 py-2.5 text-sm w-80 absolute z-40 hidden group-hover:block`}>
            Some of the components that contain the colors below have WCAG 2.0 failing contrast values.
            <b>These components have been tested against APCA (WCAG 3.0) contrast tests and have passed. </b>
            If you require WCAG 2.0 compliance, please consider using a different colorset.
          </div>
        </div>
      </Show>
    </div>

  )
}

export default AccessibilityCheck;
