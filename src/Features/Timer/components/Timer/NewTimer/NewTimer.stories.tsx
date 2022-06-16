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
	el: 15000,
	state: "active",
	type: 'pomodoro'
};

export const running = () => {
	const [current, setCurrent] = useState(25000)
	useEffect(() => {
		setInterval(() => setCurrent(v => v > 0 ? v - 1000 : 0), 1000)
	}, [])
	return <NewTimer state="active" length={25000} el={25000 - current} type='pomodoro' />
}

export const Paused = Template.bind({});
Paused.args = {
	length: 25000,
	el: 15000,
	state: "paused",
	type: 'pomodoro'
};

export const Rest = Template.bind({});
Rest.args = {
	length: 25000,
	el: 15000,
	state: "paused",
	type: 'relax'
};