import { v4 as uuidv4 } from "uuid";

export function getId(): string {
	return uuidv4();
}
