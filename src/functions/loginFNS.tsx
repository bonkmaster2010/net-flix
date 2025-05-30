function isValidUsername(u: string) {
    return typeof u === "string" && /^[a-zA-Z0-9_]{3,20}$/.test(u);
}
function isValidPassword(p: string) {
    return typeof p === "string" && p.length >= 8;
}
function isValidEmail(e: string) {
    return typeof e === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

function submit(setLogin: any, u: any, p: any, e: any) {
    if (!isValidUsername(u)) {
        alert("Invalid username. Use 3–20 letters, numbers, or underscores.");
        return;
    }
    if (!isValidPassword(p)) {
        alert("Invalid password. It should be at least 8 characters long.");
        return;
    }
    if (!isValidEmail(e)) {
        alert("Invalid email format.");
        return;
    }
    setLogin(u, p, e);
}

export { submit };