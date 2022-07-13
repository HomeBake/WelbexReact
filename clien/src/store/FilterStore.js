import {makeAutoObservable} from "mobx";

const conditionDict = {
    TITLE: ['LIKE', 'EQUAL'],
    DISTANCE: ['EQUAL', 'MORE', 'LESS'],
    DATE: ['EQUAL', 'MORE', 'LESS'],
    AMOUNT: ['EQUAL', 'MORE', 'LESS']
}

const filterCon = ['TITLE','DISTANCE', 'DATE', 'AMOUNT']


export default class FilterStore {

    constructor() {
        this._filterCol = filterCon
        this._selectedFilterCol = ''
        this._filterCondition = ['EQUAL', 'MORE', 'LESS', 'LIKE']
        this._selectedFilterCondition = ''
        this._filterValue = ''
        makeAutoObservable(this)
    }

    get selectedFilterCondition() {
        return this._selectedFilterCondition;
    }

    get filterCondition() {
        return this._filterCondition;
    }
    get selectedFilterCol() {
        return this._selectedFilterCol;
    }

    get filterCol() {
        return this._filterCol;
    }

    get filterValue() {
        return this._filterValue;
    }

    setFilterCol(array) {
        this._filterCol = array;
    }

    setFilterCondition(array) {
        this._filterCondition = array;
    }

    setSelectedFilterCol(string) {
        this.setSelectedFilterCondition('')
        this.setFilterCondition(conditionDict[string])
        this._selectedFilterCol = string;
    }

    setSelectedFilterCondition(string) {
        this._selectedFilterCondition = string;
    }

    setFilterValue(string) {
        this._filterValue = string;
    }

}