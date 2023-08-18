import { Request } from 'express'
import { IGroup } from '../db/models/Group'
import { UserJWT } from '../helpers/jwtHelpers'
import { ICustomer } from '../db/models/Customer'

export interface RequestWithUser extends Request {
  user: UserJWT
}

export interface RequestWithFoundGroup extends RequestWithUser {
  foundGroup: IGroup
}

export interface RequestWithFoundCustomer extends RequestWithUser {
  foundCustomer: ICustomer
}
