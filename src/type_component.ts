export type TJsonValue = string | number | boolean | null | undefined | TJsonValue[] | { [key: string]: TJsonValue };

export type TJsonObject = { [key: string]: TJsonValue };
