import {makeAutoObservable} from "mobx";


export default class SortStore {


    constructor() {
        this._sorts = [
            {
                title: 'По убыванию названия',
                value: 'TITLE_DOWN'
            },
            {
                title: 'По возрастанию названия',
                value: 'TITLE_UP'
            },
            {
                title: 'По убыванию количества',
                value: 'AMOUNT_DOWN'
            },
            {
                title: 'По возрастанию количества',
                value: 'AMOUNT_UP'
            },
            {
                title: 'По убыванию расстояния',
                value: 'DISTANCE_DOWN'
            },
            {
                title: 'По возрастанию расстояния',
                value: 'DISTANCE_UP'
            },
            {
                title: 'Без сортировки',
                value: 'DEFAULT'
            }
        ]
        this._selectedSort = 'DEFAULT'
        makeAutoObservable(this)
    }

    setSelectedSort(string) {
        this._selectedSort = string
    }

    get selectedSort() {
        return this._selectedSort
    }

    get sorts() {
        return this._sorts
    }

}