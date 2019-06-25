import {
    SubjectsModel,
    LMSModel,
    TeachersModel,
    PupilsModel,
    GroupsModel,
    GradebooksModel
} from './school/index';

const teacherData = {
    name: {
        first: 'Nodar',
        last: 'Momecelidze'
    },
    image: 'image',
    dateOfBirth: '10/10/1934',
    emails: [
        {
            email: 'nmomcelidze@ibsu.edu.ge',
            primary: true
        }
    ],
    phones: [
        {
            phone: '593515651',
            primary: true
        }
    ],
    sex: 'male',
    subjects: [
        {
            subject: 'Alghorithms'
        }
    ],
    description: 'very good'
};

const pupilData = {
    name: {
        first: 'stazhik',
        last: 'tchkhondidelidze'
    },
    image: 'image',
    dateOfBirth: '10/10/1993',
    phones: [
        {
            phone: '593131231',
            primary: true
        }
    ],
    sex: 'male',
    subjects: [
        {
            subject: 'Obojedima'
        }
    ],
    description: 'very good'
};

    (async () => {
        const history = new SubjectsModel({
            title: 'History', lessons: 24, description: '123'
        });
        const biology = new SubjectsModel({
            title: 'Biology', lessons: 25, description: '125'
        });

        const LMS = new LMSModel();
        // await LMS.add(history);
        // await LMS.add(biology);

        const teacher = new TeachersModel();
        const teacherID = await teacher.add(teacherData);

        const pupil = new PupilsModel();
        const pupulId = await pupil.add(pupilData);

        const pupulId2 = await pupil.add(pupilData);

        const group = new GroupsModel(pupil);
        const groupID = await group.add(236);
        await group.addPupil(groupID, pupulId);

        const level = 1;
        const grade = await new GradebooksModel(group, teacher, LMS);
        const gradebook = await grade.add(level, groupID);

        const record = { pupilId: pupulId, teacherId: teacherID, subjectId: history, lesson: 1, mark: 9 };
        const record2 = { pupilId: pupulId, teacherId: teacherID, subjectId: biology, lesson: 2, mark: 5 };
        const record3 = { pupilId: pupulId2, teacherId: teacherID, subjectId: biology, lesson: 2, mark: 5 };
        await grade.addRecord(gradebook, record);
        await grade.addRecord(gradebook, record2);
        await grade.addRecord(gradebook, record3);

        const oliver = await grade.read(gradebook, pupulId);
        const all = await grade.readAll(gradebook);
        console.log(all);
    })()