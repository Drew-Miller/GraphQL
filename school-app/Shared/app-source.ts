import { CollegeSource } from "./college-source";
import { College, Student } from "./dto";
import { StudentSource } from "./student-source";

export class AppSource {
  private collegeSource = new CollegeSource();
  private studentSource = new StudentSource();

  public getStudent(id: string): Student {
    return this.studentSource.getById(id);
  }

  public getStudents(): Student[] {
    return this.studentSource.get();
  }

  public getColleges(): College[] {
    return this.collegeSource.get();
  }
}