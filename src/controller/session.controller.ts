import {Request, Response} from "express";
import config from "config";
import { validatePassword } from "../service/user.service";
import {createSession,findSessions, updateSession} from "../service/session.service";
import { signJwt } from "../utils/utils.jwt";

export async function createSessionHandler (req: Request, res: Response) {

    const user = await validatePassword(req.body);
    if(!user)
    return res.status(401).send('Invalid email or password');
    
    const session = await createSession(user._id, req.get("user-agent") || "");

    const accesToken = signJwt(
        {...user, session: session._id},
        { expiresIn: config.get<string>("timeAccesToken")} 
    );

    const refreshToken = signJwt(
        {...user, session: session._id},
        { expiresIn: config.get<string>("refreshToken")} 
    );
    
    res.send({accesToken, refreshToken});
};

export async function getUserSessionsHandler (req: Request, res: Response) {
    const userId = res.locals.user

    const sessions = await findSessions({user: userId, valid: true})

    return res.send(sessions);
};

export async function deleteSessionHandler(req: Request, res: Response) {
    const sessionId = res.locals.user.sessiom

    await updateSession({_id: sessionId}, {valid:false})

    return res.send({
        accessToken: null,
        refreshToken: null 
    })
}

