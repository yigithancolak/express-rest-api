import { Request } from 'express'
import { IGroup } from '../db/models/Group'
import { UserJWT } from '../helpers/jwtHelpers'

export interface RequestWithUser extends Request {
  user: UserJWT
}

export interface RequestWithFoundGroup extends RequestWithUser {
  foundGroup: IGroup
}
