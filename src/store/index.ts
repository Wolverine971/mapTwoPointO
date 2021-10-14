import { createStore } from "vuex";
import api from "../../api"
export interface AppState {
  toDos: any[];
  lastReqTime: number | null;
  currentGeo: any;
  newGeoNum: any;
  newMultiGeoNum: any;
  newMultiGeo: any;
}

export const state: AppState = {
  toDos: [],
  lastReqTime: null,
  currentGeo: null,
  newGeoNum: null,
  newMultiGeoNum: null,
  newMultiGeo: null,
};
export const getters = {
  toDos: (state: AppState) => {
    return state.toDos;
  },
  currentGeo: (state: AppState) => {
    return state.currentGeo;
  },
  newGeoNum: (state: AppState) => {
    return state.currentGeo;
  },
  newMultiGeo: (state: AppState) => {
    return state.newMultiGeo;
  },
};
export const actions: any = {
  setTime(state: AppState) {
    if (!state.lastReqTime) {
      state.lastReqTime = Date.now();
      return;
    }
    if (state.lastReqTime && state.lastReqTime + 3600000 >= Date.now()) {
      api.getCreds();
      state.lastReqTime = Date.now();
    } else {
      console.log("within time for archGis");
    }
  },
  goToGeo(state: AppState) {},
};
export const mutations: any = {
  addToDo(state: AppState, item: any) {
    state.toDos.push(item);
  },
  removeToDo(state: AppState, itemToRemove: any) {
    state.toDos = state.toDos.filter((item) => {
      if (
        item.name !== itemToRemove.name &&
        item.category !== itemToRemove.category
      ) {
        return item;
      }
    });
  },
  removeAllTodos(state: AppState) {
    state.toDos = [];
  },
  checkTodos(state: AppState, item: any) {
    state.toDos.forEach((todos) => {
      // if(todos == undefined){
      //     return
      // }
      // else
      if (todos.name == item.name && todos.category == item.category) {
        todos.done = !item.done;
      }
    });
  },
  setGeoForMap(state: AppState, geo: any[][]) {
    state.newGeoNum = Math.random();
    state.currentGeo = geo;
  },
  setMultipleGeoForMap(state: AppState, geos: any[][]) {
    console.log('store set multigeo')
    state.newMultiGeoNum = Math.random();
    state.newMultiGeo = geos;
  },
};
// modules: {};

export default createStore({
  state,
  mutations,
  getters,
  actions,
});
