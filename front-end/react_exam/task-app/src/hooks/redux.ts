import { useDispatch } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { RootState } from "../store";

export const useTypedSelector : TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch = () => useDispatch<AppDispatch>();
