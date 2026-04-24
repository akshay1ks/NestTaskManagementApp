import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.findOneById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.taskRepository.save(task);
    return task;
  }
  //   private tasks: Task[] = [];
  //   getAllTasks(): Task[] {
  //     return this.tasks;
  //   }
  //   getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //     const { status, search } = filterDto;
  //     let tasks = this.getAllTasks();
  //     if (status) {
  //       tasks = tasks.filter((task) => task.status === status);
  //     }
  //     if (search) {
  //       tasks = tasks.filter(
  //         (task) =>
  //           task?.title?.includes(search) || task?.description?.includes(search),
  //       );
  //     }
  //     return tasks;
  //   }
  //   getTaskById(id: string): Task | undefined {
  //     const found = this.tasks.find((task) => task.id === id);
  //     if (!found) {
  //       throw new NotFoundException(`Task with ID "${id}" not found`);
  //     }
  //     return found;
  //   }
  //   createTask(createTaskDto: CreateTaskDto): Task {
  //     const task: Task = {
  //       id: uuid(),
  //       title: createTaskDto.title,
  //       description: createTaskDto.description,
  //       status: TaskStatus.OPEN,
  //     };
  //     this.tasks.push(task);
  //     return task;
  //   }
  //   deleteTaskById(id: string): void {
  //     const task = this.getTaskById(id);
  //     this.tasks = this.tasks.filter((task) => task.id !== id);
  //   }
  //   updateTaskStatus(id: string, status: TaskStatus): Task | undefined {
  //     const task = this.getTaskById(id);
  //     if (task) {
  //       task.status = status;
  //     }
  //     return task;
  //   }
}
