import { GroupsInterface } from "./interfaces/GroupsInterface";

export class GroupsModel {
    private groups: Map<string, GroupsInterface>
    pupil: object
    constructor(pupil: object){
        this.groups = new Map();
        this.pupil = pupil;
    }

    error(id: string){
        if(!this.groups.has(id))
        throw new Error('User with such id doesnt exist');
    }

    noId(){
        throw new Error('Such id doesn\'t exist');
    }

    async add(room: number){
        const id = Symbol().toString();
        this.groups.set(id, { room, pupils: new Set() });
        return id;
    }

    async read(id: string){
        this.error(id);
        return { id, ...this.groups.get(id) };
    }

    async remove(id: string){
        this.error(id);
        this.groups.delete(id);
    }

    async update(id: string, room: GroupsInterface){
        this.error(id);
        this.groups.set(id, room);
    }

    async readAll(){
        const result: any[] = [];
        this.groups.forEach(({...group}, id) => {
            group.pupils = Array.from(group.pupils);
            result.push({ id, ...group });
        });

        return result;
    }

    async addPupil(id: string, pupil: string){
        if(this.groups.has(id)) {
            this.groups.get(id).pupils.add(pupil);
        }
        else this.noId();
    }

    async removePupil(id: string, pupil: string){
        if(this.groups.has(id)) {
            this.groups.get(id).pupils.delete(pupil);
        }
        else this.noId();
    }
}