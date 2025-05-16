export class Role {
    constructor({ name = '' } = {}) {
        this.name = name;
    }
}

export class Avatar {
    constructor({ url = '' } = {}) {
        this.url = url;
    }
}

export class User {
    constructor({
                    id = 0,
                    name = '',
                    email = '',
                    avatar = {},
                    role_id = {}
                } = {}) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.avatar = new Avatar(avatar);
        this.role_id = new Role(role_id);
    }
}
