import { students, colleges } from './data';
import { College } from './dto';

export class CollegeSource {
  public get(): College[] {
    return colleges.list().map(college => {
      const res = {
        ...college,
        students: students
          .list()
          .filter(student => student.collegeId == college.id)
      };
      return res;
    });
  }
}