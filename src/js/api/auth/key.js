
export function save(key,value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export async function load(key) {
    try {
        const value = localStorage.getItem(key);
        return JSON.parse(value);

    } catch {
        return null;
    }
}

export function remove(key) {
    localStorage.removeItem(key);
}