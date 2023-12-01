import type { JSX } from 'solid-js/jsx-runtime';
import { css } from 'solid-styled';
import { neutralSwatch } from './colorSwatch';

const Heading = (props: JSX.SelectHTMLAttributes<HTMLHeadingElement & {
	size?: 1 | 2 | 3 | 4 | 5 | 6
}>) => {
	const headerColor = () => neutralSwatch(9);

	const textSize = () => {
		return props.size
			? props.size === 1
				? '4xl'
				: props.size === 2
					? '3xl'
					: props.size === 3
						? '2xl'
						: props.size === 4
							? 'xl'
							: props.size === 5
								? 'lg'
								: props.size === 6 ? 'base' : 'base'
			: 'base';
	};

	css`
    .heading{
      color: ${headerColor()};
    }
  `;

	return (
		<p class={`text-${textSize()} heading font-bold ${props.class}`} {...props}>
			{props.children}
		</p>
	);
};

export default Heading;
