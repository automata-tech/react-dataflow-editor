import React, { useCallback, useContext, useMemo } from "react"
import { select } from "d3-selection"
import { DragBehavior } from "d3-drag"

import type { Focus, Kinds, Node, Schema, GetInputs, GetParams, GetOutputs} from "./state.js"
import {
	imageMargin,
	imageWidth,
	imageHeight,
	makeClipPath,
	nodeHeaderHeight,
	nodeMarginX,
	getNodeWidth,
	place,
	toTranslate,
	dropDownHeight,
	dropDownMarginY,
	dropDownMarginX,
	dropDownWidth
} from "./utils.js"
import { CanvasContext } from "./context.js"

import { GraphInput } from "./Input.js"
import { GraphParam } from "./Param.js"
import { GraphOutput } from "./Output.js"
import { InputDragSubject } from "./inputDrag.js"
import { ParamUpdateBehaviour } from "./paramUpdate"
import { OutputDragSubject } from "./outputDrag.js"
import { NodeDragSubject } from "./nodeDrag.js"
import { NodeUpdateBehaviour } from "./nodeUpdate.js"

export interface GraphNodeProps<S extends Schema> {
	kinds: Kinds<S>
	focus: Focus | null
	node: Node<S>
	nodeDrag?: DragBehavior<SVGGElement, undefined, NodeDragSubject>
	inputDrag?: DragBehavior<SVGCircleElement, unknown, InputDragSubject<S>>
	outputDrag?: DragBehavior<SVGCircleElement, unknown, OutputDragSubject<S>>
	paramUpdate?: ParamUpdateBehaviour
	actionDropDown?: NodeUpdateBehaviour
	children?: React.ReactNode
}

export function GraphNode<S extends Schema>(props: GraphNodeProps<S>) {
	const { group, backgroundColor, inputs, outputs, img, params } = props.kinds[
		props.node.kind
	]
	const allKindsFromOneGroup = Object.keys(props.kinds).filter(k => props.kinds[k].group.archetype === group.archetype)

	const clipPath = useMemo(() => makeClipPath(props.kinds, props.node.kind), [])
	const nodeWidth = useMemo(()=>(getNodeWidth(props.kinds, props.node.kind)), [])

	const context = useContext(CanvasContext)

	const ref = useCallback((g: SVGGElement | null) => {
		if (g !== null && props.nodeDrag) {
			select<SVGGElement, undefined>(g).call(props.nodeDrag)
		}
	}, [])

	const handleClick = useCallback((event: React.MouseEvent<SVGGElement>) => {
		context.onFocus({ element: "node", id: props.node.id })
	}, [])

	const onSelectChange = (event: any) => {
		if (props.actionDropDown && props.node.id) {
			props.actionDropDown(props.node, event.target.value)
		}
	  };

	const transform = toTranslate(place(context, props.node.position))
	const outputTransform = toTranslate([nodeWidth, 0])

	const isFocused =
		props.focus !== null &&
		props.focus.element === "node" &&
		props.focus.id === props.node.id

	const { borderColor } = context.options

	return (
		<g
			ref={ref}
			className={isFocused ? "node focus" : "node"}
			data-id={props.node.id}
			data-kind={props.node.kind}
			data-position-x={props.node.position.x}
			data-position-y={props.node.position.y}
			stroke={borderColor}
			strokeWidth={isFocused ? 3 : 1}
			transform={transform}
			cursor="grab"
			onClick={handleClick}
		>
			<path fill={backgroundColor} d={clipPath} />
			<text stroke="none" x={8} y={18}>
				{group.archetype}
			</text>
			<image x={nodeWidth/2 - imageWidth/2} y={nodeHeaderHeight+imageMargin} height={imageHeight} width={imageWidth} href={img}></image>
			{	
				allKindsFromOneGroup.length > 1 &&
				<foreignObject x={dropDownMarginX} y={nodeHeaderHeight + dropDownMarginY} width={dropDownWidth} height={dropDownHeight}>
					<select onChange={(event)=>onSelectChange(event)} value={group.action} style={{width: dropDownWidth}}>
						{allKindsFromOneGroup.map(a => <option key={a} >{props.kinds[a].group.action}</option>)}
					</select>
				</foreignObject>
			}
			{props.children}
			<line
				stroke={borderColor}
				strokeWidth={1}
				x1={nodeMarginX}
				y1={nodeHeaderHeight}
				x2={nodeWidth - nodeMarginX}
				y2={nodeHeaderHeight}
			/>
			<g className="inputs">
				{Object.keys(inputs).map((input: GetInputs<S, keyof S>) => (
					<GraphInput<S, keyof S>
						key={input}
						kinds={props.kinds}
						focus={props.focus}
						node={props.node}
						label={inputs[input].label}
						input={input}
						inputDrag={props.inputDrag}
					/>
				))}
			</g>
			<g className="params">
				{Object.keys(params).map((param: GetParams<S, keyof S>) => (
					<GraphParam<S, keyof S>
						key={param}
						kinds={props.kinds}
						node={props.node}
						param={param}
						label={params[param].label}
						paramUpdate={props.paramUpdate}
					/>
				))}
			</g>
			<g className="outputs" transform={outputTransform}>
				{Object.keys(outputs).map((output: GetOutputs<S, keyof S>) => (
					<GraphOutput<S, keyof S>
						key={output}
						kinds={props.kinds}
						focus={props.focus}
						node={props.node}
						output={output}
						label={outputs[output].label}
						outputDrag={props.outputDrag}
					/>
				))}
			</g>
		</g>
	)
}
