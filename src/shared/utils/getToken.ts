export const getToken = (authorization: string) => authorization?.replace('Bearer', '').trim()