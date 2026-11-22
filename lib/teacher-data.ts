export type AttendanceStatus = "Присутствовал" | "Отсутствовал" | "Опоздал" | "Уважительная причина" | "Занятие отменено" | "";

export interface TeacherGroup {
  id: string;
  name: string;
  level: string;
  book: string;
  teacher: string;
  unit: string;
  topic: string;
  progress: number;
  completedTopics: number;
  totalTopics: number;
  lastLesson: string;
  nextLesson: string;
}

export interface TeacherStudent {
  id: string;
  groupId: string;
  name: string;
  initials: string;
  age: number;
  level: string;
  attendance: number;
  lastTest: number;
  homework: string;
  lastReview: string;
  parent: string;
  phone: string;
  startedAt: string;
}

export const teacherProfile = { id: "teacher-1", name: "Demo Teacher", period: "2025–2026", email: "demo-teacher@example.invalid", phone: "" };

export const teacherGroups: TeacherGroup[] = [
  { id: "kids-starter", name: "Kids Starter", level: "Starter", book: "Family and Friends 1", teacher: teacherProfile.name, unit: "Unit 3", topic: "My Family", progress: 62, completedTopics: 18, totalTopics: 29, lastLesson: "30 мая, 16:00", nextLesson: "2 июня, 16:00" },
  { id: "kids-a1", name: "Kids A1", level: "Beginner", book: "Academy Stars 1", teacher: teacherProfile.name, unit: "Unit 5", topic: "At the park", progress: 74, completedTopics: 26, totalTopics: 35, lastLesson: "30 мая, 18:00", nextLesson: "3 июня, 18:00" },
  { id: "teens-a2", name: "Teens A2", level: "Elementary", book: "Solutions A2", teacher: teacherProfile.name, unit: "Unit 4", topic: "Life online", progress: 51, completedTopics: 16, totalTopics: 31, lastLesson: "29 мая, 17:30", nextLesson: "2 июня, 17:30" },
];

const studentNames = [
  ["amina-serikova", "kids-starter", "Demo Student 01", "DS", 8, "Starter", 87, 82, "Проверено", "10 мая", "Demo Parent 01", "", "1 сентября 2024"],
  ["alan-musin", "kids-starter", "Demo Student 02", "DS", 8, "Starter", 93, 76, "Выполнено", "9 мая", "Demo Parent 02", "", "1 сентября 2024"],
  ["maria-li", "kids-starter", "Demo Student 03", "DS", 7, "Starter", 100, 90, "Проверено", "10 мая", "Demo Parent 03", "", "10 сентября 2024"],
  ["daniyar-omarov", "kids-starter", "Demo Student 04", "DS", 8, "Starter", 80, 68, "Не выполнено", "8 мая", "Demo Parent 04", "", "1 октября 2024"],
  ["sofia-kim", "kids-starter", "Demo Student 05", "DS", 7, "Starter", 93, 84, "Выполнено частично", "10 мая", "Demo Parent 05", "", "1 сентября 2024"],
  ["timur-sadykov", "kids-starter", "Demo Student 06", "DS", 8, "Starter", 87, 72, "Задано", "7 мая", "Demo Parent 06", "", "15 сентября 2024"],
  ["eva-park", "kids-starter", "Demo Student 07", "DS", 7, "Starter", 100, 88, "Проверено", "10 мая", "Demo Parent 07", "", "1 сентября 2024"],
  ["amir-isaev", "kids-starter", "Demo Student 08", "DS", 8, "Starter", 87, 79, "Выполнено", "9 мая", "Demo Parent 08", "", "5 сентября 2024"],
  ["daniyar-serikov", "kids-a1", "Demo Student 09", "DS", 10, "Beginner", 91, 81, "Проверено", "10 мая", "Demo Parent 09", "", "15 января 2025"],
  ["adil-bekov", "kids-a1", "Demo Student 10", "DS", 9, "Beginner", 86, 77, "Выполнено", "9 мая", "Demo Parent 10", "", "1 сентября 2024"],
  ["aisha-nur", "kids-a1", "Demo Student 11", "DS", 10, "Beginner", 95, 89, "Проверено", "10 мая", "Demo Parent 11", "", "1 сентября 2024"],
  ["maksim-tsoy", "kids-a1", "Demo Student 12", "DS", 9, "Beginner", 82, 74, "Не выполнено", "8 мая", "Demo Parent 12", "", "20 сентября 2024"],
  ["aliya-sar", "kids-a1", "Demo Student 13", "DS", 10, "Beginner", 91, 86, "Выполнено", "10 мая", "Demo Parent 13", "", "1 сентября 2024"],
  ["roman-kim", "kids-a1", "Demo Student 14", "DS", 9, "Beginner", 86, 80, "Задано", "9 мая", "Demo Parent 14", "", "1 октября 2024"],
  ["yasmina-ali", "kids-a1", "Demo Student 15", "DS", 10, "Beginner", 95, 92, "Проверено", "10 мая", "Demo Parent 15", "", "1 сентября 2024"],
  ["alina-volkova", "teens-a2", "Demo Student 16", "DS", 13, "Elementary", 88, 85, "Проверено", "10 мая", "Demo Parent 16", "", "1 сентября 2024"],
  ["arsen-kali", "teens-a2", "Demo Student 17", "DS", 14, "Elementary", 82, 73, "Выполнено частично", "8 мая", "Demo Parent 17", "", "1 сентября 2024"],
  ["dana-lee", "teens-a2", "Demo Student 18", "DS", 13, "Elementary", 94, 91, "Проверено", "10 мая", "Demo Parent 18", "", "1 сентября 2024"],
  ["nikita-orlov", "teens-a2", "Demo Student 19", "DS", 14, "Elementary", 76, 69, "Не выполнено", "7 мая", "Demo Parent 19", "", "1 октября 2024"],
  ["amira-zhan", "teens-a2", "Demo Student 20", "DS", 13, "Elementary", 88, 87, "Выполнено", "10 мая", "Demo Parent 20", "", "10 сентября 2024"],
  ["miras-asa", "teens-a2", "Demo Student 21", "DS", 14, "Elementary", 82, 78, "Задано", "8 мая", "Demo Parent 21", "", "1 сентября 2024"],
  ["polina-kim", "teens-a2", "Demo Student 22", "DS", 13, "Elementary", 94, 93, "Проверено", "10 мая", "Demo Parent 22", "", "1 сентября 2024"],
  ["sanzhar-ulan", "teens-a2", "Demo Student 23", "DS", 14, "Elementary", 88, 82, "Выполнено", "9 мая", "Demo Parent 23", "", "15 сентября 2024"],
  ["sofia-roman", "teens-a2", "Demo Student 24", "DS", 13, "Elementary", 82, 80, "Выполнено частично", "9 мая", "Demo Parent 24", "", "1 сентября 2024"],
] as const;

