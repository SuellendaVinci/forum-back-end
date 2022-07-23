import { AppDataSource } from "./configs/db"
import { User } from "./models/User"

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const user = new User()
    user.name = "Suellen Camargo"
    user.email = "suellen_fleur@hotmail.com"
    user.password = "123456"
    user.gender = "Female"
    user.ocupation = "Full Stack Developer Student"
    user.city = "Curitiba"
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
