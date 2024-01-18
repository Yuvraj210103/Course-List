import CourseList from "@/components/home/CourseList";
import SearchBar from "@/components/home/SearchBar";
import { ICourse } from "@/enum/database";
import DbCourse from "@/firebase_config/DB/DbCourse";
import { useEffect, useState } from "react";

export default function Home() {
  const onSubmit = async () => {
    try {
      console.log("submitting");

      await DbCourse.addDummyCourse();

      console.log("submitted successfully");
    } catch (error) {
      console.log(error, "error");
    }
  };

  const [searchQuery, setSearchQuery] = useState("");

  const [courseList, setCourseList] = useState<ICourse[]>([]);

  useEffect(() => {
    DbCourse.getAllCourses(searchQuery)
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data() as ICourse);
        console.log("running");
        if (data) {
          setCourseList(data);
        }
      })
      .catch((error: any) => {
        console.log(error, "error");
      });
  }, [searchQuery]);

  return (
    <div className="flex flex-col w-full h-full px-4 md:px-24 items-center justify-center gap-10 pb-12">
      <SearchBar value={searchQuery} setValue={setSearchQuery} />
      <CourseList course={courseList} />
    </div>
  );
}
