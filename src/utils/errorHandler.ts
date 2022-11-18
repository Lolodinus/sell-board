export function errorHandler(
	error: any,
	defaultMessage: string = "Something went wrong"
) {
	if (error instanceof Error) {
		return error.message;
	} else {
		return defaultMessage;
	}
}
