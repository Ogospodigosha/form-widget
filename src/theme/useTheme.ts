import {LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext} from "./ThemeContext";
import {useContext} from "react";

interface useThemeResult {
    toggleTheme: ()=>void
    theme: Theme
}

export function useTheme () {
    const {theme, setTheme} = useContext(ThemeContext)
    return {theme}
}
