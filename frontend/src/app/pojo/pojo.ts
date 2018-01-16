export class Daycare {
    constructor(
        public id: number,
        public name: string
    ){}

    static create() : Daycare{
        return new Daycare(0,"");
    }
}


export class Child {
    constructor(
        public id: number,
        public firstname: string,
        public lastname: string,
        public daycare: Daycare
    ) { }

    static create() : Child{
        return new Child(0,"","",Daycare.create());
    }
}

export class Educator {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public daycare: Daycare
    ) { }

    static create() : Educator{
        return new Educator(0,"","",Daycare.create());
    }
}

export class Parent {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public daycare: Daycare
    ) { }

    static create() : Parent{
        return new Parent(0,"","",Daycare.create());
    }
}

export class Sumups {
    constructor(
        public id: number,
        public child: Child,
        public mood: number,
        public sleep: number,
        public appetite: number,
        public comment: string,
        public educator: number,
        public day: number
    ) { }

    static create() : Sumups{
        return new Sumups(0,Child.create(),0,0,0,"",0,0);
    }
}

export class User {
    constructor(
        public id: number,
        public username: String,
        public firstName: String,
        public lastName: String,
        public roles:Array<Role>,
        public daycare: Daycare
    ) { }

    static create() : User{
        return new User(0,"","","",new Array<Role>(),Daycare.create());
    }
}

export class Role {
    constructor(
        public id: number,
        public name: String,
        public description: String,
        public checked: boolean=false
    ) { }
}

export class JwtToken {
    constructor(
        public access_token: string,
        public token_type: string,
        public expires_in: number,
        public scope: string,
        public jti: string,
) { }
}