/* ---------------------------------------------------------------------
   STORAGE: localStorage del browser (pagina eseguita fuori da Claude,
   quindi qui localStorage è quello giusto, non un sostituto di ripiego)
--------------------------------------------------------------------- */
export const INDEX_KEY = "daggerheart:index";
export const LAST_OPENED_KEY = "daggerheart:last-opened";
export const charKey = (id: string) => `daggerheart:char:${id}`;

export function storageGet(key: string): { key: string; value: string } | null {
  const v = localStorage.getItem(key);
  return v === null ? null : { key, value: v };
}
export function storageSet(key: string, value: string): { key: string; value: string } | null {
  try {
    localStorage.setItem(key, value);
    return { key, value };
  } catch {
    return null;
  }
}
export function storageDelete(key: string): { key: string; deleted: true } {
  localStorage.removeItem(key);
  return { key, deleted: true };
}
// Clone via JSON invece di structuredClone: quest'ultima manca o è
// inaffidabile in alcuni browser/webview meno recenti.
export const deepClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));
