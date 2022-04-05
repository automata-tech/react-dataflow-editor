import type { Schema, Kinds, Node, GetParams } from "./state.js"

import { CanvasContext } from "./context.js"
import { EditorAction, updateNode } from "./actions.js"

export type NodeUpdateBehaviour = <S extends Schema>(node: Node<S>, action: string) => void

export function makenodeUpdateBehaviour<S extends Schema>(
	context: CanvasContext,
	kinds: Kinds<S>,
	dispatch: (action: EditorAction<S>) => void
): NodeUpdateBehaviour {
	return (node, action) => {
        dispatch(updateNode(node.id, action))
    }
}

