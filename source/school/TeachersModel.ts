import { TeachersInterface } from "./interfaces/TeachersInterface";
export class TeachersModel {
    private teachers: Map<string, TeachersInterface>
    readonly id: string;
    constructor() {
        this.teachers = new Map();
        this.id = Symbol().toString();
    }
    async add(teacher: TeachersInterface) {
        this.teachers.set(this.id, teacher);
        return this.id
    }
    async read(id: string) {
        return { id, ...this.teachers.get(id) };
    }
    async update(id:  string, teacher: TeachersInterface) {
        return this.teachers.set(id, teacher);
    }
    async remove(id: string) {
        this.teachers.delete(id);
    }
}