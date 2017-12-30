export class Daycare {
    constructor(
        public id: number,
        public name: string
    ) { }
}

export class Child {
    constructor(
        public id: number,
        public firstname: string,
        public lastname: string,
        public daycare: Daycare
    ) { }
}

export class Educator {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public daycare: Daycare
    ) { }
}

export class Parent {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public daycare: number
    ) { }
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
}

export class Role {
    constructor(
        public name: String,
        public description: String
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