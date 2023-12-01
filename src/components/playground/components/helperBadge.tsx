import type { ParentComponent } from 'solid-js';
import { Show, createSignal } from 'solid-js';

export const [helper, setHelper] = createSignal(true);

type IHelperProps = ParentComponent< & {
	type?: 'default' | 'secondary' | 'primary'
	arrow?: boolean
	margin?: boolean
	active?: boolean
}
>;

const HelperBadge: IHelperProps = (props) => {
	if (helper() || props.active) {
		return (
			<>
				<div
					class="rounded bg-helper-transparent inline-block text-sm font-normal font-sans text-center
      text-helper-primary px-2 py-0.5 capitalize"
					classList={{ 'mx-4': props.margin }}
				>
					<Show when={props.arrow}>
						<i class="bi bi-arrow-left pr-1.5"></i>
					</Show>
					{props.children}
				</div>
			</>
		);
	}
};

export default HelperBadge;
