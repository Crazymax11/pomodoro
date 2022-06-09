import React, { useEffect, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { NewTimer } from './NewTimer';

export default {
	title: 'PomodoroTimer/NewTimer',
	component: NewTimer,
} as ComponentMeta<typeof NewTimer>;

const Template: ComponentStory<typeof NewTimer> = (args) => <NewTimer {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	length: 25000,
	el: 15000
};

export const running = () => {
	const [current, setCurrent] = useState(25000)
	useEffect(() => {
		setInterval(() => setCurrent(v => v > 0 ? v - 1000 : 0), 1000)
	}, [])
	return <NewTimer length={25000} el={25000 - current} />
}