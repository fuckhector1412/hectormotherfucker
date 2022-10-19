import { Branch } from '../models/branch'
import {
  ChooseBranchStep,
  conflictSteps,
  MultiCommitOperationStepKind,
} from '../models/multi-commit-operation'
import { PopupType } from '../models/popup'
import { TipState } from '../models/tip'
import { IMultiCommitOperationState, IRepositoryState } from './app-state'
import { popupManager } from './popup-manager'

/**
 * Setup the multi commit operation state when the user needs to select a branch as the
 * base for the operation.
 */
export function getMultiCommitOperationChooseBranchStep(
  state: IRepositoryState,
  initialBranch?: Branch | null
): ChooseBranchStep {
  const { defaultBranch, allBranches, recentBranches, tip } =
    state.branchesState
  let currentBranch: Branch | null = null

  if (tip.kind === TipState.Valid) {
    currentBranch = tip.branch
  } else {
    throw new Error(
      'Tip is not in a valid state, which is required to start the multi commit operation'
    )
  }

  return {
    kind: MultiCommitOperationStepKind.ChooseBranch,
    defaultBranch,
    currentBranch,
    allBranches,
    recentBranches,
    initialBranch: initialBranch !== null ? initialBranch : undefined,
  }
}

export function isConflictsFlow(
  multiCommitOperationState: IMultiCommitOperationState | null
): boolean {
  return (
    popupManager.isPopupsOfType(PopupType.MultiCommitOperation) &&
    multiCommitOperationState !== null &&
    conflictSteps.includes(multiCommitOperationState.step.kind)
  )
}
