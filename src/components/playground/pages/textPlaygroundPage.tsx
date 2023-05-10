import { Component, For } from "solid-js";
import { focused } from "../../../functions/keyHandler";
import ColorSwatchHelper from "../../colorSwatchHelper";
import { visibleColorScale } from "../../shared/toggleColorScale";
import Divider from "../components/divider";
import Heading from "../components/heading";
import HelperBadge from "../components/helperBadge";
import LinkAnchor from "../components/link";
import Paragraph from "../components/paragraph";
import SandboxCard from "../components/sandboxCard";
import AccessibilityCheck from "../../shared/accessibilityCheck";

const TextPlaygroundPage: Component = () => {

  const headingSizes = [1, 2, 3, 4, 5, 6]

  const textTypes = ['default', 'hint', 'bold']
  const textSizes = ['small', 'base', 'large']

  return(
    <>
      <div class='flex flex-col justify-center px-4 sm:px-6'>
        <div class='flex flex-col w-full max-w-screen-2xl gap-y-1'>
          <h6 class="font-semibold text-sm text-am-pink">
            Components
          </h6>
          <h1 class="font-semibold font-display text-3xl text-slate-800 dark:text-slate-200">
            Typography
          </h1>
        </div>
        <Divider/>
        <div class="flex flex-col gap-y-4 pb-12">
          <h6 class="text-lg text-slate-800 dark:text-slate-200 pt-2">
            Headings
          </h6>
          <AccessibilityCheck APCA/>

          <ColorSwatchHelper track="neutral" active={[9]} activeHelper={['Default']}/>
          <For each={headingSizes}>{size => (
            <Heading size={size}>
              This is a heading of size {size}
              <HelperBadge margin>
                {Object.keys(visibleColorScale())[0].toLocaleLowerCase()} 09
              </HelperBadge>
            </Heading>
          )}</For>

          <h6 class="text-lg text-slate-800 dark:text-slate-200 pt-3 pb-1">
            Paragraphs (body)
          </h6>
          <AccessibilityCheck APCA/>

          <ColorSwatchHelper track="neutral" active={[4, 7, 8]} activeHelper={['Hint', 'Default', 'Bold']}/>
          <For each={textTypes}>{type => (
            <For each={textSizes}>{size => (
              <Paragraph size={size} class={type}>
                This is the {type} paragraph text of size {size}
                <HelperBadge margin>
                  {Object.keys(visibleColorScale())[0].toLocaleLowerCase()} {type=='bold' ? ' 08' : type=='hint' ? ' 04' : ' 07'}
                </HelperBadge>
              </Paragraph>
            )}</For>
          )}</For>

          <h6 class="text-lg text-slate-800 dark:text-slate-200 pt-3 pb-1">
            Links
          </h6>
          <AccessibilityCheck APCA WCAG={false}/>

          <ColorSwatchHelper track="color" active={[3, 4, 6, 7]} activeHelper={['Hint Hover', 'Hint', 'Default Hover', 'Default']}/>
          <For each={textSizes}>{size => (
            <LinkAnchor size={size}>
              This is the default link of size {size}
              <HelperBadge margin>
                {Object.keys(visibleColorScale())[focused()[1]].toLocaleLowerCase()} 07
              </HelperBadge>
            </LinkAnchor>
          )}</For>
          <For each={textSizes}>{size => (
            <LinkAnchor size={size} class="hint">
              This is the hint link of size {size}
              <HelperBadge margin>
                {Object.keys(visibleColorScale())[focused()[1]].toLocaleLowerCase()} 04
              </HelperBadge>
            </LinkAnchor>
          )}</For>
        </div>
        <div class='flex flex-col w-full max-w-screen-2xl gap-y-1'>
          <h6 class="font-semibold text-sm text-am-pink">
            Sample
          </h6>
          <h1 class="font-semibold font-display text-3xl text-slate-800 dark:text-slate-200">
            Typography sample
          </h1>
        </div>
        <Divider/>
        <div class="flex flex-col gap-y-4">
          <SandboxCard>
            <div>
              <Heading size={1}>
                We do things differently,
              </Heading>
              <Heading size={1}>
                Its what makes us unique.
              </Heading>
            </div>
            <Divider/>
            <div class="flex flex-col gap-4">
              <Paragraph>
                <Paragraph class="bold">
                  Technology can be complicated sometimes. It has its own ecosystem, its own language, and it’s just difficult to understand how it works.
                </Paragraph>
                Some of us humans may not get it easily. This is why our core value is to build an intimate and intricate connection between technology and humans.
                After all tech is built to help humans.
              </Paragraph>
              <Paragraph>
                Our technology is for everyone. Our tech is humanly familiar. This is perhaps what we thrive the most, which makes us different from the other traditional agencies.
                We care deeply about helping you tackle your most significant challenges and turn your vision into reality, keeping the end-user in mind at all times. With us, it’s never just about the project in hand.
                <Paragraph class="bold">
                  It’s about building trust and enabling your long-term success.
                </Paragraph>
                We will meet you where you are on your journey, integrate our people with yours, and share our skills every step of the way to make the product you envisioned a reality.
              </Paragraph>
              <LinkAnchor>
                Check out what makes us different <i class="bi bi-arrow-right"/>
              </LinkAnchor>
            </div>
          </SandboxCard>
        </div>
      </div>
    </>
  )
}

export default TextPlaygroundPage
