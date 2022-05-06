import {Express, Request, Response} from "express"
import {
    createSessionHandler,
    deleteSessionHandler,
    getUserSessionsHandler } from "./controller/session.controller"
import {createUserHeandler}  from "./controller/user.controller"
import requireUser from "./middleware/requireUser"
import validateResource from "./middleware/validateResource"
import { 
    createProductSchema, 
    getProductSchema, 
    updateProductSchema, 
    deleteProductSchema } from "./schema/product.schema"
import { createSessionSchema} from "./schema/session.schema"
import { createUserSchema } from "./schema/user.schema"
import {
    createProductHandler,
    updateProductHandler,
    getProductHandler,
    deleteProductHandler} from "./controller/product.controller"

function routes (app: Express) {
    app.get('/check', (req: Request, res: Response) => {
        res.send('works')
    }),

    app.post('api/users', validateResource(createUserSchema), createUserHeandler)
    app.post('api/sessions', validateResource(createSessionSchema), createSessionHandler)
    app.get('/api/session', requireUser, getUserSessionsHandler)
    app.delete('/api/session', requireUser, deleteSessionHandler)
    app.post('/api/products', [requireUser, validateResource(createProductSchema)], createProductHandler)
    app.put('/api/products:productId', [requireUser, validateResource(updateProductSchema)], updateProductHandler)
    app.get('/api/products:productId',validateResource(getProductSchema), getProductHandler)
    app.delete("/api/products/:productId",[requireUser, validateResource(deleteProductSchema)],deleteProductHandler);
}

export default routes;