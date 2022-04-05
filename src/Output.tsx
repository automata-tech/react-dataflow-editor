import React, { useCallback, useContext, useMemo } from "react"
import { select } from "d3-selection"
import { DragBehavior } from "d3-drag"

import type { Schema, GetOutputs, Focus, Kinds, Node } from "./state.js"

import {
	getOutputIndex,
	getPortOffsetY,
	nodeMarginX,
	portRadius,
	toTranslate,
	fontSize
} from "./utils.js"
import { OutputDragSubject } from "./outputDrag.js"
import { CanvasContext } from "./context.js"

export interface GraphOutputProps<S extends Schema, K extends keyof S> {
	kinds: Kinds<S>
	focus: Focus | null
	node: Node<S, K>
	output: GetOutputs<S, K>
	label: string
	outputDrag?: DragBehavior<SVGCircleElement, unknown, OutputDragSubject<S>>
}

export function GraphOutput<S extends Schema, K extends keyof S>(
	props: GraphOutputProps<S, K>
) {
	const { kinds, node, output, outputDrag, focus, label} = props
	const transform = useMemo(() => {
		const index = getOutputIndex(kinds, node.kind, output)
		const offsetY = getPortOffsetY(index, kinds, node.kind)
		return toTranslate([0, offsetY])
	}, [])

	const context = useContext(CanvasContext)
	const { backgroundColor } = context.options

	const ref = useCallback((circle: SVGCircleElement | null) => {
		if (circle !== null && outputDrag) {
			select(circle).call(outputDrag)
		}
	}, [])

	const values: string[] = node.outputs[output]
	const isFocused =
		focus !== null &&
		focus.element === "edge" &&
		values.includes(focus.id)

	return (
		<g
			className={isFocused ? "output focus" : "output"}
			data-id={node.id}
			data-output={output}
			transform={transform}
			strokeWidth={isFocused ? 3 : undefined}
		>
			<text
				textAnchor="end"
				stroke="none"
				x={-portRadius - nodeMarginX}
				dominantBaseline="middle"
				fontSize={fontSize}
			>
				{label}
			</text>
			<circle
				ref={ref}
				className="port"
				cursor="grab"
				fill={backgroundColor}
				r={portRadius}
			/>
		</g>
	)
}
