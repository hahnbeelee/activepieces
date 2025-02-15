import {StepOutput} from '../output/step-output';
import {LoopOnItemsStepOutput} from '../output/loop-on-items-step-output';
import * as webpack from 'webpack';

export class ExecutionState {
  configs: Record<string, unknown>;
  steps: Record<string, StepOutput>;
  lastStepState: Record<string, unknown>;

  constructor() {
    this.configs = {};
    this.steps = {};
    this.lastStepState = {};
  }


  insertConfigs(configs: any) {
    if (configs instanceof Map) {
      configs.forEach((value: any, key: string) => {
        this.configs[key] = value;
      });
    } else if (typeof configs === 'object' && !Array.isArray(configs)) {
      Object.entries(configs).forEach(([key, value]) => {
        this.configs[key] = value;
      });
    } else {
      throw Error(`Invalid configs type: ${typeof configs}`);
    }
  }

  insertStep(
    stepOutput: StepOutput,
    actionName: string,
    ancestors: [string, number][]
  ) {
    const targetMap: Record<string, StepOutput> = this.getTargetMap(ancestors);
    targetMap[actionName] = stepOutput;
    this.updateLastStep(stepOutput.output, actionName);
  }

  updateLastStep(outputOnly: any, actionName: string) {
    this.lastStepState[actionName] = ExecutionState.deepClone(outputOnly);
  }

  private static deepClone(value: any) {
    if (value === undefined) {
      return undefined;
    }
    if (value === null) {
      return null;
    }
    return JSON.parse(JSON.stringify(value));
  }

  private getTargetMap(
    ancestors: [string, number][]
  ): Record<string, StepOutput> {
    let targetMap = this.steps;
    ancestors.forEach(parent => {
      // get loopStepOutput
      if (targetMap[parent[0]] === undefined) {
        throw 'Error in ancestor tree';
      }
      const targetStepOutput = targetMap[parent[0]];
      if (!(targetStepOutput instanceof LoopOnItemsStepOutput)) {
        throw 'Error in ancestor tree';
      }
      const loopOutput = targetStepOutput as LoopOnItemsStepOutput;
      targetMap = loopOutput.output!.iterations[parent[1]];
    });
    return targetMap;
  }
}
