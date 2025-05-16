import {User} from "../../restock/iam/model/user.entity.js";

export const mockUser = new User({
    id: 1,
    name: 'Don Pepe',
    email: 'pepe@gmail.com',
    avatar: { url: 'https://i.pravatar.cc/150?img=1' },
    role_id: { name: 'supplier' }
});

// export const mockUser = new User({
//     id: 2,
//     name: 'Chef Rosa',
//     email: 'rosa@gmail.com',
//     avatar: { url: 'https://i.pravatar.cc/150?img=2' },
//     role_id: { name: 'restaurant' }
// });
