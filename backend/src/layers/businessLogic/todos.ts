import * as TodosAccess from '../data/todosAcess'
import { AttachmentUtils } from '../../helpers/attachmentUtils'
import { TodoItem } from '../../models/TodoItem'
import { TodoUpdate } from '../../models/TodoUpdate'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { createLogger } from '../../utils/logger'
import * as uuid from 'uuid'

// TODO: Implement businessLogic
const logger = createLogger('TodoBusinessLogic')
const attachmentUtils = new AttachmentUtils()

// Get todo function
export const getTodos = async (userId: string): Promise<TodoItem[]> => {
  logger.info('Get all Todos.')
  return await TodosAccess.getAllTodos(userId)
}

// Create todo function
export const createTodo = async (
  newTodo: CreateTodoRequest,
  userId: string
): Promise<TodoItem> => {
  logger.info('Create todo')
  const todoId = uuid.v4()
  const createdAt = new Date().toISOString()
  const newItem: TodoItem = {
    userId: userId,
    todoId: todoId,
    name: newTodo.name,
    createdAt: createdAt,
    done: false,
    attachmentUrl: null,
    dueDate: newTodo.dueDate
  }
  await TodosAccess.createTodo(newItem)
  return newItem
}

// Update todo function
export const updateTodo = async (
  userId: string,
  todoId: string,
  todoUpdate: UpdateTodoRequest
): Promise<TodoUpdate> => {
  logger.info('Update todo')
  return await TodosAccess.updateTodo(userId, todoId, todoUpdate)
}

// Create attachment function
export const createAttachmentPresignedUrl = async (
  userId: string,
  todoId: string
): Promise<string> => {
  logger.info('Create attachment')
  TodosAccess.updateTodoAttachmentUrl(userId, todoId)
  return attachmentUtils.getUploadUrl(todoId)
}

// Delete todo function
export const deleteTodo = async (
  userId: string,
  todoId: string
): Promise<string> => {
  logger.info('Delete todo')
  return await TodosAccess.deleteTodo(userId, todoId)
}


// Search todo function
export const searchTodo = async (userId: string, searchValue: string): Promise<TodoItem[]> => {
  logger.info('Search todos')
  return await TodosAccess.SearchTodo(userId, searchValue)
}

// Pagination todo function
export const getTodosPaging = async (
  userId: string,
  nextKey: JSON,
  limit: number
): Promise<{ itemList: TodoItem[], nextKey: any }> => {
  logger.info('Paging Query todo ')
  return await TodosAccess.TodosPaging(userId, nextKey, limit)
}
