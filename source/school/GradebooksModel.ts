import { TeachersInterface } from "./interfaces/TeachersInterface";
import { GroupsInterface } from "./interfaces/GroupsInterface";
import { Records } from "./interfaces/Records";
import { PupilsInterface } from "./interfaces/PupilsInterface";

export class GradebooksModel {
    private gradeBook: Map<string, object>;
    groups: any
    teachers: any
    LMS: any
    id: string
    constructor(groups: GroupsInterface, teachers: TeachersInterface, LMS: object) {
        this.gradeBook = new Map()
        this.groups = groups;
        this.teachers = teachers;
        this.LMS = LMS;
    }

    async add(level: number, groupID: string) {
        const id = Symbol().toString();
        this.gradeBook.set( id, { level, groupID, records: [] });
        return id;
    }

    async clear() {
        return this.gradeBook.clear();
    }

    async addRecord(id: string, record: Records) {
        this.gradeBook.get(id).records.push( record );
    }

    async read(id: string, pupil: PupilsInterface) {
        const records = this.gradeBook.get(id).records.filter(record => record.pupilId === pupil);
        const { name: { first, last } } = await this.groups.pupil.read(records[0].pupilId);
        const result = { name: `${first} ${last}`, records};

        for (const { teacherId, subjectId, lesson, mark } of records) {
            const { name: { first, last } } = await this.teachers.read(teacherId);
            const { title: subject } = await this.LMS.read(subjectId.id);
            result.records.push({ teacher: `${first} ${last}`, subject, lesson, mark });
        }

        return result;
    }

    async readAll(id: string){
        const records = this.gradeBook.get(id).records;
        const result = new Map();

        for (const { pupilId, teacherId, subjectId, lesson, mark } of records) {
            
            if (!result.has(pupilId)) {
                const { name: { first, last } } = await this.groups.pupil.read(records[0].pupilId);
                result.set(pupilId, { name: `${first} ${last}`, records: [] });
            }

            const { name: { first, last } } = await this.teachers.read(teacherId);
            const { title: subject } = await this.LMS.read(subjectId.id);
            result.get(pupilId).records.push({ teacher: `${first} ${last}`, subject, lesson, mark });        
        
        }

        return Array.from(result.values());
    }

}