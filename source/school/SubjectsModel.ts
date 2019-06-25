import { SubjectsInterface } from "./interfaces/SubjectsInterface";
export class SubjectsModel {
    private subjects: Map<string, SubjectsInterface>
    readonly id: string
    constructor(subject: SubjectsInterface) {
        this.id = Symbol().toString();
        this.subjects.set(this.id, subject);
    }
}
export const subjects = new Map();