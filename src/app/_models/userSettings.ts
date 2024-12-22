import { Language } from "./languages";

export type UserSettings = {
    internalization: string;
    darkTheme: boolean;
    programmingLanguage: Language;
}