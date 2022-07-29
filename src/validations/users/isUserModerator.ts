import { User } from './../../models/User';

interface IsUserModeratorProps {
  user: User;
}

const isUserModerator = ({ user }: IsUserModeratorProps) =>
  user.role.name === 'Moderator';

export default isUserModerator;
