import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

type User = {
    id: number;
    username: string;
    email: string;
}

@Injectable()
export class UserService{
    private users: User[] = [];
    private idCounter = 1;
    

    create(dto: CreateUserDto) {
        const userExists = this.users.find(user => user.email === dto.email);
        if (userExists) {
            throw new ConflictException('User with this email already exists');
        }

        const newUser = { id: this.idCounter++, ...dto };

        this.users.push(newUser);
        return newUser;
    }

    findAll() {
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find(u => u.id === id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    update(id: number, dto: UpdateUserDto) {
        const user = this.findOne(id);
        Object.assign(user, dto);
        return user;
    }

    remove(id: number) {
        const index = this.users.findIndex(u => u.id === id);
        if (index === -1) {
            throw new NotFoundException('User not found');
        }
        return this.users.splice(index, 1)[0];
    }
}