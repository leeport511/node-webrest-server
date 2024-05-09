import { error } from "console"
import { Request, Response } from "express"


const todos = [
    {id:1, text:'Buy Milk', createdAt: new Date()},
    {id:2, text:'Buy Chocolate', createdAt: null },
    {id:3, text:'Buy Soup', createdAt: new Date()},
]

export class TodosController {

    //* Dependency injection
    constructor() {}


    public getTodos = (req:Request, res:Response) => { 

        return res.json(todos)
    }

    public getTodoById = (req:Request, res:Response) => {
        const id = +req.params.id  // ! el '+' hace que el string sea un numero
        if( isNaN(id) ) return res.status(400).json({error: `id must be a number`})

        const todo = todos.find(todo => todo.id === id);

        ( todo ) 
            ? res.json(todo) 
            : res.status(404).json({error: `ID: ${id} not found`})

    }


    public createTodo = (req:Request, res:Response) => {

        const { text } = req.body;

        if ( !text ) res.status(400).json({error: 'text property is required'})

        const newTodo = {
            id: todos.length + 1,
            text: text,
            createdAt: null,
        }

        todos.push(newTodo)    

        res.json(newTodo)
    }


    public updateTodo = (req:Request, res:Response) => {

        const id = +req.params.id;
        if( isNaN(id) ) return res.status(400).json({error: `id must be a number`})

        const todo = todos.find(todo => todo.id === id);
        if( !todo ) return res.status( 404 ).json( {error: `ID: ${id} not found`} )

        const { text, createdAt } = req.body

        todo.text = text || todo.text;

        ( createdAt === 'null ')
            ? todo.createdAt = null
            : todo.createdAt = new Date( createdAt || todo.createdAt )


        res.json( todo )
    }


    public deleteTodo = (req:Request, res:Response) => {
        const id = +req.params.id;

        const todo = todos.find(todo => todo.id === id)
        if( !todo ) return res.status( 404 ).json( {error: `ID: ${id} not found`} )

        todos.splice( todos.indexOf(todo), 1 );

        res.json(todo)
    }
}