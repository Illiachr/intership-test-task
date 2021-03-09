import Admin from './Admin';
import User from './User';

const list = {
  user: User,
  admin: Admin,
};

export default class UserFactory {
  // eslint-disable-next-line class-methods-use-this
  create(name, type = 'user') {
    const NewUser = list[type] || list.user;
    const user = new NewUser(name);
    user.type = type;
    return user;
  }
}
