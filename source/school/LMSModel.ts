import { subjects } from "./SubjectsModel";

export class LMSModel {
    private subjects: Set<string>
    readonly id: string
    constructor() {
        this.subjects = new Set();
    }

    async add(id: string) {
        this.subjects.add(id);
    }

    async remove(id: string) {
        this.subjects.delete(id);
    }

    async verify(id: string) {
        return this.subjects.has(id);
    }

    async read(id: string) {
        return subjects.get(id);
    }

    async readAll() {
        return this.subjects.values();
    }

}