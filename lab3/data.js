export const users = [];
let nextUserId = 1;

export function getNextUserId() { // Повертає новий унікальний id користувача
    const id = String(nextUserId);
    nextUserId += 1;
    return id;
}