import type { Schema, Kinds, Node, GetParams } from "./state.js"

import { CanvasContext } from "./context.js"
import { modifyParam, EditorAction } from "./actions.js"

export type ParamUpdateBehaviour = <S extends Schema, K extends keyof S>(node: Node<S>, param: GetParams<S, K>, value: string) => void

export function makeParamUpdateBehavior<S extends Schema>(
	context: CanvasContext,
	kinds: Kinds<S>,
	dispatch: (action: EditorAction<S>) => void
): ParamUpdateBehaviour {
	return (node, param, value) => {
        dispatch(modifyParam(node.id, param, value))
    }
}
