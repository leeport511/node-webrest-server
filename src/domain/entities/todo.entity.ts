


export class TodoEntity {


    constructor(
        public id: number,
        public text: string,
        public createdAt?: Date|null
    ){}


    get isCreated () {
        return !!this.createdAt; // sin ! devuelve un valor, con un ! es false (lo niega) y con 2 !! es true
    }

    public static fromObject( object: {[key: string]:any} ): TodoEntity {
        const {id, text, createdAt} = object;
        if (!id) throw 'Id is required';
        if (!text) throw 'Text is Required'

        let newCreatedAt;
        if ( createdAt ) {
            newCreatedAt = new Date(createdAt);
            if(isNaN( newCreatedAt.getDate()) ){
                throw 'CreatedAt is not a valid date'
            }
        }

        return new TodoEntity(
            id, text, createdAt
        )
    }
}
