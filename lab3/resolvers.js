import bcrypt from "bcryptjs";
import { users, getNextUserId } from "./data.js";
import { createToken } from "./auth.js";

const perfumes = [];
let nextPerfumeId = 1;

export const resolvers = {
    Query: {
        users() {
            return users;
        },
        // Поточний авторизований користувач (з контексту)
        me(parent, args, context) {
            return context.user;
        },
        perfumes() {
            return perfumes;
        },
    },

    Mutation: {
        async register(parent, args) {
            const { name, email, password } = args;
            const existingUser = users.find((user) => user.email === email);
            if (existingUser) {
                throw new Error("Користувач з таким email вже існує.");
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = {
                id: getNextUserId(),
                name,
                email,
                password: hashedPassword,
            };
            users.push(newUser);
            return { token: createToken(newUser), user: newUser };
        },

        async login(parent, args) {
            const { email, password } = args;
            const user = users.find((item) => item.email === email);
            if (!user) {
                throw new Error("Користувача з таким email не знайдено.");
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error("Неправильний пароль.");
            }
            return { token: createToken(user), user };
        },

        // додати парфум може лише авторизований користувач
        createPerfume(parent, args, context) {
            if (!context.user) {
                throw new Error("Потрібна авторизація.");
            }
            const perfume = {
                id: String(nextPerfumeId++),
                name: args.name,
                brand: args.brand,
                description: args.description,
                price: args.price,
                volume: args.volume,
                owner: context.user,
            };
            perfumes.push(perfume);
            return perfume;
        },

        // Захищена мутація: видалити парфум за id
        deletePerfume(parent, args, context) {
            if (!context.user) {
                throw new Error("Потрібна авторизація.");
            }
            const index = perfumes.findIndex((item) => item.id === args.id);
            if (index === -1) return false;
            perfumes.splice(index, 1);
            return true;
        },
    },
};