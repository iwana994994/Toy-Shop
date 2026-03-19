import { UserModel } from "../../models/user.model";
import { ToyService } from "./toy.service";
import { ToyModel } from "../../models/toy.model";

const USERS = 'users';
const ACTIVE = 'active';

export class AuthService {
  static getUsers(): UserModel[] {
    const baseUser: UserModel = {
      email: 'user@example.com',
      password: 'user123',
      firstName: 'Example',
      lastName: 'User',
      phone: '0653093267',
      address: 'Danijelova 32',
      favoriteCategory: "",
      review: []
    };

    if (localStorage.getItem(USERS) == null) {
      localStorage.setItem(USERS, JSON.stringify([baseUser]));
    }

    return JSON.parse(localStorage.getItem(USERS)!);
  }

  static login(email: string, password: string): boolean {
    const users = this.getUsers();

    for (let u of users) {
      if (u.email === email && u.password === password) {
        localStorage.setItem(ACTIVE, email);
        return true;
      }
    }

    return false;
  }

  static existsByEmail(email: string): boolean {
    const users = this.getUsers();

    for (let u of users) {
      if (u.email === email) {
        return true;
      }
    }

    return false;
  }

  static createUser(user: Partial<UserModel>): boolean {
    const users = this.getUsers();

    const newUser: UserModel = {
      email: user.email || '',
      password: user.password || '',
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      phone: user.phone || '',
      address: user.address || '',
      favoriteCategory: user.favoriteCategory || '',
      review: user.review || []
    };

    users.push(newUser);
    localStorage.setItem(USERS, JSON.stringify(users));
    localStorage.setItem(ACTIVE, newUser.email);

    return true;
  }

  static registration(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phone: string,
    address: string,
    favoriteCategory: string
  ): boolean {
    const users = this.getUsers();

    const newUser: UserModel = {
      email,
      password,
      firstName,
      lastName,
      phone,
      address,
      favoriteCategory,
      review: []
    };

    users.push(newUser);
    localStorage.setItem(USERS, JSON.stringify(users));
    localStorage.setItem(ACTIVE, email);

    return true;
  }

  static getActiveUser(): UserModel | null {
    const users = this.getUsers();

    for (let u of users) {
      if (u.email === localStorage.getItem(ACTIVE)) {
        return u;
      }
    }

    return null;
  }

  static updateActiveUser(newUserData: UserModel) {
    const users = this.getUsers();

    for (let u of users) {
      if (u.email === localStorage.getItem(ACTIVE)) {
        u.firstName = newUserData.firstName;
        u.lastName = newUserData.lastName;
        u.address = newUserData.address;
        u.phone = newUserData.phone;
        u.favoriteCategory = newUserData.favoriteCategory;
      }
    }

    localStorage.setItem(USERS, JSON.stringify(users));
  }

  static updateActiveUserPassword(newPassword: string) {
    const users = this.getUsers();

    for (let u of users) {
      if (u.email === localStorage.getItem(ACTIVE)) {
        u.password = newPassword;
      }
    }

    localStorage.setItem(USERS, JSON.stringify(users));
  }

  static logout() {
    localStorage.removeItem(ACTIVE);
  }

static async getFavoriteItems() {
  const activeUser = this.getActiveUser();

  if (!activeUser || !activeUser.favoriteCategory) {
    return [];
  }

  const toys = await ToyService.getToys();

  return toys.filter((toy: any) =>
    toy.type.name.trim().toLowerCase() ===
    activeUser.favoriteCategory.trim().toLowerCase()
  );
}
}

