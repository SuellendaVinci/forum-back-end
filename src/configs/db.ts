import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../models/User';
import { Post } from '../models/Post';
import { Comment } from '../models/Comment';
import { Role } from './../models/Role';
import { Like } from '../models/Like';
import { herokuDBData } from '../utils/getHerokuDBData';

const DATABASE_URL_LOCAL =
  'postgres://postgres:postgres@localhost:5432/forum_db';

const dbObject = herokuDBData(
  process.env.NODE_ENV === 'production'
    ? process.env.DATABASE_URL
    : DATABASE_URL_LOCAL,
);

const { host, port, username, password, database } = dbObject;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  synchronize: true,
  logging: false,
  entities: [User, Role, Post, Comment, Like],
  migrations: ['src/migrations/*.{ts,js}'],
  subscribers: [],
});
