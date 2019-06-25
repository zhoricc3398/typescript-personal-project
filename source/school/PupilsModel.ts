import { PupilsInterface } from "./interfaces/PupilsInterface";
export class PupilsModel {
  private pupils: Map<string, PupilsInterface>
  readonly id: string
  constructor() {
    this.pupils = new Map();
    this.id = Symbol().toString();
  }
  async add(pupil: PupilsInterface) {
    this.pupils.set(this.id, pupil);
    return this.id
  }
  async read(id: string) {
    return { id, ...this.pupils.get(id) };
  }
  async update(id: string, pupil: PupilsInterface) {
    return this.pupils.set(id, pupil);
  }
  async remove(id: string) {
    this.pupils.delete(id);
  }
}