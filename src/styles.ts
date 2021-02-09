import React from "react"
import { Blocks, Node, Schema } from "./interfaces.js"

export const defaultBackgroundColor = "lightgray"
export const defaultBorderColor = "dimgray"

export const getBackgroundColor = <S extends Schema>(blocks: Blocks<S>) => ({
	kind,
}: Node<S>) => blocks[kind].backgroundColor || defaultBackgroundColor

export const defaultBlockHeaderStyle: React.CSSProperties = {
	paddingTop: 4,
	cursor: "move",
	userSelect: "none",
	WebkitUserSelect: "none",
	borderBottom: `1px solid ${defaultBorderColor}`,
}

export type getBlockStyle = <S extends Schema>(
	block: Blocks<S>[keyof S]
) => React.CSSProperties

interface StyleContext {
	getSVGStyle: (ctx: { unit: number }) => React.CSSProperties
	getBlockHeaderStyle: getBlockStyle
	getBlockContainerStyle: getBlockStyle
}

export const defaultStyleContext: StyleContext = {
	getSVGStyle: ({ unit }) => ({
		backgroundImage:
			"radial-gradient(circle, #000000 1px, rgba(0, 0, 0, 0) 1px)",
		backgroundSize: `${unit}px ${unit}px`,
		backgroundPositionX: `-${unit / 2}px`,
		backgroundPositionY: `-${unit / 2}px`,
	}),
	getBlockHeaderStyle: () => defaultBlockHeaderStyle,
	getBlockContainerStyle: (block) => ({
		margin: "1px 4px",
		backgroundColor: block.backgroundColor || defaultBackgroundColor,
	}),
}

export const StyleContext = React.createContext(defaultStyleContext)
