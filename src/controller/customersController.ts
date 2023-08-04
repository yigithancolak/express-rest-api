// import { Response } from 'express'
// import mongoose from 'mongoose'
// import { ICustomer } from '../db/models/Customer'
// import { createGroup, getGroups } from '../db/operations/groupOperations'
// import { RequestWithUser } from '../middleware/verifyJWT'
// import { createCustomer } from '../db/operations/customerOperations'

// export const handleCreateCustomer = async (
//   req: RequestWithUser,
//   res: Response
// ) => {
//   const { name, email, phoneNumber, groupIds, lastPayment, nextPayment } =
//     req.body as Partial<ICustomer>
//   const { id } = req.user

//   if (
//     !name ||
//     !email ||
//     !phoneNumber ||
//     !groupIds ||
//     !lastPayment ||
//     !nextPayment
//   )
//     return res
//       .status(400)
//       .json({
//         success: false,
//         message:
//           'Name,email, phoneNumber, groupIds, lastPayment, nextPayment are required'
//       })

//   try {
//     const newGroup = await createCustomer({ name, day, time, instructorId: id })
//     res.status(201).json({ success: true, data: newGroup })
//   } catch (error) {
//     //todo: Delete that check later
//     if (error instanceof mongoose.Error.ValidationError) {
//       res.status(400).json({ success: false, message: 'Invalid input' })
//     }
//     res.status(500).json({ success: false, message: error.message })
//   }
// }

// export const handleGetCustomers = async (
//   req: RequestWithUser,
//   res: Response
// ) => {
//   const { id } = req.user
//   try {
//     const allGroups = await getGroups(id)
//     return res.status(200).json({ success: true, data: allGroups })
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message })
//   }
// }

// // export const handleGetOneGroup = async (
// //   req: RequestWithUser,
// //   res: Response
// // ) => {
// //   const { id } = req.params
// //   if (!id)
// //     return res
// //       .status(400)
// //       .json({ success: true, message: 'Id must be provided' })

// //   try {
// //     const foundGroup = await getGroupById(id)

// //     if (!foundGroup)
// //       return res
// //         .status(404)
// //         .json({ success: false, message: 'Group has not found' })

// //     return res.status(200).json({ success: true, data: foundGroup })
// //   } catch (error) {
// //     return res.status(500).json({ success: false, message: error.message })
// //   }
// // }

// // export const handleUpdateGroup = async (
// //   req: RequestWithUser,
// //   res: Response
// // ) => {
// //   const { id } = req.params
// //   const updatedFields = req.body as Partial<IGroup>
// //   if (!id)
// //     return res
// //       .status(400)
// //       .json({ success: true, message: 'Id must be provided' })

// //   try {
// //     const foundGroup = await getGroupById(id)

// //     if (!foundGroup)
// //       return res
// //         .status(404)
// //         .json({ success: false, message: 'Group has not found' })

// //     const updatedGroup = await updateGroupById(id, updatedFields)

// //     return res.status(200).json({ success: true, data: updatedGroup })
// //   } catch (error) {
// //     return res.status(500).json({ success: false, message: error.message })
// //   }
// // }

// // export const handleDeleteGroup = async (
// //   req: RequestWithUser,
// //   res: Response
// // ) => {
// //   const { id } = req.params
// //   const updatedFields = req.body as Partial<IGroup>
// //   if (!id)
// //     return res
// //       .status(400)
// //       .json({ success: true, message: 'Id must be provided' })

// //   try {
// //     const foundGroup = await getGroupById(id)

// //     if (!foundGroup)
// //       return res
// //         .status(404)
// //         .json({ success: false, message: 'Group has not found' })

// //     const deletedGroup = await deleteGroupById(id)

// //     return res
// //       .status(200)
// //       .json({ success: true, message: 'Group has been deleted' })
// //   } catch (error) {
// //     return res.status(500).json({ success: false, message: error.message })
// //   }
// // }
