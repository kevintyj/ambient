import { Component } from "solid-js";
import Button from "../assets/components/button.styled";
import LinkUrl from "../assets/images/link.png"

const ComingSoonPage: Component = () => {
  return (
    <>
      <div class='flex justify-center px-4 sm:px-6'>
        <div class='flex flex-col justify-center items-center text-center max-w-screen-md gap-y-1 pb-6 px-auto'>
          <img aria-label={"Unlinked Image"} src={LinkUrl} class="w-20 pb-4"/>
          <h1 class="font-semibold font-display text-3xl text-slate-800 dark:text-slate-200 pb-2">
            I haven't created this yet!
          </h1>
          <p class='text-slate-600 dark:text-neutral-500 pb-6'>
            Ambient v0.0.0, which includes many of the features which were removed, is available on
            <a class="font-semibold underline" href="https://github.com/kevintyj/ambient">Github</a>.
            I am working to migrating as many features of the previous version to this live site as fast as possible.
            If you have any questions, you can also send me a email!
          </p>
          <div>
            <a onClick={() => history.back()}>
              <Button aria={"Navigate to previous page"}>
                Take me back!
              </Button>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default ComingSoonPage
