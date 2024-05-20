import { Request, Response } from "express"
import { prisma } from "../../data/postgres"
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos"
import { TodoRepository } from "../../domain"








export class TodosController {

    //* Dependency injection
    constructor(
        private readonly todoRepository: TodoRepository
    ) {}


    public getTodos = async (req:Request, res:Response) => {
        
        const todos = await this.todoRepository.getAll();
        res.json(todos)
    }

    public getTodoById = async (req:Request, res:Response) => {
        const id = +req.params.id;  // ! el '+' hace que el string sea un numero
        if( isNaN(id) ) return res.status(400).json({error: `id must be a number`});

        const todo = await this.todoRepository.findById(id)
        res.json(todo)

    }


    public createTodo = async (req:Request, res:Response) => {

        const [error, createTodoDto] = CreateTodoDto.create(req.body)
        if ( error ) res.status(400).json({ error })


        const todo = await this.todoRepository.create( createTodoDto! )
  

        res.json(todo)
    }


    public updateTodo = async (req:Request, res:Response) => {

        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id})
        if( error ) return res.status(400).json({error})

        const updatedTodo = await this.todoRepository.updateById(updateTodoDto!)
   
        res.json( updatedTodo )
       
    }


    public deleteTodo = async (req:Request, res:Response) => {
        const id = +req.params.id;

        const deletedTodo = await this.todoRepository.deleteById(id)

        res.json(deletedTodo)
    }
}