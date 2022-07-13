import {makeAutoObservable} from "mobx";


export default class TableStore {


    constructor() {
        this._rows = []
        this._page = 1
        this._limit = 9
        this._isDeleted = 0
        makeAutoObservable(this)
    }

    get rows() {
        return this._rows;
    }

    setRows(array) {
        this._rows = array;
    }

    get page() {
        return this._page;
    }

    setPage(int) {
        this._page = int;
    }

    get limit() {
        return this._limit;
    }

    setLimit(int) {
        this._limit = int;
    }

    get isDeleted() {
        return this._isDeleted;
    }

    setIsDeleted(value) {
        this._isDeleted = value;
    }
}