import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  //   async createTask(createTaskDto: CreateTaskDto) {
  //     const { title, description } = createTaskDto;
  //     const task = this.create({
  //       title,
  //       description,
  //       status: TaskStatus.OPEN,
  //     });
  //     await this.save(task);
  //     return task;
  //   }
}
