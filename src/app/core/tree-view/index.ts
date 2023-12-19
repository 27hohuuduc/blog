export interface BranchNode {
    childs?: BranchNode[]
}

export interface ITreeViewComponent {
    value: BranchNode
}

export * from './tree-view.component'