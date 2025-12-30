import { Injectable } from '@nestjs/common';
import { User } from './user.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  create(user: Omit<User, 'created_at'>) {
    this.users.push({
      ...user,
      created_at: new Date(),
    });
  }

  findAll() {
    return this.users;
  }

  findById(id: number) {
    const intended = this.users.find((user) => user.id === id);

    if (!intended) {
      throw new Error('User not found');
    }

    return intended;
  }

  delete(id: number) {
    const intended = this.findById(id);

    this.users.splice(this.users.indexOf(intended), 1);
  }

  update(id: number, user: Partial<Omit<User, 'created_at'>>) {
    const intended = this.findById(id);

    const intendedIndex = this.users.indexOf(intended);

    const updatedIntended = {
      ...intended,
      ...user,
    };

    this.users[intendedIndex] = updatedIntended;

    return updatedIntended;
  }
}
