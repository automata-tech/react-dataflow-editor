export interface Options {
	borderColor: string
	backgroundColor: string
	unit: number
	height: number
	nodeWidth: number
	portRadius: number
	portMargin: number
	nodeMarginX: number
	nodeHeaderHeight: number
	canvasPaddingRight: number
	toolBoxImgWidth: number
}

export const defaultOptions: Options = {
	borderColor: "dimgray",
	backgroundColor: "lightgray",
	unit: 20,
	height: 100,
	nodeWidth: 156,
	portRadius: 12,
	portMargin: 12,
	nodeMarginX: 4,
	nodeHeaderHeight: 24,
	canvasPaddingRight: 480,
	toolBoxImgWidth: 50
}