export const teacherStudents: TeacherStudent[] = studentNames.map(([id, groupId, name, initials, age, level, attendance, lastTest, homework, lastReview, parent, phone, startedAt]) => ({ id, groupId, name, initials, age, level, attendance, lastTest, homework, lastReview, parent, phone, startedAt }));

export const teacherLessons = [
  { id: "l-1", date: "30 мая 2025", groupId: "kids-starter", unit: "Unit 3", topic: "My Family", type: "Обычный урок", learned: "Члены семьи, описание людей", words: 8, homework: "Workbook p.24", attendance: "Заполнена" },
  { id: "l-2", date: "30 мая 2025", groupId: "kids-a1", unit: "Unit 5", topic: "At the park", type: "Разговорная практика", learned: "Present continuous в диалоге", words: 6, homework: "Academy Stars p.52", attendance: "Заполнена" },
  { id: "l-3", date: "29 мая 2025", groupId: "teens-a2", unit: "Unit 4", topic: "Life online", type: "Повторение", learned: "Digital habits, frequency adverbs", words: 10, homework: "Solutions p.47", attendance: "Не заполнена" },
  { id: "l-4", date: "28 мая 2025", groupId: "kids-starter", unit: "Unit 3", topic: "He is my brother", type: "Обычный урок", learned: "He / she, possessive ’s", words: 7, homework: "Workbook p.23", attendance: "Заполнена" },
];

export const teacherHomework = [
  { id: "hw-1", groupId: "kids-starter", topic: "My Family", issued: "30 мая", due: "2 июня", book: "Workbook", page: "24", exercises: "2–3", description: "Составить 5 предложений о семье", done: 5, partial: 1, missing: 1, unchecked: 1 },
  { id: "hw-2", groupId: "kids-a1", topic: "At the park", issued: "30 мая", due: "3 июня", book: "Academy Stars", page: "52", exercises: "1–4", description: "Подготовить описание картинки", done: 4, partial: 1, missing: 1, unchecked: 1 },
  { id: "hw-3", groupId: "teens-a2", topic: "Life online", issued: "29 мая", due: "2 июня", book: "Solutions", page: "47", exercises: "5–6", description: "Написать текст о цифровых привычках", done: 6, partial: 1, missing: 1, unchecked: 1 },
];

export const teacherTests = [
  { id: "test-1", name: "Unit 2 Test", groupId: "kids-starter", unit: "Unit 2", date: "26 мая", max: 50, completed: 8, average: 79, status: "Заполнен" },
  { id: "test-2", name: "Unit 4 Checkpoint", groupId: "kids-a1", unit: "Unit 4", date: "27 мая", max: 40, completed: 6, average: 81, status: "Не завершён" },
  { id: "test-3", name: "Grammar Review", groupId: "teens-a2", unit: "Unit 4", date: "29 мая", max: 30, completed: 0, average: 0, status: "Без результатов" },
];

export const skillNames = ["Speaking", "Listening", "Reading", "Writing", "Vocabulary", "Grammar", "Pronunciation", "Participation", "Homework"];
export const reviewTemplates = ["Уверенно использует новую лексику в устной речи.", "Активно участвует в работе на уроке.", "Рекомендуется повторять слова 10 минут ежедневно.", "Стоит уделить больше внимания письменным заданиям.", "Хорошо понимает речь на слух и следует инструкциям."];
