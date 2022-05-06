"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: 'Name is required'
        }),
        password: (0, zod_1.string)({
            required_error: 'Name is required'
        }).min(8, "min length: 8 chars"),
        passwordConfirmation: (0, zod_1.string)({
            required_error: 'Password confirmation is required'
        }),
        email: (0, zod_1.string)({
            required_error: 'Email is required'
        }).email('Invalid email')
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: 'Passwords do not match',
        path: ["passwordConfirmation"]
    })
});
