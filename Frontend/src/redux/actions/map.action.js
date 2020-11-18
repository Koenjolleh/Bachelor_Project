import { INITIAL_MAP } from '../action_types';


export const setInitMap = (map, view, baseLayer)  => {
    const inititalMap = {
        view: view,
        baseLayer: baseLayer,
        map: map
    }
    return { type: INITIAL_MAP, payload: inititalMap };
}