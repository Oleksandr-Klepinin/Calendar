import { makeAutoObservable } from "mobx";

class FiltersStore {
    text: string = '';
    labels: string[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    getFilterLabels() {
        return this.labels;
    }

    setFilterLabels(filters: string[]) {
        this.labels = filters;
    }

    setText(text: string) {
        this.text = text;
    }

    getText() {
        return this.text;
    }

    clearFilters() {
        this.text = '';
        this.labels = [];
    }

    toggleFilterLabel(color: string) {
        const newLabels = this.labels.includes(color) ? this.labels.filter(label => label !== color) : [...this.labels, color]

        this.setFilterLabels(newLabels);
    }
}

export const filtersStore = new FiltersStore();