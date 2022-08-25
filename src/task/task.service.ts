import { UpdateTaskDto } from './dto/update-task.dto';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) { }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const {
            title,
            description,
        } = createTaskDto

        const task = await this.taskRepository.create({
            title,
            description,
        })
        try {
            await this.taskRepository.save(task)
            return task
        } catch (e) {
            console.log("error")
            throw new ConflictException({
                message: ["something wrong"]
            })
        }
    }


    async getTasks(): Promise<Task[]> {
        try {
            const tasks = await this.taskRepository.find()
            return tasks
        } catch (e) {
            console.log("error")
            throw new NotFoundException({
                message: ["NotFoundException"]
            })
        }
    }


    async getTaskById(id: string): Promise<Task> {
        try {
            const taskid = await this.taskRepository.findOne(id)
            return taskid
        } catch (e) {
            throw new NotFoundException({
                message: ["something wrong"]
            })
        }
    }


    async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
        try {
            const task = await this.getTaskById(id)

            const {
                title,
                description,
            } = updateTaskDto

            if(title){
                task.title = title
            }

            if(description){
                task.description = description
            }

            await this.taskRepository.save(task)
            return task


        } catch (e) {
            throw new NotFoundException({
                message: ['task not found']
            })
        }
    }


    async deleteTask(id:string){
        try{
            const task = await this.getTaskById(id)
            await this.taskRepository.delete(id)

            return task
        }catch(e){
            throw new NotFoundException({
                message: ['ไม่พบข้อมูลที่จะลบ']
            })
        } 
    }
}
