import type { ParentComponent } from 'solid-js';
import { splitProps } from 'solid-js';
import toast from 'solid-toast';
import ColorIdentifier from '../../assets/components/colorIdentifier.styled';

type IToastProps = ParentComponent< & {
	toast?: any
	color?: 'warning' | 'error' | 'info'
	showExit?: boolean
	box?: string
}
>;

const Toast: IToastProps = (props) => {
	const [local, others] = splitProps(props, ['children', 'toast', 'color', 'showExit', 'box']);

	// TODO: Implement default toast colors
	// eslint-disable-next-line unused-imports/no-unused-vars
	const toastColor = () => {
		switch (props.color) {
			case 'warning':
				return '#674d0f';
			case 'error':
				return '#5d000a';
			case 'info':
				return '#040e1f';
		}
		return 'black';
	};

	return (
		<div
			{...others}
			class="flex p-2 pb-1.5 gap-2 bg-neutral-50 border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-black/40 hover:shadow-lg rounded-md shadow-md"
		>
			{local.box
			&& <ColorIdentifier class="h-5 w-5 rounded-md" color={props.box} />}
			<div class="flex flex-row text-sm text-slate-700 dark:text-neutral-300">
				{props.children}
				<p class="font-mono font-semibold pl-1">
					{props.box}
				</p>
			</div>
			{local.showExit
			&& <a class="cursor-pointer -mt-0.5" onClick={() => toast.dismiss(props.toast.id)}><i class="bi bi-x text-slate-600 dark:text-neutral-400"></i></a>}
		</div>
	);
};

export const copy = (color: string) => {
	navigator.clipboard.writeText(color).then(() => {
		/* clipboard successfully set */
		toast.custom(t => (
			<Toast box={color} showExit={true} toast={t}>
				Pallette Copied!
			</Toast>
		), {
			unmountDelay: 0,
		});
	}, () => {
		/* clipboard write failed */
		toast.custom(t => (
			<Toast color="error" showExit={true} toast={t}>
				Copying Failed!
			</Toast>
		));
	});
};

export default Toast;
