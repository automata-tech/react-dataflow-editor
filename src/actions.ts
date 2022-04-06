import { customAlphabet } from "nanoid"
import type { Focus, Position, Schema, Source, Target, GetParams } from "./state.js"

export type EditorAction<S extends Schema> =
	| CreateNodeAction
	| MoveNodeAction
	| ModifyParamAction
	| DeleteNodeAction
	| CreateEdgeAction<S>
	| MoveEdgeAction<S>
	| DeleteEdgeAction
	| FocusAction
	| UpdateNodeAction

export type CreateNodeAction = {
	type: "node/create"
	id: string
	archetype: string
	position: Position
	action: string
}

const nanoid = customAlphabet('1234567890abcdef', 10)

export const createNode = (
	archetype: string,
	position: Position,
	action: string
): CreateNodeAction => ({
	type: "node/create",
	id: `${archetype}_${nanoid()}`,
	archetype,
	position,
	action
})

export type ModifyParamAction = {
	type: "node/param"
	id: string
	param: GetParams<Schema>
	value: string
}

export const modifyParam = <S extends Schema, K extends keyof S>(id: string, param: GetParams<S, K>, value: string): ModifyParamAction => ({
	type: "node/param",
	id,
	param,
	value
})

export type MoveNodeAction = {
	type: "node/move"
	id: string
	position: Position
}

export const moveNode = (id: string, position: Position): MoveNodeAction => ({
	type: "node/move",
	id,
	position,
})

export type DeleteNodeAction = { type: "node/delete"; id: string }

export const deleteNode = (id: string): DeleteNodeAction => ({
	type: "node/delete",
	id,
})

export type CreateEdgeAction<S extends Schema> = {
	type: "edge/create"
	id: string
	source: Source<S>
	target: Target<S>
}

export const createEdge = <S extends Schema>(
	source: Source<S>,
	target: Target<S>
): CreateEdgeAction<S> => ({
	type: "edge/create",
	id: nanoid(),
	source,
	target,
})

export type MoveEdgeAction<S extends Schema> = {
	type: "edge/move"
	id: string
	target: Target<S>
}

export const moveEdge = <S extends Schema>(
	id: string,
	target: Target<S>
): MoveEdgeAction<S> => ({
	type: "edge/move",
	id,
	target,
})

export type DeleteEdgeAction = { type: "edge/delete"; id: string }

export const deleteEdge = (id: string): DeleteEdgeAction => ({
	type: "edge/delete",
	id,
})

export type FocusAction = {
	type: "focus"
	subject: Focus | null
}

export const focus = (subject: Focus | null): FocusAction => ({
	type: "focus",
	subject,
})

export type UpdateNodeAction = {
	type: "node/update"
	id: string
	action: string
}

export const updateNode = (id: string, action: string): UpdateNodeAction => ({
	type: "node/update",
	id,
	action
})