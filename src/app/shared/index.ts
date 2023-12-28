import { BranchNode } from '../core/tree-view'

export * from './dashboard'

export * from './auth'

export * from './urlconverter'

export * from './service/api.service'

export * from './service/topic.service'

export type Data = {
    isAdmin: boolean
}

export interface TopicMap extends BranchNode {
    id: number
    name: string
    childs: TopicMap[]
    parent: TopicMap | null
}