import React, { useEffect, useRef } from "react"
import { formatToReadableTime } from "../../../../utils";

type Props = {
	length: number;
	el: number;
}
/**
 * Just dirt prototype
 * @param props 
 * @returns 
 */
export const NewTimer = (props: Props) => {
	const finalOffset = 440;
	const current = props.el / props.length * finalOffset;

	const cirlceEl = useRef()

	useEffect(() => {
		cirlceEl.current = document.querySelector('.circle_animation').style;
		cirlceEl.current.strokeDashoffset = 0;

	}, [])

	useEffect(() => {
		cirlceEl.current.strokeDashoffset = current;
	}, [props.el])

	const show = formatToReadableTime(props.length - props.el)

	return <div style={{
		position: 'relative',


		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	}}>
		<style>
			{`.circle_animation {
				transition: all 1s linear;
			}`}
		</style>
		<svg
			style={{ transform: 'rotate(-90deg)' }}
			width="640" height="640" xmlns="http://www.w3.org/2000/svg"

			viewBox="0 0 160 160"
		>
			<circle id="circle2" r="69.85699" cy="81" cx="81" strokeWidth="8" stroke="#515256" fill="none" />
			<circle id="circle" className="circle_animation" r="69.85699" cy="81" cx="81" strokeWidth="8" stroke="#d75952" fill="none" strokeDashoffset={0} strokeDasharray={440} style={{ "transition": 'all 1s linear;' }} />
		</svg>
		<div style={{
			position: 'absolute',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			fontSize: '50px'
		}}>{show}</div>
	</div>
}