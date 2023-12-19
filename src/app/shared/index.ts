import { BranchNode } from '../core/tree-view'

export * from './dashboard'

export * from './auth'

export * from './urlconverter'

export * from './common.service'

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