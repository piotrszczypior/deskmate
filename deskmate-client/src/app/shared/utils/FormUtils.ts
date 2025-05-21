export const compareById = <T extends { id: number | string }>(
    a: T | undefined,
    b: T | undefined): boolean => a?.id === b?.id;