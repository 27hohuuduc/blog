import { BranchNode } from '../core'

export * from './dashboard'

export * from './active-router/auth'

export * from './active-router/urlconverter'

export type Data = {
    isAdmin: boolean
}

export type Topics = {
    id: number
    topic: string,
    subtopic: Topics[]
}

export interface TopicMap extends BranchNode {
    id: number
    name: string
    childs: TopicMap[]
    parent: TopicMap[]
}