import { Controller, Get, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { UserService } from "../services/user.service";

@Controller("api/users")
export class UserController {
	constructor(private readonly userService: UserService) {}
}
