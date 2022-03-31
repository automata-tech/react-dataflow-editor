import React, { useCallback, useContext, useMemo } from "react"

import { select } from "d3-selection"
import { DragBehavior } from "d3-drag"

import type { Focus, GetInputs, Kinds, Node, Schema } from "./state.js"

import { InputDragSubject } from "./inputDrag.js"

import { CanvasContext } from "./context.js"

import {
	getInputIndex,
	getPortOffsetY,
	nodeMarginX,
	portRadius,
	toTranslate,
	fontSize
} from "./utils.js"

export interface GraphInputProps<S extends Schema, K extends keyof S> {
	kinds: Kinds<S>
	focus: Focus | null
	node: Node<S, K>
	input: GetInputs<S, K>
	inputDrag?: DragBehavior<SVGCircleElement, unknown, InputDragSubject<S>>
}

export function GraphInput<S extends Schema, K extends keyof S>(
	props: GraphInputProps<S, K>
) {
	const { kinds, node, input, inputDrag, focus } = props
	const transform = useMemo(() => {
		const index = getInputIndex(kinds, node.kind, input)
		const offsetY = getPortOffsetY(index, kinds, node.kind)
		return toTranslate([0, offsetY])
	}, [])

	const context = useContext(CanvasContext)
	const { backgroundColor } = context.options

	const ref = useCallback((circle: SVGCircleElement | null) => {
		if (circle !== null && inputDrag) {
			select(circle).call(inputDrag)
		}
	}, [])

	const value: string | null = node.inputs[input]
	const handleClick = useCallback(
		(event: React.MouseEvent<SVGCircleElement>) => {
			event.stopPropagation()
			if (value !== null) {
				context.onFocus({ element: "edge", id: value })
			}
		},
		[value]
	)

	const isFocused =
		focus !== null &&
		focus.element === "edge" &&
		focus.id === value

	return (
		<g
			className={isFocused ? "input focus" : "input"}
			data-id={node.id}
			data-input={input}
			data-value={value}
			transform={transform}
			strokeWidth={isFocused ? 3 : undefined}
		>
			<text
				stroke="none"
				x={portRadius + nodeMarginX}
				dominantBaseline="middle"
				fontSize={fontSize}
			>
				{kinds[node.kind].inputs[input].label}
			</text>
			<circle
				ref={ref}
				className="port"
				cursor="grab"
				display={value === null ? "none" : "inherit"}
				fill={backgroundColor}
				r={portRadius}
				onClick={handleClick}
			/>
		</g>
	)
}
