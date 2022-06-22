import React, { ReactNode, useEffect, useRef } from "react"
import { Pause } from "../../../../shared/Icons/Pause";
import { Play } from "../../../../shared/Icons/Play";
import { Stop } from "../../../../shared/Icons/Stop";
import { formatToReadableTime } from "../../../../utils";
import styles from './NewTimer.module.css'
type Props = {
	length: number;
	el: number;
	state: 'active' | 'paused',
	type: 'pomodoro' | 'relax',
	onPause: () => any;
	onResume: () => any;
	onStop: () => any;
}
/**
 * Just dirt prototype
 * @param props 
 * @returns 
 */
export const NewTimer = (props: Props) => {
	const finalOffset = 440;
	const current = props.el / props.length * finalOffset;

	const cirlceEl = useRef<SVGCircleElement | null>(null)

	useEffect(() => {


		setTimeout(() => {
			if (!cirlceEl.current) {
				return;
			}
			cirlceEl.current.classList.add(styles.circleAnimation)
		}, 1000)

		if (!cirlceEl.current) {
			return;
		}
		cirlceEl.current.setAttribute('stroke-dashoffset', '' + 440)
	}, [])

	useEffect(() => {
		if (!cirlceEl.current) {
			return;
		}
		cirlceEl.current.setAttribute('stroke-dashoffset', '' + current)
		// cirlceEl.current.strokeDashoffset = current;
	}, [props.el])

	const show = formatToReadableTime(props.length - props.el)


	// pomodoro = === d75952
	const color = props.type === 'pomodoro' ? 'tomato' : 'green'
	return <div className={styles.wrapper}>
		<svg
			className={styles.circle}
			width="640" height="640" xmlns="http://www.w3.org/2000/svg"

			viewBox="0 0 160 160"
		>
			<circle r="69.85699" cy="81" cx="81" strokeWidth="8" stroke="#515256" fill="none" />
			<circle ref={el => { cirlceEl.current = el }} r="69.85699" cy="81" cx="81" strokeWidth="8" stroke={color} fill="none" strokeDashoffset={440} strokeDasharray={440} />
		</svg>
		<div className={styles.timeWrapper}>


			<div style={{ display: 'block' }}>{show}</div>

		</div>
		<div className={styles.buttons}>
			{props.state === 'paused' &&
				<div className={styles.iconButton} onClick={props.onResume}><Play size={80} color={color} /></div>}
			{props.state === 'active' && <div className={styles.iconButton} onClick={props.onPause}><Pause size={80} color={color} /></div>}
			<div className={styles.iconButton} onClick={props.onStop}><Stop size={80} color={color} /></div>
		</div>
	</div>
}