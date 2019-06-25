export interface PupilsInterface {
    name: {
      first: string,
      last: string
    },
    image: string,
    dateOfBirth: string, 
    phones:
      {
        phone: string,
        primary: boolean
      }[],
    sex: string,
    description ?: string
}