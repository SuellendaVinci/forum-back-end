import { Role } from './../models/Role';
import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../models/User"
import { Post } from '../models/Post';
import { Comment } from '../models/Comments';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "forum_db",
    synchronize: true,
    logging: false,
    entities: [User, Role, Post, Comment],
    migrations: [],
    subscribers: [],
})
