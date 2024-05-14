import { Request, Response } from "express"
import { prisma } from "../../data/postgres"
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos"
import { emitWarning } from "process"






export class TodosController {

    //* Dependency injection
    constructor() {}


    public getTodos = async (req:Request, res:Response) => {
        
        const todos = await prisma.todo.findMany()

        return res.json(todos)
    }

    public getTodoById = async (req:Request, res:Response) => {
        const id = +req.params.id;  // ! el '+' hace que el string sea un numero
        if( isNaN(id) ) return res.status(400).json({error: `id must be a number`});

        const todo = await prisma.todo.findUnique({
            where: {
                id: id, 
            },
        });
  
        ( todo ) 
            ? res.json(todo) 
            : res.status(404).json({error: `ID: ${id} not found`})

    }


    public createTodo = async (req:Request, res:Response) => {

        const [error, createTodoDto] = CreateTodoDto.create(req.body)
        
        if ( error ) res.status(400).json({ error })


        const todo = await prisma.todo.create({
            data: createTodoDto! 
        });
  

        res.json(todo)
    }


    public updateTodo = async (req:Request, res:Response) => {

        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id})
        if( error ) return res.status(400).json({error})

            
        const todo = await prisma.todo.findFirst({where: {id}})
        if( !todo ) return res.status( 404 ).json( {error: `ID: ${id} not found`} )
                
        const { text, createdAt } = req.body
        const updatedTodo = await prisma.todo.update({
            where: {
                id: id
            },
            data: updateTodoDto!.values
        }) ;  



        res.json( updatedTodo )
    }


    public deleteTodo = async (req:Request, res:Response) => {
        const id = +req.params.id;

        const todo = await prisma.todo.findFirst({where: {id}})
        if( !todo ) return res.status( 404 ).json( {error: `ID: ${id} not found`} )

        const deletedTodo = await prisma.todo.delete({
            where: {
                id
            }
        })

        res.json(deletedTodo)
    }
}