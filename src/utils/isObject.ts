export function isObject<T>(data: any, props: Array<keyof T>): data is T {
	for (let prop of props) {
		if (!data.hasOwnProperty(prop)) return false;
	}
	return true;
}
