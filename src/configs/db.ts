import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../models/User"
import { Post } from '../models/Post';
import { Comment } from '../models/Comment';
import { Role } from './../models/Role';
import { Like } from '../models/Like'

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "forum_db",
    synchronize: true,
    logging: false,
    entities: [User, Role, Post, Comment, Like],
    migrations: ["src/migrations/*.{ts,js}"],
    subscribers: [],
})
