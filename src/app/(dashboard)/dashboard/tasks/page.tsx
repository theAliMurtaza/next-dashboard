import { TasksList } from "./tasks-list";
import { getTasksAction } from "@/actions/lead.actions";

export default async function TasksPage() {
  const tasks = await getTasksAction();

  return <TasksList initialTasks={tasks} />;
}